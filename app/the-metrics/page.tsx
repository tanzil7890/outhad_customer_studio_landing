import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Metrics from '@/components/landing/insights/metrics'
import LandingShell from '@/components/landing/shared/landing-shell'
import { METRICS } from '@/lib/landing/insights'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Metrics: KPIs for In-Session Revenue Infrastructure',
  description:
    'Conversion rate is a lagging indicator. The eight leading KPIs that define in-session revenue infrastructure — identification rate, decision latency, NBA accuracy, anonymous→known conversion, recovered revenue per session, and more.',
  path: '/the-metrics',
  keywords: [
    'in-session conversion KPIs',
    'anonymous visitor metrics',
    'identification rate',
    'decision latency',
    'next-best-action accuracy',
    'recovered revenue per session',
    'identity drop-off',
  ],
  type: 'article',
})

export default function TheMetricsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Metrics', url: absoluteUrl('/the-metrics') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, faqSchema(METRICS.faqs)]) }} />
      <Metrics />
      <Footer />
    </LandingShell>
  )
}
