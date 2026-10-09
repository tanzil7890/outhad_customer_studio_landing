import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Methodology from '@/components/landing/insights/methodology'
import LandingShell from '@/components/landing/shared/landing-shell'
import { METHODOLOGY } from '@/lib/landing/insights'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Methodology: How We Measure Anonymous Session Leakage',
  description:
    'A measurement framework for anonymous session leakage. Definition, formula, four leak categories, and the Identity Signal Heatmap that quantifies revenue lost in real time.',
  path: '/the-methodology',
  keywords: [
    'anonymous session leakage',
    'ecommerce revenue leakage formula',
    'identity signal heatmap',
    'anonymous traffic loss measurement',
    'in-session revenue measurement',
    'recoverable revenue model',
  ],
  type: 'article',
})

export default function TheMethodologyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Methodology', url: absoluteUrl('/the-methodology') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, faqSchema(METHODOLOGY.faqs)]) }} />
      <Methodology />
      <Footer />
    </LandingShell>
  )
}
