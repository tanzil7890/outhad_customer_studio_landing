import type { Metadata } from 'next'
import Link from 'next/link'
import DemoClient from './DemoClient'
import Footer from '@/components/footer'
import { buildMetadata, serializeJsonLd, absoluteUrl, siteConfig } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Talk to us',
  description:
    'Book fifteen minutes with the Outhad AI team to talk through Convertive, Outhad Studio, or the research behind them.',
  path: '/demo',
  keywords: ['Outhad AI contact', 'book a demo', 'Convertive demo', 'Outhad Studio demo'],
})

export default function DemoPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Talk to us', url: absoluteUrl('/demo') },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />

      <section className="px-6 pt-40 pb-12 sm:pt-48 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[hsl(var(--app-text-muted))] tracking-[0.2em] uppercase mb-8">Talk to us</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#1A1410] leading-[1.1] tracking-tight mb-8">
            Book fifteen minutes.
          </h1>
          <p className="text-lg text-[hsl(var(--app-text-muted))] leading-relaxed max-w-2xl">
            Pick a slot below. Fifteen minutes is usually enough to work out whether what we are building is useful to
            you — whether that is Convertive on live storefront traffic, Outhad Studio, or the research underneath
            both.
          </p>
          <p className="mt-6 text-sm text-[hsl(var(--app-text-muted))]">
            Prefer email?{' '}
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-[#C87941] hover:underline"
            >
              {siteConfig.contactEmail}
            </Link>
          </p>
        </div>
      </section>

      <section className="px-6 pb-32 sm:pb-40">
        <div className="max-w-4xl mx-auto">
          <DemoClient />
        </div>
      </section>

      <Footer />
    </div>
  )
}
