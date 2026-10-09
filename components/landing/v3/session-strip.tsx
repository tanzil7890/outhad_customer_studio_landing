'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { STORY, formatClock } from '@/lib/landing/story'

const timeline = STORY.timelines.with

/** Sarah's 47 seconds as one line of beats, ending in the order. Read left to right (top to bottom on mobile). */
export default function SessionStrip() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const last = timeline.beats.length - 1

  return (
    <div className="relative">
      {/* Progress line (desktop) */}
      <div aria-hidden className="absolute left-0 right-0 top-[0.4375rem] hidden h-px bg-line-strong md:block">
        <div
          className={cn('h-full origin-left bg-ink transition-transform duration-[2400ms] ease-out motion-reduce:transition-none', inView ? 'scale-x-100' : 'scale-x-0')}
        />
      </div>
      <ol ref={ref} className="relative grid gap-8 border-l border-line-strong pl-6 md:grid-cols-6 md:gap-5 md:border-l-0 md:pl-0">
        {timeline.beats.map((beat, i) => (
          <li
            key={beat.id}
            className={cn('relative transition-opacity duration-500 motion-reduce:transition-none', inView ? 'opacity-100' : 'opacity-0')}
            style={{ transitionDelay: `${i * 360}ms` }}
          >
            <span
              aria-hidden
              className={cn(
                'absolute -left-[1.85rem] top-0.5 h-3.5 w-3.5 rounded-full ring-4 ring-surface-warm md:static md:block',
                i === last ? 'bg-copper-400' : 'bg-ink',
              )}
            />
            <p className="font-mono text-sm tabular-nums text-ink-muted md:mt-4">{formatClock(beat.at)}</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug text-ink">{beat.title}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">{beat.engine}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6">
        <p className="text-base text-ink-secondary">{timeline.outcome.summary}</p>
        <p className="text-4xl font-extrabold tracking-tight text-copper-600 sm:text-5xl">{timeline.outcome.headline}</p>
      </div>
    </div>
  )
}
