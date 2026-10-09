'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tone } from './tone'

/**
 * CSS marquee. Pauses on hover/focus and has an explicit pause button (WCAG 2.2.2).
 * Under reduced motion it becomes a static, horizontally scrollable row.
 */
export default function Marquee({
  children,
  label,
  duration = 40,
  tone = 'light',
  className,
}: {
  children: ReactNode
  label: string
  /** Seconds per loop. */
  duration?: number
  tone?: Tone
  className?: string
}) {
  const [paused, setPaused] = useState(false)
  const track = 'flex shrink-0 items-center'

  return (
    <div className={cn('group relative flex items-center gap-3', className)}>
      <div
        className="relative flex min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        role="region"
        aria-label={label}
      >
        <div
          className={cn(
            'flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
            paused && '[animation-play-state:paused]',
          )}
          style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
        >
          <div className={track}>{children}</div>
          <div className={cn(track, 'motion-reduce:hidden')} aria-hidden>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        className={cn(
          'inline-flex h-8 w-8 min-h-0 min-w-0 shrink-0 items-center justify-center rounded-full border transition-colors motion-reduce:hidden focus-visible:outline-none focus-visible:ring-2',
          tone === 'dark'
            ? 'border-night-line text-night-soft hover:bg-night-raised focus-visible:ring-night-text'
            : 'border-line text-ink-secondary hover:bg-surface-hover focus-visible:ring-ink',
        )}
      >
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
      </button>
    </div>
  )
}
