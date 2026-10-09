import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Mechanism from '@/components/landing/insights/mechanism'
import LandingShell from '@/components/landing/shared/landing-shell'
import { MECHANISM } from '@/lib/landing/insights'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Mechanism: How In-Session Decisioning Works',
  description:
    'A technical breakdown of in-session decisioning — the 5-stage real-time loop that converts anonymous visitors before they bounce. Event ingest, live profile, intent inference, next-best-action ranking, and millisecond render.',
  path: '/the-mechanism',
  keywords: [
    'in-session decisioning',
    'real-time personalization architecture',
    'anonymous visitor conversion mechanism',
    'next best action engine',
    'streaming event pipeline ecommerce',
    'sub-second decisioning',
  ],
  type: 'article',
})

export default function TheMechanismPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Mechanism', url: absoluteUrl('/the-mechanism') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, howToSchema(MECHANISM.stages.map((s) => ({ name: s.title, text: s.desc }))), faqSchema(MECHANISM.faqs)]) }} />
      <Mechanism />
      <Footer />
    </LandingShell>
  )
}
