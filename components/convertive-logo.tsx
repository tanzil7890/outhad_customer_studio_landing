import Link from 'next/link'
import { cn } from '@/lib/utils'
import LogoMark from './logo-mark'

/**
 * Mark + wordmark, linking home. `tagline` keeps the classic two-line lockup
 * used on the main site; the homepage concepts use the wordmark alone.
 */
export default function ConvertiveLogo({
  tone = 'light',
  tagline = true,
  className,
  wordmarkClassName,
}: {
  tone?: 'light' | 'dark'
  tagline?: boolean
  className?: string
  wordmarkClassName?: string
}) {
  const dark = tone === 'dark'
  return (
    <Link
      href="/"
      aria-label="Convertive home"
      className={cn(
        'inline-flex min-h-0 min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current',
        dark ? 'text-night-text' : 'text-ink',
        className,
      )}
    >
      <LogoMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      {tagline ? (
        <span className="flex flex-col">
          <span className={cn('text-sm font-bold leading-tight tracking-wide sm:text-base', wordmarkClassName)}>Convertive</span>
          <span className={cn('text-[9px] uppercase leading-tight tracking-wider', dark ? 'text-night-soft' : 'text-ink-muted')}>
            Customer Activation Platform
          </span>
        </span>
      ) : (
        <span className={cn('text-[1.15rem] font-bold leading-none tracking-[-0.02em]', wordmarkClassName)}>Convertive</span>
      )}
    </Link>
  )
}
