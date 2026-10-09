'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AUDIT } from '@/lib/landing/insights'

/** The seven steps, one at a time. Every step stays in the page (for search and anchors); one is shown. */
export function AuditStepper() {
  const [active, setActive] = useState(0)
  const steps = AUDIT.steps

  // Honour links like /the-audit#step-03.
  useEffect(() => {
    const sync = () => {
      const i = steps.findIndex((s) => `#step-${s.n}` === window.location.hash)
      if (i >= 0) setActive(i)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [steps])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
      {/* Rail */}
      <div role="tablist" aria-label="Audit steps" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible">
        {steps.map((s, i) => {
          const on = i === active
          const done = i < active
          return (
            <button
              key={s.n}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`step-${s.n}`}
              onClick={() => setActive(i)}
              className={cn(
                'flex min-h-0 min-w-0 shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text lg:shrink',
                on ? 'bg-night-raised ring-1 ring-night-text/50' : 'ring-1 ring-night-line hover:bg-night-raised/60',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[12px]',
                  on ? 'bg-night-text text-night' : done ? 'bg-night-line text-night-text' : 'text-night-muted ring-1 ring-night-line',
                )}
              >
                {done ? <Check aria-hidden className="h-4 w-4" /> : s.n}
              </span>
              <span className={cn('hidden text-[15px] font-semibold leading-snug lg:block', on ? 'text-night-text' : 'text-night-soft')}>{s.title}</span>
            </button>
          )
        })}
      </div>

      {/* Step */}
      {steps.map((s, i) => (
        <article key={s.n} id={`step-${s.n}`} role="tabpanel" hidden={i !== active} className="scroll-mt-28 rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line sm:p-9">
          <div aria-hidden className="flex gap-1">
            {steps.map((_, k) => (
              <span key={k} className={cn('h-1 flex-1 rounded-full', k <= i ? 'bg-night-text' : 'bg-night-line')} />
            ))}
          </div>
          <p className="mt-6 font-mono text-sm text-night-muted">Step {s.n} of 07</p>
          <h3 className="mt-1 text-3xl font-semibold leading-tight tracking-tight text-night-text">{s.title}</h3>

          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Do this</p>
          <p className="mt-2 text-lg leading-relaxed text-night-soft">{s.do}</p>

          <p className="mt-6 rounded-xl bg-night px-4 py-3.5 font-mono text-[14px] leading-relaxed text-night-text ring-1 ring-night-line">{s.formula}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl p-5 ring-1 ring-night-line">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-success-soft">Benchmark</p>
              <p className="mt-2 text-[15px] leading-relaxed text-night-soft">{s.benchmark}</p>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-warning-soft/30">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-warning-soft">Red flag</p>
              <p className="mt-2 text-[15px] leading-relaxed text-night-soft">{s.redFlag}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={i === 0}
              className="inline-flex h-11 min-h-0 min-w-0 items-center gap-2 rounded-full px-4 text-[14px] font-semibold text-night-soft ring-1 ring-night-line transition-colors hover:text-night-text disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" /> Previous
            </button>
            {i < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                className="inline-flex h-11 min-h-0 min-w-0 items-center gap-2 rounded-full bg-night-text px-5 text-[14px] font-semibold text-night transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                Next step <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            ) : (
              <a
                href="#scorecard"
                className="inline-flex h-11 min-h-0 min-w-0 items-center gap-2 rounded-full bg-night-text px-5 text-[14px] font-semibold text-night transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                Score your store <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

/** "What good looks like": enter your numbers, see which benchmarks you hit. Nothing is sent anywhere. */
export function AuditScorecard() {
  const id = useId()
  const [values, setValues] = useState<string[]>(() => AUDIT.good.map(() => ''))
  const results = AUDIT.good.map((g, i) => {
    const raw = values[i].trim()
    if (raw === '') return null
    const n = Number(raw)
    return Number.isFinite(n) ? g.pass(n) : null
  })
  const answered = results.filter((r) => r !== null).length
  const healthy = results.filter((r) => r === true).length

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <ul className="divide-y divide-night-line rounded-3xl ring-1 ring-night-line">
        {AUDIT.good.map((g, i) => {
          const r = results[i]
          return (
            <li key={g.label} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 p-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_9rem_2rem]">
              <span className="font-mono text-[13px] text-night-muted">{g.step}</span>
              <label htmlFor={`${id}-${i}`} className="text-[15px] leading-snug text-night-text">
                {g.label}
              </label>
              <span className="col-start-2 flex h-11 items-center gap-2 rounded-xl bg-night px-3 ring-1 ring-night-line focus-within:ring-2 focus-within:ring-night-text sm:col-start-auto">
                <input
                  id={`${id}-${i}`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={values[i]}
                  placeholder={g.placeholder}
                  onChange={(e) => setValues((v) => v.map((x, k) => (k === i ? e.target.value : x)))}
                  className="w-full min-w-0 bg-transparent font-mono text-[15px] text-night-text outline-none placeholder:text-night-muted"
                />
                <span className="text-[13px] text-night-muted">{g.unit}</span>
              </span>
              <span
                aria-label={r === null ? 'Not answered' : r ? 'Healthy' : 'Leaking'}
                className={cn(
                  'hidden h-8 w-8 items-center justify-center justify-self-end rounded-full sm:flex',
                  r === null ? 'ring-1 ring-night-line' : r ? 'bg-success/30 text-success-soft' : 'bg-warning-soft/15 text-warning-soft',
                )}
              >
                {r === true && <Check aria-hidden className="h-4 w-4" />}
                {r === false && <X aria-hidden className="h-4 w-4" />}
              </span>
            </li>
          )
        })}
      </ul>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-night-raised p-7 ring-1 ring-night-line" aria-live="polite">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Your scorecard</p>
          <p className="mt-3 text-6xl font-semibold tabular-nums tracking-tight text-night-text">
            {healthy}
            <span className="text-3xl text-night-soft"> / 7</span>
          </p>
          <div aria-hidden className="mt-4 flex gap-1">
            {results.map((r, i) => (
              <span key={i} className={cn('h-1.5 flex-1 rounded-full', r === null ? 'bg-night-line' : r ? 'bg-success-soft' : 'bg-warning-soft')} />
            ))}
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-night-soft">
            {answered === 0
              ? 'Enter what you found in each step. The placeholders show a typical store.'
              : healthy === 7
                ? 'All seven. Your anonymous-traffic activation layer is actually working.'
                : answered < 7
                  ? `${healthy} healthy so far, ${answered - healthy} leaking. Keep going.`
                  : `${7 - healthy} of 7 leaking. Hitting one benchmark is noise; these in combination are the bar.`}
          </p>
          <p className="mt-4 text-[12.5px] text-night-muted">Stays in your browser. Nothing is sent.</p>
          <Link
            href="/audit"
            className="mt-6 inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full bg-night-text px-6 text-[15px] font-semibold text-night transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
          >
            Or let us run it for you <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
