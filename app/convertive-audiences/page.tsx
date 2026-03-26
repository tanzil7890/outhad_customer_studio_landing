import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'

export const metadata: Metadata = {
  title: 'Convertive Audiences - Session-Aware Segmentation and Identity Progression',
  description:
    'Create real-time audiences that update with live behavior. Convertive Audiences combines segmentation with anonymous-to-known identity progression and predictive scoring.',
  keywords: [
    'real-time audiences',
    'session-aware segmentation',
    'predictive audience scoring',
    'anonymous identity progression',
    'commerce personalization segments',
  ],
  alternates: {
    canonical: '/convertive-audiences',
  },
}

const capabilities = [
  {
    title: 'Session-aware segments',
    text: 'Segments update instantly as users browse, add to cart, or change intent.',
  },
  {
    title: 'Identity progression segments',
    text: 'Track and optimize how visitors move from anonymous to known profiles.',
  },
  {
    title: 'Predictive scoring hooks',
    text: 'Use propensity and value signals to prioritize interventions by likely impact.',
  },
]

const templateExamples = [
  {
    title: 'High-intent anonymous visitors',
    points: [
      'Multiple product views in one category',
      'Checkout hesitation detected',
      'No known identity yet',
    ],
  },
  {
    title: 'Identity-ready shoppers',
    points: ['Strong interest with repeat sessions', 'Eligible for progressive capture prompt', 'Low-friction save-for-later offer'],
  },
  {
    title: 'Churn-risk returning buyers',
    points: ['Declining engagement trend', 'Drop in purchase cadence', 'Retention-first journey eligibility'],
  },
]

export default function ConvertiveAudiencesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">Segmentation</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">Convertive Audiences</h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] max-w-4xl leading-relaxed">
            Build segments that reflect what shoppers are doing right now, not what they did yesterday. Combine live
            behavior, identity progression, and scoring to trigger better actions in-session.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="https://cal.com/tanzil-convertive" target="_blank">
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
          {capabilities.map((item) => (
            <article key={item.title} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5">
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-6">Audience templates built for conversion decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templateExamples.map((template) => (
              <article key={template.title} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-5">
                <h3 className="text-lg font-title text-[hsl(var(--app-text))]">{template.title}</h3>
                <div className="mt-3 space-y-2">
                  {template.points.map((point) => (
                    <p key={point} className="text-sm text-[hsl(var(--app-text-muted))]">
                      - {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
