import type { Metadata } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ProductJsonLd from '@/components/landing/product/product-json-ld'
import ProductPage from '@/components/landing/product/product-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Real-Time Data Platform for Ecommerce Identity Stitching',
  description:
    'Unify clickstream, source, cart, and profile data in real time. Convertive Data Platform powers anonymous-to-known identity stitching for in-session conversion.',
  path: '/convertive-data-platform',
  keywords: [
    'real-time data platform',
    'identity stitching',
    'anonymous to known profile',
    'event pipeline for ecommerce',
    'in-session conversion data layer',
  ],
  image: '/images/convertive-customer-activation-platform/customer-profiles.png',
})

export default function ConvertiveDataPlatformPage() {
  return (
    <LandingShell>
      <ProductJsonLd module="data-platform" />
      <ProductPage module="data-platform" />
      <Footer />
    </LandingShell>
  )
}
