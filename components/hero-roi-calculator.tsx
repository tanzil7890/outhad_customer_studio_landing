'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function useAnimatedNumber(target: number, duration = 500) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>()
  const fromRef = useRef(0)
  useEffect(() => {
    const startValue = fromRef.current
    const startTime = performance.now()
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(startValue + (target - startValue) * eased))
      if (p < 1) { frameRef.current = requestAnimationFrame(tick) } else { fromRef.current = target }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration])
  return display
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
const fmtUSD = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export default function HeroRoiCalculator() {
  const [visitors, setVisitors] = useState(10000)
  const [rate, setRate] = useState(2.0)
  const [aov, setAov] = useState(65)
  const [lift, setLift] = useState(0.5)

  const anonymousLost = Math.max(0, visitors - Math.round(visitors * (rate / 100)))
  const newCustomers = Math.round(visitors * (lift / 100))
  const revenueAtRisk = anonymousLost * aov
  const revenueRecovered = newCustomers * aov
  const annualRecovered = revenueRecovered * 12

  const dispAtRisk = useAnimatedNumber(revenueAtRisk)
  const dispRecovered = useAnimatedNumber(revenueRecovered)
  const dispAnnual = useAnimatedNumber(annualRecovered)
  const dispNewCustomers = useAnimatedNumber(newCustomers)

  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-[hsl(var(--app-border))] shadow-2xl bg-white">

      {/* Result header */}
      <div className="bg-[hsl(var(--app-text))] px-5 py-5 text-[hsl(var(--app-background))]">
        <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1.5">
          Your Revenue at Risk
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-black tabular-nums text-[#E63D2D]">
            {fmtUSD(dispAtRisk)}
          </span>
          <span className="text-base opacity-50 font-normal">/ month</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">Recoverable / mo</p>
            <p className="text-xl font-black tabular-nums text-[#33C0A7]">+{fmtUSD(dispRecovered)}</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider opacity-50 mb-0.5">Annual upside</p>
            <p className="text-xl font-black tabular-nums text-[#33C0A7]">+{fmtUSD(dispAnnual)}</p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="px-5 py-4 space-y-4 bg-[#F9FAFB]">
        {/* Row 1: Visitors + Rate */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
              Monthly Visitors
            </label>
            <input
              type="number"
              min={1000}
              step={1000}
              value={visitors}
              onChange={(e) => setVisitors(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full border border-[#EAECF0] rounded-xl px-3 py-2.5 text-[#10182B] font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#171717] bg-white transition-shadow"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
              Current Conversion Rate
            </label>
            <div className="relative">
              <input
                type="number"
                min={0.1}
                max={20}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full border border-[#EAECF0] rounded-xl px-3 py-2.5 pr-7 text-[#10182B] font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#171717] bg-white transition-shadow"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] text-sm font-semibold">%</span>
            </div>
          </div>
        </div>

        {/* Row 2: AOV */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] block mb-1">
            Avg Order Value
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3] text-sm font-semibold">$</span>
            <input
              type="number"
              min={1}
              step={1}
              value={aov}
              onChange={(e) => setAov(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full border border-[#EAECF0] rounded-xl pl-6 pr-3 py-2.5 text-[#10182B] font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#171717] bg-white transition-shadow"
            />
          </div>
        </div>

        {/* Lift presets */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Convertive Lift
            </label>
            <span className="text-sm font-black text-[#171717]">+{lift.toFixed(1)}%</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Conservative', value: 0.3 },
              { label: 'Estimated', value: 0.5 },
              { label: 'Aggressive', value: 0.8 },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setLift(p.value)}
                className={cn(
                  'rounded-lg border-2 py-2 text-xs font-bold transition-all duration-150',
                  lift === p.value
                    ? 'border-[#171717] bg-[#171717] text-white'
                    : 'border-[#EAECF0] bg-white text-[#667085] hover:border-[#171717]/30'
                )}
              >
                +{p.value.toFixed(1)}%
              </button>
            ))}
          </div>
        </div>

        {/* Summary line */}
        <p className="text-xs text-[#98A2B3] leading-relaxed">
          Recovering <strong className="text-[#10182B]">{fmt(dispNewCustomers)}</strong> of your{' '}
          <strong className="text-[#E63D2D]">{fmt(anonymousLost)}</strong> monthly anonymous visitors.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-4 bg-white border-t border-[#EAECF0]">
        <Link
          href="/roi-calculator"
          className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          See Full Breakdown →
        </Link>
      </div>
    </div>
  )
}
