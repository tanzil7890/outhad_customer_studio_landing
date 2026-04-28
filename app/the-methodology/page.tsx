import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Methodology: How We Measure Anonymous Session Leakage',
  description:
    'A measurement framework for anonymous session leakage. Definition, formula, four leak categories, and the Identity Signal Heatmap that quantifies revenue lost in real time.',
  path: '/the-methodology',
  keywords: [
    'anonymous session leakage',
    'ecommerce revenue leakage formula',
    'identity signal heatmap',
    'anonymous traffic loss measurement',
    'in-session revenue measurement',
    'recoverable revenue model',
  ],
  type: 'article',
})

const leakCategories = [
  {
    n: '01',
    title: 'Bounce-before-identify',
    desc: 'High-intent anonymous visitor lands, browses, leaves without ever providing an email or phone. No retargeting hook. No remarketing email. Pure loss. Largest leak by volume.',
    signals: ['Sessions with 3+ pageviews and 0 identity events', 'Source: paid social, paid search', 'Above-median scroll depth, no engagement event'],
  },
  {
    n: '02',
    title: 'Cart abandonment leakage',
    desc: 'Visitor adds to cart, never identifies, never checks out. Industry baseline: ~70%. Without identity, you have nothing to follow up with. Largest leak by dollar.',
    signals: ['Add-to-cart without checkout-start', 'Checkout-start without complete', 'Time on cart > 60s with no progress'],
  },
  {
    n: '03',
    title: 'Intent-mismatch leakage',
    desc: 'Visitor sees a generic experience that does not match their actual intent. Bargain hunter shown VIP messaging. Comparison shopper shown a discount. Wrong action, wasted impression.',
    signals: ['Action shown but no engagement', 'Action shown but bounce within 5s', 'Repeat visit with same generic offer'],
  },
  {
    n: '04',
    title: 'Channel miss-fire leakage',
    desc: 'Identity captured but the follow-up fires too late, in the wrong channel, or after the visitor already converted. Email sent next day when SMS in 5 minutes would have closed it.',
    signals: ['Email send > 30 min after exit', 'Channel sent after purchase already complete', 'Duplicate offer across web + email + SMS'],
  },
]

const formulaSteps = [
  {
    n: '01',
    title: 'Anonymous session count',
    body: 'Total sessions in period × (1 − identification rate). Most stores: 92–98% of sessions.',
  },
  {
    n: '02',
    title: 'Intent-weighted bounce rate',
    body: 'Filter to sessions with intent score above threshold (3+ pageviews, dwell > 30s, scroll > 60%). Compute bounce rate within that cohort. These are the high-value leaks.',
  },
  {
    n: '03',
    title: 'Recoverable conversion delta',
    body: 'Apply expected lift from in-session intervention (8–25% per Convertive benchmarks) to the high-intent anonymous cohort. The delta is the conversion you should be capturing but are not.',
  },
  {
    n: '04',
    title: 'Translate to revenue',
    body: 'Recoverable conversions × average order value = monthly revenue at risk. This is the leakage number. Annualize for the boardroom.',
  },
]

const heatmapStops = [
  { stage: 'Landing', identified: '0%', note: 'Cookie attached, but no identity yet' },
  { stage: 'Engaged (3+ pages)', identified: '~3%', note: 'Returning known users only' },
  { stage: 'Exit-intent popup', identified: '15–20%', note: 'Highest single capture step' },
  { stage: 'Cart add', identified: '+5%', note: 'Save-cart or checkout login' },
  { stage: 'Checkout', identified: '+8–12%', note: 'Email field on checkout page' },
  { stage: 'Loyalty / post-purchase', identified: '+3–5%', note: 'Account creation post-conversion' },
]

