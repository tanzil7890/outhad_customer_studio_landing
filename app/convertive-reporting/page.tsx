import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Reporting',
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

export default function ConvertiveReportingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Reporting', url: absoluteUrl('/convertive-reporting') },
  ])
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">Reporting</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">Convertive Reporting</h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] max-w-4xl leading-relaxed">
            Measure what matters for in-session conversion: identity progression quality, decision effectiveness, and
            journey-level lift. Reporting is designed for both operators and leadership.
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
          {reportingPillars.map((item) => (
            <article key={item.title} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5">
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-4">Dashboard modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dashboardModules.map((item) => (
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
