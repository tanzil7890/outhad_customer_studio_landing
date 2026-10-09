'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GHOSTS } from '@/lib/landing/content'

/**
 * A wall of live sessions, one tiny ghost per tile. With Convertive off,
 * almost every ghost drifts away; switched on, some are caught at their exit
 * moment and given a name. Illustrative only: the rates are not measurements.
 */

type Fate = 'leave' | 'buy' | 'catch'
interface Tile {
  t: number
  life: number
  fate: Fate
  x: number
  y: number
  vx: number
  vy: number
  state: 'browse' | 'gone' | 'named' | 'bought'
  stateAt: number
  gap: number
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function newSession(): Tile {
  const roll = Math.random()
  return {
    t: 0,
    life: rand(3.5, 8),
    fate: roll < 0.03 ? 'buy' : roll < 0.17 ? 'catch' : 'leave',
    x: rand(0.15, 0.35),
    y: rand(0.3, 0.7),
    vx: rand(0.05, 0.12),
    vy: rand(-0.06, 0.06),
    state: 'browse',
    stateAt: 0,
    gap: rand(0.6, 2.2),
  }
}

function channels(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  return value.split(/\s+/).join(',')
}

export default function SessionGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onRef = useRef(false)
  const touched = useRef(false)
  const [on, setOn] = useState(false)
  const [counts, setCounts] = useState({ gone: 0, named: 0 })

  const choose = (value: boolean) => {
    touched.current = true
    onRef.current = value
    setOn(value)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const C = {
      soft: channels('--c-night-soft', '196 168 152'),
      text: channels('--c-night-text', '245 240 235'),
      line: channels('--c-night-line', '61 48 40'),
      raised: channels('--c-night-raised', '45 36 32'),
      copper: channels('--c-night-copper', '224 154 104'),
    }

    let w = 0
    let h = 0
    let cols = 12
    let rows = 6
    let tiles: Tile[] = []
    let raf = 0
    let last = 0
    let inView = false
    let visibleFor = 0
    let pageVisible = !document.hidden
    let gone = 0
    let named = 0
    let countClock = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = rect.width
      cols = w >= 1024 ? 14 : w >= 640 ? 10 : 6
      rows = w >= 640 ? 6 : 9
      const gapPx = 8
      const tw = (w - gapPx * (cols - 1)) / cols
      h = rows * tw * 0.68 + gapPx * (rows - 1)
      canvas.style.height = `${h}px`
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = cols * rows
      while (tiles.length < n) {
        const tile = newSession()
        tile.t = rand(0, tile.life)
        tiles.push(tile)
      }
      tiles = tiles.slice(0, n)
    }

