'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INSIGHTS_NAV, PLATFORM_NAV, PRIMARY_LINKS } from '@/lib/site-nav'
import { headerForPath, type HeaderSkin } from '@/lib/landing/variants'
import ConvertiveLogo from './convertive-logo'
import BookDemoButton from './landing/shared/book-demo-button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'

type MenuKey = 'products' | 'insights'

interface Skin {
  dark: boolean
  /** `pill`: the floating rounded bar used across the main site. `bar`: full-width, aligned to the page grid. */
  frame: 'pill' | 'bar'
  navAlign: 'center' | 'left'
  font?: string
  /** Bar classes at the top of the page and once scrolled. */
  surface: [string, string]
  wordmark?: string
  tagline: boolean
  link: string
  focus: string
  panel: string
  itemHover: string
  itemTitle: string
  itemDesc: string
  eyebrow: string
  iconBox: (i: number) => string
  featured: string
  cta: { variant: 'primary' | 'onDark'; className?: string }
  sheet: string
  border: string
}

const LIGHT = {
  dark: false,
  link: 'text-ink-secondary hover:text-ink',
  focus: 'focus-visible:ring-ink',
  panel: 'rounded-2xl bg-white p-5 shadow-[0_24px_60px_-20px_rgba(26,20,16,0.35)] ring-1 ring-line',
  itemHover: 'hover:bg-surface-hover',
  itemTitle: 'text-ink',
  itemDesc: 'text-ink-secondary',
  eyebrow: 'text-ink-muted',
  iconBox: () => 'bg-surface-sunken text-ink',
  featured: 'bg-copper-100 ring-1 ring-copper-200',
  cta: { variant: 'primary' as const },
  sheet: 'border-line bg-surface-canvas text-ink',
  border: 'border-line',
}

const PASTELS = ['bg-pastel-apricot', 'bg-pastel-butter', 'bg-pastel-sky', 'bg-pastel-mint', 'bg-pastel-lilac']

const SKINS: Record<HeaderSkin, Skin> = {
  default: {
    ...LIGHT,
    frame: 'pill',
    navAlign: 'center',
    tagline: true,
    surface: ['border-line bg-surface-hover/70', 'border-line bg-surface-canvas/85 shadow-[0_10px_30px_-14px_rgba(26,20,16,0.22)]'],
  },
  // /1: warm canvas, a quiet full-width bar that frosts on scroll.
  theater: {
    ...LIGHT,
    frame: 'bar',
    navAlign: 'center',
    tagline: false,
    surface: [
      'border-transparent bg-transparent',
      'border-line bg-surface-canvas/85 shadow-[0_10px_30px_-22px_rgba(26,20,16,0.45)] backdrop-blur-lg',
    ],
  },
  // /2: invisible over the ghost floor, warm-black glass once you scroll.
  ghosts: {
    dark: true,
    frame: 'bar',
    navAlign: 'center',
    tagline: false,
    surface: ['border-transparent bg-transparent', 'border-night-line bg-night/80 backdrop-blur-xl'],
    link: 'text-night-soft hover:text-night-text',
    focus: 'focus-visible:ring-night-text',
    panel: 'rounded-2xl bg-night-raised p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-night-line',
    itemHover: 'hover:bg-night',
    itemTitle: 'text-night-text',
    itemDesc: 'text-night-soft',
    eyebrow: 'text-night-muted',
    iconBox: () => 'bg-night text-night-text',
    featured: 'bg-night',
    cta: { variant: 'onDark' },
    sheet: 'border-night-line bg-night text-night-text',
    border: 'border-night-line',
  },
  // /3: an instrument bar, always framed, with a ruler along its edge.
  mirror: {
    ...LIGHT,
    frame: 'bar',
    navAlign: 'center',
    tagline: false,
    surface: ['border-line bg-surface-warm/85 backdrop-blur-lg', 'border-line bg-surface-warm/90 shadow-[0_10px_30px_-22px_rgba(26,20,16,0.45)] backdrop-blur-lg'],
    featured: 'bg-surface-warm ring-1 ring-line',
  },
  // /4: Flint-style solid white bar in Geist, nav beside the logo, pastel menus.
  ember: {
    ...LIGHT,
    frame: 'bar',
    navAlign: 'left',
    font: GeistSans.className,
    tagline: false,
    wordmark: 'text-[1.35rem] font-semibold tracking-[-0.035em]',
    surface: ['border-transparent bg-white', 'border-pastel-line bg-white/95 backdrop-blur'],
    link: 'text-ink/75 decoration-ember decoration-2 underline-offset-[10px] hover:text-ink hover:underline',
    panel: 'rounded-2xl bg-white p-5 shadow-[0_24px_60px_-24px_rgba(26,20,16,0.35)] ring-1 ring-pastel-line',
    itemHover: 'hover:bg-pastel-paper',
    iconBox: (i) => cn(PASTELS[i % PASTELS.length], 'text-ink'),
    featured: 'bg-pastel-apricot',
    cta: { variant: 'primary', className: 'rounded-lg' },
    sheet: 'border-pastel-line bg-white text-ink',
    border: 'border-pastel-line',
  },
}

