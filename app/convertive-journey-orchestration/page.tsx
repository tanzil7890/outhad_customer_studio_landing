import type { Metadata } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ProductJsonLd from '@/components/landing/product/product-json-ld'
import ProductPage from '@/components/landing/product/product-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Journey Orchestration for In-Session Ecommerce Conversion',
  description:
    'Coordinate in-session and cross-channel journeys with shared state, suppression logic, and guardrails that prevent conflicting offers.',
  path: '/convertive-journey-orchestration',
  keywords: [
    'journey orchestration',
    'cross-channel suppression',
    'journey state management',
    'real-time trigger orchestration',
    'in-session journey automation',
  ],
  image: '/images/convertive-customer-activation-platform/convertive-orchestration.png',
})

export default function ConvertiveJourneyOrchestrationPage() {
  return (
    <LandingShell>
      <ProductJsonLd module="journey-orchestration" />
      <ProductPage module="journey-orchestration" />
      <Footer />
    </LandingShell>
  )
}
