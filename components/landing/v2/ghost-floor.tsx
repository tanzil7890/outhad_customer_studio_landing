'use client'

import { useEffect, useRef, useState } from 'react'
import { MousePointerClick, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GHOSTS } from '@/lib/landing/content'

/**
 * The ghost floor: anonymous visitors drift through a store drawn as three
 * faint pages; almost all of them dissolve on the way out. The visitor's
 * pointer is Convertive's lens (ghosts inside it show their live read) and a
 * click catches one: time stops, three futures fan out, the best one wins,
 * the ghost gets a name and the sale floats up in copper.
 *
 * Canvas only, decorative (aria-hidden) and illustrative. Pauses offscreen, in
 * background tabs and on request; draws a single still frame under reduced
 * motion.
 */

type Rect = { x: number; y: number; w: number; h: number }
type PageKind = 'collection' | 'product' | 'cart'
type Mode = 'walk' | 'leaving' | 'caught' | 'customer'

interface Ghost {
  id: string
  pts: [number, number][]
  stages: number[]
  seg: number
  u: number
  dwell: number
  speed: number
  leaveAt: number
  mode: Mode
  alpha: number
  x: number
  y: number
  trail: [number, number][]
  trailClock: number
  wob: number
  vx: number
  vy: number
  age: number
  name?: string
  amount?: number
}

interface Catch {
  ghost: Ghost
  t: number
  options: { label: string; score: number }[]
  ms: number
  dir: 1 | -1
}

const ACTIONS = [
  '10% off, today only',
  'Free shipping over $150',
  'Size-fit helper',
  'Bundle: boots + socks',
  'Back-in-stock alert',
  'Reviews from buyers like her',
]
const NAMES = ['Maya R.', 'Sarah K.', 'Jonas B.', 'Priya S.', 'Leo M.', 'Aisha N.', 'Tom W.', 'Elena V.', 'Sam D.', 'Noor A.', 'Chris P.', 'Hana T.']

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const easeInOut = (u: number) => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2)
const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')

function channels(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  return value.split(/\s+/).join(',')
}

/** Page rectangles in normalised (0..1) canvas space. */
function layout(w: number, h: number, pages: boolean): Record<PageKind, Rect> {
  // Without pages (or on phones, where the hero copy fills the screen) ghosts roam the whole floor.
  if (!pages || w < 768) {
    return {
      collection: { x: 0.12, y: 0.2, w: 0.25, h: 0.6 },
      product: { x: 0.4, y: 0.2, w: 0.25, h: 0.6 },
      cart: { x: 0.66, y: 0.2, w: 0.25, h: 0.6 },
    }
  }
  const ratio = Math.min(1, (w / h) * 0.55)
  const pw = 0.17 * Math.max(0.8, ratio)
  return {
    collection: { x: 0.47, y: 0.17, w: pw, h: 0.3 },
    product: { x: 0.6, y: 0.48, w: pw * 1.08, h: 0.32 },
    cart: { x: 0.78, y: 0.2, w: pw * 0.92, h: 0.3 },
  }
}

const inside = (r: Rect, px = 0.15): [number, number] => [r.x + r.w * rand(px, 1 - px), r.y + r.h * rand(0.35, 0.85)]

function makeGhost(pages: Record<PageKind, Rect>, fromEdge: boolean): Ghost {
  const start: [number, number] = fromEdge ? [-0.03, rand(0.12, 0.92)] : inside(pages.collection)
  const pts: [number, number][] = [start, inside(pages.collection)]
  const stages = [0, 1]
  if (Math.random() < 0.5) {
    pts.push(inside(pages.collection))
    stages.push(1)
  }
  pts.push(inside(pages.product))
  stages.push(2)
  pts.push(inside(pages.cart))
  stages.push(3)
  // Most leave somewhere along the way; a rare few buy on their own.
  const roll = Math.random()
  const leaveAt = roll < 0.03 ? Infinity : roll < 0.55 ? (fromEdge ? 1 : 1) : roll < 0.85 ? pts.length - 2 : pts.length - 1
  return {
    id: `anon_${hex()}`,
    pts,
    stages,
    seg: fromEdge ? 0 : 1,
    u: fromEdge ? 0 : rand(0, 1),
    dwell: 0,
    speed: rand(70, 120),
    leaveAt,
    mode: 'walk',
    alpha: 0,
    x: -100,
    y: -100,
    trail: [],
    trailClock: 0,
    wob: rand(0, Math.PI * 2),
    vx: 0,
    vy: 0,
    age: 0,
  }
}

