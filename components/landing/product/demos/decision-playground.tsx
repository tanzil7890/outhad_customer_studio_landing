'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShieldOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY } from '@/lib/landing/story'

/**
 * AI Engine demo: a deliberately small, transparent model. Move the
 * shopper's signals and six eligible actions re-rank. Guardrails can
 * suppress an action, and "Do nothing" wins when she would buy anyway.
 */

interface Inputs {
  intent: number
  risk: number
  price: number
  cart: number
  returning: boolean
  discountShown: boolean
}

type ActionId = 'discount' | 'shipping' | 'size' | 'bundle' | 'reviews' | 'nothing'

interface Ranked {
  id: ActionId
  label: string
  score: number
  suppressed?: string
}

const LABELS: Record<ActionId, string> = {
  discount: '10% off, today only',
  shipping: 'Free shipping over $150',
  size: 'Size-fit helper',
  bundle: 'Bundle: boots + socks, save 15%',
  reviews: 'Reviews from buyers like her',
  nothing: 'Do nothing',
}

const WHY: Record<ActionId, (i: Inputs) => string> = {
  discount: (i) => `Exit risk ${i.risk}% and price sensitivity ${i.price}%: a small, time-boxed incentive has the highest expected lift.`,
  shipping: (i) => `A $${i.cart} cart, close to the free-shipping line, and she is price-sensitive: remove the shipping cost, not the margin.`,
  size: () => 'Keen but hesitating, and not about price: fit doubts are the likely blocker.',
  bundle: () => 'She is likely to buy anyway. A bundle grows the order without a discount.',
  reviews: () => 'Early, unsure and new here: proof from similar buyers beats an incentive.',
  nothing: () => 'She is likely to buy without help. Any incentive would only give away margin.',
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export function rank(i: Inputs): Ranked[] {
  const intent = i.intent / 100
  const risk = i.risk / 100
  const price = i.price / 100
  const hasCart = i.cart > 0
  const nearShipping = i.cart >= 90 && i.cart < 150
  const actions: Ranked[] = [
    { id: 'discount', label: LABELS.discount, score: 0.08 + 0.55 * risk * price * (hasCart ? 1 : 0.4) + 0.12 * intent },
    { id: 'shipping', label: LABELS.shipping, score: 0.06 + 0.45 * price * risk * (nearShipping ? 1 : 0.35) + 0.08 * intent },
    { id: 'size', label: LABELS.size, score: 0.05 + 0.55 * intent * (1 - price) * risk },
    { id: 'bundle', label: LABELS.bundle, score: 0.05 + 0.4 * intent * (1 - risk) * (hasCart ? 1 : 0.2) },
    { id: 'reviews', label: LABELS.reviews, score: 0.08 + 0.35 * (1 - intent) * risk + (i.returning ? 0 : 0.1) },
    { id: 'nothing', label: LABELS.nothing, score: 0.05 + 0.6 * intent * (1 - risk) + (i.returning ? 0.1 : 0) },
  ]
  for (const a of actions) {
    a.score = clamp01(a.score)
    if (a.id === 'discount' && i.discountShown) a.suppressed = 'Guardrail: a discount was already offered today'
  }
  // Suppressed actions stay visible but drop below every eligible one.
  return actions.sort((a, b) => Number(!!a.suppressed) - Number(!!b.suppressed) || b.score - a.score)
}

const PRESETS: { label: string; inputs: Inputs }[] = [
  { label: `${STORY.persona} at 0:32`, inputs: { intent: 81, risk: 82, price: 80, cart: STORY.product.price, returning: false, discountShown: false } },
  { label: 'A loyal regular', inputs: { intent: 90, risk: 10, price: 20, cart: 180, returning: true, discountShown: false } },
  { label: 'Just browsing from Instagram', inputs: { intent: 30, risk: 60, price: 40, cart: 0, returning: false, discountShown: false } },
  { label: 'Keen, but unsure of the fit', inputs: { intent: 75, risk: 65, price: 15, cart: 149, returning: false, discountShown: false } },
]

function Slider({ label, value, onChange, max = 100, suffix = '%', prefix = '' }: { label: string; value: number; onChange: (n: number) => void; max?: number; suffix?: string; prefix?: string }) {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between text-[14px]">
        <label htmlFor={id} className="text-night-soft">
          {label}
        </label>
        <span className="font-mono tabular-nums text-night-text">
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-night-line accent-night-text"
      />
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-0 min-w-0 items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-left text-[14px] text-night-soft ring-1 ring-night-line transition-colors hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
    >
      {label}
      <span className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', checked ? 'bg-night-text' : 'bg-night-line')}>
        <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-night transition-transform', checked ? 'translate-x-[1.125rem]' : 'translate-x-0.5')} />
      </span>
    </button>
  )
}

