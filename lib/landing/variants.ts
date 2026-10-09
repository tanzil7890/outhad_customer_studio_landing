/** Homepage concepts under review. Delete this registry once one is promoted to `/`. */
export const VARIANTS = [
  { id: '1', path: '/1', label: 'Live theater', tone: 'light' },
  { id: '2', path: '/2', label: 'Ghosts', tone: 'dark' },
  { id: '3', path: '/3', label: 'Mirror', tone: 'light' },
] as const

export type PageTone = 'light' | 'dark'

export function variantForPath(pathname: string | null) {
  return VARIANTS.find((variant) => variant.path === pathname)
}

export function toneForPath(pathname: string | null): PageTone {
  return variantForPath(pathname)?.tone ?? 'light'
}