function intentOf(g: Ghost) {
  const stage = g.stages[Math.min(g.seg, g.stages.length - 1)]
  return [0.12, 0.34, 0.62, 0.78][stage] + ((g.wob * 7) % 1) * 0.08
}
function riskOf(g: Ghost) {
  if (g.mode === 'leaving') return 0.95
  const near = g.leaveAt - g.seg
  return near <= 0 ? 0.88 : near === 1 ? 0.62 : 0.24 + ((g.wob * 3) % 1) * 0.1
}

export interface GhostFloorProps {
  className?: string
  /** Multiplier on the number of ghosts. */
  density?: number
  /** Draw the three store pages. */
  pages?: boolean
  /** Lens + click to catch. */
  interactive?: boolean
  /** Catch a ghost on its own this often (ms) when nobody is interacting. */
  autoCatchMs?: number
  /** Show the catch / pause controls row (positioned with controlsClassName). */
  controls?: boolean
  controlsClassName?: string
}

export default function GhostFloor({
  className,
  density = 1,
  pages = true,
  interactive = true,
  autoCatchMs = 7000,
  controls = true,
  controlsClassName,
}: GhostFloorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const api = useRef<{ catchOne: () => void; setPaused: (p: boolean) => void } | null>(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [caught, setCaught] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const host = canvas?.parentElement
    if (!canvas || !ctx || !host) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(reducedMotion)
    setTouch(!window.matchMedia('(pointer: fine)').matches)
    const C = {
      soft: channels('--c-night-soft', '196 168 152'),
      text: channels('--c-night-text', '245 240 235'),
      line: channels('--c-night-line', '61 48 40'),
      raised: channels('--c-night-raised', '45 36 32'),
      muted: channels('--c-night-muted', '160 139 125'),
      copper: channels('--c-night-copper', '224 154 104'),
      night: channels('--c-night', '26 20 16'),
    }
    const mono = '500 11px ui-monospace, SFMono-Regular, Menlo, monospace'
    // next/font hashes the family name, so read the page's resolved stack.
    const sans = getComputedStyle(canvas).fontFamily || 'ui-sans-serif, system-ui, sans-serif'

    let w = 0
    let h = 0
    let rects = layout(1, 1, pages)
    let ghosts: Ghost[] = []
    let current: Catch | null = null
    let timeScale = 1
    let raf = 0
    let last = 0
    let inView = false
    let pageVisible = !document.hidden
    let pausedNow = false
    let pointer: { x: number; y: number } | null = null
    let lastInteraction = -Infinity
    let lastCatchEnd = performance.now()
    let spawnAcc = 0
    let count = 0

    const target = () => Math.round(Math.min(70, Math.max(18, (w * h) / 17000)) * density)
    const px = (p: [number, number]): [number, number] => [p[0] * w, p[1] * h]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rects = layout(w, h, pages)
    }

    // ── Simulation ───────────────────────────────────────────────────────────

    const leave = (g: Ghost) => {
      g.mode = 'leaving'
      g.vx = rand(-10, 30)
      g.vy = rand(-30, -14)
    }

    const stepGhost = (g: Ghost, dt: number) => {
      g.age += dt
      if (g.mode === 'walk') {
        g.alpha = Math.min(1, g.alpha + dt * 1.2)
        if (g.dwell > 0) {
          g.dwell -= dt
          if (g.dwell <= 0 && g.seg >= g.leaveAt) leave(g)
        } else if (g.seg < g.pts.length - 1) {
          const [ax, ay] = px(g.pts[g.seg])
          const [bx, by] = px(g.pts[g.seg + 1])
          const len = Math.max(1, Math.hypot(bx - ax, by - ay))
          g.u += (g.speed * dt) / len
          if (g.u >= 1) {
            g.seg++
            g.u = 0
            g.dwell = rand(0.5, 1.6)
          }
        } else if (g.leaveAt === Infinity) {
          g.mode = 'customer'
          g.name = pick(NAMES)
        }
        const i = Math.min(g.seg, g.pts.length - 2)
        const u = g.seg >= g.pts.length - 1 ? 1 : easeInOut(g.u)
        const [ax, ay] = px(g.pts[i])
        const [bx, by] = px(g.pts[i + 1])
        g.x = ax + (bx - ax) * u + Math.sin(g.age * 1.7 + g.wob) * 3
        g.y = ay + (by - ay) * u + Math.cos(g.age * 1.3 + g.wob) * 3
      } else if (g.mode === 'leaving') {
        g.x += g.vx * dt
        g.y += g.vy * dt
        g.vy -= 14 * dt
        g.alpha -= dt * 0.55
      } else if (g.mode === 'customer') {
        g.alpha -= dt * 0.18
      }
      g.trailClock += dt
      if (g.trailClock > 0.05) {
        g.trailClock = 0
        g.trail.push([g.x, g.y])
        if (g.trail.length > 14) g.trail.shift()
      }
    }

    const step = (realDt: number) => {
      const dt = realDt * timeScale
      spawnAcc += dt * (target() / 9)
      while (spawnAcc >= 1) {
        spawnAcc -= 1
        if (ghosts.length < target()) ghosts.push(makeGhost(rects, true))
      }
      for (const g of ghosts) if (g !== current?.ghost) stepGhost(g, dt)
      ghosts = ghosts.filter((g) => g === current?.ghost || ((g.mode === 'walk' || g.alpha > 0.01) && g.y > -40 && g.x < w + 40))
    }

    const catchGhost = (g: Ghost) => {
      if (current) return
      // Branches open to the right unless there is no room, so they stay clear of the headline.
      const dir: 1 | -1 = !pages ? (g.x < w / 2 ? -1 : 1) : g.x + Math.min(200, w * 0.28) + 190 < w ? 1 : -1
      const pool = [...ACTIONS].sort(() => Math.random() - 0.5).slice(0, 2)
      const options = [
        { label: pool[0], score: rand(0.71, 0.88) },
        { label: pool[1], score: rand(0.44, 0.66) },
        { label: 'Do nothing', score: rand(0.06, 0.18) },
      ].sort((a, b) => b.score - a.score)
      current = { ghost: g, t: 0, options, ms: Math.round(rand(28, 62)), dir }
      g.mode = 'caught'
      g.alpha = 1
      g.name = pick(NAMES)
      g.amount = Math.round(rand(48, 210) * 0.9 * 100) / 100
      count++
      setCaught(count)
      setAnnouncement(`Caught ${g.id}: ${options[0].label}, chosen in ${current.ms} milliseconds. Now ${g.name}, plus $${g.amount.toFixed(2)}.`)
    }

    const catchable = (g: Ghost) => g.mode === 'walk' && g.alpha > 0.6 && g.x > 20 && g.x < w - 20 && g.y > 40 && g.y < h - 40

    const autoCatch = () => {
      const candidates = ghosts.filter(catchable)
      if (!candidates.length) return
      // Prefer someone about to leave, on the open part of the floor (away from the headline).
      if (!pages) {
        // Ambient floors sit behind centred text: catch out at the sides.
        candidates.sort((a, b) => Math.abs(b.x - w / 2) - Math.abs(a.x - w / 2))
      } else {
        const sweet = w < 768 ? 0.3 : 0.58
        candidates.sort((a, b) => riskOf(b) - riskOf(a) + (3 * (Math.abs(a.x - w * sweet) - Math.abs(b.x - w * sweet))) / w)
      }
      catchGhost(candidates[0])
    }

    const updateCatch = (dt: number) => {
      if (!current) {
        timeScale = Math.min(1, timeScale + dt * 2)
        return
      }
      current.t += dt
      const t = current.t
      timeScale = t < 0.25 ? 1 - t / 0.25 : t < 2.6 ? 0 : Math.min(1, (t - 2.6) / 0.5)
      const g = current.ghost
      if (t > 2.6) {
        // Walks on to checkout as a known customer.
        const [cx, cy] = px([rects.cart.x + rects.cart.w * 0.5, rects.cart.y + rects.cart.h * 0.8])
        const k = Math.min(1, dt * 1.6)
        g.x += (cx - g.x) * k
        g.y += (cy - g.y) * k
        g.trailClock += dt
        if (g.trailClock > 0.05) {
          g.trailClock = 0
          g.trail.push([g.x, g.y])
          if (g.trail.length > 14) g.trail.shift()
        }
      }
      if (t > 5.2) {
        g.mode = 'customer'
        g.alpha = 1
        current = null
        lastCatchEnd = performance.now()
      }
    }

    // ── Drawing ──────────────────────────────────────────────────────────────

    const roundRect = (x: number, y: number, rw: number, rh: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(x, y, rw, rh, r)
    }

    const drawPages = (dim: number) => {
      if (!pages || w < 768) return
      const labels: Record<PageKind, string> = { collection: '/collections/trail-boots', product: '/products/ridgeline', cart: '/cart' }
      for (const kind of ['collection', 'product', 'cart'] as PageKind[]) {
        const r = rects[kind]
        const x = r.x * w
        const y = r.y * h
        const rw = r.w * w
        const rh = r.h * h
        ctx.globalAlpha = dim
        roundRect(x, y, rw, rh, 10)
        ctx.fillStyle = `rgba(${C.raised},0.35)`
        ctx.fill()
        ctx.strokeStyle = `rgba(${C.line},1)`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y + 18)
        ctx.lineTo(x + rw, y + 18)
        ctx.stroke()
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.arc(x + 10 + i * 8, y + 9, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${C.line},1)`
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${C.line},0.9)`
        const pad = rw * 0.08
        if (kind === 'collection') {
          const tw = (rw - pad * 3) / 2
          const th = Math.min(tw * 0.8, (rh - 30 - pad * 3) / 2)
          for (let i = 0; i < 4; i++) {
            roundRect(x + pad + (i % 2) * (tw + pad), y + 26 + pad * 0.5 + Math.floor(i / 2) * (th + pad), tw, th, 6)
            ctx.fill()
          }
        } else if (kind === 'product') {
          roundRect(x + pad, y + 28, rw * 0.44, rh - 40, 6)
          ctx.fill()
          const cx = x + pad * 2 + rw * 0.44
          const cw = rw - (cx - x) - pad
          for (const [dy, f] of [
            [0.12, 0.8],
            [0.2, 0.5],
            [0.3, 0.35],
          ]) {
            roundRect(cx, y + rh * dy + 18, cw * f, 6, 3)
            ctx.fill()
          }
          roundRect(cx, y + rh * 0.62, cw, Math.max(12, rh * 0.12), 6)
          ctx.fillStyle = `rgba(${C.muted},0.35)`
          ctx.fill()
        } else {
          for (let i = 0; i < 2; i++) {
            roundRect(x + pad, y + 30 + i * rh * 0.2, rw - pad * 2, rh * 0.14, 6)
            ctx.fill()
          }
          roundRect(x + pad, y + rh * 0.72, rw - pad * 2, Math.max(12, rh * 0.13), 6)
          ctx.fillStyle = `rgba(${C.muted},0.35)`
          ctx.fill()
        }
        ctx.font = mono
        ctx.fillStyle = `rgba(${C.muted},0.9)`
        ctx.fillText(labels[kind], x, y - 8)
        ctx.globalAlpha = 1
      }
    }

    const cursorPath = (x: number, y: number, s: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + 16 * s)
      ctx.lineTo(x + 4.4 * s, y + 12.2 * s)
      ctx.lineTo(x + 7.4 * s, y + 18.4 * s)
      ctx.lineTo(x + 10 * s, y + 17.2 * s)
      ctx.lineTo(x + 7.1 * s, y + 11.2 * s)
      ctx.lineTo(x + 12.4 * s, y + 11.2 * s)
      ctx.closePath()
    }

    const drawGhost = (g: Ghost, emphasis: number, frozenDim: number) => {
      const a = g.alpha * frozenDim
      if (a <= 0.01) return
      const solid = g.mode === 'customer' || (g.mode === 'caught' && current && current.t > 1.4)
      // Trail.
      for (let i = 1; i < g.trail.length; i++) {
        const t = i / g.trail.length
        ctx.strokeStyle = `rgba(${solid ? C.text : C.soft},${0.22 * t * a})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(g.trail[i - 1][0], g.trail[i - 1][1])
        ctx.lineTo(g.trail[i][0], g.trail[i][1])
        ctx.stroke()
      }
      // Glow + body.
      const glow = ctx.createRadialGradient(g.x + 4, g.y + 8, 0, g.x + 4, g.y + 8, 18)
      glow.addColorStop(0, `rgba(${solid ? C.text : C.soft},${(solid ? 0.22 : 0.1 + emphasis * 0.12) * a})`)
      glow.addColorStop(1, `rgba(${C.soft},0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(g.x + 4, g.y + 8, 18, 0, Math.PI * 2)
      ctx.fill()
      cursorPath(g.x, g.y, 0.9)
      ctx.fillStyle = solid ? `rgba(${C.text},${a})` : `rgba(${C.soft},${(0.38 + emphasis * 0.4) * a})`
      ctx.fill()
      if (solid) {
        ctx.strokeStyle = `rgba(${C.night},${a})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // Dissolving: a few motes rise off a leaving ghost.
      if (g.mode === 'leaving') {
        for (let i = 0; i < 4; i++) {
          const k = (g.age * 0.8 + i * 0.25) % 1
          ctx.fillStyle = `rgba(${C.soft},${0.35 * (1 - k) * a})`
          ctx.beginPath()
          ctx.arc(g.x + 5 + Math.sin(i * 2 + g.age * 3) * 8, g.y - k * 26, 1.3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (g.mode === 'customer' && g.name) {
        tag(g.x + 16, g.y + 26, g.name, a * 0.9, true)
      }
    }

    const tag = (x: number, y: number, text: string, alpha: number, strong = false) => {
      ctx.font = strong ? `600 12px ${sans}` : mono
      const tw = ctx.measureText(text).width
      const bx = Math.min(x, w - tw - 20)
      roundRect(bx - 7, y - 13, tw + 14, 20, 10)
      ctx.fillStyle = `rgba(${C.night},${0.85 * alpha})`
      ctx.fill()
      ctx.strokeStyle = `rgba(${strong ? C.text : C.line},${(strong ? 0.5 : 1) * alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = `rgba(${strong ? C.text : C.soft},${alpha})`
      ctx.fillText(text, bx, y + 1)
    }

    const LENS = 120
    const drawLens = () => {
      if (!pointer || !interactive || current) return
      ctx.setLineDash([3, 6])
      ctx.strokeStyle = `rgba(${C.text},0.25)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(pointer.x, pointer.y, LENS, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
      const near = ghosts
        .filter((g) => (g.mode === 'walk' || g.mode === 'leaving') && g.alpha > 0.3)
        .map((g) => ({ g, d: Math.hypot(g.x - pointer!.x, g.y - pointer!.y) }))
        .filter(({ d }) => d < LENS)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
      for (const { g } of near) {
        const text = g.mode === 'leaving' ? `${g.id} · left, no name` : `${g.id} · intent ${intentOf(g).toFixed(2)} · exit ${Math.round(riskOf(g) * 100)}%`
        ctx.strokeStyle = `rgba(${C.text},0.35)`
        ctx.beginPath()
        ctx.moveTo(g.x + 6, g.y + 4)
        ctx.lineTo(g.x + 20, g.y - 10)
        ctx.stroke()
        tag(g.x + 24, g.y - 12, text, 1)
      }
    }

    const drawCatch = () => {
      if (!current) return
      const { ghost: g, t, options, ms, dir } = current
      const ox = g.x + 6
      const oy = g.y + 6
      // Ring.
      const pulse = (t * 2) % 1
      ctx.strokeStyle = `rgba(${C.text},${0.5 * (1 - pulse)})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(ox, oy, 16 + pulse * 18, 0, Math.PI * 2)
      ctx.stroke()

      // Three futures (labelled only on the interactive floor).
      const grow = clamp01((t - 0.15) / 0.7)
      const decided = t > 0.95
      const fade = t > 2.6 ? clamp01(1 - (t - 2.6) / 0.6) : 1
      const span = interactive ? Math.min(200, w * 0.28) : 90
      options.forEach((option, i) => {
        const ex = ox + dir * span
        const ey = oy + (i - 1) * 62
        const chosen = i === 0
        const a = (decided ? (chosen ? 1 : 0.3) : 0.75) * fade
        ctx.strokeStyle = `rgba(${chosen && decided ? C.text : C.soft},${a})`
        ctx.lineWidth = chosen && decided ? 2 : 1.2
        ctx.beginPath()
        const n = 28
        for (let k = 0; k <= n * grow; k++) {
          const u = k / n
          // Cubic from origin to end, leaving horizontally.
          const c1x = ox + dir * span * 0.45
          const c2x = ex - dir * span * 0.45
          const x = (1 - u) ** 3 * ox + 3 * (1 - u) ** 2 * u * c1x + 3 * (1 - u) * u * u * c2x + u ** 3 * ex
          const y = (1 - u) ** 3 * oy + 3 * (1 - u) ** 2 * u * oy + 3 * (1 - u) * u * u * ey + u ** 3 * ey
          if (k === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        if (grow >= 1 && interactive) {
          const label = `${option.label}  ${option.score.toFixed(2)}`
          ctx.font = chosen && decided ? `600 13px ${sans}` : mono
          const tw = ctx.measureText(label).width
          const lx = dir === 1 ? ex + 8 : ex - 8 - tw
          ctx.fillStyle = `rgba(${chosen && decided ? C.text : C.soft},${a})`
          ctx.fillText(label, Math.max(6, Math.min(w - tw - 6, lx)), ey + 4)
        }
      })
      if (decided && fade > 0 && interactive) {
        ctx.font = mono
        ctx.fillStyle = `rgba(${C.muted},${fade})`
        ctx.fillText(`decided in ${ms} ms`, g.x + 10, g.y + 56)
      }

      // Name tag: anon id, then the name.
      const named = t > 1.4
      tag(g.x + 16, g.y + 30, named ? `${g.name} · ${g.name![0].toLowerCase()}•••@gmail.com` : g.id, 1, named)

      // Money.
      if (t > 1.6 && g.amount) {
        const k = clamp01((t - 1.6) / 2.2)
        ctx.font = `800 22px ${sans}`
        ctx.fillStyle = `rgba(${C.copper},${k < 0.75 ? 1 : 1 - (k - 0.75) / 0.25})`
        ctx.fillText(`+$${g.amount.toFixed(2)}`, g.x - 10, g.y - 18 - k * 40)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const frozen = current ? (current.t < 2.6 ? clamp01(current.t / 0.25) : clamp01(1 - (current.t - 2.6) / 0.5)) : 0
      drawPages(1 - frozen * 0.5)
      for (const g of ghosts) {
        if (g === current?.ghost) continue
        const emphasis = pointer && interactive && !current && Math.hypot(g.x - pointer.x, g.y - pointer.y) < LENS ? 1 : 0
        drawGhost(g, emphasis, 1 - frozen * 0.65)
      }
      if (current) drawGhost(current.ghost, 1, 1)
      drawLens()
      drawCatch()
    }

    // ── Loop ─────────────────────────────────────────────────────────────────

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      updateCatch(dt)
      step(dt)
      if (!current && autoCatchMs > 0 && now - lastInteraction > 5000 && now - lastCatchEnd > autoCatchMs) autoCatch()
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || reducedMotion || pausedNow || !pageVisible || !inView) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    // Warm start so the first paint already has a crowd.
    for (let i = 0; i < Math.round(target() * 0.6); i++) ghosts.push(makeGhost(rects, false))
    for (let i = 0; i < 300; i++) step(1 / 30)

    if (reducedMotion) {
      // One still frame: a few read ghosts and one caught, mid-decision.
      const candidates = ghosts.filter(catchable)
      if (candidates[0]) {
        catchGhost(candidates[0])
        current!.t = 1.8
        timeScale = 0
      }
      if (interactive && candidates[1]) pointer = { x: candidates[1].x, y: candidates[1].y }
      draw()
      pointer = null
      // The still frame is decoration: don't count or announce it.
      count = 0
      setCaught(0)
      setAnnouncement('')
    } else {
      draw()
    }

    api.current = {
      catchOne: () => {
        lastInteraction = performance.now()
        if (reducedMotion) return
        autoCatch()
        if (!raf) {
          // Run the sequence even if paused, so the button always does something.
          pausedNow = false
          setPaused(false)
          start()
        }
      },
      setPaused: (p: boolean) => {
        pausedNow = p
        if (p) stop()
        else start()
      },
    }

    const local = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMove = (e: PointerEvent) => {
      if (!interactive) return
      lastInteraction = performance.now()
      pointer = e.pointerType === 'touch' ? null : local(e)
    }
    const onLeave = () => {
      pointer = null
    }
    const onClick = (e: MouseEvent) => {
      if (!interactive || reducedMotion) return
      if ((e.target as Element).closest('a, button, input, label')) return
      lastInteraction = performance.now()
      const p = local(e)
      let best: Ghost | null = null
      let bestD = 70
      for (const g of ghosts) {
        if (!catchable(g)) continue
        const d = Math.hypot(g.x + 5 - p.x, g.y + 8 - p.y)
        if (d < bestD) {
          best = g
          bestD = d
        }
      }
      if (best) catchGhost(best)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (!raf) draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => {
      pageVisible = !document.hidden
      if (pageVisible) start()
      else stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    host.addEventListener('pointermove', onMove, { passive: true })
    host.addEventListener('pointerleave', onLeave, { passive: true })
    host.addEventListener('click', onClick)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('click', onClick)
      api.current = null
    }
  }, [density, pages, interactive, autoCatchMs])

  const togglePause = () => {
    const next = !paused
    setPaused(next)
    api.current?.setPaused(next)
  }

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className={cn('absolute inset-0 h-full w-full', interactive && 'cursor-crosshair', className)} />
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
      {controls && (
        <div className={cn('absolute z-20', controlsClassName)}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] text-night-soft lg:justify-end">
            {interactive && !reduced && (
              <button
                type="button"
                onClick={() => api.current?.catchOne()}
                className="inline-flex h-9 min-h-0 min-w-0 items-center gap-2 rounded-full bg-night-raised/80 px-4 font-semibold text-night-text ring-1 ring-night-line backdrop-blur transition-colors hover:bg-night-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                <MousePointerClick aria-hidden className="h-4 w-4" />
                {GHOSTS.hero.catch}
              </button>
            )}
            {interactive && !reduced && <span className="hidden sm:inline">{touch ? GHOSTS.hero.hintTouch : GHOSTS.hero.hint}</span>}
            {caught > 0 && (
              <span className="font-mono tabular-nums text-night-text">
                Named so far: {caught}
              </span>
            )}
            <span className="text-night-muted">{GHOSTS.hero.disclaimer}</span>
            {!reduced && (
              <button
                type="button"
                onClick={togglePause}
                aria-label={paused ? 'Play the ghost animation' : 'Pause the ghost animation'}
                className="flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-full bg-night/70 text-night-soft ring-1 ring-night-line backdrop-blur transition-colors hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
