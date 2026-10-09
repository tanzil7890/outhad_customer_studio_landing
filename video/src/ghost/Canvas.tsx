import { useLayoutEffect, useRef } from 'react'
import { clamp, ease, rand, tw } from '../anim'
import { H, W } from '../theme'
import { VO, T } from './timeline'
import { MAP, type Cam } from './world'

export const CURSOR_PATH = 'M4 2 L4 19 L8.5 14.8 L11.5 21.5 L14.5 20.2 L11.6 13.6 L18 13.4 Z'

/** A full-frame canvas redrawn synchronously for each rendered frame. */
function FrameCanvas({ draw, deps, opacity = 1 }: { draw: (ctx: CanvasRenderingContext2D) => void; deps: unknown[]; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)
    draw(ctx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return <canvas ref={ref} width={W} height={H} style={{ position: 'absolute', inset: 0, opacity }} />
}

// ── The crowd: every shopper you paid for, most of whom leave like ghosts ──

const N = 420
const TAGGED = new Set(Array.from({ length: N }, (_, i) => i).filter((i) => i % 23 === 7))
const GHOSTS = Array.from({ length: N }, (_, i) => ({
  spawn: T.crowd + Math.pow(rand(i, 2), 1.5) * 2.4,
  x0: rand(i, 3) * (W + 160),
  y0: 40 + rand(i, 4) * (H - 80),
  speed: 70 + rand(i, 5) * 150,
  phase: rand(i, 6) * Math.PI * 2,
  leave: T.ghostsFade + rand(i, 7) * 2.4,
  size: 1.05 + rand(i, 8) * 0.5,
}))

function ghostAt(g: (typeof GHOSTS)[number], t: number) {
  const age = t - g.spawn
  const x = ((g.x0 + g.speed * Math.max(0, age)) % (W + 160)) - 80
  const y = g.y0 + Math.sin(t * 0.9 + g.phase) * 16
  const e = clamp((t - g.leave) / 1.4)
  const rise = ease.in(e)
  return {
    x: x + rise * 70,
    y: y - rise * 420,
    alpha: tw(t, g.spawn, g.spawn + 0.4) * (1 - e) * (t < VO.ghosts.at ? 0.9 : tw(t, VO.ghosts.at, T.ghostsFade, 0.9, 0.5)),
    scale: g.size * (1 + rise * 0.6),
    leaving: e > 0,
  }
}

export function Crowd({ t }: { t: number }) {
  const shape = useRef<Path2D | null>(null)
  return (
    <FrameCanvas
      deps={[t]}
      draw={(ctx) => {
        shape.current ??= new Path2D(CURSOR_PATH)
        const cursor = shape.current
        const drawCursor = (x: number, y: number, s: number, a: number) => {
          if (a <= 0.01) return
          ctx.save()
          ctx.translate(x, y)
          ctx.scale(s, s)
          ctx.shadowColor = `rgba(245,240,235,${a * 0.5})`
          ctx.shadowBlur = 10
          ctx.fillStyle = `rgba(245,240,235,${a})`
          ctx.fill(cursor)
          ctx.shadowBlur = 0
          ctx.lineWidth = 1.3
          ctx.strokeStyle = `rgba(26,20,16,${a})`
          ctx.stroke(cursor)
          ctx.restore()
        }
        GHOSTS.forEach((g, i) => {
          if (t < g.spawn) return
          const p = ghostAt(g, t)
          if (p.leaving) {
            // Echoes trailing the rising ghost.
            for (let k = 3; k >= 1; k--) {
              const q = ghostAt(g, t - k * 0.06)
              drawCursor(q.x, q.y, q.scale, q.alpha * 0.18 * (4 - k))
            }
          }
          drawCursor(p.x, p.y, p.scale, p.alpha)
          if (TAGGED.has(i) && t > VO.ghosts.at + 0.2) {
            const a = p.alpha * tw(t, VO.ghosts.at + 0.2 + rand(i, 9) * 0.8, VO.ghosts.at + 0.6 + rand(i, 9) * 0.8)
            if (a > 0.02) {
              ctx.save()
              ctx.globalAlpha = a
              ctx.fillStyle = 'rgba(45,36,32,0.95)'
              ctx.beginPath()
              ctx.roundRect(p.x + 20, p.y + 26, 104, 30, 8)
              ctx.fill()
              ctx.fillStyle = '#C4A898'
              ctx.font = '600 17px "Manrope Variable"'
              ctx.fillText('unknown', p.x + 32, p.y + 47)
              ctx.restore()
            }
          }
        })
      }}
    />
  )
}

// ── The grid: thousands of sessions, each a tiny journey ───────────────────

const COLS = 7
const ROWS = 11
const SESSIONS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = (i % COLS) - (COLS - 1) / 2
  const row = Math.floor(i / COLS) - (ROWS - 1) / 2
  const dist = Math.hypot(col, row * 1.6)
  return {
    col,
    row,
    points: Array.from({ length: 6 }, (_, k) => [k / 5, 0.25 + rand(i * 7 + k, 21) * 0.5] as [number, number]),
    start: T.grid - 0.8 + rand(i, 22) * 1.2,
    dur: 1.4 + rand(i, 23) * 1.2,
    caught: rand(i, 24) < 0.38,
    glowAt: T.grid + 0.3 + dist * 0.16 + rand(i, 25) * 0.4,
  }
}).filter((s) => !(s.col === 0 && s.row === 0))

