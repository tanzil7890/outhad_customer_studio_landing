'use client'

import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MIRROR } from '@/lib/landing/content'
import { formatElapsed } from '@/lib/landing/self-read'
import { useSession } from './session-provider'
import { Brackets, LiveDot } from './ui'

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

/** The visitor's own session, as Convertive would see it. Updates a few times a second. */
export default function Dossier({ className }: { className?: string }) {
  const s = useSession()
  const frozen = s?.frozen ?? false
  const depth = s?.counters.depth ?? 0
  const risk = s?.read.exitRisk ?? 0
  const intent = s?.read.intent ?? 0
  const events = s ? [...s.log].reverse().slice(0, 5) : []

  const rows: [string, string][] = [
    ['Arrived from', s?.source.label ?? 'Reading…'],
    ['Device', s?.device ?? 'Reading…'],
    ['Local time', s ? timeFormat.format(new Date()) : 'Reading…'],
    ['Audience', s?.read.segment ?? 'Reading…'],
  ]

  return (
    <section
      aria-label="Your session, as Convertive sees it"
      className={cn(
        'relative rounded-[1.75rem] bg-surface-base p-5 shadow-[0_40px_100px_-50px_rgba(26,20,16,0.4)] ring-1 ring-line sm:p-6',
        className,
      )}
    >
      <Brackets className="-inset-2.5" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <LiveDot frozen={frozen} />
          <span className="text-sm font-semibold text-ink">{frozen ? 'Clock stopped' : 'Live session'}</span>
          <span className="rounded-full bg-surface-sunken px-2.5 py-1 font-mono text-[12px] text-ink-secondary">
            {s?.anonId ?? 'anon_····'}
          </span>
        </div>
        <span className="font-mono text-[13px] tabular-nums text-ink-secondary">{s ? formatElapsed(s.counters.elapsedMs) : '0:00'}</span>
      </div>

      {/* Facts */}
      <dl className="grid grid-cols-2 gap-x-5 gap-y-3 py-4">
        {rows.map(([term, value]) => (
          <div key={term} className="min-w-0">
            <dt className="text-[12px] text-ink-muted">{term}</dt>
            <dd className="truncate text-[14px] font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Gauges */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl bg-surface-warm p-3.5 ring-1 ring-line-subtle">
          <p className="text-[12px] text-ink-muted">Scroll depth</p>
          <p className="mt-0.5 text-xl font-bold tabular-nums text-ink">{Math.round(depth * 100)}%</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full origin-left rounded-full bg-ink-secondary transition-transform duration-300" style={{ transform: `scaleX(${depth})` }} />
          </div>
        </div>
        <div className="rounded-2xl bg-surface-warm p-3.5 ring-1 ring-line-subtle">
          <p className="text-[12px] text-ink-muted">Intent</p>
          <p className="mt-0.5 text-xl font-bold tabular-nums text-ink">{intent.toFixed(2)}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full origin-left rounded-full bg-ink transition-transform duration-300" style={{ transform: `scaleX(${intent})` }} />
          </div>
        </div>
        <div className="rounded-2xl bg-surface-warm p-3.5 ring-1 ring-line-subtle">
          <p className="text-[12px] text-ink-muted">Exit risk</p>
          <div className="flex items-end justify-between gap-1">
            <p className="mt-0.5 text-xl font-bold tabular-nums text-ink">{Math.round(risk * 100)}%</p>
            <svg viewBox="0 0 60 34" className="mb-1 h-6 w-10" aria-hidden>
              <path d="M5 30 A25 25 0 0 1 55 30" fill="none" stroke="rgb(var(--c-surface-sunken))" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M5 30 A25 25 0 0 1 55 30"
                fill="none"
                stroke="rgb(var(--c-warning))"
                strokeWidth="6"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                className="transition-[stroke-dashoffset] duration-300"
                style={{ strokeDashoffset: 1 - risk }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Event stream */}
      <div className="mt-4">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Event stream</p>
        <ol className="min-h-[8.75rem] space-y-1.5" aria-live="off">
          {events.map((event, i) => (
            <li
              key={event.id}
              className={cn(
                'flex items-baseline gap-3 font-mono text-[12.5px] leading-snug',
                i === 0 ? 'animate-fade-up text-ink motion-reduce:animate-none' : 'text-ink-secondary',
              )}
            >
              <span className="w-9 shrink-0 tabular-nums text-ink-muted">{formatElapsed(event.at)}</span>
              <span className="min-w-0 truncate">{event.text}</span>
            </li>
          ))}
          {!s && <li className="font-mono text-[12.5px] text-ink-muted">Waiting for your first move…</li>}
        </ol>
      </div>

      <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-[12.5px] text-ink-secondary">
        <Lock aria-hidden className="h-3.5 w-3.5 shrink-0" />
        {MIRROR.hero.privacy}
      </p>
    </section>
  )
}
