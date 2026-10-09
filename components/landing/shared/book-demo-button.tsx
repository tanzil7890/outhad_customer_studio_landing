'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BOOK_DEMO } from '@/lib/landing/content'
import { isCalReady, loadCal, openCal, pushDataLayer } from '@/lib/landing/cal'
import { variantForPath } from '@/lib/landing/variants'

type Variant = 'primary' | 'outline' | 'onDark' | 'onDarkOutline' | 'editorial' | 'link'

const variants: Record<Variant, string> = {
  primary:
    'rounded-full bg-brand-primary text-night-text hover:bg-brand-hover focus-visible:ring-ink focus-visible:ring-offset-surface-canvas',
  outline:
    'rounded-full border border-ink/80 text-ink hover:bg-surface-hover focus-visible:ring-ink focus-visible:ring-offset-surface-canvas',
  onDark:
    'rounded-full bg-night-text text-night hover:bg-white focus-visible:ring-night-text focus-visible:ring-offset-night',
  onDarkOutline:
    'rounded-full border border-night-text/40 text-night-text hover:bg-night-raised focus-visible:ring-night-text focus-visible:ring-offset-night',
  editorial:
    'rounded-none bg-ink text-night-text hover:bg-brand-hover tracking-wide focus-visible:ring-ink focus-visible:ring-offset-surface-canvas',
  link: 'text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:ring-ink',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
  xl: 'h-14 px-7 text-base',
}

interface Props {
  /** Where on the page this CTA lives; sent to analytics. */
  location: string
  variant?: Variant
  size?: keyof typeof sizes
  className?: string
  children?: ReactNode
  showArrow?: boolean
}

/**
 * Primary CTA. Renders a real link to /demo; when the Cal.com embed is already
 * warm (preloaded on hover/focus/touch) a plain click opens the booking modal
 * in place instead. Modifier-clicks and blocked embeds fall through to /demo.
 */
export default function BookDemoButton({
  location,
  variant = 'primary',
  size = 'lg',
  className,
  children,
  showArrow = true,
}: Props) {
  const pathname = usePathname()

  const warm = () => {
    loadCal().catch(() => {})
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    pushDataLayer({
      event: 'book_demo_click',
      landing_variant: variantForPath(pathname)?.id ?? (pathname === '/' ? 'home' : pathname),
      cta_location: location,
    })
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    if (!isCalReady()) return
    event.preventDefault()
    openCal().catch(() => {
      window.location.href = BOOK_DEMO.href
    })
  }

  return (
    <Link
      href={BOOK_DEMO.href}
      onClick={handleClick}
      onPointerEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      className={cn(
        'group inline-flex min-h-0 min-w-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variant !== 'link' && sizes[size],
        variants[variant],
        className,
      )}
    >
      {children ?? BOOK_DEMO.label}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </Link>
  )
}
