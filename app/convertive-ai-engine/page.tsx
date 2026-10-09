import type { Metadata } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ProductJsonLd from '@/components/landing/product/product-json-ld'
import ProductPage from '@/components/landing/product/product-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'AI Decisioning Engine for In-Session Ecommerce Conversion',
  description:
    'Use predictive intent, value scoring, and next-best-action ranking to choose the strongest in-session intervention for each shopper.',
  path: '/convertive-ai-engine',
  keywords: [
    'next best action engine',
    'predictive intent model',
    'session decisioning',
    'commerce reinforcement learning',
    'real-time conversion optimization',
  ],
  image: '/images/convertive-customer-activation-platform/Optimized-Customer-AI-Assistants.webp',
})

export default function ConvertiveAIEnginePage() {
  return (
    <LandingShell>
      <ProductJsonLd module="ai-engine" />
      <ProductPage module="ai-engine" />
      <Footer />
    </LandingShell>
  )
}