const faqs = [
  {
    question: 'Why is "anonymous session leakage" a more useful metric than bounce rate?',
    answer:
      'Bounce rate treats every bounce equally. Leakage weights each bounce by intent — a visitor who scrolled, browsed three categories, and added to cart is worth orders of magnitude more than a one-pageview drive-by. Leakage isolates the recoverable cohort. Bounce rate hides it.',
  },
  {
    question: 'How is this different from a CDP or analytics tool?',
    answer:
      'Analytics tools tell you that bounces happened. CDPs tell you about identified users. Neither quantifies the dollar value of anonymous traffic that should have been intercepted in real time. The methodology fills that gap by combining intent scoring, identification probability, and lift benchmarks into a single recoverable-revenue number.',
  },
  {
    question: 'Do I need Convertive installed to measure this?',
    answer:
      'No. The framework works on any store with GA4 or equivalent analytics. Convertive accelerates measurement by tagging intent signals and identification events natively, but the methodology is platform-agnostic. The 12-hr free audit applies it to your store without any installation.',
  },
  {
    question: 'What benchmarks do you use for "expected lift"?',
    answer:
      'Public industry data (8–15% on cart-recovery interventions, 10–25% on personalized offers vs generic) plus Convertive\'s own deployment data. The audit tunes lift assumptions to your traffic mix, AOV, and intent distribution rather than applying a flat multiplier.',
  },
  {
    question: 'Why is the Identity Signal Heatmap part of the methodology?',
    answer:
      'Leakage in aggregate tells you the size of the problem. The heatmap tells you where to fix it. By plotting identification rate at each funnel step, the heatmap reveals which step bleeds the most identity — and therefore where a small intervention recovers the most revenue.',
  },
]

