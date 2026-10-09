import { cn } from '@/lib/utils'
import { TRUST } from '@/lib/landing/content'
import type { Tone } from './tone'

/** Backers and programs: Gateway Capital, AWS Startups, NVIDIA Inception. */
export default function TrustRow({ tone = 'light', className }: { tone?: Tone; className?: string }) {
  const dark = tone === 'dark'
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8', className)}>
      <p
        className={cn(
          'shrink-0 text-xs font-medium uppercase tracking-[0.18em]',
          dark ? 'text-night-muted' : 'text-ink-muted',
        )}
      >
        {TRUST.label}
      </p>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {TRUST.backers.map((backer) => {
          const img = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={backer.src}
              alt={backer.name}
              className={cn(
                'h-9 w-auto object-contain opacity-75 grayscale transition-opacity hover:opacity-100',
                dark && 'brightness-0 invert',
              )}
            />
          )
          return (
            <li key={backer.name}>
              {backer.href ? (
                <a
                  href={backer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-0 min-w-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                >
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
