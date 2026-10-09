import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Manifesto from '@/components/landing/insights/manifesto'
import LandingShell from '@/components/landing/shared/landing-shell'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Manifesto: Ecommerce Has an Anonymous Conversion Problem',
  description:
    'Ecommerce does not have a traffic problem. It has an anonymous conversion problem. The Convertive manifesto on real-time intent, hyper-personalization, autonomous optimization, and converting visitors before they bounce.',
  path: '/manifesto',
  keywords: [
    'anonymous conversion problem',
    'ecommerce manifesto',
    'in-session personalization philosophy',
    'real-time intent activation',
    'customer-first commerce',
    'responsible AI for ecommerce',
  ],
  type: 'article',
})

export default function ManifestoPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Manifesto', url: absoluteUrl('/manifesto') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <Manifesto />
      <Footer />
    </LandingShell>
  )
}
