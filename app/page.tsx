import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { buildMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | Applied Intelligence Research Lab`,
  appendSiteName: false,
  description:
    'Outhad AI is a research and product lab building systems that decide in milliseconds — and the orchestration layer that puts them to work. Makers of Convertive, Outhad Studio, KoraCode, and ContextKit.',
  path: '/',
  keywords: [
    'Outhad AI',
    'AI research lab',
    'applied intelligence',
    'real-time decisioning',
    'agent orchestration',
    'multi-agent systems',
    'agentic harness',
    'browser agent',
    'agentic memory layer',
    'long-term memory for AI agents',
  ],
})

const isExternal = (href: string) => /^https?:\/\//.test(href)

const work = [
  {
    name: 'Convertive',
    href: 'https://www.tryconvertive.com/',
    description:
      'Real-time customer activation for ecommerce. Predicts intent from live behavior and intervenes during the session — before an anonymous visitor leaves.',
  },
  {
    name: 'Outhad Studio',
    href: '/outhad-studio',
    description:
      'An orchestration layer and builder for agent systems. Compose, deploy, and supervise multi-agent workflows without rebuilding the plumbing each time.',
  },
  {
    name: 'KoraCode',
    href: 'https://kcode.outhad.com/',
    description:
      'An open-source agentic harness for the browser. Describe a web task from the terminal and it drives a real browser — step by step, in view, and asking before anything irreversible.',
  },
  {
    name: 'Outhad ContextKit',
    href: 'https://contextkit.outhad.com/',
    description:
      'An open-source agentic memory layer. Agents carry persistent context across users and sessions — a temporal, causal knowledge graph that recalls only what matters, with PII encryption built in.',
  },
  {
    name: 'Streaming decisions & RL',
    href: null,
    badge: 'Soon',
    description:
      'Decisioning under hard latency budgets: models that have to answer in milliseconds, improved by a continuous optimization loop rather than a nightly batch.',
  },
  {
    name: 'Synor',
    href: null,
    description:
      'Incremental data pipelines for AI and data systems. It can power AI indexing, RAG ingestion, document extraction, knowledge graphs, conventional ETL, and stream-to-store workflows without introducing a separate pipeline DSL.',
  },
]

const linesOfWork = [
  'Decisioning under real cost and latency constraints',
  'Agent systems that can be composed, supervised, and shipped',
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      {/* Hero */}
      <section className="px-6 pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[hsl(var(--app-text-muted))] tracking-[0.2em] uppercase mb-8">
            Outhad AI Research Lab
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1410] leading-[1.1] tracking-tight mb-8">
            Applied intelligence for the live session.
          </h1>
          <p className="text-lg sm:text-xl text-[hsl(var(--app-text-muted))] leading-relaxed max-w-2xl">
            Outhad AI is a research and product lab. We build systems that decide in milliseconds — and the
            orchestration layer that puts them to work.
          </p>
        </div>
      </section>

      {/* What we build */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[hsl(var(--app-border))] border border-[hsl(var(--app-border))]">
            {work.map((item, index) => {
              // An odd card count would leave an empty, border-coloured cell in the
              // two-column grid, so the last card takes the full row instead.
              const span = work.length % 2 === 1 && index === work.length - 1 ? ' sm:col-span-2' : ''

              const body = (
                <>
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h2 className="text-base font-semibold text-[#1A1410] group-hover:text-[#C87941] transition-colors duration-200">
                      {item.name}
                    </h2>
                    {item.href && (
                      <span
                        aria-hidden="true"
                        className="text-[hsl(var(--app-text-muted))] group-hover:text-[#C87941] transition-all duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    )}
                    {item.badge && (
                      <span className="shrink-0 bg-[#F7E4D0] border border-[#EBBF94] px-1.5 py-0.5 text-[10px] leading-none tracking-[0.18em] uppercase text-[#7A4420]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{item.description}</p>
                </>
              )

              if (!item.href) {
                return (
                  <div key={item.name} className={`group bg-[hsl(var(--app-background))] p-8${span}`}>
                    {body}
                  </div>
                )
              }

              const cardClassName = `group block bg-[hsl(var(--app-background))] p-8 hover:bg-[hsl(var(--app-surface))] transition-colors duration-200${span}`

              return isExternal(item.href) ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  {body}
                </a>
              ) : (
                <Link key={item.name} href={item.href} className={cardClassName}>
                  {body}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs text-[hsl(var(--app-text-muted))] tracking-[0.2em] uppercase mb-8">Thesis</h2>
          <div className="space-y-6 text-base sm:text-lg text-[#1A1410] leading-relaxed max-w-2xl">
            <p>
              Most of the stack acts too late. Behavior is captured in real time and then processed on a schedule —
              hours or days after the moment that mattered. By the time a decision is made, the session is over and
              the visitor is somewhere else.
            </p>
            <p>
              We think the interesting problems are not about raw capability. They are about making capability useful
              inside real constraints: a few hundred milliseconds, a visitor with no history, and a cost budget that
              has to survive contact with production traffic.
            </p>
            <p>We are building in two directions at once.</p>
          </div>

          <ul className="mt-8 space-y-3 max-w-2xl">
            {linesOfWork.map((line) => (
              <li key={line} className="flex gap-3 text-base text-[hsl(var(--app-text-muted))]">
                <span aria-hidden="true" className="text-[#C87941] shrink-0">
                  —
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-base sm:text-lg text-[#1A1410] leading-relaxed max-w-2xl">
            One is a product that has to work on live commerce traffic today. The other is the layer that makes those
            systems composable for the next problem.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 pb-32 sm:pb-40">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-[hsl(var(--app-border))] pt-12 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6">
            <div>
              <p className="text-base text-[#1A1410] mb-2">
                We are a small team of applied researchers and engineers.
              </p>
              <p className="text-sm text-[hsl(var(--app-text-muted))]">
                <Link href="/careers" className="text-[#C87941] hover:underline">
                  We are hiring
                </Link>
              </p>
            </div>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-base text-[#1A1410] hover:text-[#C87941] transition-colors duration-200 border-b border-[hsl(var(--app-border))] hover:border-[#C87941] pb-0.5 w-fit"
            >
              {siteConfig.contactEmail}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