export function SessionGrid({ t, cam }: { t: number; cam: Cam }) {
  const tileW = MAP.w * cam.s
  const tileH = MAP.h * cam.s
  const opacity = clamp((0.3 - cam.s) / 0.18) * (1 - tw(t, T.end - 0.3, T.end + 0.4))
  if (opacity <= 0) return null
  return (
    <FrameCanvas
      deps={[t, cam.s]}
      opacity={opacity}
      draw={(ctx) => {
        const pitchX = tileW * 1.18
        const pitchY = tileH * 1.55
        SESSIONS.forEach((s) => {
          const ox = W / 2 + s.col * pitchX - tileW / 2
          const oy = H / 2 + s.row * pitchY - tileH / 2
          if (ox > W || oy > H || ox + tileW < 0 || oy + tileH < 0) return
          // Faint frame and journey line.
          ctx.strokeStyle = 'rgba(245,240,235,0.07)'
          ctx.lineWidth = 1
          ctx.strokeRect(ox, oy, tileW, tileH)
          ctx.strokeStyle = 'rgba(245,240,235,0.22)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          s.points.forEach(([px, py], k) => (k ? ctx.lineTo(ox + px * tileW, oy + py * tileH) : ctx.moveTo(ox + px * tileW, oy + py * tileH)))
          ctx.stroke()
          // The visitor dot travels the journey.
          const p = clamp((t - s.start) / s.dur)
          const seg = Math.min(4, Math.floor(p * 5))
          const u = p * 5 - seg
          const [x0, y0] = s.points[seg]
          const [x1, y1] = s.points[seg + 1]
          const dx = ox + (x0 + (x1 - x0) * u) * tileW
          const dy = oy + (y0 + (y1 - y0) * u) * tileH
          const r = Math.max(2.5, tileH * 0.07)
          const glow = s.caught ? tw(t, s.glowAt, s.glowAt + 0.35) : 0
          if (glow > 0) {
            ctx.fillStyle = `rgba(224,154,104,${0.18 * glow})`
            ctx.beginPath()
            ctx.arc(dx, dy, r * 5, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = `rgba(224,154,104,${glow})`
          } else {
            const fade = s.caught ? 1 : 1 - tw(t, s.start + s.dur * 0.8, s.start + s.dur * 0.8 + 0.6)
            ctx.fillStyle = `rgba(245,240,235,${0.75 * fade})`
          }
          ctx.beginPath()
          ctx.arc(dx, dy - (s.caught ? 0 : tw(t, s.start + s.dur * 0.8, s.start + s.dur * 0.8 + 0.6) * tileH * 0.4), r, 0, Math.PI * 2)
          ctx.fill()
        })
      }}
    />
  )
}
