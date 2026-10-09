'use client'

import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatElapsed } from '@/lib/landing/self-read'
import { useSession } from './session-provider'

/** Pulsing "live" dot; grey and still while the clock is stopped. */
export function LiveDot({ frozen = false, className }: { frozen?: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn('relative flex h-2.5 w-2.5 shrink-0', className)}>
      {!frozen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/50 motion-reduce:hidden" />}
      <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', frozen ? 'bg-ink-muted' : 'bg-success')} />
    </span>
  )
}

/** Instrument-style corner marks around a frame. */
export function Brackets({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'night' }) {
  const line = tone === 'ink' ? 'border-ink/35' : 'border-night-text/35'
  const corner = 'absolute h-3.5 w-3.5'
  return (
    <span aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <span className={cn(corner, line, 'left-0 top-0 border-l border-t')} />
      <span className={cn(corner, line, 'right-0 top-0 border-r border-t')} />
      <span className={cn(corner, line, 'bottom-0 left-0 border-b border-l')} />
      <span className={cn(corner, line, 'bottom-0 right-0 border-b border-r')} />
    </span>
  )
}

/** A live value set inline in a sentence. */
export function Token({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'whitespace-nowrap rounded-lg bg-surface-base px-2 py-0.5 font-mono text-[0.82em] font-medium tracking-normal text-ink ring-1 ring-line [box-decoration-break:clone]',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Shows that Convertive is reading (or has read) the section with this id. */
export function ReadTag({ id }: { id: string }) {
  const s = useSession()
  if (!s) return null
  const readAt = s.readAt[id]
  const chip = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium normal-case tracking-normal'
  if (readAt !== undefined) {
    return (
      <span className={cn(chip, 'bg-success-bg text-success')}>
        <Check aria-hidden className="h-3 w-3" /> Read at {formatElapsed(readAt)}
      </span>
    )
  }
  if (s.inView.includes(id)) {
    return (
      <span className={cn(chip, 'bg-surface-sunken text-ink-secondary')}>
        <LiveDot className="h-1.5 w-1.5 [&>span]:h-1.5 [&>span]:w-1.5" /> Reading
      </span>
    )
  }
  return null
}

export const mono = 'font-mono tracking-normal'
export const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted'
