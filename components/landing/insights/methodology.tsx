import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { METHODOLOGY } from '@/lib/landing/insights'
import { Reveal } from '../shared/reveal'
import InsightShell, { InsightSection } from './insight-shell'
import { FormulaExplorer, LeakTabs } from './methodology-widgets'

// The four formula steps narrow from all anonymous traffic to one revenue number.
const FUNNEL = ['100%', '72%', '46%', '28%']
const MAX_ID = 50

export default function Methodology() {
  const m = METHODOLOGY
  let cumulative = 0
  return (
    <InsightShell
      insight="methodology"
      title={m.title}
      lede={m.lede}
      secondary={{ label: 'See the underlying KPIs', href: '/the-metrics' }}
      faqs={m.faqs}
      closing={{ title: 'Get your leakage number in 12 hours.', body: 'Free ROI audit applies the methodology to your store and returns a 2-slide breakdown. No card, no call required.' }}
    >
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <FormulaExplorer />
        </div>
      </section>

      <InsightSection eyebrow="Leak categories" title="Where revenue actually leaks" intro={m.categoriesIntro}>
        <LeakTabs />
      </InsightSection>

      <InsightSection eyebrow="The formula" title="Four steps to a leakage number" intro={m.formulaIntro}>
        <ol className="space-y-3">
          {m.formulaSteps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08}>
                <div className="rounded-2xl ring-1 ring-night-line">
                  <div className="grid gap-3 p-6 sm:grid-cols-[5rem_minmax(0,16rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:p-7">
                    <span>
                      <span className="block font-mono text-2xl text-night-muted">{s.n}</span>
                      {/* The funnel narrowing from volume to one revenue number */}
                      <span aria-hidden className="mt-2 block h-1.5 w-16 rounded-full bg-night-line">
                        <span className="block h-full rounded-full bg-night-soft" style={{ width: FUNNEL[i] }} />
                      </span>
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-night-text">{s.title}</h3>
                    <p className="text-[15px] leading-relaxed text-night-soft">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </InsightSection>

      <InsightSection eyebrow="The Identity Signal Heatmap" title="Where in the funnel identity actually arrives" intro={m.heatmapIntro}>
        {/* Stacked bar: each stage's share of identification, hotter where more arrives */}
        <div aria-hidden className="flex h-16 overflow-hidden rounded-2xl bg-night ring-1 ring-night-line">
          {m.heatmap.map((row) => {
            const mid = (row.low + row.high) / 2
            return (
              <span
                key={row.stage}
                className="flex items-end justify-start border-r border-night/60 p-2 font-mono text-[11px] text-night"
                style={{ width: `${(mid / MAX_ID) * 100}%`, background: `rgb(var(--c-night-text) / ${0.18 + (mid / 20) * 0.72})` }}
              >
                {mid >= 5 ? row.identified : ''}
              </span>
            )
          })}
        </div>
        <ol className="mt-6 divide-y divide-night-line rounded-2xl ring-1 ring-night-line">
          {m.heatmap.map((row) => {
            cumulative += (row.low + row.high) / 2
            return (
              <li key={row.stage} className="grid grid-cols-[minmax(0,1fr)_6rem] gap-4 p-5 sm:grid-cols-[minmax(0,14rem)_7rem_minmax(0,1fr)_6rem] sm:items-center">
                <span className="font-semibold text-night-text">{row.stage}</span>
                <span className="text-right font-mono font-semibold text-night-text sm:text-left">{row.identified}</span>
                <span className="col-span-2 text-[14px] text-night-soft sm:col-span-1">{row.note}</span>
                <span className="hidden text-right font-mono text-[13px] text-night-muted sm:block">≈ {Math.round(cumulative)}% total</span>
              </li>
            )
          })}
        </ol>
        <p className="mt-4 text-[13px] text-night-muted">{m.heatmapNote}</p>
      </InsightSection>

      <InsightSection>
        <div className="rounded-[2rem] bg-night-raised p-8 ring-1 ring-night-line sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">From measurement to action</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-night-text sm:text-4xl">{m.action.title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-night-soft">{m.action.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/the-mechanism"
              className="inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full bg-night-text px-6 text-[15px] font-semibold text-night hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              See the mechanism <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/the-audit"
              className="inline-flex h-12 min-h-0 min-w-0 items-center rounded-full px-6 text-[15px] font-semibold text-night-text ring-1 ring-night-line hover:bg-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              Run the audit yourself
            </Link>
          </div>
        </div>
      </InsightSection>
    </InsightShell>
  )
}