export default function Header() {
  const pathname = usePathname()
  const config = headerForPath(pathname)
  const skin = SKINS[config.skin]
  const { dark } = skin
  const howItWorks = config.howItWorks ?? PRIMARY_LINKS[0].href
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

  const navLink = cn(
    'min-h-0 min-w-0 rounded-full px-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
    skin.link,
    skin.focus,
  )
  const eyebrow = cn('mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em]', skin.eyebrow)
  // Menus open centred under a centred nav, and from the left edge under a left-aligned one.
  const dropdown = skin.navAlign === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'

  const menuTrigger = (key: MenuKey, label: string) => (
    <button
      type="button"
      onClick={() => setOpenMenu((current) => (current === key ? null : key))}
      aria-expanded={openMenu === key}
      aria-controls={`menu-${key}`}
      className={cn('flex items-center gap-1', navLink)}
    >
      {label}
      <ChevronDown aria-hidden className={cn('h-3.5 w-3.5 transition-transform duration-200', openMenu === key && 'rotate-180')} />
    </button>
  )

  const extra = config.extra && (
    <a
      href={config.extra.href}
      className={cn(
        'hidden min-h-0 min-w-0 items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 lg:inline-flex',
        config.skin === 'mirror'
          ? 'rounded-full bg-surface-base px-3 py-1.5 font-mono text-[12px] text-ink-secondary ring-1 ring-line hover:text-ink'
          : cn('rounded-full px-2 py-1', skin.link),
        skin.focus,
      )}
    >
      {config.extra.live && (
        <span aria-hidden className="relative flex h-2 w-2">
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden', dark ? 'bg-success-soft' : 'bg-success')} />
          <span className={cn('relative inline-flex h-2 w-2 rounded-full', dark ? 'bg-success-soft' : 'bg-success')} />
        </span>
      )}
      {config.extra.label}
    </a>
  )

  const desktopNav = (
    <ul
      className={cn(
        'hidden items-center gap-6 md:flex lg:gap-8',
        skin.frame === 'bar' && (skin.navAlign === 'center' ? 'flex-1 justify-center' : 'ml-10 flex-1 justify-start lg:ml-12'),
      )}
    >
      <li className="relative" onMouseEnter={() => openOnHover('products')} onMouseLeave={closeOnLeave}>
        {menuTrigger('products', 'Products')}
        <div
          id="menu-products"
          className={cn(
            'absolute top-full w-[640px] pt-4 transition-[opacity,transform,visibility] duration-200',
            dropdown,
            openMenu === 'products' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
          )}
        >
          <div className={cn(skin.panel, 'flex gap-5')}>
            <div className="min-w-0 flex-1">
              <p className={eyebrow}>Platform</p>
              <ul className="space-y-0.5">
                {PLATFORM_NAV.map(({ href, name, desc, icon: Icon }, i) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex min-h-0 min-w-0 items-start gap-3 rounded-xl p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2',
                        skin.itemHover,
                        skin.focus,
                      )}
                    >
                      {Icon && (
                        <span className={cn('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', skin.iconBox(i))}>
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className={cn('block text-sm font-semibold leading-snug', skin.itemTitle)}>{name}</span>
                        <span className={cn('mt-0.5 block text-[13px] leading-snug', skin.itemDesc)}>{desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn('flex w-[210px] shrink-0 flex-col justify-between rounded-xl p-4', skin.featured)}>
              <div>
                <p className={cn('text-sm font-semibold', skin.itemTitle)}>See it live</p>
                <p className={cn('mt-1 text-[13px] leading-snug', skin.itemDesc)}>
                  Watch Convertive convert an anonymous visitor in real time.
                </p>
              </div>
              <BookDemoButton
                location="header-products-menu"
                size="md"
                variant={skin.cta.variant}
                className={cn('mt-4 w-full', skin.cta.className)}
              />
            </div>
          </div>
        </div>
      </li>
      <li>
        <Link href={howItWorks} className={navLink}>
          {PRIMARY_LINKS[0].name}
        </Link>
      </li>
      <li className="relative" onMouseEnter={() => openOnHover('insights')} onMouseLeave={closeOnLeave}>
        {menuTrigger('insights', 'Insights')}
        <div
          id="menu-insights"
          className={cn(
            'absolute top-full w-[400px] pt-4 transition-[opacity,transform,visibility] duration-200',
            dropdown,
            openMenu === 'insights' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
          )}
        >
          <div className={skin.panel}>
            <p className={eyebrow}>Thought leadership</p>
            <ul className="space-y-0.5">
              {INSIGHTS_NAV.map(({ href, name, desc }, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'flex min-h-0 min-w-0 items-baseline gap-3 rounded-xl p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2',
                      skin.itemHover,
                      skin.focus,
                    )}
                  >
                    <span className={cn('w-5 shrink-0 text-xs tabular-nums', skin.eyebrow)}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className={cn('block text-sm font-semibold leading-snug', skin.itemTitle)}>{name}</span>
                      <span className={cn('mt-0.5 block text-[13px] leading-snug', skin.itemDesc)}>{desc}</span>
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
          <Link href={link.href} className={navLink}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )

  const mobileMenu = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border md:hidden focus-visible:outline-none focus-visible:ring-2',
            dark ? 'border-night-line text-night-text' : cn(skin.border, 'bg-white/60 text-ink'),
            skin.focus,
          )}
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className={cn('flex w-[88vw] max-w-sm flex-col overflow-y-auto border-l p-6', skin.sheet, skin.font)}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="pb-6">
          <ConvertiveLogo tone={dark ? 'dark' : 'light'} tagline={skin.tagline} wordmarkClassName={skin.wordmark} />
        </div>
        <nav aria-label="Mobile" className="flex-1 space-y-2">
          {[
            { key: 'products', label: 'Products', links: PLATFORM_NAV },
            { key: 'insights', label: 'Insights', links: INSIGHTS_NAV },
          ].map((group) => (
            <details key={group.key} className={cn('group rounded-xl border', skin.border)}>
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                {group.label}
                <ChevronDown aria-hidden className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="space-y-1 px-2 pb-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className={cn('block rounded-lg px-2 py-2', skin.itemHover)}>
                      <span className={cn('block text-[15px] font-medium', skin.itemTitle)}>{link.name}</span>
                      {link.desc && <span className={cn('block text-[13px]', skin.itemDesc)}>{link.desc}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {[{ ...PRIMARY_LINKS[0], href: howItWorks }, ...PRIMARY_LINKS.slice(1)].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn('flex items-center rounded-xl px-4 py-3 font-semibold', skin.itemHover)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <BookDemoButton location="header-mobile" variant={skin.cta.variant} className={cn('mt-6 w-full', skin.cta.className)} />
      </SheetContent>
    </Sheet>
  )

  const logo = (
    <ConvertiveLogo tone={dark ? 'dark' : 'light'} tagline={skin.tagline} wordmarkClassName={skin.wordmark} className="shrink-0" />
  )
  const actions = (
    <div className="flex shrink-0 items-center gap-3">
      {extra}
      <BookDemoButton
        location="header"
        size="md"
        variant={skin.cta.variant}
        showArrow={false}
        className={cn('hidden sm:inline-flex', skin.cta.className)}
      />
      {mobileMenu}
    </div>
  )

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50', skin.frame === 'pill' && 'md:p-4', skin.font)}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-night-text"
      >
        Skip to content
      </a>
      {skin.frame === 'pill' ? (
        <nav
          ref={navRef}
          aria-label="Main"
          className={cn(
            'mx-auto w-full border px-3 py-2 backdrop-blur-lg transition-[background-color,box-shadow,border-color] duration-300 sm:px-4 md:max-w-7xl md:rounded-full md:py-1.5',
            skin.surface[scrolled ? 1 : 0],
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {logo}
            {desktopNav}
            {actions}
          </div>
        </nav>
      ) : (
        <nav
          ref={navRef}
          aria-label="Main"
          className={cn(
            'relative border-b transition-[background-color,box-shadow,border-color] duration-300',
            skin.surface[scrolled ? 1 : 0],
          )}
        >
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[72px] lg:px-8">
            {logo}
            {desktopNav}
            {actions}
          </div>
          {config.skin === 'mirror' && (
            // Instrument ruler: a tick every 24px along the bar's lower edge.
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-[repeating-linear-gradient(90deg,rgb(var(--c-ink)/0.2)_0_1px,transparent_1px_24px)]"
            />
          )}
        </nav>
      )}
    </header>
  )
}
