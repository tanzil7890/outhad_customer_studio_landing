import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Audit: How to Find Revenue Leaks in Anonymous Traffic',
  description:
    'A 7-step DIY audit for finding revenue leaks in anonymous traffic. Anonymous %, intent-weighted bounce, identity capture rate, cart funnel, time-to-first-touch, attribution gaps, and ROAS leakage — with benchmarks.',
  path: '/the-audit',
  keywords: [
    'anonymous traffic audit',
    'revenue leak audit ecommerce',
    'identity capture rate audit',
    'cart abandonment funnel audit',
    'roas leakage analysis',
    'in-session conversion audit',
  ],
  type: 'article',
})

const steps = [
  {
    n: '01',
    title: 'Quantify your anonymous traffic share',
    do: 'Pull session count and identified-session count for the last 30 days. Identified = sessions where email, phone, or known login attached at any point.',
    formula: 'anonymous % = 1 − (identified sessions / total sessions)',
    benchmark: 'Most stores: 92–98%. Below 90% means strong identity capture; above 96% means severe leakage exposure.',
    redFlag: 'If you cannot answer this question in your analytics tool, you do not have identity tracking instrumented. Stop here, fix that first.',
  },
  {
    n: '02',
    title: 'Find the intent-weighted bounce',
    do: 'Filter sessions to "engaged" — 3+ pageviews OR 60+ second dwell OR scroll depth > 60%. Compute bounce rate within that cohort. Compare against unfiltered bounce rate.',
    formula: 'high-intent bounce = engaged sessions that bounced / engaged sessions',
    benchmark: 'High-intent bounce > 50% is leakage. Healthy stores sit at 30–45%.',
    redFlag: 'A flat bounce rate hides this. The cohort that browsed but left is what you can recover.',
  },
  {
    n: '03',
    title: 'Measure identity capture rate by step',
    do: 'Plot identification rate at each funnel step: landing → engaged → cart → checkout → purchase. Use the Identity Signal Heatmap framework.',
    formula: 'capture at step N = identified sessions at step N / sessions reaching step N',
    benchmark: 'Exit-intent popup: 15–20%. Cart save: +5%. Checkout: +8–12%. If any step is < 5% gain, it is broken or missing.',
    redFlag: 'Most stores have one step doing 80% of the capture. Fragile. Add a second.',
  },
  {
    n: '04',
    title: 'Walk the cart-abandonment funnel',
    do: 'Build a funnel: add-to-cart → checkout-start → checkout-complete. Compute drop-off at each step. Cross-reference identified vs anonymous within each step.',
    formula: 'cart drop-off = 1 − (checkout-complete / add-to-cart)',
    benchmark: 'Industry average: ~70%. Below 60% is good. Above 75% is leakage.',
    redFlag: 'If anonymous cart adders are 80%+ of total cart adders and you have no identity-capture mechanism on the cart page, that is the leak.',
  },
  {
    n: '05',
    title: 'Audit time-to-first-touch after exit',
    do: 'For sessions that captured identity but did not convert, measure median time from exit to first follow-up message (email, SMS, ad).',
    formula: 'time-to-first-touch = median(timestamp of first follow-up − exit timestamp)',
    benchmark: 'Under 30 minutes is competitive. Next-day batch is leakage. The bounce window passes in seconds; the recovery window passes in hours.',
    redFlag: 'If your ESP fires cart-abandonment emails the next morning, you are losing the recovery to anyone who acts in the same session.',
  },
  {
    n: '06',
    title: 'Find cross-channel attribution gaps',
    do: 'Pick 50 conversions at random. Trace the touch chain: ad → site → email → SMS → purchase. Check whether your attribution tool can connect every step.',
    formula: '% of conversions with full chain visibility',
    benchmark: 'Below 60% chain visibility means you cannot prove which channel converted. You are guessing on spend.',
    redFlag: 'Anonymous-to-known transitions are the most common break point. If web events do not stitch to email opens to SMS clicks, you have parallel siloed analytics.',
  },
  {
    n: '07',
    title: 'Quantify ROAS leakage on retargeting',
    do: 'Pull retargeting ad spend and conversions for the last 30 days. Compare cost per conversion against owned-channel cost per conversion (email, SMS to identified users).',
    formula: 'leakage = retargeting CAC − owned-channel CAC, × converted users that could have been owned',
    benchmark: 'If owned CAC < 1/5 of retargeting CAC, every identified user you fail to capture is paid retargeting tax.',
    redFlag: 'The cheapest channel is the one you own. The leak is failing to convert anonymous to owned before retargeting becomes the only option.',
  },
]

const tools = [
  { name: 'GA4', use: 'Sessions, engagement, funnel drop-off' },
  { name: 'Shopify analytics', use: 'Orders, cart starts, checkout funnel, AOV' },
  { name: 'ESP export (Klaviyo / Braze)', use: 'Identification rate, send latency, click-through' },
  { name: 'Ad platform reports', use: 'Retargeting CAC, ROAS, audience overlap' },
  { name: 'Attribution tool (or spreadsheet)', use: 'Touch-chain visibility' },
  { name: 'Spreadsheet', use: 'Where the math actually happens' },
]

