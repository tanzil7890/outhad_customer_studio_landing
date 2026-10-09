'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VIDEO } from '@/lib/landing/content'
import type { Tone } from './tone'

/**
 * Poster + play button. The 13 MB video is only requested after the visitor
 * asks for it, and then plays with native controls (pause, seek, fullscreen).
 */
export default function VideoFacade({ tone = 'light', className }: { tone?: Tone; className?: string }) {
  const [active, setActive] = useState(false)
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden bg-white',
        tone === 'editorial' ? 'rounded-none ring-1 ring-ink/80' : 'rounded-3xl ring-1',
        tone !== 'editorial' && (dark ? 'ring-night-line' : 'ring-line'),
        className,
      )}
    >
      {active ? (
        <video className="h-full w-full" poster={VIDEO.poster} controls autoPlay playsInline preload="none">
          {VIDEO.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full min-h-0 min-w-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ink/40"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VIDEO.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
          <span className="absolute inset-0 bg-night/0 transition-colors duration-300 group-hover:bg-night/10" />
          <span className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-night py-2 pl-2 pr-5 text-night-text shadow-lg transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none sm:bottom-7 sm:left-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night-text text-night">
              <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />
            </span>
            <span className="text-sm font-semibold">
              <span className="sr-only">Play </span>
              {VIDEO.title} <span className="font-normal text-night-soft">· {VIDEO.duration}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