export default function TheMethodologyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Methodology', url: absoluteUrl('/the-methodology') },
  ])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, faqSchema(faqs)]) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-52 pb-16">
        {/* Hero */}
        <section className="text-center lg:text-left mb-16">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Methodology</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.05]">
            How we measure anonymous session leakage
          </h1>
          <p className="mt-6 text-lg text-[#5C4E44] max-w-3xl leading-relaxed">
            Roughly 70% of carts get abandoned. Around 95% of sessions stay anonymous. Somewhere inside those numbers
            is recoverable revenue. The methodology below quantifies it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Apply it to my store — free audit
              </Button>
            </Link>
            <Link href="/the-metrics">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                See the underlying KPIs
              </Button>
            </Link>
          </div>
        </section>

        {/* Definition card */}
        <section className="mb-16 rounded-2xl border border-[#1A1410] bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#EBBF94] font-bold">Definition</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-title">Anonymous Session Leakage</h2>
          <p className="mt-4 text-base text-[#C4A898] leading-relaxed">
            The dollar value of anonymous traffic that left without an intervention strong enough to convert or capture
            identity, weighted by the intent each session demonstrated.
          </p>
          <div className="mt-6 rounded-md bg-[#2D2420] border border-[#3D3028] p-5 font-mono text-sm text-[#FDF0E0]">
            Leakage = Σ (anonymous session × intent score × bounce probability × expected AOV × recoverable lift)
          </div>
          <p className="mt-4 text-xs text-[#7A6558]">
            Intent score gates which sessions count. Recoverable lift is the conversion delta in-session intervention
            would have produced. Both are what separate this from raw bounce-rate math.
          </p>
        </section>

        {/* 4 leak categories */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Leak Categories</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-title text-[#1A1410]">Where revenue actually leaks</h2>
            <p className="mt-4 text-base text-[#5C4E44] max-w-3xl leading-relaxed">
              Total leakage is the sum of four distinct failure modes. Each has its own diagnostic signals and its own
              fix. Mixing them is why most teams cannot find the bleed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {leakCategories.map((c) => (
              <article key={c.n} className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all">
                <p className="text-2xl font-title text-[#C87941] mb-3">{c.n}</p>
                <h3 className="text-xl font-title text-[#1A1410]">{c.title}</h3>
                <p className="mt-3 text-sm text-[#5C4E44] leading-relaxed">{c.desc}</p>
                <div className="mt-4 pt-4 border-t border-[#F2ECE6]">
                  <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-2">Diagnostic signals</p>
                  <ul className="space-y-1.5">
                    {c.signals.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs text-[#5C4E44]">
                        <span className="text-[#C87941] mt-0.5">→</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* The 4-step formula */}
        <section className="mb-20 rounded-2xl border border-[#E8DDD4] bg-white p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Formula</p>
          <h2 className="mt-2 text-3xl font-title text-[#1A1410]">Four steps to a leakage number</h2>
          <p className="mt-4 text-sm text-[#5C4E44] leading-relaxed max-w-3xl">
            Walk through these in order. Step 1 is volume. Step 2 narrows to recoverable. Step 3 applies a defensible
            lift assumption. Step 4 translates to revenue. The output is one number you can put on a slide.
          </p>

          <div className="mt-8 space-y-4">
            {formulaSteps.map((s) => (
              <div key={s.n} className="rounded-xl border border-[#E8DDD4] bg-[#FAFAF8] p-5 grid grid-cols-1 md:grid-cols-[60px_1fr] gap-4 items-start">
                <div className="text-2xl font-title text-[#C87941]">{s.n}</div>
                <div>
                  <h3 className="text-base font-semibold text-[#1A1410]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#5C4E44] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Identity Signal Heatmap */}
        <section className="mb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Identity Signal Heatmap</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-title text-[#1A1410]">Where in the funnel identity actually arrives</h2>
            <p className="mt-4 text-base text-[#5C4E44] max-w-3xl leading-relaxed">
              The aggregate leakage number tells you the size of the bleed. The heatmap tells you which step is doing
              the bleeding. Each row shows cumulative identification at a stage in the journey — and the gap between
              rows is the optimization target.
            </p>
          </div>

          <div className="rounded-xl border border-[#E8DDD4] bg-white overflow-hidden">
            <div className="grid grid-cols-[1fr_140px_2fr] bg-[#1A1410] text-[#FDF0E0] text-xs uppercase tracking-widest p-4">
              <div>Stage</div>
              <div className="text-right">Identified</div>
              <div className="pl-6">Note</div>
            </div>
            {heatmapStops.map((row, i) => (
              <div
                key={row.stage}
                className={`grid grid-cols-[1fr_140px_2fr] p-4 items-center text-sm ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                } border-t border-[#F2ECE6]`}
              >
                <div className="text-[#1A1410] font-medium">{row.stage}</div>
                <div className="text-right font-mono text-[#C87941] font-semibold">{row.identified}</div>
                <div className="pl-6 text-[#5C4E44] text-xs leading-relaxed">{row.note}</div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-[#9C8B7E]">
            Numbers above are typical Convertive benchmarks for mid-market DTC stores. Your distribution will differ —
            the audit measures yours.
          </p>
        </section>

        {/* What we fix */}
        <section className="mb-20 rounded-2xl bg-[#FDF0E0] border border-[#EBBF94] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">From measurement to action</p>
          <h2 className="mt-2 text-3xl font-title text-[#1A1410]">A leakage number on its own changes nothing</h2>
          <p className="mt-4 text-sm text-[#5C4E44] leading-relaxed max-w-3xl">
            The methodology exists so that intervention has a target. Once you know which leak category dominates and
            which heatmap stop bleeds the most, the fix is concrete — capture identity earlier, rank actions better,
            tighten channel timing. The mechanism page covers how Convertive executes those fixes in real time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/the-mechanism">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-6 hover:bg-[#2D2420] transition-colors">
                See the mechanism →
              </Button>
            </Link>
            <Link href="/the-audit">
              <Button variant="outline" className="rounded-lg px-6 border-[#1A1410] text-[#1A1410] hover:bg-white">
                Run the audit yourself
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
        <section className="rounded-2xl border border-[#E8DDD4] bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-title text-[#FDF0E0]">Get your leakage number in 12 hours</h2>
          <p className="mt-3 text-sm text-[#C4A898] max-w-xl mx-auto">
            Free ROI audit applies the methodology to your store and returns a 2-slide breakdown. No card, no call required.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button className="bg-[#FDF0E0] text-[#1A1410] rounded-lg px-8 hover:bg-[#F5E5D0] transition-colors">
                Get free audit
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="rounded-lg px-8 border-[#FDF0E0] text-[#FDF0E0] hover:bg-[#2D2420]">
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
