import type { Metadata } from 'next'
import Link from 'next/link'
import AgentStudioSlider from '@/components/agent-studio-slider'
import Footer from '@/components/footer'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Outhad Studio — Agent Orchestration Layer',
  description:
    'Outhad Studio is an orchestration layer and builder for agent systems: compose, deploy, and supervise multi-agent workflows without rebuilding the plumbing each time.',
  path: '/outhad-studio',
  keywords: [
    'agent orchestration layer',
    'multi-agent builder',
    'AI agent workflow builder',
    'agent runtime',
    'Outhad Studio',
  ],
})

const capabilities = [
  {
    name: 'Compose',
    description:
      'Build agent workflows visually. Steps, tools, branches, and handoffs are defined in one place instead of scattered across glue code.',
  },
  {
    name: 'Orchestrate',
    description:
      'Route work across multiple agents and models, with the sequencing, retries, and fallbacks handled by the layer rather than by each agent.',
  },
  {
    name: 'Remember',
    description:
      'A shared memory layer gives agents persistent context, so state carries across steps and sessions instead of being rebuilt on every call.',
  },
  {
    name: 'Improve',
    description:
      'Streaming feedback and a reinforcement loop close the gap between what shipped and what worked, without waiting on a batch cycle.',
  },
]

export default function OuthadStudioPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Outhad Studio', url: absoluteUrl('/outhad-studio') },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="px-6 pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[hsl(var(--app-text-muted))] tracking-[0.2em] uppercase mb-8">Outhad Studio</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1410] leading-[1.1] tracking-tight mb-8">
            An orchestration layer for agent systems.
          </h1>
          <p className="text-lg sm:text-xl text-[hsl(var(--app-text-muted))] leading-relaxed max-w-2xl">
            A builder for composing, deploying, and supervising agents — so the model is the part you think about,
            not the plumbing around it.
          </p>
        </div>
      </section>

      {/* Product screenshots */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[hsl(var(--app-border))] rounded-xl overflow-hidden bg-[hsl(var(--app-card))]">
            <AgentStudioSlider />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[hsl(var(--app-border))] border border-[hsl(var(--app-border))]">
            {capabilities.map((capability) => (
              <div key={capability.name} className="bg-[hsl(var(--app-background))] p-8">
                <h2 className="text-base font-semibold text-[#1A1410] mb-3">{capability.name}</h2>
                <p className="text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context + CTA */}
      <section className="px-6 pb-32 sm:pb-40">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-[hsl(var(--app-border))] pt-12">
            <p className="text-base sm:text-lg text-[#1A1410] leading-relaxed max-w-2xl mb-8">
              Outhad Studio comes out of the same lab as{' '}
              <Link href="/convertive" className="text-[#C87941] hover:underline">
                Convertive
              </Link>
              , where the constraints are unforgiving: decide during a live session, in milliseconds, on traffic that
              does not wait. The Studio is that work made general.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-[#1A1410] text-[#F5F0EB] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#C87941] transition-colors duration-200 w-fit"
              >
                Talk to us
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/convertive"
                className="inline-flex items-center justify-center gap-2 border border-[hsl(var(--app-border))] text-[#1A1410] rounded-full px-6 py-3 text-sm font-medium hover:bg-[hsl(var(--app-surface))] hover:border-[#1A1410]/30 transition-all duration-200 w-fit"
              >
                See Convertive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
