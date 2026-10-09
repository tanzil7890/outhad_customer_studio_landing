import type { Metadata, Viewport } from 'next'
import Footer from '@/components/footer'
import LandingShell from '@/components/landing/shared/landing-shell'
import ConceptTwo from '@/components/landing/v2/concept-two'
import { FAQS, METHOD, VIDEO } from '@/lib/landing/content'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { faqSchema, howToSchema, videoObjectSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Real-Time Customer Activation Platform for Ecommerce',
  description:
    'Convert anonymous ecommerce visitors before they leave. Convertive uses real-time AI, session-aware audiences, and in-session decisioning to increase conversions.',
  path: '/',
  keywords: [
    'real-time customer activation platform',
    'convert anonymous visitors',
    'ecommerce personalization software',
    'in-session AI personalization',
    'anonymous visitor conversion',
    'journey orchestration for ecommerce',
  ],
})

export const viewport: Viewport = {
  themeColor: '#1A1410',
}

// Structured data mirrors what the page shows: the FAQ list, the film and the Detect/Decide/Deliver/Capture loop.
const jsonLd = serializeJsonLd([
  faqSchema(FAQS),
  videoObjectSchema({
    name: 'Ghosts: how Convertive converts an anonymous shopper before she leaves',
    description:
      'A 48-second film: one anonymous shopper, read in real time, stopped at the moment she is about to leave, given the right offer and turned into a known customer.',
    thumbnailUrl: absoluteUrl(VIDEO.poster),
    uploadDate: '2026-10-08T20:24:53-07:00',
    contentUrl: absoluteUrl(VIDEO.sources[0].src),
    duration: 'PT48S',
  }),
  howToSchema(METHOD.steps.map((step) => ({ name: step.title, text: step.body }))),
])

export default function HomePage() {
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ConceptTwo />
      <Footer />
    </LandingShell>
  )
}
