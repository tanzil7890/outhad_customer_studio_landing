'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Reporting demo: a holdout lift test on simulated traffic. Each day adds
 * visitors to the treated and holdout groups; the lift estimate and its 95%
 * confidence interval are computed from the counts, so the band really does
 * narrow with data, and a smaller holdout really does take longer to prove.
 */

const DAYS = 28
const VISITORS_PER_DAY = 6000
const RATE_HOLDOUT = 0.024
const RATE_TREATED = 0.027
const SHARES = [0.05, 0.1, 0.2] as const
type Share = (typeof SHARES)[number]

interface Day {
  day: number
  nT: number
  cT: number
  nH: number
  cH: number
  lift: number
  lo: number
  hi: number
}

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

/**
 * Noise seeds per holdout share, picked so each run behaves like the expected case for these rates
 * (the 95% interval clears zero after about 35 days at 5%, 19 at 10% and 11 at 20%), rather than a lucky one.
 */
const SEEDS: Record<Share, number> = { 0.05: 57, 0.1: 51, 0.2: 16 }

/** Cumulative results for every day of the test, reproducible per holdout share. */
function simulate(share: Share): Day[] {
  const rand = mulberry32(SEEDS[share])
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())
  const draw = (n: number, p: number) => Math.max(0, Math.round(n * p + gauss() * Math.sqrt(n * p * (1 - p))))
  const out: Day[] = []
  let nT = 0
  let cT = 0
  let nH = 0
  let cH = 0
  for (let d = 1; d <= DAYS; d++) {
    const h = Math.round(VISITORS_PER_DAY * share)
    const t = VISITORS_PER_DAY - h
    nH += h
    nT += t
    cH += draw(h, RATE_HOLDOUT)
    cT += draw(t, RATE_TREATED)
    const rT = cT / nT
    const rH = Math.max(1e-6, cH / nH)
    const se = Math.sqrt((rT * (1 - rT)) / nT + (rH * (1 - rH)) / nH)
    const diff = rT - rH
    out.push({ day: d, nT, cT, nH, cH, lift: diff / rH, lo: (diff - 1.96 * se) / rH, hi: (diff + 1.96 * se) / rH })
  }
  return out
}