const faqs = [
  {
    question: 'How long does the DIY audit take?',
    answer:
      'Plan a half day for data pulls and one day for the math. The bottleneck is usually identity tracking — if it is not instrumented, you spend that day fixing instrumentation before you can audit anything.',
  },
  {
    question: 'What if I do not have identity events instrumented?',
    answer:
      'Start with steps 1, 2, and 4 — those work on session-level data alone. Steps 3, 5, and 6 require identity tracking. The audit will surface that gap as the first thing to fix.',
  },
  {
    question: 'Can I just have you do it?',
    answer:
      'Yes. The free 12-hr ROI audit runs this exact framework on your store and returns a 2-slide breakdown. Faster, more thorough, and benchmarked against comparable stores. Linked at the bottom.',
  },
  {
    question: 'Are these benchmarks reliable?',
    answer:
      'They are typical ranges for mid-market DTC ecommerce on Shopify. Your numbers will vary by category, AOV, and traffic mix. Use them to flag obvious leaks (anything 2×+ outside the range), not to grade incremental performance.',
  },
  {
    question: 'What do I do once I have the leak number?',
    answer:
      'Pick the largest leak category and fix the highest-leverage step. The methodology page covers how to size each leak; the metrics page covers what to track post-fix; the mechanism page covers how Convertive executes the fix in real time.',
  },
]

export default function TheAuditPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Audit', url: absoluteUrl('/the-audit') },
  ])
  const howTo = howToSchema(steps.map((s) => ({ name: s.title, text: s.do })))

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, howTo, faqSchema(faqs)]) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-52 pb-16">
        {/* Hero */}
        <section className="text-center lg:text-left mb-16">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Audit</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.05]">
            How to find revenue leaks in anonymous traffic
          </h1>
          <p className="mt-6 text-lg text-[#5C4E44] max-w-3xl leading-relaxed">
            Seven steps you can run yourself. Each step has a formula, a benchmark, and a red flag. By the end you will
            have a defensible number for monthly revenue leaking out of your anonymous traffic.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#step-01">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Start the 7 steps
              </Button>
            </Link>
            <Link href="/audit">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                Skip it — get free audit instead
              </Button>
            </Link>
          </div>
        </section>

        {/* Tools */}
        <section className="mb-20 rounded-2xl border border-[#E8DDD4] bg-white p-8">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">What you need</p>
          <h2 className="mt-2 text-2xl font-title text-[#1A1410]">Tools</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((t) => (
              <div key={t.name} className="rounded-lg border border-[#E8DDD4] bg-[#FAFAF8] p-4">
                <p className="text-sm font-semibold text-[#1A1410]">{t.name}</p>
                <p className="text-xs text-[#5C4E44] mt-1">{t.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7 Steps */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The 7 Steps</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-title text-[#1A1410]">Run them in order</h2>
            <p className="mt-4 text-base text-[#5C4E44] max-w-3xl leading-relaxed">
              Each step builds on the one before. Step 1 sizes the universe. Step 2 narrows to the recoverable cohort.
              Steps 3–6 explain the failure modes. Step 7 puts a dollar on the leak.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((s) => (
              <article
                key={s.n}
                id={`step-${s.n}`}
                className="rounded-2xl border border-[#E8DDD4] bg-white p-6 sm:p-8 hover:border-[#D4C4B8] hover:shadow-sm transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-6">
                  <div className="text-3xl font-title text-[#C87941]">{s.n}</div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-title text-[#1A1410]">{s.title}</h3>

                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-1">Do this</p>
                      <p className="text-sm text-[#5C4E44] leading-relaxed">{s.do}</p>
                    </div>

                    <div className="mt-4 rounded-md bg-[#F5EFE8] border border-[#E8DDD4] p-3 font-mono text-xs text-[#1A1410]">
                      {s.formula}
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-1">Benchmark</p>
                        <p className="text-xs text-[#5C4E44] leading-relaxed">{s.benchmark}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#C87941] mb-1">Red flag</p>
                        <p className="text-xs text-[#5C4E44] leading-relaxed">{s.redFlag}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* What good looks like */}
        <section className="mb-20 rounded-2xl bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#EBBF94] font-bold">What good looks like</p>
          <h2 className="mt-2 text-3xl font-title">Compounded benchmarks</h2>
          <p className="mt-4 text-sm text-[#C4A898] leading-relaxed max-w-3xl">
            Hitting one benchmark is noise. Hitting these in combination means your anonymous-traffic activation layer
            is actually working.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Anonymous traffic share < 92%',
              'High-intent bounce < 45%',
              'Cumulative identification by checkout > 25%',
              'Cart drop-off < 65%',
              'Time-to-first-touch < 30 minutes',
              'Attribution chain visibility > 70%',
              'Owned-channel CAC < 1/5 of retargeting CAC',
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-[#FDF0E0]">
                <span className="text-[#EBBF94] mt-0.5">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
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
          <h2 className="text-2xl sm:text-3xl font-title text-[#1A1410]">Or skip the spreadsheet</h2>
          <p className="mt-3 text-sm text-[#5C4E44] max-w-xl mx-auto">
            We run this exact framework on your store and deliver a 2-slide breakdown in 12 hours. Free. No card. No call required.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Get free 12-hr audit
              </Button>
            </Link>
            <Link href="/the-methodology">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-white">
                See the methodology
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
