'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { STORY, formatClock } from '@/lib/landing/story'
import { useSessionTimeline } from '@/lib/landing/use-session-timeline'
import CountUp from '../shared/count-up'

const withTimeline = STORY.timelines.with
const withoutTimeline = STORY.timelines.without
const closed = withoutTimeline.beats[withoutTimeline.beats.length - 1]

/** The 47 seconds as a ledger that fills in as you read down it. */
export default function StoryLedger() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const tl = useSessionTimeline({ timeline: withTimeline, driver: { type: 'scroll', progress: scrollYProgress } })
  const last = withTimeline.beats.length - 1

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
      <div ref={ref} className="relative">
        <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-ink/15">
          <motion.div className="h-full w-px origin-top bg-ink" style={{ scaleY: tl.cursor }} />
        </div>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">An illustrative 47-second session with Convertive</caption>
          <thead>
            <tr className="border-b border-ink/80 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-secondary">
              <th scope="col" className="w-28 py-3 pl-6 font-semibold">Time</th>
              <th scope="col" className="py-3 pr-6 font-semibold">The shopper</th>
              <th scope="col" className="hidden py-3 font-semibold md:table-cell">Convertive</th>
            </tr>
          </thead>
          <tbody>
            {withTimeline.beats.map((beat, i) => {
              const reached = i <= tl.index
              return (
                <tr
                  key={beat.id}
                  className={cn(
                    'border-b border-ink/15 align-top transition-opacity duration-500 motion-reduce:transition-none',
                    reached ? 'opacity-100' : 'opacity-30',
                  )}
                >
                  <th scope="row" className="py-6 pl-6 pr-4 font-display text-2xl font-normal tabular-nums text-ink">
                    {formatClock(beat.at)}
                  </th>
                  <td className="py-6 pr-6">
                    <p className="font-display text-2xl leading-snug text-ink">{beat.title}</p>
                    <p className="mt-2 text-base leading-relaxed text-ink-secondary">{beat.shopper}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary md:hidden">
                      <span className="font-semibold text-ink">Convertive: </span>
                      {beat.engine}
                    </p>
                  </td>
                  <td className="hidden py-6 text-base leading-relaxed text-ink-secondary md:table-cell">
                    {beat.engine}
                    {i === last && (
                      <span className="mt-4 block">
                        <CountUp
                          value={withTimeline.outcome.revenue}
                          format={(n) => `+$${n.toFixed(2)}`}
                          className="font-display text-5xl text-copper-400"
                        />
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-4 pl-6 text-[13px] text-ink-muted">
          Illustrative session. “{STORY.persona}” is a persona; scores and timings are simulated.
        </p>
      </div>

      <aside className="lg:pt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-secondary">In the margin</p>
        <p className="mt-4 font-display text-2xl italic leading-snug text-ink">
          Without Convertive, at {formatClock(closed.at)} she closes the tab.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">{withoutTimeline.outcome.summary}</p>
        <p className="mt-6 font-display text-6xl font-light text-ink-muted">$0</p>
      </aside>
    </div>
  )
}
