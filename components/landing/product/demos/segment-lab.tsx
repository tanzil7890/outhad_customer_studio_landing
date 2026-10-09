'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Audiences demo: 96 simulated live visitors. Pick segment rules (AND) and
 * watch membership change as their sessions move: a product view, a cart,
 * a spike in exit risk. Visitors leave and new anonymous ones arrive.
 */

type Source = 'instagram' | 'google' | 'email' | 'direct'
interface Visitor {
  id: string
  views: number
  cart: number
  risk: number
  source: Source
  priceSensitive: boolean
  returning: boolean
}

const COUNT = 96
const SOURCES: Source[] = ['instagram', 'google', 'email', 'direct']

const RULES = [
  { key: 'views', label: 'Viewed 3+ products', test: (v: Visitor) => v.views >= 3 },
  { key: 'cart', label: 'Cart over $100', test: (v: Visitor) => v.cart > 100 },
  { key: 'risk', label: 'Exit risk over 60%', test: (v: Visitor) => v.risk >= 0.6 },
  { key: 'instagram', label: 'Came from Instagram', test: (v: Visitor) => v.source === 'instagram' },
  { key: 'price', label: 'Price-sensitive', test: (v: Visitor) => v.priceSensitive },
  { key: 'first', label: 'First visit', test: (v: Visitor) => !v.returning },
] as const
type RuleKey = (typeof RULES)[number]['key']

const PRESETS: { label: string; rules: RuleKey[] }[] = [
  { label: 'About to leave with a full cart', rules: ['cart', 'risk'] },
  { label: 'New from Instagram, browsing', rules: ['instagram', 'first', 'views'] },
  { label: 'Bargain hunters', rules: ['price', 'views'] },
]

/** Deterministic PRNG so the server render and first client render match. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Ids are unique by construction (a counter, spread out so they look random). */
// n ↦ n·40507 mod 61440 is a bijection (40507 is coprime with 61440), so ids never repeat.
const idFor = (n: number) => `anon_${(0x1000 + ((n * 40507) % 61440)).toString(16)}`

function makeVisitor(rand: () => number, fresh: boolean, n: number): Visitor {
  const views = fresh ? 1 : 1 + Math.floor(rand() * 5)
  return {
    id: idFor(n),
    views,
    cart: !fresh && rand() < 0.4 ? Math.round(40 + rand() * 160) : 0,
    risk: Math.round((0.1 + rand() * 0.8) * 100) / 100,
    source: SOURCES[Math.floor(rand() * SOURCES.length)],
    priceSensitive: !fresh && rand() < 0.35,
    returning: rand() < 0.3,
  }
}

const CURSOR = 'M0 0 L0 16 L4.4 12.2 L7.4 18.4 L10 17.2 L7.1 11.2 L12.4 11.2 Z'

