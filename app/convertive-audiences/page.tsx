import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

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

const audienceBlocks = [
  {
    title: 'Live behavioral signals',
    text: 'Build segments from real-time session data — scroll depth, product views, cart state, and pause behavior.',
  },
  {
    title: 'Anonymous-first architecture',
    text: 'Every anonymous visitor has a segment membership instantly, before identity is known.',
  },
  {
    title: 'Sub-second updates',
    text: 'Segment membership recalculates continuously during the session, not in overnight batches.',
  },
]

const audienceCapabilities = [
  'Session-level intent scoring and segment assignment',
  'Behavioral cohorts by product category and browse depth',
  'Cart abandonment and recovery segment triggers',
  'Cross-device segment continuity after identity stitching',
  'Suppression segments to prevent over-messaging',
  'Lookalike and value-tier audience definitions',
]

const faqs = [
  {
    question: 'How quickly do Convertive Audiences update during a session?',
    answer:
      'Convertive recalculates segment membership in sub-second time as behavioral events stream in. A visitor who just added a high-value item to cart is immediately eligible for a different intervention — no batch job required.',
  },
  {
    question: 'Can I build audiences from anonymous visitors who have never logged in?',
    answer:
      'Yes. Convertive is built anonymous-first. Every session generates behavioral signals that feed segment logic from the first page view, before any identity is known. This is the core advantage over tools that require an email address to segment.',
  },
  {
    question: 'How is this different from Klaviyo or Braze audiences?',
    answer:
      'Klaviyo and Braze audiences are built on identified profiles and historical event data synced from other systems. Convertive Audiences use live in-session behavior as the primary signal, which means they work for the 80%+ of traffic that is anonymous and they update during the session rather than after it.',
  },
  {
    question: 'Can Convertive audiences trigger both on-site and off-site channels?',
    answer:
      'Yes. Audiences defined in Convertive feed both on-site interventions (pop-ups, banners, offer overlays) and downstream channel triggers (email, SMS, ad suppression) through the Journey Orchestration layer.',
  },
]

export default function ConvertiveAudiencesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Audiences', url: absoluteUrl('/convertive-audiences') },
  ])
  const product = featureProductSchema({
    name: 'Convertive Audiences',
    description:
      'Real-time audience segmentation for ecommerce, built on in-session behavioral signals and anonymous-first identity architecture.',
    url: absoluteUrl('/convertive-audiences'),
    featureList: [
      'Sub-second segment recalculation',
      'Anonymous-first segmentation',
      'Session-level intent scoring',
      'Cart abandonment triggers',
      'Cross-device segment continuity',
      'Suppression segment support',
    ],
  })
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, product, faqSchema(faqs)]) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Audiences</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title">
            Convertive Audiences
          </h1>
          <p className="mt-6 text-lg text-[#9C8B7E] max-w-4xl leading-relaxed">
            Build segments that update from live browsing behavior, not delayed warehouse snapshots. Convertive
            Audiences give every anonymous visitor a segment membership the moment they land.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="https://tryconvertive.com/demo" target="_blank">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Book Demo
              </Button>
            </Link>
            <Link href="/roi-calculator">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                Calculate Your ROI
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {audienceBlocks.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all">
              <h2 className="text-xl font-title text-[#1A1410]">{item.title}</h2>
              <p className="mt-3 text-sm text-[#9C8B7E] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] p-8">
          <h2 className="text-3xl font-title text-[#1A1410] mb-4">Audience capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {audienceCapabilities.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm">
                <span className="text-[#C87941] font-bold shrink-0 mt-0.5">→</span>
                <span className="text-[#1A1410]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-title text-[#1A1410] mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[#F2ECE6] pb-6">
                <h3 className="text-base font-semibold text-[#1A1410] mb-2">{faq.question}</h3>
                <p className="text-sm text-[#9C8B7E] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
