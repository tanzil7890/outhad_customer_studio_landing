import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Footer from '@/components/footer'
import ConceptSwitcher from '@/components/landing/shared/concept-switcher'
import LandingShell from '@/components/landing/shared/landing-shell'

// Homepage concepts under review: never indexed. Not listed in app/sitemap.ts, and
// intentionally not disallowed in robots.txt so crawlers can read the noindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function VariantsLayout({ children }: { children: ReactNode }) {
  return (
    <LandingShell>
      {children}
      <Footer />
      <ConceptSwitcher />
    </LandingShell>
  )
}
