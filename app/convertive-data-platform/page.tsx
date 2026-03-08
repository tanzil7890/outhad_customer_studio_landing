import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../../components/footer'
import { Button } from '../../components/ui/toast/button'

export const metadata: Metadata = {
  title: 'Convertive Data Platform - Real-Time Identity and Event Foundation',
  description:
    'Unify clickstream, source, cart, and profile data in real time. Convertive Data Platform powers anonymous-to-known identity stitching for in-session conversion.',
  keywords: [
    'real-time data platform',
    'identity stitching',
    'anonymous to known profile',
    'event pipeline for ecommerce',
    'in-session conversion data layer',
  ],
  alternates: {
    canonical: '/convertive-data-platform',
  },
}

const foundation = [
  {
    title: 'Streaming event ingestion',
    text: 'Capture click, scroll, pause, cart, and checkout events with low-latency processing.',
  },
  {
    title: 'Live profile store',
    text: 'Maintain one evolving profile that merges anonymous and known activity in-session.',
  },
  {
    title: 'Activation-ready outputs',
    text: 'Expose profile, intent, and eligibility signals instantly to decisioning and journeys.',
  },
]

const modules = [
  'Session event pipeline with source context',
  'Anonymous identity graph and profile stitching',
  'Cross-device profile continuity controls',
  'Warehouse-friendly sync and export paths',
  'Journey-safe state snapshots for orchestration',
  'Privacy and consent-aware profile governance',
]

export default function ConvertiveDataPlatformPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-44 sm:pt-52">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center lg:text-left mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))]">
            Foundation
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] font-title">
            Convertive Data Platform
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--app-text-muted))] font-mono max-w-4xl leading-relaxed">
            Build a real-time data foundation for in-session conversion. Stitch anonymous and known activity into one
            live profile so every decision uses current shopper context.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="https://cal.com/tanzil-convertive" target="_blank">
              <Button className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-full px-8">
                Book Demo
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="font-mono rounded-full px-8">
                See In-Session Flow
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-14">
          {foundation.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5"
            >
              <h2 className="text-xl font-title text-[hsl(var(--app-text))]">{item.title}</h2>
              <p className="mt-3 text-sm font-mono text-[hsl(var(--app-text-muted))] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mb-16 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/40 p-8">
          <h2 className="text-3xl font-title text-[hsl(var(--app-text))] mb-4">Core modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modules.map((item) => (
              <p key={item} className="text-sm font-mono text-[hsl(var(--app-text))]">
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
