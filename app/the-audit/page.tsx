import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Audit from '@/components/landing/insights/audit'
import LandingShell from '@/components/landing/shared/landing-shell'
import { AUDIT } from '@/lib/landing/insights'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Audit: How to Find Revenue Leaks in Anonymous Traffic',
  description:
    'A 7-step DIY audit for finding revenue leaks in anonymous traffic. Anonymous %, intent-weighted bounce, identity capture rate, cart funnel, time-to-first-touch, attribution gaps, and ROAS leakage — with benchmarks.',
  path: '/the-audit',
  keywords: [
    'anonymous traffic audit',
    'revenue leak audit ecommerce',
    'identity capture rate audit',
    'cart abandonment funnel audit',
    'roas leakage analysis',
    'in-session conversion audit',
  ],
  type: 'article',
})

export default function TheAuditPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Audit', url: absoluteUrl('/the-audit') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, howToSchema(AUDIT.steps.map((s) => ({ name: s.title, text: s.do }))), faqSchema(AUDIT.faqs)]) }} />
      <Audit />
      <Footer />
    </LandingShell>
  )
}
