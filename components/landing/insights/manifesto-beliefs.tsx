'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { MANIFESTO } from '@/lib/landing/insights'

/** The four beliefs, each taking the screen in turn, with a sticky index that follows along. */
export default function ManifestoBeliefs() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16">
      <div className="hidden lg:block">
        <ol className="sticky top-1/3 space-y-3" aria-hidden>
          {MANIFESTO.beliefs.map((b, i) => (
            <li key={b.title} className={cn('flex items-baseline gap-4 transition-colors duration-300', i === active ? 'text-night-text' : 'text-night-muted')}>
              <span className="font-mono text-sm">0{i + 1}</span>
              <span className={cn('text-xl font-semibold tracking-tight transition-transform duration-300 motion-reduce:transition-none', i === active && 'translate-x-1')}>{b.title}</span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        {MANIFESTO.beliefs.map((b, i) => (
          <article
            key={b.title}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="flex flex-col justify-center border-t border-night-line py-12 lg:min-h-[70vh] lg:py-0"
          >
            <p className="font-mono text-sm text-night-muted">0{i + 1}</p>
            <h3 className={cn('mt-3 text-4xl font-semibold tracking-tight transition-colors duration-500 sm:text-6xl', i === active ? 'text-night-text' : 'text-night-text lg:text-night-muted')}>
              {b.title}
            </h3>
            <p className={cn('mt-6 max-w-2xl text-xl leading-relaxed transition-colors duration-500 sm:text-2xl', i === active ? 'text-night-soft' : 'text-night-soft lg:text-night-muted')}>{b.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
