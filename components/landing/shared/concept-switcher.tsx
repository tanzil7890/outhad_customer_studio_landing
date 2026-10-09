'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { VARIANTS, toneForPath } from '@/lib/landing/variants'

/** Review-only pill for flipping between homepage concepts. Delete at promotion. */
export default function ConceptSwitcher() {
  const pathname = usePathname()
  const dark = toneForPath(pathname) === 'dark'

  return (
    <nav
      aria-label="Homepage concepts"
      className={cn(
        'fixed bottom-5 left-20 z-40 flex items-center gap-1 rounded-full p-1 pl-4 text-sm shadow-lg ring-1 backdrop-blur-md',
        dark ? 'bg-night-raised/90 text-night-soft ring-night-line' : 'bg-white/90 text-ink-secondary ring-line',
      )}
    >
      <span className="mr-2 hidden font-medium sm:inline">Concept</span>
      {VARIANTS.map((variant) => {
        const active = variant.path === pathname
        return (
          <Link
            key={variant.id}
            href={variant.path}
            title={variant.label}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-9 min-h-0 min-w-9 items-center justify-center rounded-full px-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2',
              active
                ? dark
                  ? 'bg-night-text text-night'
                  : 'bg-ink text-night-text'
                : dark
                  ? 'hover:bg-night hover:text-night-text focus-visible:ring-night-text'
                  : 'hover:bg-surface-hover hover:text-ink focus-visible:ring-ink',
            )}
          >
            {variant.id}
            <span className="ml-1.5 hidden font-medium md:inline">{variant.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
