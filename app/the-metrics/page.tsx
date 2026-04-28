import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Metrics: KPIs for In-Session Revenue Infrastructure',
  description:
    'Conversion rate is a lagging indicator. The eight leading KPIs that define in-session revenue infrastructure — identification rate, decision latency, NBA accuracy, anonymous→known conversion, recovered revenue per session, and more.',
  path: '/the-metrics',
  keywords: [
    'in-session conversion KPIs',
    'anonymous visitor metrics',
    'identification rate',
    'decision latency',
    'next-best-action accuracy',
    'recovered revenue per session',
    'identity drop-off',
  ],
  type: 'article',
})

const groups = [
  {
    label: 'Identity',
    color: '#C87941',
    metrics: [
      {
        name: 'Identification rate',
        formula: 'identified sessions / total sessions',
        target: '15–25%+',
        why: 'How much of your traffic do you ever know? Most stores sit at 2–8%. Every percentage point unlocks owned-channel reach.',
        instrument: 'Count sessions where email, phone, or known login attaches before exit. Divide by total sessions. Track daily.',
      },
      {
        name: 'Time-to-identify',
        formula: 'median seconds from first event → identity capture',
        target: '< 90s for high-intent',
        why: 'The faster you capture identity, the more session left for personalization. Late capture is half a CDP.',
        instrument: 'Log timestamp of first event vs identity event. Bucket by intent score and source. P50 and P95.',
      },
      {
        name: 'Identity drop-off by funnel step',
        formula: '1 − (identified at step N / identified at step N-1)',
        target: '< 30% per step',
        why: 'The Identity Signal Heatmap. Shows where the funnel leaks identity — exit intent popup, checkout, loyalty signup, etc. Reveals the highest-leverage capture moment.',
        instrument: 'Define funnel: landing → engaged → cart → identify → checkout. Plot identification at each step.',
      },
    ],
  },
  {
    label: 'Decisioning',
    color: '#5C7C6B',
    metrics: [
      {
        name: 'Decision latency P50 / P95',
        formula: 'ms from event → rendered action',
        target: '< 100ms P50, < 250ms P95',
        why: 'Anything slower and the bounce wins. Latency is the single most under-measured KPI in personalization stacks.',
        instrument: 'Tag event ingest timestamp. Tag DOM render timestamp. Diff. Pipe to time-series dashboard.',
      },
      {
        name: 'NBA selection accuracy',
        formula: 'lift of selected action vs random eligible action',
        target: '> 1.5× control',
        why: 'The decisioning brain has a job: pick the action that converts. Holdout-aware lift quantifies whether it does.',
        instrument: 'Run 10–20% holdout group on each campaign. Compare conversion rate of NBA-selected vs random or rule-default.',
      },
      {
        name: 'Action coverage',
        formula: 'sessions with ≥1 eligible action / total sessions',
        target: '> 60%',
        why: 'You cannot influence sessions you have no action for. Coverage is the ceiling on revenue impact. Below 60% means most visitors get no intervention.',
        instrument: 'Count sessions where at least one campaign / journey is eligible. Divide by total. Bucket by intent.',
      },
    ],
  },
  {
    label: 'Outcome',
    color: '#1A1410',
    metrics: [
      {
        name: 'In-session lift',
        formula: '(treated CR − holdout CR) / holdout CR',
        target: '+8–25%',
        why: 'The headline KPI. Did real-time intervention move conversion vs doing nothing? Without a holdout, you are guessing.',
        instrument: 'Run platform-level holdout (5–10% of sessions see no Convertive action). Compare CR weekly. Statistical significance over 4 weeks.',
      },
      {
        name: 'Anonymous → known conversion rate',
        formula: 'identified sessions that purchase / identified sessions',
        target: '8–18%',
        why: 'Identification only matters if it converts. Tracks the second leg of the funnel: did capturing identity actually pay off?',
        instrument: 'Cohort by identification source (popup, checkout, loyalty). Track 7-day and 30-day purchase rate.',
      },
      {
        name: 'Recovered revenue per session',
        formula: 'incremental revenue / treated sessions',
        target: '$0.10–$0.80+',
        why: 'Revenue language. Translates lift into a per-session unit so you can compare against ad spend and CAC. The number that gets the CFO nodding.',
        instrument: 'Revenue from treated cohort − revenue from holdout, divided by treated session count. Roll up monthly.',
      },
    ],
  },
]

const faqs = [
  {
    question: 'Why is conversion rate not enough?',
    answer:
      'Conversion rate is a lagging, multi-causal metric. It moves on traffic mix, seasonality, promo cycles, and stack changes — drowning the signal from any one intervention. The KPIs on this page are leading indicators that isolate the in-session revenue infrastructure.',
  },
  {
    question: 'Do I need all eight to start?',
    answer:
      'No. Start with three: identification rate, decision latency P95, and in-session lift (with a holdout). Those three tell you whether the infrastructure exists, runs in real time, and drives revenue. The rest are diagnostics that explain why.',
  },
  {
    question: 'How does this differ from standard ecommerce KPIs?',
    answer:
      'Standard ecommerce KPIs (CR, AOV, sessions, revenue) measure store performance. These measure infrastructure performance — whether your real-time activation layer is doing its job. They sit upstream of CR and AOV and explain movement in those numbers.',
  },
  {
    question: 'How long until I can read these reliably?',
    answer:
      'Latency and coverage metrics are visible in 24 hours. Identification rate and time-to-identify stabilize in a week. In-session lift requires 2–4 weeks of holdout data depending on traffic volume to reach statistical significance.',
  },
]

