import type { Metadata } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ProductJsonLd from '@/components/landing/product/product-json-ld'
import ProductPage from '@/components/landing/product/product-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Real-Time Audience Segmentation for Ecommerce',
  description:
    'Build live audience segments that update from in-session behavior, not delayed warehouse snapshots. Convertive Audiences power real-time personalization at the moment of intent.',
  path: '/convertive-audiences',
  keywords: [
    'real-time audience segmentation',
    'ecommerce audience builder',
    'in-session segment targeting',
    'live behavioral segments',
    'anonymous visitor segmentation',
  ],
  image: '/images/convertive-customer-activation-platform/customer-profiles.png',
})

export default function ConvertiveAudiencesPage() {
  return (
    <LandingShell>
      <ProductJsonLd module="audiences" />
      <ProductPage module="audiences" />
      <Footer />
    </LandingShell>
  )
}
