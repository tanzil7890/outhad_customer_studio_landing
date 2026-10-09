import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ConvertiveLogo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <Link
      href="/"
      className="inline-flex min-h-0 min-w-0 items-center gap-2 bg-transparent sm:gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dark ? '/logo-white.png' : '/logo-black.png'}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className={cn('text-sm sm:text-base font-bold tracking-wide leading-tight', dark ? 'text-night-text' : 'text-ink')}>
          Convertive
        </span>
        <span className={cn('text-[9px] tracking-wider uppercase leading-tight', dark ? 'text-night-soft' : 'text-ink-muted')}>
          Customer Activation Platform
        </span>
      </div>
    </Link>
  )
}
