import type { Metadata } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ProductJsonLd from '@/components/landing/product/product-json-ld'
import ProductPage from '@/components/landing/product/product-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Conversion Lift Reporting and Session Journey Analytics',
  description:
    'Measure in-session performance with identity progression heatmaps, journey diagnostics, and qualified lift reporting across channels.',
  path: '/convertive-reporting',
  keywords: [
    'identity signal heatmap',
    'journey diagnostics',
    'conversion lift reporting',
    'incrementality reporting',
    'real-time journey analytics',
  ],
  image: '/images/convertive-customer-activation-platform/convertive-features.avif',
})

export default function ConvertiveReportingPage() {
  return (
    <LandingShell>
      <ProductJsonLd module="reporting" />
      <ProductPage module="reporting" />
      <Footer />
    </LandingShell>
  )
}
