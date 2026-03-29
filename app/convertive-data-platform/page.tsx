import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

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

const foundation = [
  {
    title: 'Streaming event ingestion',
    text: 'Capture click, scroll, pause, cart, and checkout events with low-latency processing.',
  },
  {
    title: 'Live profile store',
    text: 'Maintain one evolving profile that merges anonymous and known activity in-session.',
  },
  {
    title: 'Activation-ready outputs',
    text: 'Expose profile, intent, and eligibility signals instantly to decisioning and journeys.',
  },
]

const modules = [
  'Session event pipeline with source context',
  'Anonymous identity graph and profile stitching',
  'Cross-device profile continuity controls',
  'Warehouse-friendly sync and export paths',
  'Journey-safe state snapshots for orchestration',
  'Privacy and consent-aware profile governance',
]

const faqs = [
  {
    question: 'How does the Convertive Data Platform handle anonymous visitor data?',
    answer:
      'Convertive captures every behavioral signal from anonymous sessions — clicks, scrolls, cart activity, and pauses — and stores them in a live profile. When identity is captured, the anonymous history is stitched into the known profile instantly, with no data loss.',
  },
  {
    question: 'How is this different from a traditional CDP?',
    answer:
      'Traditional CDPs batch-process data from warehouse pipelines with hours or days of latency. Convertive Data Platform processes events in sub-second time during the live session, making data available for in-session decisioning while the shopper is still on-site.',
  },
  {
    question: 'Does Convertive work with our existing data stack?',
    answer:
      'Yes. Convertive ingests events from your ecommerce platform (Shopify, BigCommerce, SFCC, Magento) and can sync profile data back to your warehouse or downstream tools. It is designed to complement, not replace, your existing stack.',
  },
  {
    question: 'How does Convertive handle cross-device identity?',
    answer:
      'Convertive uses probabilistic and deterministic identity signals to link sessions across devices. When a visitor signs in or provides an email, cross-device profiles are merged automatically into one unified live profile.',
  },
]

export default function ConvertiveDataPlatformPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Data Platform', url: absoluteUrl('/convertive-data-platform') },
  ])
  const product = featureProductSchema({
    name: 'Convertive Data Platform',
    description:
      'Real-time ecommerce data platform for anonymous-to-known identity stitching, streaming event ingestion, and activation-ready profile outputs.',
    url: absoluteUrl('/convertive-data-platform'),
    featureList: [
      'Streaming event ingestion',
      'Anonymous identity graph and profile stitching',
      'Cross-device profile continuity',
      'Live profile store',
      'Activation-ready outputs',
      'Privacy and consent-aware governance',
    ],
  })
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, product, faqSchema(faqs)]) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">
            Foundation
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">
            Convertive Data Platform
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] max-w-4xl leading-relaxed">
            Build a real-time data foundation for in-session conversion. Stitch anonymous and known activity into one
            live profile so every decision uses current shopper context.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="https://tryconvertive.com/demo" target="_blank">
              <Button className="bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-full px-8">
                Book Demo
              </Button>
            </Link>
            <Link href="/roi-calculator">
              <Button variant="outline" className="rounded-full px-8">
                Calculate Your ROI
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {foundation.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5"
            >
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-4">Core modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modules.map((item) => (
              <p key={item} className="text-sm text-[hsl(var(--app-text))]">
                - {item}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[hsl(var(--app-border))] pb-6">
                <h3 className="text-base font-semibold text-[hsl(var(--app-text))] mb-2">{faq.question}</h3>
                <p className="text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
