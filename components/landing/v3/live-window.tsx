'use client'

import { cn } from '@/lib/utils'
import { WINDOW } from '@/lib/landing/content'
import { formatElapsed } from '@/lib/landing/self-read'
import { useSession } from './session-provider'

// Log scale from 50 ms to two days, so 100 ms, seconds and "tomorrow" share one axis.
const FLOOR = 0.05
const CEIL = 2 * 24 * 60 * 60
const scale = (seconds: number) => Math.min(1, Math.max(0, Math.log10(Math.max(FLOOR, seconds) / FLOOR) / Math.log10(CEIL / FLOOR)))
const TICKS: [number, string][] = [
  [0.1, '100 ms'],
  [1, '1 s'],
  [10, '10 s'],
  [60, '1 min'],
  [600, '10 min'],
  [3600, '1 h'],
  [36000, '10 h'],
  [86400, '1 day'],
]

const row = (key: string) => WINDOW.rows.find((r) => r.key === key)!

/** Seconds until the next 2:00 am in the visitor's time zone (an illustrative nightly batch). */
function secondsToBatch(now: Date) {
  const next = new Date(now)
  next.setHours(2, 0, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return (next.getTime() - now.getTime()) / 1000
}

function hoursMinutes(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h} h ${m} min` : `${m} min`
}

const track = 'relative h-3 rounded-full bg-surface-sunken'
// Rounded so server and client serialise identical inline styles.
const at = (v: number) => `${(v * 100).toFixed(3)}%`

export default function LiveWindow() {
  const s = useSession()
  const elapsed = (s?.counters.elapsedMs ?? 0) / 1000
  const toBatch = s ? secondsToBatch(new Date()) : null
  const bounce = row('bounce')
  const convertive = row('convertive')

  const rows = [
    {
      key: 'convertive',
      label: convertive.label,
      value: convertive.short,
      strong: true,
      bar: <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `max(0.75rem, ${at(scale(convertive.seconds))})` }} />,
    },
    {
      key: 'bounce',
      label: bounce.label,
      value: bounce.short,
      bar: (
        <div
          className="absolute inset-y-0 rounded-full bg-line-strong"
          style={{ left: at(scale(8)), width: at(scale(30) - scale(8)) }}
        />
      ),
    },
    {
      key: 'you',
      label: 'You, on this page',
      value: s ? `${formatElapsed(s.counters.elapsedMs)} and counting` : '—',
      strong: true,
      bar: (
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-ink-secondary transition-[width] duration-300 ease-linear"
          style={{ width: at(scale(Math.max(elapsed, 0.1))) }}
        >
          <span aria-hidden className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ink ring-4 ring-surface-warm" />
        </div>
      ),
    },
    {
      key: 'batch',
      label: 'Tonight’s batch sync sees your visit (2:00 am)',
      value: toBatch === null ? row('legacy').short : `in ${hoursMinutes(toBatch)}`,
      bar: (
        <div
          className="absolute inset-y-0 left-0 rounded-full border border-dashed border-ink-muted bg-transparent"
          style={{ width: at(scale(elapsed + (toBatch ?? row('legacy').seconds))) }}
        />
      ),
    },
    {
      key: 'email',
      label: 'The abandoned-cart email reaches you',
      value: 'Never',
      bar: (
        <>
          <div className="absolute inset-y-[5px] left-0 right-6 border-t border-dashed border-ink-muted/60" />
          <span aria-hidden className="absolute -top-1.5 right-0 font-mono text-[15px] font-semibold text-ink-muted">✕</span>
        </>
      ),
    },
  ]

  return (
    <div>
      <div className="relative">
        {/* Gridlines at each tick */}
        <div aria-hidden className="pointer-events-none absolute bottom-9 top-0 hidden md:left-[16rem] md:right-[11rem] md:block">
          {TICKS.map(([seconds]) => (
            <span key={seconds} className="absolute inset-y-0 border-l border-dotted border-line-strong" style={{ left: at(scale(seconds)) }} />
          ))}
        </div>

        <dl className="relative space-y-7">
          {rows.map((r) => (
            <div key={r.key} className="grid gap-2.5 md:grid-cols-[16rem_1fr_11rem] md:items-center md:gap-0">
              <dt className={cn('text-[15px] md:pr-6', r.strong ? 'font-semibold text-ink' : 'text-ink-secondary')}>{r.label}</dt>
              <div aria-hidden className={track}>
                {r.bar}
              </div>
              <dd
                className={cn(
                  'font-mono text-lg tabular-nums md:pl-6 md:text-right',
                  r.strong ? 'font-semibold text-ink' : 'text-ink-secondary',
                  r.key === 'email' && 'line-through decoration-1',
                )}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>

        <div aria-hidden className="relative mt-4 hidden h-5 md:ml-[16rem] md:mr-[11rem] md:block">
          {TICKS.map(([seconds, label]) => (
            <span key={seconds} className="absolute -translate-x-1/2 font-mono text-[11px] text-ink-muted" style={{ left: at(scale(seconds)) }}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-[13px] text-ink-muted">
        Log scale. Bounce-window and batch-latency figures are industry ranges; the 2:00 am sync is illustrative.
      </p>
    </div>
  )
}
