'use client'

import { Fragment, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { METRICS } from '@/lib/landing/insights'

const ALL = METRICS.groups.flatMap((g) => g.metrics.map((m) => ({ ...m, group: g.label })))
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

/**
 * The eight KPIs as the three-layer stack they form. Pick a metric to read
 * it, or pick a symptom to see which layer (and which metrics) to check.
 */
export default function MetricsExplorer() {
  const [selected, setSelected] = useState(ALL[0].name)
  const [symptom, setSymptom] = useState<number | null>(null)
  const flagged = symptom === null ? [] : METRICS.symptoms[symptom].metrics
  const flaggedLayer = symptom === null ? null : METRICS.symptoms[symptom].check

  const pickSymptom = (i: number) => {
    const next = symptom === i ? null : i
    setSymptom(next)
    if (next !== null) setSelected(METRICS.symptoms[next].metrics[0])
  }

  return (
    <div>
      {/* Symptom picker */}
      <div className="rounded-3xl bg-night-raised/60 p-5 ring-1 ring-night-line sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Reading the dashboard · where to look first when numbers move</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {METRICS.symptoms.map((s, i) => (
            <button
              key={s.symptom}
              type="button"
              aria-pressed={symptom === i}
              onClick={() => pickSymptom(i)}
              className={cn(
                'min-h-0 min-w-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                symptom === i ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:text-night-text',
              )}
            >
              {s.symptom}
            </button>
          ))}
        </div>
        {METRICS.symptoms.map((s, i) => (
          <div key={s.title} hidden={symptom !== i} className="mt-5 border-t border-night-line pt-5">
            <p className="text-xl font-semibold tracking-tight text-night-text">{s.title}</p>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-night-soft">{s.body}</p>
          </div>
        ))}
      </div>

      {/* The stack */}
      <div className="mt-6 grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        {METRICS.groups.map((g, gi) => (
          <Fragment key={g.label}>
            <div
              className={cn(
                'rounded-3xl p-5 ring-1 transition-colors',
                flaggedLayer === g.label ? 'bg-night-raised ring-night-text/60' : 'ring-night-line',
              )}
            >
              <p className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">
                <span>
                  <span className="mr-2 font-mono normal-case tracking-normal">0{gi + 1}</span>
                  {g.label}
                </span>
                {flaggedLayer === g.label && <span className="normal-case tracking-normal text-night-text">Check here</span>}
              </p>
              <ul className="mt-4 space-y-2" role="tablist" aria-label={`${g.label} metrics`}>
                {g.metrics.map((m) => {
                  const on = m.name === selected
                  const starter = METRICS.starters.includes(m.name)
                  return (
                    <li key={m.name}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={on}
                        aria-controls={`kpi-${slug(m.name)}`}
                        onClick={() => setSelected(m.name)}
                        className={cn(
                          'flex w-full min-h-0 min-w-0 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                          on ? 'bg-night-text font-semibold text-night' : 'bg-night text-night-text ring-1 ring-night-line hover:bg-night-raised',
                          flagged.includes(m.name) && !on && 'ring-2 ring-warning-soft/60',
                        )}
                      >
                        {m.name}
                        {starter && (
                          <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold', on ? 'bg-night/10 text-night' : 'bg-night-raised text-night-soft')}>
                            Start here
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            {gi < METRICS.groups.length - 1 && (
              <div aria-hidden className="flex items-center justify-center text-night-muted">
                <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* The selected KPI (every card is in the page; one is shown) */}
      {ALL.map((m) => (
        <article
          key={m.name}
          id={`kpi-${slug(m.name)}`}
          role="tabpanel"
          hidden={m.name !== selected}
          className="mt-6 grid gap-8 rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">{m.group}</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-night-text">{m.name}</h3>
            <p className="mt-5 rounded-xl bg-night px-4 py-3.5 font-mono text-[14px] text-night-text ring-1 ring-night-line">{m.formula}</p>
            <p className="mt-5 flex items-baseline gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Target</span>
              <span className="font-mono text-2xl font-semibold text-night-text">{m.target}</span>
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Why it matters</p>
              <p className="mt-2 text-[16px] leading-relaxed text-night-soft">{m.why}</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">How to instrument</p>
              <p className="mt-2 text-[16px] leading-relaxed text-night-soft">{m.instrument}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
