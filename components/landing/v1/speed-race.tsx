'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { WINDOW } from '@/lib/landing/content'
import SectionHeading from '../shared/section-heading'
import { container } from '../shared/layout'

// Log scale, so 100 ms, ~20 s and hours can share one axis.
const FLOOR = 0.05
const CEIL = WINDOW.rows.reduce((max, row) => Math.max(max, row.seconds), 0)
const scale = (seconds: number) => Math.log10(seconds / FLOOR) / Math.log10(CEIL / FLOOR)
const bounce = WINDOW.rows.find((row) => row.key === 'bounce')!

const ORDER = ['convertive', 'bounce', 'legacy'] as const

export default function SpeedRace() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const rows = ORDER.map((key) => WINDOW.rows.find((row) => row.key === key)!)

  return (
    <section className="bg-surface-warm py-24 sm:py-32">
      <div className={container}>
        <SectionHeading eyebrow={WINDOW.eyebrow} lines={WINDOW.lines} lede={WINDOW.lede} />

        <div ref={ref} className="relative mt-16">
          {/* "Shopper gone" marker at the end of the bounce window */}
          <div
            aria-hidden
            className="absolute bottom-0 top-0 hidden border-l border-dashed border-ink-muted md:block"
            style={{ left: `calc(14rem + (100% - 14rem - 10rem) * ${scale(bounce.seconds)})` }}
          >
            <span className="absolute -top-7 left-2 whitespace-nowrap text-[13px] font-medium text-ink-secondary">
              Shopper gone
            </span>
          </div>

          <ul className="space-y-8">
            {rows.map((row, i) => {
              const isConvertive = row.key === 'convertive'
              return (
                <li key={row.key} className="grid gap-3 md:grid-cols-[14rem_1fr_10rem] md:items-center md:gap-0">
                  <p className={cn('text-base md:pr-6', isConvertive ? 'font-semibold text-ink' : 'text-ink-secondary')}>
                    {row.label}
                  </p>
                  <div className="h-4 overflow-hidden rounded-full bg-surface-sunken">
                    <motion.div
                      className={cn('h-full origin-left rounded-full', isConvertive ? 'bg-ink' : row.key === 'legacy' ? 'bg-ink-muted' : 'bg-line-strong')}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: Math.max(0.02, scale(row.seconds)) } : { scaleX: 0 }}
                      transition={{ duration: isConvertive ? 0.35 : 1.2 + i * 0.9, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                  <p className={cn('whitespace-nowrap text-2xl font-bold tabular-nums md:text-right', isConvertive ? 'text-ink' : 'text-ink-secondary')}>
                    {row.short}
                  </p>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-[13px] text-ink-muted">Log scale. Bounce-window and batch-latency figures are industry ranges.</p>
        </div>

        <blockquote className="mt-20 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          “{WINDOW.quote}”
        </blockquote>
      </div>
    </section>
  )
}
