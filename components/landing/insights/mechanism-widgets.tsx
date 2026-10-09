'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Check, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MECHANISM } from '@/lib/landing/insights'

const stages = MECHANISM.stages
const TOTAL = stages.reduce((sum, s) => sum + s.ms, 0)
const starts = stages.map((_, i) => stages.slice(0, i).reduce((sum, s) => sum + s.ms, 0))
const stageAt = (ms: number) => Math.max(0, starts.findLastIndex((start) => ms >= start))

/**
 * The five stages laid end to end as one 100 ms budget, played back slowed
 * down so a person can watch it. Click a stage to read it.
 */
export function LatencyBudget() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const prefersReduced = useReducedMotion()
  const [ms, setMs] = useState(0)
  const msRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || prefersReduced) return
    started.current = true
    setPlaying(true)
  }, [inView, prefersReduced])

  useEffect(() => {
    if (!playing || !inView) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      // 100 ms of budget takes 6 s on screen: about 60× slower than real time.
      const next = Math.min(TOTAL, msRef.current + ((now - last) / 6000) * TOTAL)
      last = now
      msRef.current = next
      setMs(next)
      if (next >= TOTAL) {
        setPlaying(false)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, inView])

  const active = picked ?? (ms > 0 ? Math.min(stages.length - 1, stageAt(ms)) : 0)
  const stage = stages[active]

  const play = () => {
    setPicked(null)
    if (msRef.current >= TOTAL) {
      msRef.current = 0
      setMs(0)
      setPlaying(true)
    } else setPlaying((p) => !p)
  }

  return (
    <div ref={ref} className="rounded-[2rem] bg-night-raised/60 p-5 ring-1 ring-night-line sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-night-text sm:text-5xl">
          {Math.round(ms)}
          <span className="text-2xl text-night-soft sm:text-3xl"> / {TOTAL} ms</span>
        </p>
        <button
          type="button"
          onClick={play}
          aria-label={playing ? 'Pause' : ms >= TOTAL ? 'Replay the 100 ms' : 'Play the 100 ms'}
          className="flex h-12 w-12 min-h-0 min-w-0 items-center justify-center rounded-full bg-night-text text-night transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        >
          {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden /> : <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />}
        </button>
      </div>
      <p className="mt-1 text-[13px] text-night-muted">Latency budget per stage, slowed down about 60× so you can watch it.</p>

      {/* The budget bar */}
      <div role="tablist" aria-label="Stages of the loop" className="relative mt-8 flex h-20 gap-1 sm:h-24">
        {stages.map((s, i) => {
          const fill = Math.min(1, Math.max(0, (ms - starts[i]) / s.ms))
          const on = i === active
          return (
            <button
              key={s.n}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`stage-panel-${s.n}`}
              onClick={() => {
                setPicked(i)
                setPlaying(false)
              }}
              style={{ flexGrow: s.ms }}
              className={cn(
                'relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-xl text-left ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                on ? 'ring-night-text/70' : 'ring-night-line hover:ring-night-soft/60',
              )}
            >
              <span aria-hidden className="absolute inset-y-0 left-0 bg-night-text/15" style={{ width: `${fill * 100}%` }} />
              <span className="relative flex h-full flex-col justify-between p-2.5 sm:p-3">
                <span className="font-mono text-[11px] text-night-muted">{s.n}</span>
                <span className={cn('hidden text-[12.5px] font-semibold leading-tight sm:block', on ? 'text-night-text' : 'text-night-soft')}>{s.title}</span>
                <span className="hidden font-mono text-[11px] text-night-soft sm:block">{s.latency}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Stage detail (all panels are in the page; one is shown) */}
      {stages.map((s, i) => (
        <div key={s.n} id={`stage-panel-${s.n}`} role="tabpanel" hidden={i !== active} className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-night-text sm:text-3xl">
              <span className="mr-3 font-mono text-lg text-night-muted">{s.n}</span>
              {s.title}
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-night-soft sm:text-lg">{s.desc}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-night-muted">Latency budget</p>
            <p className="mt-1 font-mono text-2xl text-night-text">{s.latency}</p>
          </div>
        </div>
      ))}
      <p className="sr-only" aria-live="polite">
        Stage {stage.n}: {stage.title}, {stage.latency}.
      </p>
    </div>
  )
}

/** "A platform either delivers all seven or it is not in-session decisioning": tick what your stack does. */
export function CapabilityCheck() {
  const [have, setHave] = useState<boolean[]>(() => MECHANISM.capabilities.map(() => false))
  const count = have.filter(Boolean).length
  const missing = MECHANISM.capabilities.filter((_, i) => !have[i])
  const toggle = (i: number) => setHave((h) => h.map((v, k) => (k === i ? !v : v)))

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <ul className="grid gap-px overflow-hidden rounded-3xl bg-night-line sm:grid-cols-2">
        {MECHANISM.capabilities.map((c, i) => (
          <li key={c.title} className={cn('bg-night', i === MECHANISM.capabilities.length - 1 && 'sm:col-span-2')}>
            <button
              type="button"
              role="checkbox"
              aria-checked={have[i]}
              onClick={() => toggle(i)}
              className="flex h-full w-full min-h-0 min-w-0 gap-4 p-6 text-left transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-night-text"
            >
              <span
                className={cn(
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ring-1 transition-colors',
                  have[i] ? 'bg-night-text text-night ring-night-text' : 'ring-night-soft/50',
                )}
              >
                {have[i] && <Check aria-hidden className="h-4 w-4" strokeWidth={3} />}
              </span>
              <span>
                <span className="font-mono text-[12px] text-night-muted">0{i + 1}</span>
                <span className="mt-0.5 block text-[16px] font-semibold leading-snug text-night-text">{c.title}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-night-soft">{c.body}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-night-raised p-7 ring-1 ring-night-line">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Your stack today</p>
          <p className="mt-3 text-6xl font-semibold tabular-nums tracking-tight text-night-text" aria-live="polite">
            {count}
            <span className="text-3xl text-night-soft"> / 7</span>
          </p>
          <div aria-hidden className="mt-4 flex gap-1">
            {have.map((v, i) => (
              <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors', v ? 'bg-night-text' : 'bg-night-line')} />
            ))}
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-night-soft">
            {count === 7
              ? 'All seven. That is in-session decisioning.'
              : count === 0
                ? 'Tick what your current stack does. Anything short of all seven is a slice, not the loop.'
                : `${7 - count} missing, so it’s not in-session decisioning yet. Next gap: ${missing[0].title.toLowerCase()}.`}
          </p>
        </div>
      </div>
    </div>
  )
}