export default function DecisionPlayground() {
  const [inputs, setInputs] = useState<Inputs>(PRESETS[0].inputs)
  const set = <K extends keyof Inputs>(key: K) => (value: Inputs[K]) => setInputs((i) => ({ ...i, [key]: value }))

  const ranked = useMemo(() => rank(inputs), [inputs])
  // Time the ranking in this browser (averaged: one pass is far below timer resolution). Client-only, after render.
  const [ms, setMs] = useState<number | null>(null)
  useEffect(() => {
    const runs = 300
    const t0 = performance.now()
    for (let k = 0; k < runs; k++) rank(inputs)
    setMs((performance.now() - t0) / runs)
  }, [inputs])
  const winner = ranked[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      {/* The shopper */}
      <div className="rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">The shopper, right now</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const on = JSON.stringify(preset.inputs) === JSON.stringify(inputs)
            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={on}
                onClick={() => setInputs(preset.inputs)}
                className={cn(
                  'min-h-0 min-w-0 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  on ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:text-night-text',
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
        <div className="mt-6 space-y-5">
          <Slider label="Purchase intent" value={inputs.intent} onChange={set('intent')} />
          <Slider label="Exit risk" value={inputs.risk} onChange={set('risk')} />
          <Slider label="Price sensitivity" value={inputs.price} onChange={set('price')} />
          <Slider label="Cart value" value={inputs.cart} onChange={set('cart')} max={300} suffix="" prefix="$" />
        </div>
        <div className="mt-6 grid gap-2">
          <Toggle label="Returning customer" checked={inputs.returning} onChange={set('returning')} />
          <Toggle label="Already offered a discount today" checked={inputs.discountShown} onChange={set('discountShown')} />
        </div>
      </div>

      {/* The decision */}
      <div className="flex flex-col rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Eligible actions, ranked by expected lift</p>
          <p className="font-mono text-[12.5px] text-night-soft">{ms === null ? '…' : `${ms < 0.01 ? ms.toFixed(4) : ms.toFixed(3)} ms here`}</p>
        </div>
        <ol className="mt-5 space-y-2.5" aria-live="polite">
          {ranked.map((action, i) => {
            const top = i === 0
            return (
              <motion.li
                key={action.id}
                layout
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                className={cn('rounded-xl px-4 py-3', top ? 'bg-night-raised ring-1 ring-night-text/60' : 'ring-1 ring-night-line', action.suppressed && 'opacity-60')}
              >
                <div className="flex items-center justify-between gap-3 text-[15px]">
                  <span className={cn('flex items-center gap-2', top ? 'font-semibold text-night-text' : 'text-night-soft', action.suppressed && 'line-through decoration-night-muted')}>
                    {top && <Check aria-hidden className="h-4 w-4 text-success-soft" />}
                    {action.suppressed && <ShieldOff aria-hidden className="h-4 w-4 text-warning-soft" />}
                    {action.label}
                  </span>
                  <span className="font-mono text-[13px] tabular-nums text-night-soft">{action.score.toFixed(2)}</span>
                </div>
                <div aria-hidden className="mt-2 h-1.5 overflow-hidden rounded-full bg-night-line">
                  <motion.div
                    className={cn('h-full origin-left rounded-full', top ? 'bg-night-text' : 'bg-night-muted')}
                    animate={{ scaleX: action.suppressed ? 0 : action.score }}
                    initial={false}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                {action.suppressed && <p className="mt-1.5 text-[12.5px] text-warning-soft">{action.suppressed}</p>}
              </motion.li>
            )
          })}
        </ol>
        <div className="mt-auto pt-6">
          <div className="rounded-xl border border-dashed border-night-line p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Why “{winner.label}”</p>
            <p className="mt-2 text-[15px] leading-relaxed text-night-text">{WHY[winner.id](inputs)}</p>
          </div>
          <p className="mt-3 text-[12.5px] text-night-muted">
            The real engine scores with models trained on your store’s outcomes and decides in under 100 ms, event to rendered action.
          </p>
        </div>
      </div>
    </div>
  )
}
