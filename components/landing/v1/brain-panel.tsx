'use client'

import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatClock } from '@/lib/landing/story'
import type { SessionTimeline } from '@/lib/landing/use-session-timeline'
import CountUp from '../shared/count-up'

const EASE = [0.22, 1, 0.36, 1] as const

/** Warm-black "what Convertive sees" panel, driven by the session timeline. */
export default function BrainPanel({ tl, compact = false }: { tl: SessionTimeline; compact?: boolean }) {
  const { timeline, index, visibleSignals, beat } = tl
  const withConvertive = timeline.mode === 'with'
  const beatIndex = (id: string) => timeline.beats.findIndex((b) => b.id === id)
  const decided = withConvertive && index >= beatIndex('offer')
  const identified = withConvertive && index >= beatIndex('capture')
  const finished = index === timeline.beats.length - 1
  const hesitating = index >= beatIndex('hesitate')

  const riskLabel = useTransform(tl.exitRisk, (v) => `${Math.round(v * 100)}%`)
  const intentLabel = useTransform(tl.intent, (v) => v.toFixed(2))
  const signals = visibleSignals.slice(compact ? -3 : -5)

  return (
    <div className="flex h-full flex-col gap-5 rounded-3xl bg-night p-5 text-night-text shadow-[0_30px_60px_-30px_rgba(26,20,16,0.7)] ring-1 ring-night-line sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {withConvertive && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-soft opacity-60 motion-reduce:hidden" />
            )}
            <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', withConvertive ? 'bg-success-soft' : 'bg-night-muted')} />
          </span>
          <span className="text-sm font-semibold">{withConvertive ? 'Convertive · live' : 'Your current stack'}</span>
        </div>
        <motion.span
          key={identified ? 'known' : 'anon'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-full px-2.5 py-1 font-mono text-[13px]',
            identified ? 'bg-success/30 text-success-soft' : 'bg-night-raised text-night-soft',
          )}
        >
          {identified ? 'sarah.k@gmail.com' : withConvertive ? 'anon_7f3d' : 'no profile'}
        </motion.span>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-night-raised p-4">
          <p className="text-[13px] text-night-soft">Exit risk</p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <svg viewBox="0 0 120 66" className="h-12 w-20" aria-hidden>
              <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgb(var(--c-night-line))" strokeWidth="10" strokeLinecap="round" />
              <motion.path
                d="M10 60 A50 50 0 0 1 110 60"
                fill="none"
                stroke="rgb(var(--c-warning-soft))"
                strokeWidth="10"
                strokeLinecap="round"
                style={{ pathLength: tl.exitRisk }}
              />
            </svg>
            <motion.span className="text-2xl font-bold tabular-nums">{riskLabel}</motion.span>
          </div>
        </div>
        <div className="rounded-2xl bg-night-raised p-4">
          <p className="text-[13px] text-night-soft">Purchase intent</p>
          <motion.p className="mt-1 text-2xl font-bold tabular-nums">{intentLabel}</motion.p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-night-line">
            <motion.div className="h-full origin-left rounded-full bg-night-text" style={{ scaleX: tl.intent }} />
          </div>
        </div>
      </div>

      {/* Signals */}
      <div>
        <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.14em] text-night-muted">Live signals</p>
        <ul className="space-y-1.5">
          <AnimatePresence initial={false}>
            {signals.map((signal) => (
              <motion.li
                key={signal.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: withConvertive ? 1 : 0.55, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-baseline gap-3 text-[14px]"
              >
                <span className="w-9 shrink-0 font-mono text-[13px] text-night-muted">{formatClock(signal.at)}</span>
                <span className="w-24 shrink-0 text-night-soft">{signal.label}</span>
                <span
                  className={cn(
                    'min-w-0 truncate font-medium',
                    signal.id === 'order' ? 'text-night-copper' : signal.level === 'high' ? 'text-night-text' : 'text-night-soft',
                  )}
                >
                  {signal.value}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {!withConvertive && hesitating && (
          <p className="mt-2 text-[13px] text-night-muted">Signals exist in the clickstream. Nothing is reading them.</p>
        )}
      </div>

      {/* Decision */}
      <div className="min-h-[7.5rem]">
        <AnimatePresence mode="wait">
          {decided && timeline.decision ? (
            <motion.div
              key="decision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-2xl bg-night-raised p-4"
            >
              <div className="mb-2 flex items-center justify-between text-[13px]">
                <span className="font-medium uppercase tracking-[0.14em] text-night-muted">Next best action</span>
                <span className="font-mono text-night-soft">{timeline.decision.latencyMs} ms</span>
              </div>
              <ul className="space-y-2">
                {timeline.decision.options.map((option, i) => (
                  <li key={option.action} className="text-[14px]">
                    <div className="flex items-center justify-between gap-3">
                      <span className={cn('flex items-center gap-1.5', option.chosen ? 'font-semibold text-night-text' : 'text-night-soft')}>
                        {option.chosen && <Check className="h-4 w-4 text-success-soft" aria-hidden />}
                        {option.action}
                      </span>
                      <span className="font-mono text-[13px] text-night-soft">{option.score.toFixed(2)}</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-night-line">
                      <motion.div
                        className={cn('h-full origin-left rounded-full', option.chosen ? 'bg-night-text' : 'bg-night-muted')}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: option.score }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : !withConvertive && hesitating ? (
            <motion.div
              key="no-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-night-line p-4 text-[14px] text-night-soft"
            >
              No trigger fired. The next chance to act is an email, and there is no address to send it to.
            </motion.div>
          ) : (
            <motion.p key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] text-night-muted">
              {withConvertive ? 'Watching the session. No action needed yet.' : 'Waiting for tonight’s batch sync.'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Engine note + outcome */}
      <div className="mt-auto border-t border-night-line pt-4">
        {finished ? (
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[13px] text-night-soft">Captured this session</p>
              {withConvertive ? (
                <CountUp
                  value={timeline.outcome.revenue}
                  format={(n) => `+$${n.toFixed(2)}`}
                  className="text-4xl font-extrabold tracking-tight text-night-copper"
                />
              ) : (
                <p className="text-4xl font-extrabold tracking-tight text-night-soft">$0</p>
              )}
            </div>
            <p className="max-w-[12rem] text-right text-[13px] leading-snug text-night-soft">{timeline.outcome.summary}</p>
          </div>
        ) : (
          <p className="text-[14px] leading-snug text-night-soft">
            <span className="font-semibold text-night-text">{withConvertive ? 'Convertive: ' : 'Your stack: '}</span>
            {beat.engine}
          </p>
        )}
      </div>
    </div>
  )
}
