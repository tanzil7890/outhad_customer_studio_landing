'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { METHOD } from '@/lib/landing/content'
import { STORY, formatClock } from '@/lib/landing/story'
import SectionHeading from '../shared/section-heading'
import { container } from '../shared/layout'

const EASE = [0.22, 1, 0.36, 1] as const
const CYCLE_MS = 5200
const withTimeline = STORY.timelines.with

function DetectWidget() {
  const signals = withTimeline.signals.filter((s) => s.at <= 32)
  return (
    <ul className="space-y-2.5">
      {signals.map((signal, i) => (
        <motion.li
          key={signal.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.28, duration: 0.4, ease: EASE }}
          className="flex items-baseline gap-4 text-[15px]"
        >
          <span className="w-10 font-mono text-[13px] text-night-muted">{formatClock(signal.at)}</span>
          <span className="w-24 shrink-0 text-night-soft sm:w-28">{signal.label}</span>
          <span className={cn('font-medium', signal.level === 'high' ? 'text-night-text' : 'text-night-soft')}>{signal.value}</span>
        </motion.li>
      ))}
    </ul>
  )
}

function DecideWidget() {
  const decision = withTimeline.decision!
  return (
    <div>
      <div className="mb-5 flex items-center justify-between text-[14px]">
        <span className="text-night-soft">Eligible actions, ranked by expected lift</span>
        <span className="font-mono text-night-text">{decision.latencyMs} ms</span>
      </div>
      <ul className="space-y-4">
        {decision.options.map((option, i) => (
          <li key={option.action}>
            <div className="flex items-center justify-between text-[15px]">
              <span className={cn('flex items-center gap-2', option.chosen ? 'font-semibold text-night-text' : 'text-night-soft')}>
                {option.chosen && <Check className="h-4 w-4 text-success-soft" aria-hidden />}
                {option.action}
              </span>
              <span className="font-mono text-[14px] text-night-soft">{option.score.toFixed(2)}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-night-line">
              <motion.div
                className={cn('h-full origin-left rounded-full', option.chosen ? 'bg-night-text' : 'bg-night-muted')}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: option.score }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: EASE }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DeliverWidget() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-sm rounded-2xl bg-white p-6 text-ink"
    >
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Before you go</p>
      <p className="mt-2 text-xl font-bold leading-snug">{STORY.offer.copy}</p>
      <div className="mt-4 flex h-11 items-center rounded-lg px-3 text-[15px] text-ink-muted ring-1 ring-line-strong">
        Email address
      </div>
      <div className="mt-2 flex h-11 items-center justify-center rounded-lg bg-ink text-[15px] font-semibold text-white">
        Unlock 10% off
      </div>
      <p className="mt-3 text-center text-[13px] text-ink-muted">Shown once. Capped and suppressed per session.</p>
    </motion.div>
  )
}

function CaptureWidget() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[15px]">
        <span className="rounded-full bg-night-raised px-3 py-1.5 text-night-soft">anon_7f3d</span>
        <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <ArrowRight className="h-4 w-4 text-night-muted" aria-hidden />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="rounded-full bg-success/30 px-3 py-1.5 text-success-soft"
        >
          sarah.k@gmail.com
        </motion.span>
      </div>
      <ul className="grid grid-cols-2 gap-3 text-[14px]">
        {['6 page views stitched', `$${STORY.product.price} cart attached`, 'Source: Instagram ad', 'Synced to your ESP'].map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.12 }}
            className="rounded-xl bg-night-raised px-4 py-3 text-night-soft"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

const WIDGETS = { detect: DetectWidget, decide: DecideWidget, deliver: DeliverWidget, capture: CaptureWidget }

/** Detect → Decide → Deliver → Capture. Auto-advances while in view until the visitor picks a step. */
export default function MethodSteps() {
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (pinned || !inView || reducedMotion) return
    const id = setInterval(() => setActive((i) => (i + 1) % METHOD.steps.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [pinned, inView, reducedMotion])

  const step = METHOD.steps[active]
  const Widget = WIDGETS[step.key]

  return (
    <section className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading eyebrow={METHOD.eyebrow} lines={METHOD.lines} lede={METHOD.lede} />
        <div ref={ref} className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div role="tablist" aria-label="How it works" aria-orientation="vertical" className="space-y-2">
            {METHOD.steps.map((s, i) => {
              const selected = i === active
              return (
                <button
                  key={s.key}
                  id={`method-tab-${s.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="method-panel"
                  onClick={() => {
                    setActive(i)
                    setPinned(true)
                  }}
                  className={cn(
                    'relative w-full min-h-0 min-w-0 overflow-hidden rounded-2xl p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                    selected ? 'bg-surface-base ring-1 ring-line' : 'hover:bg-surface-hover',
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-sm tabular-nums text-ink-muted">0{i + 1}</span>
                    <span>
                      <span className={cn('block text-xl font-semibold', selected ? 'text-ink' : 'text-ink-secondary')}>{s.title}</span>
                      {selected && <span className="mt-2 block text-base leading-relaxed text-ink-secondary">{s.body}</span>}
                    </span>
                  </span>
                  {selected && !pinned && inView && !reducedMotion && (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-ink"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <div
            id="method-panel"
            role="tabpanel"
            aria-labelledby={`method-tab-${step.key}`}
            className="flex min-h-[24rem] flex-col rounded-3xl bg-night p-6 text-night-text sm:p-10"
          >
            <p className="mb-8 text-[13px] font-medium uppercase tracking-[0.14em] text-night-muted">
              {step.title} · illustrative
            </p>
            <div className="flex flex-1 flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Widget />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
