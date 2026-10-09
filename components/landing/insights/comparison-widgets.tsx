'use client'

import { useState } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMPARISON, type Coverage } from '@/lib/landing/insights'

export function CoverageMark({ value, strong = false }: { value: Coverage; strong?: boolean }) {
  const label = value === true ? 'Full' : value === 'partial' ? 'Partial' : 'Not in scope'
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-full',
        value === true && (strong ? 'bg-night-text text-night' : 'bg-night-soft/80 text-night'),
        value === 'partial' && 'text-night-soft ring-1 ring-night-soft/60',
        value === false && 'text-night-muted ring-1 ring-night-line',
      )}
    >
      {value === true && <Check aria-hidden className="h-4 w-4" strokeWidth={3} />}
      {value === 'partial' && <Minus aria-hidden className="h-4 w-4" />}
      {value === false && <X aria-hidden className="h-3.5 w-3.5" />}
    </span>
  )
}

const score = (v: Coverage) => (v === true ? 1 : v === 'partial' ? 0.5 : 0)

/** Pick a category: see which parts of the in-session loop it covers next to Convertive, and what it is for. */
export function CategoryExplorer() {
  const [active, setActive] = useState(0)
  const cats = COMPARISON.categories
  return (
    <div>
      <div role="tablist" aria-label="Adjacent categories" className="flex flex-wrap gap-2">
        {cats.map((c, i) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`cat-${c.key}`}
            onClick={() => setActive(i)}
            className={cn(
              'h-11 min-h-0 min-w-0 rounded-full px-5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
              i === active ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:text-night-text',
            )}
          >
            {c.short}
          </button>
        ))}
      </div>

      {cats.map((c, i) => {
        const covered = COMPARISON.rows.reduce((sum, r) => sum + score(r[c.key]), 0)
        return (
          <div key={c.key} id={`cat-${c.key}`} role="tabpanel" hidden={i !== active} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Loop coverage */}
            <div className="rounded-3xl bg-night-raised/60 p-6 ring-1 ring-night-line sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Coverage of the in-session loop</p>
                <p className="font-mono text-[13px] text-night-soft">
                  {covered} / {COMPARISON.rows.length}
                </p>
              </div>
              <div aria-hidden className="mt-3 flex gap-1">
                {COMPARISON.rows.map((r) => (
                  <span
                    key={r.capability}
                    className={cn('h-1.5 flex-1 rounded-full', r[c.key] === true ? 'bg-night-soft' : r[c.key] === 'partial' ? 'bg-night-soft/40' : 'bg-night-line')}
                  />
                ))}
              </div>
              <table className="mt-5 w-full text-left text-[14px]">
                <thead>
                  <tr className="text-[12px] text-night-muted">
                    <th className="pb-2 font-medium">Capability</th>
                    <th className="w-24 pb-2 text-center font-medium">{c.short}</th>
                    <th className="w-24 pb-2 text-center font-medium text-night-text">Convertive</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((r) => (
                    <tr key={r.capability} className="border-t border-night-line">
                      <td className="py-2.5 pr-3 leading-snug text-night-soft">{r.capability}</td>
                      <td className="py-2.5 text-center">
                        <CoverageMark value={r[c.key]} />
                      </td>
                      <td className="py-2.5 text-center">
                        <CoverageMark value={r.convertive} strong />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* What it is for */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight text-night-text">{c.label}</h3>
                <p className="mt-2 text-[14px] italic text-night-muted">{c.examples}</p>
              </div>
              {[
                { label: 'What it does', text: c.does, tone: 'text-night-muted' },
                { label: 'Where it fails', text: c.fails, tone: 'text-warning-soft' },
                { label: 'Fits with Convertive', text: c.fitWith, tone: 'text-success-soft' },
              ].map((block) => (
                <div key={block.label} className="rounded-2xl p-5 ring-1 ring-night-line">
                  <p className={cn('text-[12px] font-semibold uppercase tracking-[0.14em]', block.tone)}>{block.label}</p>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-night-soft">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