const pct = (n: number, digits = 1) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(digits)}%`
const rate = (c: number, n: number) => `${((c / n) * 100).toFixed(2)}%`
const integer = new Intl.NumberFormat('en-US')

// Chart geometry (viewBox units).
const W = 640
const H = 260
const PAD = { l: 44, r: 12, t: 14, b: 26 }
const Y_MIN = -0.4
const Y_MAX = 0.6
const x = (day: number) => PAD.l + ((day - 1) / (DAYS - 1)) * (W - PAD.l - PAD.r)
const y = (v: number) => PAD.t + (1 - (Math.min(Y_MAX, Math.max(Y_MIN, v)) - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.t - PAD.b)

export default function LiftLab() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion()
  const [share, setShare] = useState<Share>(0.1)
  const [day, setDay] = useState(0)
  const [playing, setPlaying] = useState(false)
  const started = useRef(false)
  const series = useMemo(() => simulate(share), [share])

  // Start once when first seen; reduced motion jumps straight to the end.
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    if (reduced) setDay(DAYS)
    else setPlaying(true)
  }, [inView, reduced])

  useEffect(() => {
    if (!playing) return
    if (reduced) {
      setDay(DAYS)
      setPlaying(false)
      return
    }
    const id = window.setInterval(() => {
      setDay((d) => {
        if (d >= DAYS) {
          setPlaying(false)
          return d
        }
        return d + 1
      })
    }, 320)
    return () => window.clearInterval(id)
  }, [playing, reduced])

  const shown = series.slice(0, Math.max(0, day))
  const today = shown[shown.length - 1]
  const significantFrom = series.find((d) => d.lo > 0)?.day
  const significant = !!today && today.lo > 0

  const band =
    shown.length > 1
      ? `M ${shown.map((d) => `${x(d.day)} ${y(d.hi)}`).join(' L ')} L ${[...shown]
          .reverse()
          .map((d) => `${x(d.day)} ${y(d.lo)}`)
          .join(' L ')} Z`
      : ''
  const line = shown.length > 1 ? `M ${shown.map((d) => `${x(d.day)} ${y(d.lift)}`).join(' L ')}` : ''

  const restart = (next?: Share) => {
    if (next) setShare(next)
    setDay(reduced ? DAYS : 0)
    setPlaying(!reduced)
  }

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
      {/* Chart */}
      <div className="rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Lift vs. holdout, with 95% confidence</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => (day >= DAYS ? restart() : setPlaying((p) => !p))}
              aria-label={playing ? 'Pause the test' : day >= DAYS ? 'Run the test again' : 'Continue the test'}
              className="flex h-8 w-8 min-h-0 min-w-0 items-center justify-center rounded-full text-night-soft ring-1 ring-night-line hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden /> : day >= DAYS ? <RotateCcw className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
            </button>
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto w-full" role="img" aria-label={today ? `Day ${today.day}: estimated lift ${pct(today.lift)}, 95% interval ${pct(today.lo)} to ${pct(today.hi)}.` : 'The test has not started.'}>
          {[-0.4, -0.2, 0, 0.2, 0.4, 0.6].map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgb(var(--c-night-line))" strokeDasharray={v === 0 ? undefined : '3 5'} strokeWidth={v === 0 ? 1.5 : 1} />
              <text x={PAD.l - 8} y={y(v) + 4} textAnchor="end" className="fill-night-muted font-mono text-[11px]">
                {v === 0 ? '0' : `${v > 0 ? '+' : '−'}${Math.abs(v * 100)}%`}
              </text>
            </g>
          ))}
          {[1, 7, 14, 21, 28].map((d) => (
            <text key={d} x={x(d)} y={H - 6} textAnchor={d === DAYS ? 'end' : 'middle'} className="fill-night-muted font-mono text-[11px]">
              day {d}
            </text>
          ))}
          {band && <path d={band} fill="rgb(var(--c-night-text))" fillOpacity={significant ? 0.16 : 0.09} />}
          {line && <path d={line} fill="none" stroke="rgb(var(--c-night-text))" strokeWidth={2} strokeLinejoin="round" />}
          {today && (
            <>
              <line x1={x(today.day)} x2={x(today.day)} y1={y(today.lo)} y2={y(today.hi)} stroke="rgb(var(--c-night-text))" strokeWidth={2} />
              <circle cx={x(today.day)} cy={y(today.lift)} r={5} fill="rgb(var(--c-night))" stroke="rgb(var(--c-night-text))" strokeWidth={2} />
            </>
          )}
        </svg>
        <p className="mt-2 text-[12.5px] text-night-muted">
          The band is where the true lift probably sits. While it still crosses zero, the test can’t tell the change from noise.
        </p>
      </div>

      {/* Readout */}
      <div className="flex flex-col rounded-2xl bg-night p-5 ring-1 ring-night-line sm:p-6">
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Holdout size</legend>
          <div role="radiogroup" className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-night-raised p-1">
            {SHARES.map((s) => {
              const on = s === share
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => restart(s)}
                  className={cn(
                    'relative h-10 min-h-0 min-w-0 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                    on ? 'text-night' : 'text-night-soft hover:text-night-text',
                  )}
                >
                  {on && <motion.span layoutId="share-pill" className="absolute inset-0 rounded-lg bg-night-text" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{Math.round(s * 100)}%</span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-night-muted">A bigger holdout proves it sooner, but more shoppers go without help.</p>
        </fieldset>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-night-line pt-5">
          <div className="flex flex-col-reverse gap-1">
            <dt className="text-[12.5px] text-night-soft">Treated{today ? ` · ${integer.format(today.nT)}` : ''}</dt>
            <dd className="font-mono text-2xl tabular-nums text-night-text">{today ? rate(today.cT, today.nT) : '—'}</dd>
          </div>
          <div className="flex flex-col-reverse gap-1">
            <dt className="text-[12.5px] text-night-soft">Holdout{today ? ` · ${integer.format(today.nH)}` : ''}</dt>
            <dd className="font-mono text-2xl tabular-nums text-night-muted">{today ? rate(today.cH, today.nH) : '—'}</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-night-line pt-5" aria-live="polite">
          <p className="text-[12.5px] text-night-soft">Day {Math.max(day, 0)} of {DAYS} · estimated lift</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight text-night-text">{today ? pct(today.lift) : '—'}</p>
          <p className="mt-1 font-mono text-[12.5px] text-night-muted">{today ? `95% CI ${pct(today.lo)} to ${pct(today.hi)}` : 'Waiting for traffic'}</p>
          <p
            className={cn(
              'mt-4 inline-flex rounded-full px-3 py-1.5 text-[13px] font-semibold',
              significant ? 'bg-success/30 text-success-soft' : 'bg-night-raised text-night-soft',
            )}
          >
            {!today ? 'Not started' : significant ? `Significant at 95% (since day ${significantFrom})` : 'Not significant yet'}
          </p>
        </div>
        <p className="mt-auto pt-6 text-[12.5px] leading-relaxed text-night-muted">
          {integer.format(VISITORS_PER_DAY)} simulated visitors a day. Convertive reports lift this way on your own traffic, by segment,
          channel and intervention.
        </p>
      </div>
    </div>
  )
}
