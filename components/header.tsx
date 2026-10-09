'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INSIGHTS_NAV, PLATFORM_NAV, PRIMARY_LINKS } from '@/lib/site-nav'
import { toneForPath } from '@/lib/landing/variants'
import ConvertiveLogo from './convertive-logo'
import BookDemoButton from './landing/shared/book-demo-button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'

type MenuKey = 'products' | 'insights'

export default function Header() {
  const pathname = usePathname()
  const dark = toneForPath(pathname) === 'dark'
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [openMenu])

  const openOnHover = useCallback((key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(key)
  }, [])
  const closeOnLeave = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }, [])

  const linkText = dark ? 'text-night-soft hover:text-night-text' : 'text-ink-secondary hover:text-ink'
  const focusRing = dark ? 'focus-visible:ring-night-text' : 'focus-visible:ring-ink'
  const panel = cn(
    'rounded-2xl p-5 shadow-[0_24px_60px_-20px_rgba(26,20,16,0.35)] ring-1',
    dark ? 'bg-night-raised ring-night-line' : 'bg-white ring-line',
  )
  const itemHover = dark ? 'hover:bg-night' : 'hover:bg-surface-hover'
  const itemTitle = dark ? 'text-night-text' : 'text-ink'
  const itemDesc = dark ? 'text-night-soft' : 'text-ink-secondary'
  const eyebrow = cn('mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em]', dark ? 'text-night-muted' : 'text-ink-muted')

  const menuTrigger = (key: MenuKey, label: string) => (
    <button
      type="button"
      onClick={() => setOpenMenu((current) => (current === key ? null : key))}
      aria-expanded={openMenu === key}
      aria-controls={`menu-${key}`}
      className={cn(
        'flex min-h-0 min-w-0 items-center gap-1 rounded-full px-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
        linkText,
        focusRing,
      )}
    >
      {label}
      <ChevronDown
        aria-hidden
        className={cn('h-3.5 w-3.5 transition-transform duration-200', openMenu === key && 'rotate-180')}
      />
    </button>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 md:p-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-night-text"
      >
        Skip to content
      </a>
      <nav
        ref={navRef}
        aria-label="Main"
        className={cn(
          'mx-auto w-full border px-3 py-2 backdrop-blur-lg transition-[background-color,box-shadow,border-color] duration-300 sm:px-4 md:max-w-7xl md:rounded-full md:py-1.5',
          dark
            ? scrolled
              ? 'border-night-line bg-night/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]'
              : 'border-night-line/60 bg-night-raised/40'
            : scrolled
              ? 'border-line bg-surface-canvas/85 shadow-[0_10px_30px_-14px_rgba(26,20,16,0.22)]'
              : 'border-line bg-surface-hover/70',
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <ConvertiveLogo tone={dark ? 'dark' : 'light'} />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            <li className="relative" onMouseEnter={() => openOnHover('products')} onMouseLeave={closeOnLeave}>
              {menuTrigger('products', 'Products')}
              <div
                id="menu-products"
                className={cn(
                  'absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200',
                  openMenu === 'products' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                )}
              >
                <div className={cn(panel, 'flex gap-5')}>
                  <div className="min-w-0 flex-1">
                    <p className={eyebrow}>Platform</p>
                    <ul className="space-y-0.5">
                      {PLATFORM_NAV.map(({ href, name, desc, icon: Icon }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={cn(
                              'flex min-h-0 min-w-0 items-start gap-3 rounded-xl p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2',
                              itemHover,
                              focusRing,
                            )}
                          >
                            {Icon && (
                              <span
                                className={cn(
                                  'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                  dark ? 'bg-night text-night-text' : 'bg-surface-sunken text-ink',
                                )}
                              >
                                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                              </span>
                            )}
                            <span className="min-w-0">
                              <span className={cn('block text-sm font-semibold leading-snug', itemTitle)}>{name}</span>
                              <span className={cn('mt-0.5 block text-[13px] leading-snug', itemDesc)}>{desc}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={cn(
                      'flex w-[210px] shrink-0 flex-col justify-between rounded-xl p-4',
                      dark ? 'bg-night' : 'bg-copper-100 ring-1 ring-copper-200',
                    )}
                  >
                    <div>
                      <p className={cn('text-sm font-semibold', itemTitle)}>See it live</p>
                      <p className={cn('mt-1 text-[13px] leading-snug', itemDesc)}>
                        Watch Convertive convert an anonymous visitor in real time.
                      </p>
                    </div>
                    <BookDemoButton
                      location="header-products-menu"
                      size="md"
                      variant={dark ? 'onDark' : 'primary'}
                      className="mt-4 w-full"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link
                href={PRIMARY_LINKS[0].href}
                className={cn('min-h-0 min-w-0 rounded-full px-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2', linkText, focusRing)}
              >
                {PRIMARY_LINKS[0].name}
              </Link>
            </li>
            <li className="relative" onMouseEnter={() => openOnHover('insights')} onMouseLeave={closeOnLeave}>
              {menuTrigger('insights', 'Insights')}
              <div
                id="menu-insights"
                className={cn(
                  'absolute left-1/2 top-full w-[400px] -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200',
                  openMenu === 'insights' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                )}
              >
                <div className={panel}>
                  <p className={eyebrow}>Thought leadership</p>
                  <ul className="space-y-0.5">
                    {INSIGHTS_NAV.map(({ href, name, desc }, i) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            'flex min-h-0 min-w-0 items-baseline gap-3 rounded-xl p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2',
                            itemHover,
                            focusRing,
                          )}
                        >
                          <span className={cn('w-5 shrink-0 text-xs tabular-nums', dark ? 'text-night-muted' : 'text-ink-muted')}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="min-w-0">
                            <span className={cn('block text-sm font-semibold leading-snug', itemTitle)}>{name}</span>
                            <span className={cn('mt-0.5 block text-[13px] leading-snug', itemDesc)}>{desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            {PRIMARY_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn('min-h-0 min-w-0 rounded-full px-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2', linkText, focusRing)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <BookDemoButton
              location="header"
              size="md"
              variant={dark ? 'onDark' : 'primary'}
              showArrow={false}
              className="hidden sm:inline-flex"
            />

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-xl border md:hidden focus-visible:outline-none focus-visible:ring-2',
                    dark ? 'border-night-line text-night-text' : 'border-line bg-white/60 text-ink',
                    focusRing,
                  )}
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={cn(
                  'flex w-[88vw] max-w-sm flex-col overflow-y-auto border-l p-6',
                  dark ? 'border-night-line bg-night text-night-text' : 'border-line bg-surface-canvas text-ink',
                )}
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="pb-6">
                  <ConvertiveLogo tone={dark ? 'dark' : 'light'} />
                </div>
                <nav aria-label="Mobile" className="flex-1 space-y-2">
                  {[
                    { key: 'products', label: 'Products', links: PLATFORM_NAV },
                    { key: 'insights', label: 'Insights', links: INSIGHTS_NAV },
                  ].map((group) => (
                    <details key={group.key} className={cn('group rounded-xl border', dark ? 'border-night-line' : 'border-line')}>
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                        {group.label}
                        <ChevronDown aria-hidden className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="space-y-1 px-2 pb-3">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn('block rounded-lg px-2 py-2', itemHover)}
                            >
                              <span className={cn('block text-[15px] font-medium', itemTitle)}>{link.name}</span>
                              {link.desc && <span className={cn('block text-[13px]', itemDesc)}>{link.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                  {PRIMARY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn('flex items-center rounded-xl px-4 py-3 font-semibold', itemHover)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <BookDemoButton
                  location="header-mobile"
                  variant={dark ? 'onDark' : 'primary'}
                  className="mt-6 w-full"
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
