import Link from 'next/link'
import { ArrowRight, BrainCircuit, Database, RefreshCcw, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MECHANISM } from '@/lib/landing/insights'
import { Reveal } from '../shared/reveal'
import InsightShell, { InsightSection } from './insight-shell'
import { CapabilityCheck, LatencyBudget } from './mechanism-widgets'

const ARCH_ICONS = [Waves, Database, BrainCircuit, RefreshCcw]

export default function Mechanism() {
  const m = MECHANISM
  return (
    <InsightShell
      insight="mechanism"
      title={m.title}
      lede={m.lede}
      secondary={{ label: 'See the KPIs that matter', href: '/the-metrics' }}
      faqs={m.faqs}
      closing={{ title: 'See the loop run on your store.', body: 'Free 12-hr ROI audit modeled on your traffic. No card. No commitment.' }}
    >
      {/* The window */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid gap-px overflow-hidden rounded-3xl bg-night-line md:grid-cols-3">
            {m.windows.map((w) => (
              <div key={w.label} className={cn('flex flex-col-reverse gap-3 p-7 sm:p-9', w.tone === 'win' ? 'bg-night-raised' : 'bg-night')}>
                <dt className={cn('text-[14px] leading-snug', w.tone === 'win' ? 'text-night-text' : 'text-night-soft')}>{w.label}</dt>
                <dd className={cn('font-mono text-4xl font-semibold tracking-tight sm:text-5xl', w.tone === 'win' ? 'text-night-text' : 'text-night-muted')}>
                  {w.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <InsightSection id="loop" eyebrow="The loop" title="Five stages, under 100 milliseconds" intro={m.loopIntro}>
        <LatencyBudget />
      </InsightSection>

      <InsightSection eyebrow="Architecture" title="What sits underneath">
        <ul className="grid gap-4 md:grid-cols-2">
          {m.architecture.map((a, i) => {
            const Icon = ARCH_ICONS[i]
            return (
              <li key={a.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="flex h-full gap-5 rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-night text-night-text ring-1 ring-night-line">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-xl font-semibold tracking-tight text-night-text">{a.title}</span>
                      <span className="mt-2 block text-[15px] leading-relaxed text-night-soft">{a.body}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </InsightSection>

      <InsightSection eyebrow="Seven capabilities" title="What in-session decisioning must do" intro={m.capabilitiesIntro}>
        <CapabilityCheck />
      </InsightSection>

      <InsightSection>
        <Link
          href="/comparison"
          className="group flex min-h-0 min-w-0 flex-col gap-6 rounded-[2rem] p-8 ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text sm:p-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <span className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">Adjacent categories</span>
            <span className="mt-3 block text-3xl font-semibold leading-tight tracking-tight text-night-text">{m.adjacent.title}</span>
            <span className="mt-3 block text-base leading-relaxed text-night-soft">{m.adjacent.body}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-night-text">
            See the comparison
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </span>
        </Link>
      </InsightSection>
    </InsightShell>
  )
}
