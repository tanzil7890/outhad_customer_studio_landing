'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { METHODOLOGY } from '@/lib/landing/insights'

/** The leakage formula with every term clickable, each explaining itself and the step it comes from. */
export function FormulaExplorer() {
  const [active, setActive] = useState(0)
  const term = METHODOLOGY.terms[active]
  return (
    <div className="rounded-[2rem] bg-night-raised/60 p-6 ring-1 ring-night-line sm:p-10">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-night-muted">Definition · {METHODOLOGY.definition.name}</p>
      <p className="mt-4 max-w-4xl text-2xl font-semibold leading-snug tracking-tight text-night-text sm:text-3xl">{METHODOLOGY.definition.body}</p>

      <div className="mt-10 rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-7">
        <p className="text-[12px] text-night-muted">Tap a term</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3 font-mono text-[15px] text-night-soft sm:text-lg" role="tablist" aria-label="Terms of the leakage formula">
          <span className="text-night-text">Leakage</span>
          <span>=</span>
          <span>Σ (</span>
          {METHODOLOGY.terms.map((t, i) => (
            <span key={t.key} className="flex items-center gap-2">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`term-${t.key}`}
                onClick={() => setActive(i)}
                className={cn(
                  'min-h-0 min-w-0 rounded-lg px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  i === active ? 'bg-night-text text-night' : 'text-night-text ring-1 ring-night-line hover:bg-night-raised',
                )}
              >
                {t.label}
              </button>
              {i < METHODOLOGY.terms.length - 1 && <span aria-hidden>×</span>}
            </span>
          ))}
          <span>)</span>
        </p>
        {METHODOLOGY.terms.map((t, i) => (
          <div key={t.key} id={`term-${t.key}`} role="tabpanel" hidden={i !== active} className="mt-6 grid gap-3 border-t border-night-line pt-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
            <p className="font-mono text-[13px] text-night-muted">Step {t.step}</p>
            <p className="text-base leading-relaxed text-night-text sm:text-lg">{t.explain}</p>
          </div>
        ))}
        <p className="sr-only" aria-live="polite">
          {term.label}: {term.explain}
        </p>
      </div>
      <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-night-muted">{METHODOLOGY.definition.note}</p>
    </div>
  )
}

/** The four leak categories as a list and a detail panel. */
export function LeakTabs() {
  const [active, setActive] = useState(0)
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div role="tablist" aria-label="Leak categories" aria-orientation="vertical" className="flex flex-col gap-2">
        {METHODOLOGY.categories.map((c, i) => (
          <button
            key={c.n}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`leak-${c.n}`}
            onClick={() => setActive(i)}
            className={cn(
              'flex min-h-0 min-w-0 items-baseline gap-4 rounded-2xl px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
              i === active ? 'bg-night-raised ring-1 ring-night-text/50' : 'ring-1 ring-night-line hover:bg-night-raised/60',
            )}
          >
            <span className="font-mono text-[13px] text-night-muted">{c.n}</span>
            <span className={cn('text-xl font-semibold tracking-tight', i === active ? 'text-night-text' : 'text-night-soft')}>{c.title}</span>
          </button>
        ))}
      </div>
      {METHODOLOGY.categories.map((c, i) => (
        <div key={c.n} id={`leak-${c.n}`} role="tabpanel" hidden={i !== active} className="rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line sm:p-9">
          <p className="font-mono text-sm text-night-muted">Leak {c.n}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-night-text">{c.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-night-soft">{c.desc}</p>
          <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Diagnostic signals</p>
          <ul className="mt-3 space-y-2">
            {c.signals.map((s) => (
              <li key={s} className="flex gap-3 rounded-xl bg-night px-4 py-3 text-[15px] text-night-text ring-1 ring-night-line">
                <span aria-hidden className="text-night-muted">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
