import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

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

const reportingPillars = [
  {
    title: 'Identity progression analytics',
    text: 'Track where visitors become known and where identity capture opportunities are lost.',
  },
  {
    title: 'Journey diagnostics',
    text: 'Inspect decision paths, suppression behavior, and cross-channel conflicts by segment.',
  },
  {
    title: 'Qualified lift measurement',
    text: 'Evaluate outcome impact with control-aware reporting and operational context.',
  },
]

const dashboardModules = [
  'Identity signal heatmap by funnel stage',
  'Action ranking outcomes by segment and context',
  'Suppression and frequency conflict audit logs',
  'Conversion and recovery timeline by channel',
  'Holdout-aware lift and confidence summaries',
  'Latency and delivery health for in-session actions',
]

const faqs = [
  {
    question: 'How does Convertive measure conversion lift without a third-party testing tool?',
    answer:
      'Convertive uses holdout groups built into the journey layer. A controlled percentage of eligible shoppers receives no intervention, and conversion rates are compared to the treated group. Lift is calculated with statistical confidence scores so you know when a result is meaningful versus noise.',
  },
  {
    question: 'What is identity progression reporting?',
    answer:
      'Identity progression reporting shows where in the funnel anonymous visitors become known — via email capture, checkout, account login, or other identity events. It highlights which pages and journeys are most effective at advancing identity and where capture opportunities are being missed.',
  },
  {
    question: 'Can I see why a specific shopper received a certain intervention?',
    answer:
      'Yes. Journey diagnostics let you inspect individual decision paths — including which signals triggered eligibility, which action was ranked highest, and whether suppression or guardrails modified the outcome. This is useful for debugging unexpected behavior and auditing AI decisions.',
  },
  {
    question: 'How is Convertive reporting different from Google Analytics or platform dashboards?',
    answer:
      'GA and platform dashboards measure aggregate channel performance. Convertive Reporting measures the quality of individual decisions within sessions — did the AI pick the right action for each shopper? It is designed to answer operational questions like "are my suppression rules working?" and "which segments respond best to which interventions?"',
  },
]

export default function ConvertiveReportingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Reporting', url: absoluteUrl('/convertive-reporting') },
  ])
  const product = featureProductSchema({
    name: 'Convertive Reporting',
    description:
      'Conversion lift reporting and session journey analytics for ecommerce, including identity progression heatmaps, holdout-aware lift measurement, and journey diagnostics.',
    url: absoluteUrl('/convertive-reporting'),
    featureList: [
      'Holdout-aware conversion lift measurement',
      'Identity progression analytics',
      'Journey diagnostics by segment',
      'Action ranking outcome reports',
      'Suppression and conflict audit logs',
      'In-session delivery health monitoring',
    ],
  })
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, product, faqSchema(faqs)]) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Reporting</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title">Convertive Reporting</h1>
          <p className="mt-6 text-lg text-[#9C8B7E] max-w-4xl leading-relaxed">
            Measure what matters for in-session conversion: identity progression quality, decision effectiveness, and
            journey-level lift. Reporting is designed for both operators and leadership.
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
          {reportingPillars.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all">
              <h2 className="text-xl font-title text-[#1A1410]">{item.title}</h2>
              <p className="mt-3 text-sm text-[#9C8B7E] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] p-8">
          <h2 className="text-3xl font-title text-[#1A1410] mb-4">Dashboard modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dashboardModules.map((item) => (
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