export default function TheMetricsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Metrics', url: absoluteUrl('/the-metrics') },
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
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Metrics</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.05]">
            The KPIs that matter for in-session revenue infrastructure
          </h1>
          <p className="mt-6 text-lg text-[#5C4E44] max-w-3xl leading-relaxed">
            Conversion rate is a lagging indicator. Below are the eight leading ones — the metrics that tell you whether
            your real-time activation layer actually exists, runs fast enough, and drives revenue.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                See your numbers — free audit
              </Button>
            </Link>
            <Link href="/the-methodology">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                See the measurement methodology
              </Button>
            </Link>
          </div>
        </section>

        {/* Hierarchy callout */}
        <section className="mb-20 rounded-2xl border border-[#E8DDD4] bg-white p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Hierarchy</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-title text-[#1A1410]">Three layers, eight metrics</h2>
          <p className="mt-4 text-sm text-[#5C4E44] leading-relaxed max-w-3xl">
            Identity feeds Decisioning feeds Outcome. If identity capture is broken, decisioning has nothing to act on.
            If decisioning is slow, outcome never moves. Read the stack top-down to find the bottleneck.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {groups.map((g) => (
              <div key={g.label} className="rounded-xl border border-[#E8DDD4] bg-[#FAFAF8] p-5">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                  style={{ backgroundColor: g.color }}
                />
                <span className="text-xs uppercase tracking-widest text-[#1A1410] font-semibold align-middle">{g.label}</span>
                <ul className="mt-3 space-y-1.5">
                  {g.metrics.map((m) => (
                    <li key={m.name} className="text-sm text-[#5C4E44]">
                      <span className="text-[#C87941] mr-1.5">→</span>
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* KPI cards by group */}
        {groups.map((g) => (
          <section key={g.label} className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
              <p className="text-xs uppercase tracking-widest text-[#1A1410] font-bold">{g.label}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {g.metrics.map((m, i) => (
                <article
                  key={m.name}
                  className="rounded-xl border border-[#E8DDD4] bg-white p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all flex flex-col"
                >
                  <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-1">KPI 0{i + 1}</p>
                  <h3 className="text-lg font-title text-[#1A1410] leading-tight">{m.name}</h3>

                  <div className="mt-4 rounded-md bg-[#F5EFE8] border border-[#E8DDD4] p-3 font-mono text-xs text-[#1A1410]">
                    {m.formula}
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#9C8B7E]">Target</span>
                    <span className="text-base font-semibold text-[#C87941]">{m.target}</span>
                  </div>

                  <p className="mt-4 text-sm text-[#5C4E44] leading-relaxed">{m.why}</p>

                  <div className="mt-4 pt-4 border-t border-[#F2ECE6]">
                    <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-1">How to instrument</p>
                    <p className="text-xs text-[#5C4E44] leading-relaxed">{m.instrument}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Reading the dashboard */}
        <section className="mb-20 rounded-2xl bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#EBBF94] font-bold">Reading the dashboard</p>
          <h2 className="mt-2 text-3xl font-title">Where to look first when numbers move</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-[#FDF0E0] mb-2">Outcome flat? → check Decisioning.</h3>
              <p className="text-sm text-[#C4A898] leading-relaxed">
                If lift is flat or negative, latency is too high or the NBA ranker is picking weak actions. Pull P95
                latency and selection-vs-random lift first.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#FDF0E0] mb-2">Decisioning starved? → check Identity.</h3>
              <p className="text-sm text-[#C4A898] leading-relaxed">
                If action coverage is below 40%, you do not know enough about the visitor to act. Identification rate
                and identity drop-off explain why.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#FDF0E0] mb-2">Identity capture stuck? → check the funnel step.</h3>
              <p className="text-sm text-[#C4A898] leading-relaxed">
                The Identity Signal Heatmap shows which step bleeds the most. Most teams find one step that loses 50%+
                — fix that, double identification.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#FDF0E0] mb-2">Numbers good, revenue flat? → check coverage.</h3>
              <p className="text-sm text-[#C4A898] leading-relaxed">
                Per-session lift is real but only on covered sessions. If coverage is 30%, total revenue impact is
                capped at 30% × per-session lift. Expand action library.
              </p>
            </div>
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
          <h2 className="text-2xl sm:text-3xl font-title text-[#1A1410]">Want these numbers on your store?</h2>
          <p className="mt-3 text-sm text-[#5C4E44] max-w-xl mx-auto">
            Free 12-hr ROI audit benchmarks your store on identification rate, leakage, and recoverable revenue.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Get free audit
              </Button>
            </Link>
            <Link href="/the-mechanism">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                How the mechanism works
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
