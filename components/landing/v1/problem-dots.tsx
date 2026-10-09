'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PROBLEM } from '@/lib/landing/content'
import SectionHeading from '../shared/section-heading'
import { container } from '../shared/layout'

const BOUGHT = new Set([23, 58, 81])

/** 100 visitors; 97 fade out as the section comes into view. */
export default function ProblemDots() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.5 })

  return (
    <section className="py-24 sm:py-32">
      <div className={cn(container, 'grid items-center gap-14 lg:grid-cols-2 lg:gap-20')}>
        <div>
          <SectionHeading eyebrow={PROBLEM.eyebrow} lines={PROBLEM.lines} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">{PROBLEM.body}</p>
        </div>
        <figure>
          <div
            ref={gridRef}
            aria-hidden
            className="mx-auto grid max-w-md grid-cols-10 gap-2.5 sm:gap-3"
          >
            {Array.from({ length: 100 }, (_, i) => {
              const bought = BOUGHT.has(i)
              return (
                <span
                  key={i}
                  className={cn(
                    'aspect-square rounded-full transition-[background-color,transform] duration-700 ease-out motion-reduce:transition-none',
                    bought ? 'bg-ink' : inView ? 'scale-75 bg-line' : 'bg-ink-secondary',
                  )}
                  style={{ transitionDelay: bought ? '0ms' : `${200 + ((i * 37) % 100) * 14}ms` }}
                />
              )
            })}
          </div>
          <figcaption className="mx-auto mt-8 flex max-w-md items-baseline justify-between gap-6 border-t border-line pt-5">
            <span className="text-4xl font-extrabold tracking-tight text-ink">{PROBLEM.stat.display}</span>
            <span className="text-right text-base text-ink-secondary">{PROBLEM.stat.label}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
