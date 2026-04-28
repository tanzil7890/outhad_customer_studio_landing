import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Mechanism: How In-Session Decisioning Works',
  description:
    'A technical breakdown of in-session decisioning — the 5-stage real-time loop that converts anonymous visitors before they bounce. Event ingest, live profile, intent inference, next-best-action ranking, and millisecond render.',
  path: '/the-mechanism',
  keywords: [
    'in-session decisioning',
    'real-time personalization architecture',
    'anonymous visitor conversion mechanism',
    'next best action engine',
    'streaming event pipeline ecommerce',
    'sub-second decisioning',
  ],
  type: 'article',
})

const stages = [
  {
    n: '01',
    title: 'Event ingest',
    latency: '< 10ms',
    desc: 'Every click, scroll, hover, add-to-cart, and source signal streams off the page into a low-latency event bus the moment it happens. No batch jobs. No nightly ETL.',
  },
  {
    n: '02',
    title: 'Live profile',
    latency: '< 20ms',
    desc: 'Events update an in-memory profile keyed to a cookie or device ID. If identity arrives mid-session — email, login, phone — the anonymous trail is stitched to the known profile in real time. The profile is enriched, never re-built.',
  },
  {
    n: '03',
    title: 'Intent inference',
    latency: '< 30ms',
    desc: 'Browsing sequence, dwell time, price-point pattern, and source context feed predictive scores: propensity to convert, bounce risk, price sensitivity, category affinity. The system infers what the visitor wants before they tell you.',
  },
  {
    n: '04',
    title: 'Next-best-action ranking',
    latency: '< 30ms',
    desc: 'Multiple eligible actions — discount popup, product rec carousel, free-shipping banner, identity capture, cart save, do nothing — are scored against the live profile. The single highest-expected-lift action wins. Conflicts and message fatigue avoided.',
  },
  {
    n: '05',
    title: 'Render + log + learn',
    latency: '< 10ms',
    desc: 'Selected action injected via the on-site SDK. Outcome logged: clicked, ignored, converted, bounced. The learning loop updates the policy so the next session benefits from this one.',
  },
]

const capabilities = [
  { title: 'Recognize intent from clickstream + source', body: 'UTM, referrer, browse pattern, dwell, scroll depth merged into intent signals within seconds.' },
  { title: 'Live profile for anonymous + known', body: 'A single profile per visitor, updated continuously. Anonymous-to-known stitched on-the-fly.' },
  { title: 'Real-time next-best-action selection', body: 'Decision engine picks the action with highest expected lift, not the first matching rule.' },
  { title: 'Adapt actions as behavior shifts', body: 'Cancel a planned email if the user just bought. Suppress a popup if the cart was abandoned. Mid-session pivots, not pre-baked flows.' },
  { title: 'Cross-link offers when intent shifts', body: 'Anonymous browser → cart adder → high-intent. Each transition triggers a different offer class.' },
  { title: 'Deliver in milliseconds', body: 'Sub-100ms end-to-end from event to rendered action. Below the threshold of perceptible delay.' },
  { title: 'Log outcomes + learn loops', body: 'Every action and result feeds back into the decisioning model. The system gets smarter with every session.' },
]

const window_compare = [
  { label: 'Anonymous bounce window', value: '8–30s', tone: 'risk' },
  { label: 'Average decisioning window in legacy stacks', value: 'hours – days', tone: 'risk' },
  { label: 'Convertive decisioning window', value: '< 100ms', tone: 'win' },
]

const faqs = [
  {
    question: 'What does "in-session" actually mean in technical terms?',
    answer:
      'A decision computed and rendered before the user navigates away from the current page or browser tab. End-to-end latency under 100ms — event ingest, profile update, scoring, action selection, and DOM render — measured against the user\'s active session, not against a backend schedule.',
  },
  {
    question: 'How is this different from a marketing automation platform with real-time triggers?',
    answer:
      'Marketing automation triggers fire on rules ("cart abandoned for 30 minutes → email"). In-session decisioning ranks every eligible action by predicted lift for the live profile, picks one, and renders it before the visitor bounces. Triggers react to time. Decisioning reacts to intent.',
  },
  {
    question: 'Does the mechanism require ripping out our existing stack?',
    answer:
      'No. Convertive layers on top of Shopify, your ESP (Klaviyo, Braze), your CDP, and your ad platforms. The mechanism consumes events from those systems and emits decisions back to them — popups on-site, suppression signals to ESP, audience syncs to ad platforms.',
  },
  {
    question: 'How does the system avoid showing conflicting offers?',
    answer:
      'The next-best-action ranker is a global selector. When multiple campaigns are eligible — say a discount popup, a product rec, and an email capture — the ranker picks one based on expected conversion lift for that profile. Frequency caps and mutual exclusivity rules enforce one-action-per-session-stage discipline.',
  },
  {
    question: 'What happens if the AI service is slow or unavailable?',
    answer:
      'Fallback to a cached rule-based decision so the user still sees an action. The system is built to fail gracefully — a slower, simpler decision is better than no decision before the bounce.',
  },
]