export default function SegmentLab() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.25 })
  // Read after mount: the server can't know the preference, and the first client render must match it.
  const prefersReduced = useReducedMotion()
  const [reduced, setReduced] = useState(false)
  useEffect(() => setReduced(!!prefersReduced), [prefersReduced])
  const rand = useRef(mulberry32(7))
  const serial = useRef(COUNT)
  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const r = mulberry32(42)
    return Array.from({ length: COUNT }, (_, i) => makeVisitor(r, false, i))
  })
  const visitorsRef = useRef(visitors)
  visitorsRef.current = visitors
  const [rules, setRules] = useState<RuleKey[]>(['cart', 'risk'])
  const [playing, setPlaying] = useState(true)
  const [feed, setFeed] = useState<{ id: number; text: string; join: boolean }[]>([])
  const [pulse, setPulse] = useState<Record<string, number>>({})
  const tick = useRef(0)
  const lastTick = useRef(0)
  const [, force] = useState(0)

  const active = RULES.filter((rule) => rules.includes(rule.key))
  const matches = (v: Visitor) => active.length > 0 && active.every((rule) => rule.test(v))
  const memberIds = useMemo(() => new Set(visitors.filter(matches).map((v) => v.id)), [visitors, rules]) // eslint-disable-line react-hooks/exhaustive-deps

  // Live events: a handful of sessions move every ~0.7 s; some end and new visitors arrive.
  useEffect(() => {
    if (!inView || !playing || reduced) return
    const id = window.setInterval(() => {
      const r = rand.current
      const prev = visitorsRef.current
      const next = [...prev]
      const before = new Set(prev.filter(matches).map((v) => v.id))
      for (let k = 0; k < 7; k++) {
        const i = Math.floor(r() * next.length)
        const v = { ...next[i] }
        const roll = r()
        if (roll < 0.05) {
          next[i] = makeVisitor(r, true, serial.current++)
          continue
        }
        if (roll < 0.5) v.views += 1
        else if (roll < 0.68) v.cart = v.cart + Math.round(30 + r() * 110)
        else if (roll < 0.76) v.priceSensitive = true
        v.risk = Math.min(0.97, Math.max(0.03, Math.round((v.risk + (r() - 0.45) * 0.3) * 100) / 100))
        next[i] = v
      }
      const afterIds = new Set(next.filter(matches).map((v) => v.id))
      const joined = [...afterIds].filter((id) => !before.has(id))
      const left = [...before].filter((id) => !afterIds.has(id))
      if (joined.length || left.length) {
        const stamp = Date.now()
        setPulse((p) => {
          const copy: Record<string, number> = {}
          // Keep only recent pulses so the map does not grow forever.
          for (const [k, t] of Object.entries(p)) if (stamp - t < 900) copy[k] = t
          joined.forEach((id) => (copy[id] = stamp))
          return copy
        })
        setFeed((f) =>
          [
            ...joined.map((id) => ({ id: tick.current++, text: `${id} joined`, join: true })),
            ...left.map((id) => ({ id: tick.current++, text: `${id} left`, join: false })),
            ...f,
          ].slice(0, 5),
        )
      }
      lastTick.current = performance.now()
      setVisitors(next)
    }, 700)
    return () => window.clearInterval(id)
  }, [inView, playing, reduced, rules]) // eslint-disable-line react-hooks/exhaustive-deps

  // Re-render the "updated … ago" label a few times a second.
  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => force((n) => n + 1), 250)
    return () => window.clearInterval(id)
  }, [inView])

  const toggle = (key: RuleKey) => setRules((r) => (r.includes(key) ? r.filter((k) => k !== key) : [...r, key]))
  const ago = lastTick.current ? Math.max(0, (performance.now() - lastTick.current) / 1000) : null

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {/* Rule builder */}
      <div className="rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Segment rules · all must match</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {RULES.map((rule) => {
              const on = rules.includes(rule.key)
              return (
                <button
                  key={rule.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(rule.key)}
                  className={cn(
                    'min-h-0 min-w-0 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                    on ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:text-night-text',
                  )}
                >
                  {rule.label}
                </button>
              )
            })}
          </div>
        </fieldset>
        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Presets</p>
        <div className="mt-3 flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setRules(preset.rules)}
              className="min-h-0 min-w-0 rounded-xl px-3.5 py-2.5 text-left text-[14px] text-night-soft ring-1 ring-night-line transition-colors hover:bg-night-raised hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-night-line pt-5">
          <p className="text-5xl font-semibold tabular-nums tracking-tight text-night-text" aria-live="polite">
            {active.length ? memberIds.size : '—'}
            <span className="ml-2 text-lg font-medium text-night-soft">of {COUNT} live visitors</span>
          </p>
          <p className="mt-2 font-mono text-[12.5px] text-night-muted">
            {reduced ? 'Paused (reduced motion)' : ago === null ? 'Waiting for the first event…' : `Recalculated ${ago.toFixed(1)} s ago`}
          </p>
          <ul aria-hidden className="mt-4 min-h-[6.5rem] space-y-1 font-mono text-[12.5px]">
            {feed.map((item) => (
              <li key={item.id} className={cn('animate-fade-up motion-reduce:animate-none', item.join ? 'text-success-soft' : 'text-night-muted')}>
                {item.join ? '+' : '−'} {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visitor floor */}
      <div className="relative rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Live visitors</p>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause live visitors' : 'Resume live visitors'}
              className="flex h-8 w-8 min-h-0 min-w-0 items-center justify-center rounded-full text-night-soft ring-1 ring-night-line hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            </button>
          )}
        </div>
        <ul aria-hidden className="grid grid-cols-12 gap-x-1 gap-y-3 sm:gap-y-4">
          {visitors.map((v) => {
            const member = memberIds.has(v.id)
            const pulsed = pulse[v.id] && Date.now() - pulse[v.id] < 900
            return (
              <li key={v.id} title={v.id} className="relative flex justify-center">
                {pulsed && <span className="absolute -inset-1 animate-ping rounded-full bg-success-soft/30 motion-reduce:hidden" />}
                <svg viewBox="0 0 14 20" className={cn('h-5 w-auto transition-[opacity,transform] duration-500 sm:h-6', member ? 'scale-110' : 'scale-90')}>
                  <path
                    d={CURSOR}
                    fill={member ? 'rgb(var(--c-night-text))' : 'rgb(var(--c-night-soft))'}
                    fillOpacity={member ? 1 : 0.22}
                    stroke={member ? 'rgb(var(--c-night))' : 'none'}
                    strokeWidth="0.8"
                  />
                </svg>
              </li>
            )
          })}
        </ul>
        <p className="mt-5 text-[13px] leading-relaxed text-night-soft">
          Lit cursors match every rule right now. Nobody here has given a name; membership comes from what they are doing.
        </p>
      </div>
    </div>
  )
}
