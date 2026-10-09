'use client'

import { useId, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { ROI } from '@/lib/landing/content'
import { estimateRoi } from '@/lib/landing/roi'
import BookDemoButton from './book-demo-button'
import CountUp from './count-up'
import type { Tone } from './tone'

const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const money = (n: number) => `$${integer.format(Math.round(n))}`
const pct = (n: number) => `${n.toFixed(n < 10 ? 1 : 0)}%`

type ScenarioKey = (typeof ROI.scenarios)[number]['key']

export default function RoiCalculator({ tone = 'light', className }: { tone?: Tone; className?: string }) {
  const id = useId()
  const [visitors, setVisitors] = useState<number>(ROI.defaults.visitors)
  const [conversionRate, setConversionRate] = useState<number>(ROI.defaults.conversionRate)
  const [aov, setAov] = useState<number>(ROI.defaults.aov)
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>(ROI.defaultScenario)
  const scenario = ROI.scenarios.find((s) => s.key === scenarioKey) ?? ROI.scenarios[1]

  const result = useMemo(
    () => estimateRoi({ visitors, conversionRate, aov, relativeLift: scenario.lift }),
    [visitors, conversionRate, aov, scenario.lift],
  )

  const dark = tone === 'dark'
  const editorial = tone === 'editorial'

  const label = cn('text-sm font-medium', dark ? 'text-night-soft' : 'text-ink-secondary')
  const field = cn(
    'flex h-12 items-center gap-2 px-4 transition-colors focus-within:ring-2',
    editorial ? 'rounded-none border-b border-ink/60 bg-transparent px-0 focus-within:ring-0 focus-within:border-ink' : 'rounded-xl border',
    !editorial &&
      (dark
        ? 'border-night-line bg-night focus-within:ring-night-text/50'
        : 'border-line bg-surface-sunken focus-within:ring-ink/30'),
  )
  const input = cn(
    'w-full min-w-0 bg-transparent text-base font-semibold tabular-nums outline-none',
    dark ? 'text-night-text' : 'text-ink',
  )
  const affix = cn('text-base', dark ? 'text-night-muted' : 'text-ink-muted')

  const numberInput = (
    key: string,
    text: string,
    value: number,
    onChange: (n: number) => void,
    opts: { prefix?: string; suffix?: string; step?: number; min?: number; max?: number },
  ) => (
    <div className="space-y-2">
      <label htmlFor={`${id}-${key}`} className={label}>
        {text}
      </label>
      <div className={field}>
        {opts.prefix && <span className={affix}>{opts.prefix}</span>}
        <input
          id={`${id}-${key}`}
          type="number"
          inputMode="decimal"
          min={opts.min ?? 0}
          max={opts.max}
          step={opts.step ?? 1}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className={input}
        />
        {opts.suffix && <span className={affix}>{opts.suffix}</span>}
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        'grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14',
        editorial ? '' : 'rounded-3xl p-6 sm:p-10',
        !editorial && (dark ? 'bg-night-raised ring-1 ring-night-line' : 'bg-surface-base ring-1 ring-line'),
        className,
      )}
    >
      <div className="space-y-6">
        {numberInput('visitors', 'Monthly visitors', visitors, setVisitors, { step: 1000 })}
        <div className="grid grid-cols-2 gap-4">
          {numberInput('cr', 'Conversion rate', conversionRate, setConversionRate, { suffix: '%', step: 0.1, max: 100 })}
          {numberInput('aov', 'Average order value', aov, setAov, { prefix: '$', step: 5 })}
        </div>
        <fieldset className="space-y-2">
          <legend className={label}>Scenario (relative lift on conversion)</legend>
          <div
            className={cn(
              'grid grid-cols-3 gap-1 p-1',
              editorial ? 'rounded-none border border-ink/60' : 'rounded-xl',
              !editorial && (dark ? 'bg-night' : 'bg-surface-sunken'),
            )}
          >
            {ROI.scenarios.map((s) => {
              const checked = s.key === scenarioKey
              return (
                <label
                  key={s.key}
                  className={cn(
                    'relative flex cursor-pointer flex-col items-center justify-center px-2 py-2 text-center transition-colors has-[:focus-visible]:ring-2',
                    editorial ? 'rounded-none' : 'rounded-lg',
                    checked
                      ? dark
                        ? 'bg-night-text text-night'
                        : 'bg-ink text-night-text'
                      : dark
                        ? 'text-night-soft hover:bg-night-raised'
                        : 'text-ink-secondary hover:bg-surface-hover',
                    dark ? 'has-[:focus-visible]:ring-night-text' : 'has-[:focus-visible]:ring-ink/40',
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}-scenario`}
                    value={s.key}
                    checked={checked}
                    onChange={() => setScenarioKey(s.key)}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">{s.label}</span>
                  <span className="text-xs">+{Math.round(s.lift * 100)}%</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className={cn('flex flex-col', editorial && 'border-t border-ink/80 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0')}>
        <p className={label}>Estimated added revenue</p>
        <p className="mt-2 flex items-baseline gap-2" aria-live="polite">
          <CountUp
            value={result.extraMonthly}
            format={(n) => `+${money(n)}`}
            duration={0.6}
            className={cn(
              'text-5xl font-extrabold tracking-tight sm:text-6xl',
              editorial && 'font-display font-normal',
              dark ? 'text-night-copper' : 'text-copper-400',
            )}
          />
          <span className={cn('text-lg', dark ? 'text-night-soft' : 'text-ink-secondary')}>/ month</span>
        </p>

        <dl className={cn('mt-8 grid grid-cols-3 gap-4 border-t pt-6', dark ? 'border-night-line' : 'border-line')}>
          {[
            { term: 'Per year', value: money(result.extraAnnual), money: true },
            { term: 'Extra orders / mo', value: integer.format(Math.round(result.extraOrders)), money: false },
            { term: 'Conversion rate', value: `${pct(conversionRate)} → ${pct(result.newConversionRate)}`, money: false },
          ].map((item) => (
            <div key={item.term} className="flex flex-col-reverse gap-1">
              <dt className={cn('text-xs sm:text-sm', dark ? 'text-night-muted' : 'text-ink-muted')}>{item.term}</dt>
              <dd
                className={cn(
                  'text-lg font-bold tabular-nums sm:text-xl',
                  item.money ? (dark ? 'text-night-copper' : 'text-copper-600') : dark ? 'text-night-text' : 'text-ink',
                )}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className={cn('mt-6 text-sm leading-relaxed', dark ? 'text-night-soft' : 'text-ink-secondary')}>
          {integer.format(visitors)} visitors × {pct(conversionRate)} conversion × {Math.round(scenario.lift * 100)}% lift ×{' '}
          {money(aov)} average order.
        </p>
        <p className={cn('mt-2 text-xs', dark ? 'text-night-muted' : 'text-ink-muted')}>{ROI.disclaimer}</p>

        <div className="mt-8 lg:mt-auto lg:pt-8">
          <BookDemoButton
            location="roi-calculator"
            variant={dark ? 'onDark' : editorial ? 'editorial' : 'primary'}
          >
            See it on your traffic
          </BookDemoButton>
        </div>
      </div>
    </div>
  )
}