export default function TheMechanismPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Mechanism', url: absoluteUrl('/the-mechanism') },
  ])
  const howTo = howToSchema(
    stages.map((s) => ({ name: s.title, text: s.desc })),
  )

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, howTo, faqSchema(faqs)]) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-52 pb-16">
        {/* Hero */}
        <section className="text-center lg:text-left mb-16">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Mechanism</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.05]">
            How In-Session Decisioning Works
          </h1>
          <p className="mt-6 text-lg text-[#5C4E44] max-w-3xl leading-relaxed">
            Most marketing acts hours later. We act in milliseconds. Below is the five-stage loop that turns
            an anonymous click into a personalized action before the visitor bounces.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/demo">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Book Demo
              </Button>
            </Link>
            <Link href="/the-metrics">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                See the KPIs that matter
              </Button>
            </Link>
          </div>
        </section>

        {/* Window compare */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {window_compare.map((w) => (
            <div
              key={w.label}
              className={`rounded-xl border p-6 ${
                w.tone === 'win'
                  ? 'bg-[#1A1410] border-[#1A1410] text-[#F5F0EB]'
                  : 'bg-white border-[#E8DDD4] text-[#1A1410]'
              }`}
            >
              <p className={`text-xs uppercase tracking-widest mb-3 ${w.tone === 'win' ? 'text-[#EBBF94]' : 'text-[#9C8B7E]'}`}>
                {w.label}
              </p>
              <p className={`text-3xl font-title ${w.tone === 'win' ? 'text-[#FDF0E0]' : 'text-[#1A1410]'}`}>
                {w.value}
              </p>
            </div>
          ))}
        </section>

        {/* The 5-stage loop */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Loop</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-title text-[#1A1410]">Five stages, under 100 milliseconds</h2>
            <p className="mt-4 text-base text-[#5C4E44] max-w-3xl leading-relaxed">
              Each stage runs in parallel where possible. Total budget from event to rendered action is below the threshold a
              human eye registers as latency. That is the only window that matters — the bounce window is shorter than most
              dashboards refresh.
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((stage, i) => (
              <article
                key={stage.n}
                className="rounded-xl border border-[#E8DDD4] bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[80px_1fr_140px] gap-4 md:gap-8 items-start hover:border-[#D4C4B8] hover:shadow-sm transition-all"
              >
                <div className="text-3xl font-title text-[#C87941]">{stage.n}</div>
                <div>
                  <h3 className="text-xl font-title text-[#1A1410]">{stage.title}</h3>
                  <p className="mt-2 text-sm text-[#5C4E44] leading-relaxed">{stage.desc}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E]">Latency budget</p>
                  <p className="text-base font-mono text-[#1A1410] mt-1">{stage.latency}</p>
                </div>
                {i < stages.length - 1 && (
                  <div className="hidden md:block col-span-3 h-px bg-[#F2ECE6]" />
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Architecture callout */}
        <section className="mb-20 rounded-2xl border border-[#E8DDD4] bg-white p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Architecture</p>
          <h2 className="mt-2 text-3xl font-title text-[#1A1410]">What sits underneath</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-[#1A1410] mb-2">Streaming pipeline</h3>
              <p className="text-sm text-[#5C4E44] leading-relaxed">
                Shopify app + JS SDK push clickstream events into a real-time bus. Modern stream processing fans events
                out to the profile store, decision engine, and analytics in parallel.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1410] mb-2">In-memory live profile</h3>
              <p className="text-sm text-[#5C4E44] leading-relaxed">
                Per-visitor profile kept hot for the active session. Avoids cold reads against a warehouse during the
                decision window. Identity stitched on-the-fly when email or login arrives.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1410] mb-2">Decision engine</h3>
              <p className="text-sm text-[#5C4E44] leading-relaxed">
                Contextual bandit / ranker scores eligible actions per profile. Rule fallbacks when confidence is low.
                Holdouts preserved for measurement.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1A1410] mb-2">Outcome + learning loop</h3>
              <p className="text-sm text-[#5C4E44] leading-relaxed">
                Every impression and outcome feeds back. Policy updates without manual A/B test cycles. The system
                gets sharper as more sessions flow through.
              </p>
            </div>
          </div>
        </section>

        {/* 7 capabilities */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Seven Capabilities</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-title text-[#1A1410]">What in-session decisioning must do</h2>
            <p className="mt-4 text-base text-[#5C4E44] max-w-3xl leading-relaxed">
              A platform either delivers all seven or it is not in-session decisioning. Triggers and rules cover one or
              two. CDPs cover identity but not action. Popups cover action but not intent. The full loop is the bar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <article key={c.title} className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] transition-all">
                <p className="text-xs text-[#C87941] font-mono mb-2">0{i + 1}</p>
                <h3 className="text-base font-semibold text-[#1A1410]">{c.title}</h3>
                <p className="mt-2 text-sm text-[#5C4E44] leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Comparison teaser */}
        <section className="mb-20 rounded-2xl bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#EBBF94] font-bold">Adjacent categories</p>
          <h2 className="mt-2 text-3xl font-title">Why CDPs, popups, retargeting, and session replay each fail this loop</h2>
          <p className="mt-4 text-sm text-[#C4A898] leading-relaxed max-w-3xl">
            Each category solves a slice. None own the full event-to-action loop in under 100ms. Detailed breakdown in
            the comparison page.
          </p>
          <div className="mt-6">
            <Link href="/comparison">
              <Button className="bg-[#FDF0E0] text-[#1A1410] rounded-lg px-6 hover:bg-[#F5E5D0] transition-colors">
                See the comparison →
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-title text-[#1A1410] mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[#F2ECE6] pb-6">
                <h3 className="text-base font-semibold text-[#1A1410] mb-2">{faq.question}</h3>
                <p className="text-sm text-[#5C4E44] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl border border-[#E8DDD4] bg-[#FDF0E0] p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-title text-[#1A1410]">See the loop run on your store</h2>
          <p className="mt-3 text-sm text-[#5C4E44] max-w-xl mx-auto">
            Free 12-hr ROI audit modeled on your traffic. No card. No commitment.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Get free audit
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                Book demo
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
