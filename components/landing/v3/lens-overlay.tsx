'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMirror } from './session-provider'

const TRAIL_MS = 1400
const PAUSE_FADE_MS = 5000

function channels(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  return value.split(/\s+/).join(',')
}

/**
 * "Convertive vision" for mouse users: a crosshair with a live readout, a
 * fading cursor trail, rings where the visitor paused, and a scroll rail on
 * the right edge marking sections read. Purely decorative (aria-hidden), and
 * off under reduced motion, on touch, or when the visitor switches it off.
 */
export default function LensOverlay() {
  const { reader, lens, freeze } = useMirror()
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const active = !!reader && reader.finePointer && lens && !reduced && !freeze

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!active || !reader || !canvas || !ctx) return

    const light = { fg: channels('--c-ink', '26 20 16'), bg: channels('--c-surface-canvas', '250 250 248'), live: channels('--c-success', '26 92 64') }
    const dark = { fg: channels('--c-night-text', '245 240 235'), bg: channels('--c-night', '26 20 16'), live: channels('--c-success-soft', '168 223 200') }
    // Dark regions (final CTA, footer) get a light-on-dark lens.
    const toneAt = (x: number, y: number) =>
      document.elementFromPoint(x, y)?.closest('footer, [data-lens-tone="dark"]') ? dark : light
    const pauseTone = new WeakMap<object, typeof light>()
    let pointerTone = light
    let probed = { x: -1, y: -1, sy: -1 }
    const trail: { x: number; y: number; t: number }[] = []
    let w = 0
    let h = 0
    let raf = 0
    let timer = 0
    let wokeAt = performance.now()
    let sections: { y: number; id: string }[] = []

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const doc = document.documentElement.scrollHeight
      sections = Array.from(document.querySelectorAll<HTMLElement>('[data-read-id]')).map((el) => ({
        id: el.dataset.readId!,
        y: (el.getBoundingClientRect().top + window.scrollY) / doc,
      }))
    }

    const label = (text: string, x: number, y: number, alpha: number, tone = light) => {
      ctx.font = '500 11px ui-monospace, SFMono-Regular, Menlo, monospace'
      const width = ctx.measureText(text).width
      ctx.fillStyle = `rgba(${tone.bg},${0.85 * alpha})`
      ctx.fillRect(x - 4, y - 11, width + 8, 16)
      ctx.fillStyle = `rgba(${tone.fg},${0.8 * alpha})`
      ctx.fillText(text, x, y)
    }
    const toneFor = (pause: object, x: number, y: number) => {
      let tone = pauseTone.get(pause)
      if (!tone && x >= 0 && y >= 0 && x <= w && y <= h) {
        tone = toneAt(x, y)
        pauseTone.set(pause, tone)
      }
      return tone ?? light
    }

    const draw = () => {
      raf = 0
      timer = 0
      const now = performance.now()
      const sx = window.scrollX
      const sy = window.scrollY
      const p = reader.pointer
      ctx.clearRect(0, 0, w, h)
      if (p.x !== probed.x || p.y !== probed.y || sy !== probed.sy) {
        probed = { x: p.x, y: p.y, sy }
        if (p.inside && p.x >= 0) pointerTone = toneAt(p.x, p.y)
      }
      const ink = pointerTone.fg

      // Trail, in document space so it stays on the content it crossed.
      if (p.inside && p.x >= 0) {
        const last = trail[trail.length - 1]
        if (!last || last.x !== p.x + sx || last.y !== p.y + sy) trail.push({ x: p.x + sx, y: p.y + sy, t: now })
      }
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift()
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      for (let i = 1; i < trail.length; i++) {
        const a = 1 - (now - trail[i].t) / TRAIL_MS
        ctx.strokeStyle = `rgba(${ink},${0.28 * a})`
        ctx.beginPath()
        ctx.moveTo(trail[i - 1].x - sx, trail[i - 1].y - sy)
        ctx.lineTo(trail[i].x - sx, trail[i].y - sy)
        ctx.stroke()
      }

      // Pauses: an open one grows; finished ones hold their duration, then fade.
      let fading = false
      for (const pause of reader.pauses) {
        if (!pause.end) continue
        const age = now - pause.end
        if (age > PAUSE_FADE_MS) continue
        fading = true
        const a = 1 - age / PAUSE_FADE_MS
        const x = pause.x - sx
        const y = pause.y - sy
        const r = 26 + Math.min(14, (pause.end - pause.start) / 250)
        const tone = toneFor(pause, x, y)
        ctx.strokeStyle = `rgba(${tone.fg},${0.4 * a})`
        ctx.setLineDash([3, 4])
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
        label(`paused ${((pause.end - pause.start) / 1000).toFixed(1)} s`, x + r + 8, y + 4, a, tone)
      }
      const open = reader.pause
      if (open && reader.finePointer) {
        const d = now - open.start
        const x = open.x - sx
        const y = open.y - sy
        const r = 26 + Math.min(14, d / 250)
        const tone = toneFor(open, x, y)
        ctx.strokeStyle = `rgba(${tone.live},0.8)`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.min(1, d / 3000) * Math.PI * 2)
        ctx.stroke()
        label(`dwell ${(d / 1000).toFixed(1)} s`, x + r + 8, y + 4, 1, tone)
      }

      // Crosshair + readout.
      if (p.inside && p.x >= 0) {
        ctx.strokeStyle = `rgba(${ink},0.5)`
        ctx.lineWidth = 1
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          ctx.beginPath()
          ctx.moveTo(p.x + dx * 12, p.y + dy * 12)
          ctx.lineTo(p.x + dx * 22, p.y + dy * 22)
          ctx.stroke()
        }
        if (!open) {
          const still = now - p.lastMove > 250
          label(`x ${Math.round(p.x)}  y ${Math.round(p.y + sy)}`, p.x + 18, p.y + 34, 1, pointerTone)
          label(still ? 'still' : `${p.speed.toFixed(2)} px/ms`, p.x + 18, p.y + 50, 1, pointerTone)
        }
      }

      // Scroll rail.
      const snapshot = reader.getSnapshot()
      const top = h * 0.2
      const bottom = h * 0.8
      const railX = w - 14
      const doc = document.documentElement.scrollHeight
      const rail = toneAt(railX, h / 2)
      const green = rail.live
      ctx.strokeStyle = `rgba(${rail.fg},0.18)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(railX, top)
      ctx.lineTo(railX, bottom)
      ctx.stroke()
      for (const section of sections) {
        const y = top + section.y * (bottom - top)
        const read = snapshot.readAt[section.id] !== undefined
        ctx.strokeStyle = read ? `rgba(${green},0.9)` : `rgba(${rail.fg},0.3)`
        ctx.lineWidth = read ? 2 : 1
        ctx.beginPath()
        ctx.moveTo(railX - (read ? 6 : 4), y)
        ctx.lineTo(railX, y)
        ctx.stroke()
      }
      for (const pause of reader.pauses) {
        ctx.fillStyle = `rgba(${rail.fg},0.45)`
        ctx.beginPath()
        ctx.arc(railX, top + (pause.y / doc) * (bottom - top), 2, 0, Math.PI * 2)
        ctx.fill()
      }
      const viewTop = top + (sy / doc) * (bottom - top)
      const viewH = Math.max(6, (h / doc) * (bottom - top))
      ctx.fillStyle = `rgba(${rail.fg},0.55)`
      ctx.fillRect(railX - 1.5, viewTop, 3, viewH)

      // Full speed while things move; a slow tick while a dwell ring counts up; then idle.
      const moving = now - wokeAt < 1500 || trail.length > 1 || fading
      if (moving) raf = requestAnimationFrame(draw)
      else if (open) timer = window.setTimeout(draw, 100)
    }

    const wake = () => {
      wokeAt = performance.now()
      if (timer) {
        window.clearTimeout(timer)
        timer = 0
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const tick = window.setInterval(() => {
      if (!raf && !timer && reader.pause) wake()
    }, 400)

    resize()
    wake()
    const onResize = () => {
      resize()
      wake()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', wake, { passive: true })
    window.addEventListener('scroll', wake, { passive: true })
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      window.clearInterval(tick)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('scroll', wake)
      ctx.clearRect(0, 0, w, h)
    }
  }, [active, reader])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[35] h-full w-full" />
}
