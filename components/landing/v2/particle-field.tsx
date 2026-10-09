'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  caught: boolean
  decideX: number
  /** 0 = browsing, 1 = leaving (or being caught), 2 = caught and resting */
  phase: 0 | 1 | 2
  alpha: number
  tx: number
  ty: number
  t: number
}

/** Reads an RGB-channel CSS variable ("200 121 65") as "200,121,65". */
function readChannels(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  return value.split(/\s+/).join(',')
}

/**
 * Visitors stream in from the left; most drift away and fade, a few are
 * caught in-session and pulled into a copper cluster. Purely decorative.
 * Pauses offscreen and in background tabs; draws one still frame under
 * reduced motion.
 */
export default function ParticleField({
  className,
  density = 1,
  caughtRate = 0.05,
  sink = { x: 0.82, y: 0.6 },
  controlsClassName,
}: {
  className?: string
  density?: number
  caughtRate?: number
  /** Where caught visitors gather, as fractions of width/height. */
  sink?: { x: number; y: number }
  controlsClassName?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useRef<{ start: () => void; stop: () => void } | null>(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(reduced)
    const soft = readChannels('--c-night-soft', '196 168 152')
    const copper = readChannels('--c-night-copper', '224 154 104')

    let w = 0
    let h = 0
    let particles: Particle[] = []
    let raf = 0
    let last = 0
    let spawnAcc = 0
    let inView = false
    let pageVisible = !document.hidden

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const maxParticles = () => Math.round(Math.min(350, Math.max(140, (w * h) / 4200)) * density)
    const spawnRate = () => (w < 640 ? 10 : 22) * density

    const spawn = () => {
      particles.push({
        x: -8,
        y: h * (0.1 + Math.random() * 0.82),
        // Speed scales with width so visitors reach the decision point in a few seconds on any screen.
        vx: w * (0.06 + Math.random() * 0.05),
        vy: (Math.random() - 0.5) * 10,
        r: 1.1 + Math.random() * 1.4,
        caught: Math.random() < caughtRate,
        decideX: w * (0.36 + Math.random() * 0.24),
        phase: 0,
        alpha: 0,
        tx: w * sink.x + (Math.random() - 0.5) * w * 0.09,
        ty: h * sink.y + (Math.random() - 0.5) * h * 0.18,
        t: 0,
      })
    }

    const step = (dt: number) => {
      spawnAcc += dt * spawnRate()
      while (spawnAcc >= 1) {
        spawnAcc -= 1
        if (particles.length < maxParticles()) spawn()
      }
      for (const p of particles) {
        p.t += dt
        if (p.phase === 0) {
          p.alpha = Math.min(0.85, p.alpha + dt * 1.5)
          p.x += p.vx * dt
          p.y += p.vy * dt
          if (p.x >= p.decideX) {
            p.phase = 1
            if (p.caught) p.r += 0.9
          }
        } else if (!p.caught) {
          // Leaves without a trace: drifts off and fades.
          p.x += p.vx * dt * 0.7
          p.vy += (p.y < h / 2 ? -1 : 1) * 26 * dt
          p.y += p.vy * dt
          p.alpha -= dt * 0.55
        } else if (p.phase === 1) {
          // Caught in-session: eased toward the cluster.
          const k = Math.min(1, dt * 1.7)
          p.x += (p.tx - p.x) * k
          p.y += (p.ty - p.y) * k
          if (Math.hypot(p.tx - p.x, p.ty - p.y) < 2) {
            p.phase = 2
            p.t = 0
          }
        } else {
          p.x += Math.cos(p.t * 1.3 + p.tx) * 0.12
          p.y += Math.sin(p.t * 1.1 + p.ty) * 0.12
          if (p.t > 7) p.alpha -= dt * 0.35
        }
      }
      particles = particles.filter((p) => (p.phase === 0 || p.alpha > 0.01) && p.x < w + 20 && p.y > -30 && p.y < h + 30)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (p.caught && p.phase > 0) {
          ctx.fillStyle = `rgba(${copper},${p.alpha * 0.16})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(${copper},${p.alpha})`
        } else {
          ctx.fillStyle = `rgba(${soft},${p.alpha * 0.7})`
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || reduced || pausedRef.current || !pageVisible || !inView) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    controls.current = { start, stop }

    resize()
    // Warm start so the first paint already shows a stream (and a still frame for reduced motion).
    for (let i = 0; i < 420; i++) step(1 / 30)
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      draw()
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

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      controls.current = null
    }
  }, [density, caughtRate, sink.x, sink.y])

  const toggle = () => {
    const next = !paused
    pausedRef.current = next
    setPaused(next)
    if (next) controls.current?.stop()
    else controls.current?.start()
  }

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className={cn('absolute inset-0 h-full w-full', className)} />
      {!reducedMotion && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play background animation' : 'Pause background animation'}
          className={cn(
            'absolute z-10 flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-full border border-night-line bg-night/70 text-night-soft backdrop-blur transition-colors hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
            controlsClassName ?? 'right-6 top-28',
          )}
        >
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
        </button>
      )}
    </>
  )
}
