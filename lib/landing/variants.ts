/**
 * Landing pages with their own look: the homepage ("Ghosts", promoted from
 * concept 2) and the remaining concepts, which stay reachable by URL (noindex,
 * no switcher). Drives the header skin, the page tone and the analytics label.
 */

/** How the shared site header dresses itself on a page (see components/header.tsx). */
export type HeaderSkin = 'default' | 'theater' | 'ghosts' | 'mirror' | 'ember'

export const VARIANTS = [
  {
    id: 'home',
    path: '/',
    label: 'Ghosts',
    tone: 'dark',
    header: { skin: 'ghosts', howItWorks: '#how-it-works', extra: { label: 'Follow one ghost', href: '#session', live: false } },
  },
  {
    id: '1',
    path: '/1',
    label: 'Live theater',
    tone: 'light',
    header: { skin: 'theater', howItWorks: '#how-it-works', extra: { label: 'Watch a session', href: '#session', live: true } },
  },
  {
    id: '3',
    path: '/3',
    label: 'Mirror',
    tone: 'light',
    header: { skin: 'mirror', howItWorks: '#method', extra: { label: 'Reading your session', href: '#top', live: true } },
  },
  {
    id: '4',
    path: '/4',
    label: 'Ember',
    tone: 'light',
    header: { skin: 'ember', howItWorks: '#how-it-works', extra: { label: 'Run the numbers', href: '#roi', live: false } },
  },
] as const

export type PageTone = 'light' | 'dark'

export interface HeaderConfig {
  skin: HeaderSkin
  /** Where "How it works" points on this page. */
  howItWorks?: string
  /** A page-specific link shown next to the CTA on wide screens. */
  extra?: { label: string; href: string; live: boolean }
}

export function variantForPath(pathname: string | null) {
  return VARIANTS.find((variant) => variant.path === pathname)
}

export function toneForPath(pathname: string | null): PageTone {
  return variantForPath(pathname)?.tone ?? 'light'
}

export function headerForPath(pathname: string | null): HeaderConfig {
  return variantForPath(pathname)?.header ?? { skin: 'default' }
}
