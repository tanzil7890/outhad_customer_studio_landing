'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatElapsed } from '@/lib/landing/self-read'
import { useMirror, useSession } from './session-provider'
import { LiveDot } from './ui'

/**
 * Floating status for the reader (desktop): live clock and the lens switch.
 * Also greets a visitor who chose "Leave anyway" and came back in this tab.
 */
export default function SessionPill() {
  const { reader, lens, setLens } = useMirror()
  const s = useSession()
  const reduced = useReducedMotion()
  const [spot, setSpot] = useState<{ id: string; label: string } | null>(null)

  useEffect(() => {
    if (reader) setSpot(reader.takeSavedSpot())
  }, [reader])

  if (!s) return null

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2">
      {spot && (
        <div className="flex max-w-xs items-start gap-3 rounded-2xl bg-surface-base p-4 text-[14px] shadow-lg ring-1 ring-line">
          <p className="text-ink-secondary">
            <span className="font-semibold text-ink">Welcome back.</span> Last time you stopped at “{spot.label}”.{' '}
            <a
              href={`#${spot.id}`}
              onClick={() => setSpot(null)}
              className="min-h-0 min-w-0 font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Pick up there
            </a>
          </p>
          <button
            type="button"
            onClick={() => setSpot(null)}
            aria-label="Dismiss"
            className="-m-1 flex h-8 w-8 min-h-0 min-w-0 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="hidden items-center gap-3 rounded-full bg-surface-base/95 py-1.5 pl-4 pr-1.5 text-[13px] shadow-lg ring-1 ring-line backdrop-blur lg:flex">
        <LiveDot frozen={s.frozen} />
        <span className="font-medium text-ink-secondary">{s.frozen ? 'Clock stopped' : 'Reading this session'}</span>
        <span className="font-mono tabular-nums text-ink">{formatElapsed(s.counters.elapsedMs)}</span>
        {reader?.finePointer && !reduced && (
          <button
            type="button"
            role="switch"
            aria-checked={lens}
            aria-label="Convertive lens"
            onClick={() => setLens(!lens)}
            className={cn(
              'flex h-8 min-h-0 min-w-0 items-center gap-2 rounded-full px-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
              lens ? 'bg-ink text-night-text' : 'bg-surface-sunken text-ink-secondary hover:text-ink',
            )}
          >
            Lens {lens ? 'on' : 'off'}
          </button>
        )}
      </div>
    </div>
  )
}
