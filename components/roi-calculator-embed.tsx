'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ── Count-up animation ──────────────────────────────────────
function useAnimatedNumber(target: number, duration = 550) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>()
  const fromRef = useRef(0)

  useEffect(() => {
    const startValue = fromRef.current
    const startTime = performance.now()
    if (frameRef.current) cancelAnimationFrame(frameRef.current)

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (target - startValue) * eased)
      setDisplay(current)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration])

  return display
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
const fmtUSD = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export default function RoiCalculatorEmbed() {
  const [visitors, setVisitors] = useState(10000)
  const [rate, setRate]         = useState(2.0)
  const [aov, setAov]           = useState(65)
  const [lift, setLift]         = useState(0.5)

  // ── Calculations ──────────────────────────────────────────
  const currentCustomers  = Math.round(visitors * (rate / 100))
  const anonymousLost     = Math.max(0, visitors - currentCustomers)
  const newCustomers      = Math.round(visitors * (lift / 100))
  const revenueRecovered  = newCustomers * aov
  const revenueAtRisk     = anonymousLost * aov
  const annualRecovered   = revenueRecovered * 12

  // ── Animated values ───────────────────────────────────────
  const dispAtRisk    = useAnimatedNumber(revenueAtRisk)
  const dispLost      = useAnimatedNumber(anonymousLost)
  const dispNewCustomers = useAnimatedNumber(newCustomers)
  const dispRevenue   = useAnimatedNumber(revenueRecovered)
  const dispAnnual    = useAnimatedNumber(annualRecovered)

  return (
    <section className="bg-[#F5EFE8] border-y border-[#E8DDD4] py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1410] leading-tight max-w-xl">
            How much anonymous traffic is costing you right now?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ── Inputs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-[#E8DDD4] p-6 md:p-8 space-y-7"
          >
            {/* Visitors */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1410] mb-1">
                Monthly Website Visitors
              </label>
              <p className="text-xs text-[#9C8B7E] mb-2">Unique visitors per month</p>
              <input
                type="number"
                min={1000}
                step={1000}
                value={visitors}
                onChange={(e) => setVisitors(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1410] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#1A1410] focus:border-transparent transition-shadow bg-[#FAFAF8]"
              />
              <p className="text-xs text-[#9C8B7E] mt-1">{fmt(visitors)} visitors / month</p>
            </div>

            {/* Conversion Rate */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1410] mb-1">
                Current Conversion Rate
              </label>
              <p className="text-xs text-[#9C8B7E] mb-2">
                % of visitors who purchase <span className="text-[#C4B4A8]">(Industry avg: 1.5–3%)</span>
              </p>
              <div className="relative">
                <input
                  type="number"
                  min={0.1}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 pr-10 text-[#1A1410] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#1A1410] focus:border-transparent transition-shadow bg-[#FAFAF8]"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8B7E] font-semibold">%</span>
              </div>
              <p className="text-xs text-[#9C8B7E] mt-1">{fmt(currentCustomers)} customers converting / month</p>
            </div>

            {/* AOV */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1410] mb-1">
                Average Order Value
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C8B7E] font-semibold">$</span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={aov}
                  onChange={(e) => setAov(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full border border-[#E8DDD4] rounded-xl pl-8 pr-4 py-3 text-[#1A1410] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#1A1410] focus:border-transparent transition-shadow bg-[#FAFAF8]"
                />
              </div>
            </div>

            {/* Lift Presets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-[#1A1410]">
                  If Convertive improves conversion by…
                </label>
                <span className="text-xl font-black text-[#C87941]">+{lift.toFixed(1)}%</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Conservative', value: 0.3, sub: '+0.3%' },
                  { label: 'Estimated',    value: 0.5, sub: '+0.5%' },
                  { label: 'Aggressive',   value: 0.8, sub: '+0.8%' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setLift(preset.value)}
                    className={cn(
                      'flex flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-3 text-center transition-all duration-200',
                      lift === preset.value
                        ? 'border-[#1A1410] bg-[#1A1410] text-white'
                        : 'border-[#E8DDD4] bg-white text-[#1A1410] hover:border-[#D4C4B8]'
                    )}
                  >
                    <span className="text-xs font-semibold leading-tight">{preset.label}</span>
                    <span className={cn('text-base font-black tabular-nums', lift === preset.value ? 'text-[#C87941]' : 'text-[#C87941]')}>
                      {preset.sub}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#9C8B7E] mt-2 text-center">
                Convertive clients typically see <span className="font-medium text-[#5C4E44]">0.3–0.8%</span> lift in the first 60 days
              </p>
            </div>

            {/* Quick Summary */}
            <div className="bg-[#F7E4D0] rounded-xl p-4 border border-[#EBBF94]">
              <p className="text-[#7A4420] text-xs font-bold uppercase tracking-wider mb-2">
                Quick Summary
              </p>
              <p className="text-sm text-[#1A1410] leading-relaxed">
                With <strong>{fmt(visitors)}</strong> monthly visitors at a{' '}
                <strong>{rate}%</strong> conversion rate, you&apos;re losing{' '}
                <strong className="text-[#8B2020]">{fmt(anonymousLost)}</strong> potential
                customers every month. Recovering just <strong>{lift.toFixed(1)}%</strong>{' '}
                means{' '}
                <strong className="text-[#C87941]">+{fmtUSD(revenueRecovered)}</strong>{' '}
                in monthly revenue.
              </p>
            </div>
          </motion.div>

          {/* ── Result Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24 rounded-2xl border-2 border-[#1A1410] overflow-hidden shadow-lg"
          >
            {/* Card header — dark */}
            <div className="bg-[#1A1410] px-6 py-6 text-white">
              <p className="text-sm font-medium text-white/60 mb-1">Revenue at Risk</p>
              <motion.div key={dispAtRisk} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 0.25 }} className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black tabular-nums">{fmtUSD(dispAtRisk)}</span>
                <span className="text-lg text-white/50">/ month</span>
              </motion.div>
              <p className="text-xs text-white/40 mt-1">Based on anonymous visitor loss at current conversion rate</p>
            </div>

            {/* Card body */}
            <div className="bg-white px-6 py-6 space-y-0 divide-y divide-[#F2ECE6]">
              <div className="pb-5">
                <p className="text-[10px] text-[#9C8B7E] font-bold uppercase tracking-widest mb-1">Anonymous Sessions Leaving / Month</p>
                <p className="text-3xl font-black text-[#8B2020] tabular-nums">{fmt(dispLost)}</p>
                <p className="text-xs text-[#9C8B7E] mt-0.5">visitors leaving without converting</p>
              </div>

              <div className="py-5">
                <p className="text-[10px] text-[#9C8B7E] font-bold uppercase tracking-widest mb-1">New Customers Recovered / Month</p>
                <p className="text-3xl font-black text-[#1A5C40] tabular-nums">+{fmt(dispNewCustomers)}</p>
                <p className="text-xs text-[#9C8B7E] mt-0.5">if Convertive adds +{lift.toFixed(1)}% lift</p>
              </div>

              <div className="py-5">
                <p className="text-[10px] text-[#9C8B7E] font-bold uppercase tracking-widest mb-1">Revenue Recovered / Month</p>
                <p className="text-3xl font-black text-[#C87941] tabular-nums">+{fmtUSD(dispRevenue)}</p>
                <p className="text-xs text-[#9C8B7E] mt-0.5">{fmt(newCustomers)} customers × ${aov} AOV</p>
              </div>

              <div className="pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-[#9C8B7E] font-bold uppercase tracking-widest mb-1">Annual Revenue Recovered</p>
                    <p className="text-2xl font-black text-[#1A1410] tabular-nums">{fmtUSD(dispAnnual)}</p>
                  </div>
                  <span className="shrink-0 bg-[#F7E4D0] text-[#7A4420] text-xs font-bold px-3 py-1.5 rounded-full border border-[#EBBF94]">
                    15-min audit
                  </span>
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="bg-[#FDF0E0] px-6 py-5">
              <p className="text-sm text-[#5C4E44] leading-relaxed mb-4">
                This is a conservative estimate. Convertive clients typically see{' '}
                <strong className="text-[#1A1410]">0.3–0.8%</strong> conversion lift in the first 60 days.
              </p>
              <Link
                href="/demo"
                className="block w-full text-center bg-[#C87941] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#A86331] transition-colors"
              >
                Book the Audit — See Your Real Numbers →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
