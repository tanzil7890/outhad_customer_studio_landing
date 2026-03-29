import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'AI Decisioning Engine for In-Session Ecommerce Conversion',
  description:
    'Use predictive intent, value scoring, and next-best-action ranking to choose the strongest in-session intervention for each shopper.',
  path: '/convertive-ai-engine',
  keywords: [
    'next best action engine',
    'predictive intent model',
    'session decisioning',
    'commerce reinforcement learning',
    'real-time conversion optimization',
  ],
  image: '/images/convertive-customer-activation-platform/Optimized-Customer-AI-Assistants.webp',
})

const decisionLayers = [
  {
    title: 'Predictive intent and value',
    text: 'Score likely conversion, bounce risk, and potential value while the session is live.',
  },
  {
    title: 'Action ranking layer',
    text: 'Choose one best action among competing options to reduce noise and improve conversion quality.',
  },
  {
    title: 'Continuous learning loop',
    text: 'Use outcomes to update policy and improve intervention quality over time.',
  },
]

const modelUseCases = [
  'Propensity-based intervention timing',
  'Offer aggressiveness by risk and value segment',
  'Recommendation relevance weighting by in-session context',
  'Holdout-aware policy evaluation for incremental lift',
  'Journey-safe suppression and fallback logic',
  'Adaptive strategy updates from observed outcomes',
]

const faqs = [
  {
    question: 'What makes Convertive\'s AI decisioning different from rule-based personalization?',
    answer:
      'Rule-based systems fire triggers based on static conditions — "if cart value > $100, show this offer." Convertive\'s AI decisioning ranks competing actions by predicted outcome for each individual shopper using live session context, value signals, and intent scores. It selects the action most likely to convert, not just the first rule that matches.',
  },
  {
    question: 'How does the next-best-action engine handle multiple competing interventions?',
    answer:
      'When multiple journeys or actions are eligible for a shopper, the ranking layer selects one winner based on predicted conversion lift, suppression rules, and channel guardrails. This prevents offer collisions and message fatigue that degrade conversion quality.',
  },
  {
    question: 'Does the AI model learn from our store\'s specific data?',
    answer:
      'Yes. The decisioning engine incorporates your store\'s behavioral patterns, conversion signals, and historical outcomes into its scoring. The continuous learning loop updates the policy model as new session outcomes are observed, improving action quality over time.',
  },
  {
    question: 'How do I measure if the AI decisioning is actually lifting conversions?',
    answer:
      'Convertive Reporting includes holdout-aware lift measurement that isolates the incremental impact of AI-selected interventions versus control groups. You can see decision quality by segment, channel, and intervention type from the Reporting dashboard.',
  },
]

export default function ConvertiveAIEnginePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'AI Decisioning', url: absoluteUrl('/convertive-ai-engine') },
  ])
  const product = featureProductSchema({
    name: 'Convertive AI Decisioning Engine',
    description:
      'Predictive next-best-action engine for in-session ecommerce conversion, using intent scoring, value ranking, and continuous learning loops.',
    url: absoluteUrl('/convertive-ai-engine'),
    featureList: [
      'Predictive intent and value scoring',
      'Next-best-action ranking',
      'Continuous learning loop',
      'Holdout-aware policy evaluation',
      'Journey-safe suppression logic',
      'Offer collision prevention',
    ],
  })
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, product, faqSchema(faqs)]) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">Decisioning</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">Convertive Decisioning</h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] max-w-4xl leading-relaxed">
            Move from static rule priority to ranked in-session decisions. Convertive combines predictive modeling,
            context signals, and learning loops to select the next best action moment by moment.
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
          {decisionLayers.map((item) => (
            <article key={item.title} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5">
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-4">Where teams apply the models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modelUseCases.map((item) => (
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
