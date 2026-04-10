import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

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

const orchestrationBlocks = [
  {
    title: 'Shared journey state',
    text: 'Track what each shopper has seen and done so all channels use one current truth.',
  },
  {
    title: 'Guardrails and suppression',
    text: 'Prevent overlapping promotions and redundant messages with explicit suppression rules.',
  },
  {
    title: 'Adaptive branch logic',
    text: 'Update path selection in-session when intent changes or conversion likelihood shifts.',
  },
]

const controlPoints = [
  'Global frequency caps by session and channel',
  'Mutual exclusion between competing incentives',
  'Cancellation of stale follow-ups after conversion',
  'Fallback actions when preferred channels are unavailable',
  'Eligibility checks before each send or on-site trigger',
  'Priority overrides for checkout-critical moments',
]

const faqs = [
  {
    question: 'What does journey orchestration mean in the context of ecommerce?',
    answer:
      'Journey orchestration coordinates the sequence, timing, and channel of every message or intervention a shopper receives. In ecommerce, this means making sure an on-site offer, an email, and a retargeting ad aren\'t all firing simultaneously for the same shopper — and that the most relevant action wins based on current session context.',
  },
  {
    question: 'How does Convertive prevent conflicting offers from firing at the same time?',
    answer:
      'Convertive uses mutual exclusion rules and suppression logic built into the journey layer. When a shopper is in an active on-site intervention, downstream channels like email and SMS are suppressed. After conversion, stale follow-up sequences are cancelled automatically.',
  },
  {
    question: 'Can Convertive journeys respond to real-time signals mid-session?',
    answer:
      'Yes. Journey branch logic re-evaluates as new behavioral events stream in. If a visitor\'s intent score increases because they just viewed a third product in a category, the journey can shift from a passive nudge to an active offer without waiting for the next session.',
  },
  {
    question: 'How does this differ from marketing automation tools like Klaviyo flows or Braze canvases?',
    answer:
      'Marketing automation tools build flows around historical profile data and channel-specific events. Convertive Journey Orchestration is session-aware and shared-state — it coordinates in-session on-site actions alongside cross-channel messages from a single orchestration layer, using live behavioral signals not post-session triggers.',
  },
]

export default function ConvertiveJourneyOrchestrationPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Journey Orchestration', url: absoluteUrl('/convertive-journey-orchestration') },
  ])
  const product = featureProductSchema({
    name: 'Convertive Journey Orchestration',
    description:
      'Session-aware journey orchestration for ecommerce that coordinates on-site interventions and cross-channel messages from shared state with suppression and guardrails.',
    url: absoluteUrl('/convertive-journey-orchestration'),
    featureList: [
      'Shared journey state across channels',
      'Suppression and mutual exclusion rules',
      'Adaptive in-session branch logic',
      'Global frequency caps',
      'Post-conversion sequence cancellation',
      'Checkout-critical priority overrides',
    ],
  })
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, product, faqSchema(faqs)]) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Orchestration</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title">Convertive Journey Orchestration</h1>
          <p className="mt-6 text-lg text-[#9C8B7E] max-w-4xl leading-relaxed">
            Run coherent, session-aware journeys across web, checkout, email, SMS, and ads. Convertive coordinates
            message timing, suppression, and branching so shoppers see one intelligent sequence.
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
          {orchestrationBlocks.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all">
              <h2 className="text-xl font-title text-[#1A1410]">{item.title}</h2>
              <p className="mt-3 text-sm text-[#9C8B7E] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] p-8">
          <h2 className="text-3xl font-title text-[#1A1410] mb-4">Operational controls that protect conversion quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {controlPoints.map((item) => (
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
