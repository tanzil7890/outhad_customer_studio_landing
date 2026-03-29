import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Journey Orchestration',
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

export default function ConvertiveJourneyOrchestrationPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Journey Orchestration', url: absoluteUrl('/convertive-journey-orchestration') },
  ])
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">Orchestration</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">Convertive Journey Orchestration</h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] max-w-4xl leading-relaxed">
            Run coherent, session-aware journeys across web, checkout, email, SMS, and ads. Convertive coordinates
            message timing, suppression, and branching so shoppers see one intelligent sequence.
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
          {orchestrationBlocks.map((item) => (
            <article key={item.title} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5">
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-4">Operational controls that protect conversion quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {controlPoints.map((item) => (
              <p key={item} className="text-sm text-[hsl(var(--app-text))]">
                - {item}
              </p>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
