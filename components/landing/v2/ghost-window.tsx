'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WINDOW } from '@/lib/landing/content'
import { STORY } from '@/lib/landing/story'

const row = (key: string) => WINDOW.rows.find((r) => r.key === key)!

function secondsToBatch(now: Date) {
  const next = new Date(now)
  next.setHours(2, 0, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000))
}

const hms = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
const stopwatch = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms / 1000) % 60)).padStart(2, '0')}.${Math.floor((ms % 1000) / 100)}`

/**
 * The bounce window, told in real time: the clock starts when the section
 * scrolls into view. A ghost fades out across 8–30 seconds; Convertive's
 * decision lands at 41 ms; the nightly batch is still hours away.
 */
export default function GhostWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const live = useInView(ref, { amount: 0.05 })
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [batch, setBatch] = useState<number | null>(null)

  useEffect(() => {
    if (inView && startedAt === null) setStartedAt(performance.now())
  }, [inView, startedAt])

  useEffect(() => {
    if (startedAt === null || !live) return
    let raf = 0
    let lastPaint = 0
    const tick = (t: number) => {
      // Smooth while the ghost fades, then once a second for the batch countdown.
      if (t - lastPaint > (t - startedAt > 32000 ? 1000 : 50)) {
        lastPaint = t
        setNow(t)
        setBatch(secondsToBatch(new Date()))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [startedAt, live])

  const elapsed = startedAt === null ? 0 : Math.max(0, now - startedAt)
  const seconds = elapsed / 1000
  // A slow fade, not movement, so it runs under reduced motion too (without the CSS transition).
  const fade = 1 - Math.min(1, Math.max(0, (seconds - 8) / 22))
  const gone = seconds >= 30
  const acted = startedAt !== null && elapsed >= STORY.timelines.with.decision!.latencyMs

  return (
    <div ref={ref} className="grid gap-px overflow-hidden rounded-3xl bg-night-line lg:grid-cols-3">
      {/* Convertive */}
      <div className="flex flex-col bg-night-raised p-7 sm:p-9">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-night-muted">Convertive</p>
        <p className="mt-6 font-mono text-5xl font-semibold tracking-tight text-night-text sm:text-6xl">{row('convertive').short}</p>
        <p className="mt-3 text-base leading-relaxed text-night-soft">{row('convertive').label}, while she is still deciding.</p>
        <p
          className={cn(
            'mt-auto flex items-center gap-2 pt-10 font-mono text-[14px] transition-opacity duration-300',
            acted ? 'text-success-soft opacity-100' : 'opacity-0',
          )}
        >
          <Check aria-hidden className="h-4 w-4" /> Acted at 0.041 s (illustrative)
        </p>
      </div>

      {/* The shopper */}
      <div className="relative flex flex-col overflow-hidden bg-night p-7 sm:p-9">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-night-muted">The shopper</p>
        <p className="mt-6 font-mono text-5xl font-semibold tabular-nums tracking-tight text-night-text sm:text-6xl" aria-live="off">
          {stopwatch(elapsed)}
        </p>
        <p className="mt-3 text-base leading-relaxed text-night-soft">
          {row('bounce').label}: <span className="text-night-text">{row('bounce').display}</span>.
        </p>
        <div aria-hidden className="mt-8 flex h-28 items-center justify-center">
          <svg viewBox="0 0 14 20" className="h-24 w-auto transition-opacity duration-300 motion-reduce:transition-none" style={{ opacity: fade }}>
            <path d="M0 0 L0 16 L4.4 12.2 L7.4 18.4 L10 17.2 L7.1 11.2 L12.4 11.2 Z" fill="rgb(var(--c-night-soft))" />
          </svg>
        </div>
        <p className={cn('mt-4 text-center font-mono text-[14px] text-night-muted transition-opacity duration-500', gone ? 'opacity-100' : 'opacity-0')}>
          Gone. No name, no email.
        </p>
      </div>

      {/* The batch stack */}
      <div className="flex flex-col bg-night-raised p-7 sm:p-9">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-night-muted">Your nightly batch</p>
        <p className="mt-6 whitespace-nowrap font-mono text-5xl font-semibold tabular-nums tracking-tight text-night-soft lg:text-[2.6rem] xl:text-5xl">
          {batch === null ? row('legacy').short : `in ${hms(batch)}`}
        </p>
        <p className="mt-3 text-base leading-relaxed text-night-soft">
          Until tonight’s 2:00 am sync, your stack doesn’t know this session happened. Then the abandoned-cart email has no address to go to.
        </p>
        <button
          type="button"
          onClick={() => setStartedAt(performance.now())}
          className="mt-auto inline-flex h-10 min-h-0 min-w-0 items-center gap-2 self-start rounded-full px-4 text-[14px] font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text lg:mt-auto"
        >
          <RotateCcw aria-hidden className="h-4 w-4" /> Start the clock again
        </button>
      </div>
    </div>
  )
}