    const step = (dt: number) => {
      for (let i = 0; i < tiles.length; i++) {
        const s = tiles[i]
        s.t += dt
        if (s.state === 'browse') {
          s.x += s.vx * dt * 0.5
          s.y += s.vy * dt + Math.sin(s.t * 2 + i) * 0.002
          s.y = Math.min(0.78, Math.max(0.22, s.y))
          if (s.t >= s.life) {
            const caught = s.fate === 'catch' && onRef.current
            s.state = s.fate === 'buy' ? 'bought' : caught ? 'named' : 'gone'
            s.stateAt = s.t
            if (s.state === 'gone') gone++
            if (s.state === 'named') named++
          }
        } else if (s.t - s.stateAt > (s.state === 'gone' ? 1.6 : 2.8) + s.gap) {
          tiles[i] = newSession()
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const gapPx = 8
      const tw = (w - gapPx * (cols - 1)) / cols
      const th = tw * 0.68
      tiles.forEach((s, i) => {
        const x0 = (i % cols) * (tw + gapPx)
        const y0 = Math.floor(i / cols) * (th + gapPx)
        const since = s.t - s.stateAt
        const lit = s.state === 'named' || s.state === 'bought'
        ctx.beginPath()
        ctx.roundRect(x0, y0, tw, th, 6)
        ctx.fillStyle = `rgba(${C.raised},${lit ? 0.9 : 0.45})`
        ctx.fill()
        ctx.strokeStyle = lit ? `rgba(${C.text},${Math.max(0.25, 0.7 - since * 0.2)})` : `rgba(${C.line},1)`
        ctx.lineWidth = 1
        ctx.stroke()
        // Page chrome line.
        ctx.strokeStyle = `rgba(${C.line},0.9)`
        ctx.beginPath()
        ctx.moveTo(x0 + 4, y0 + 7)
        ctx.lineTo(x0 + tw - 4, y0 + 7)
        ctx.stroke()

        let gx = x0 + s.x * tw
        let gy = y0 + s.y * th
        let alpha = Math.min(1, s.t * 2)
        if (s.state === 'gone') {
          gy -= since * 10
          gx += since * 3
          alpha = Math.max(0, 1 - since / 1.4)
        }
        const solid = lit
        if (s.state === 'named' && since < 0.6) {
          ctx.strokeStyle = `rgba(${C.text},${0.8 * (1 - since / 0.6)})`
          ctx.beginPath()
          ctx.arc(gx + 2, gy + 3, 4 + since * 18, 0, Math.PI * 2)
          ctx.stroke()
        }
        const sc = Math.max(0.45, tw / 120)
        ctx.beginPath()
        ctx.moveTo(gx, gy)
        ctx.lineTo(gx, gy + 12 * sc)
        ctx.lineTo(gx + 3.3 * sc, gy + 9.2 * sc)
        ctx.lineTo(gx + 5.6 * sc, gy + 13.8 * sc)
        ctx.lineTo(gx + 7.5 * sc, gy + 12.9 * sc)
        ctx.lineTo(gx + 5.3 * sc, gy + 8.4 * sc)
        ctx.lineTo(gx + 9.3 * sc, gy + 8.4 * sc)
        ctx.closePath()
        ctx.fillStyle = solid ? `rgba(${C.text},1)` : `rgba(${C.soft},${0.5 * alpha})`
        ctx.fill()
        if (lit) {
          // A name bar, and a copper mark for the sale.
          ctx.fillStyle = `rgba(${C.text},0.8)`
          ctx.beginPath()
          ctx.roundRect(gx + 12 * sc, gy + 2, Math.min(tw * 0.35, 26), 4, 2)
          ctx.fill()
          ctx.fillStyle = `rgba(${C.copper},1)`
          ctx.beginPath()
          ctx.arc(x0 + tw - 9, y0 + th - 9, 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      visibleFor += dt
      if (!touched.current && !onRef.current && visibleFor > 4) {
        onRef.current = true
        setOn(true)
      }
      step(dt)
      draw()
      countClock += dt
      if (countClock > 0.5) {
        countClock = 0
        setCounts({ gone, named })
      }
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || reduced || !inView || !pageVisible) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    if (reduced) {
      onRef.current = true
      setOn(true)
      for (let i = 0; i < 160; i++) step(1 / 15)
    }
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas.parentElement!)
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) start()
        else stop()
      },
      { threshold: 0.2 },
    )
    io.observe(canvas)
    const onVisibility = () => {
      pageVisible = !document.hidden
      if (pageVisible) start()
      else stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const options = [
    { value: false, label: GHOSTS.grid.off },
    { value: true, label: GHOSTS.grid.on },
  ]

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-label="Show the sessions" className="inline-flex self-start rounded-full bg-night-raised p-1 ring-1 ring-night-line">
          {options.map((option) => {
            const active = option.value === on
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => choose(option.value)}
                className={cn(
                  'relative h-10 min-h-0 min-w-0 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  active ? 'text-night' : 'text-night-soft hover:text-night-text',
                )}
              >
                {active && (
                  <motion.span layoutId="grid-pill" className="absolute inset-0 rounded-full bg-night-text" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{option.label}</span>
              </button>
            )
          })}
        </div>
        <p className="flex gap-6 font-mono text-[13px] tabular-nums text-night-soft" aria-live="off">
          <span>Left as ghosts: {counts.gone}</span>
          <span className="text-night-text">Given a name: {counts.named}</span>
        </p>
      </div>
      <canvas ref={canvasRef} aria-hidden className="block w-full" />
      <p className="mt-4 text-[13px] text-night-muted">{GHOSTS.grid.note}</p>
    </div>
  )
}
