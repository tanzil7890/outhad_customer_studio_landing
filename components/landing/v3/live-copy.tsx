'use client'

import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MIRROR } from '@/lib/landing/content'
import { formatElapsed, times } from '@/lib/landing/self-read'
import type { EventKind } from '@/lib/landing/session-reader'
import { useMirror, useSession } from './session-provider'
import { LiveDot, Token } from './ui'

export function HeroLede({ className }: { className?: string }) {
  const s = useSession()
  return (
    <p className={className}>
      {MIRROR.hero.ledeStart} <Token>{s ? formatElapsed(s.counters.elapsedMs) : '0:00'}</Token> {MIRROR.hero.ledeEnd}
    </p>
  )
}

export function LeaveButton({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const { openFreeze, reader } = useMirror()
  return (
    <button
      type="button"
      disabled={!reader}
      onClick={() => openFreeze('button')}
      className={cn(
        'group inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60',
        tone === 'light'
          ? 'text-ink ring-line-strong hover:bg-surface-hover focus-visible:ring-ink'
          : 'text-night-text ring-night-line hover:bg-night-raised focus-visible:ring-night-text',
        className,
      )}
    >
      {MIRROR.hero.leave}
      <LogOut aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none" />
    </button>
  )
}

/** "You arrived 0:52 ago from Google search, on a Mac · Chrome…" assembled from the live session. */
export function KnownSentence({ className }: { className?: string }) {
  const s = useSession()
  if (!s) {
    return (
      <p className={className}>
        Where you came from. What you’re using. How far you’ve read, where you paused, and what you almost clicked.
      </p>
    )
  }
  const c = s.counters
  const source = s.source.label.charAt(0).toLowerCase() + s.source.label.slice(1)
  return (
    <p className={className}>
      You arrived <Token>{formatElapsed(c.elapsedMs)}</Token> ago from <Token>{source}</Token>, on <Token>{s.device}</Token>.{' '}
      You’ve scrolled <Token>{Math.round(c.maxDepth * 100)}%</Token> of this page
      {c.pauses > 0 ? (
        <>
          , paused <Token>{times(c.pauses)}</Token>
        </>
      ) : null}
      {c.ctaHovers > 0 ? (
        <>
          {' '}
          and hovered <Token>Book a demo</Token> <Token>{times(c.ctaHovers)}</Token> without clicking
        </>
      ) : (
        <> and haven’t touched a button yet</>
      )}
      . Right now we’d file you under <Token>{s.read.segment}</Token>.
    </p>
  )
}

const KIND_SHAPE: Record<EventKind, 'dot' | 'ring' | 'bar'> = {
  arrive: 'ring',
  scroll: 'dot',
  pause: 'ring',
  cta: 'bar',
  click: 'bar',
  read: 'dot',
  tab: 'bar',
  back: 'bar',
  roi: 'bar',
  faq: 'dot',
  film: 'bar',
  exit: 'bar',
  up: 'dot',
}

/** Every logged event as a mark on one timeline, from arrival to now. */
export function TrailStrip({ className }: { className?: string }) {
  const s = useSession()
  const total = Math.max(10_000, s?.counters.elapsedMs ?? 0)
  const events = s?.log ?? []
  return (
    <div aria-hidden className={cn('relative', className)}>
      <div className="flex items-center justify-between font-mono text-[12px] text-ink-muted">
        <span>Your trail so far</span>
        <span className="tabular-nums">{s ? `${events.length} events · ${formatElapsed(s.counters.elapsedMs)}` : '—'}</span>
      </div>
      <div className="relative mt-3 h-14 rounded-2xl bg-surface-base ring-1 ring-line">
        <div className="absolute inset-x-4 top-1/2 h-px bg-line-strong" />
        {events.map((event) => {
          const left = `calc(1rem + (100% - 2rem) * ${Math.min(1, event.at / total)})`
          const shape = KIND_SHAPE[event.kind]
          return (
            <span
              key={event.id}
              title={event.text}
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-300',
                shape === 'dot' && 'h-2 w-2 rounded-full bg-ink-secondary',
                shape === 'ring' && 'h-3 w-3 rounded-full border-2 border-ink bg-surface-base',
                shape === 'bar' && 'h-6 w-[3px] rounded-full bg-ink',
              )}
              style={{ left }}
            />
          )
        })}
        <LiveDot frozen={s?.frozen} className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-1/2" />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[12px] text-ink-muted">
        <span>Arrived</span>
        <span>Now</span>
      </div>
    </div>
  )
}

export function FinalHeading({ className }: { className?: string }) {
  const s = useSession()
  return (
    <h2 className={className}>
      <span className="block">
        {s ? (
          <>
            You’ve been anonymous for <span className="font-mono tabular-nums tracking-tight">{formatElapsed(s.counters.elapsedMs)}</span>.
          </>
        ) : (
          MIRROR.final.fallback
        )}
      </span>
      <span className="block text-night-soft">{MIRROR.final.line2}</span>
    </h2>
  )
}
