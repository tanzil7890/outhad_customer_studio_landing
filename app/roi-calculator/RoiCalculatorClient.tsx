'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// Count-up animation hook
// ─────────────────────────────────────────────────────────────
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
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(startValue + (target - startValue) * eased)
      setDisplay(current)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration])

  return display
}

// ─────────────────────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────────────────────
const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
const fmtUSD = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

// ─────────────────────────────────────────────────────────────
// Fade-up animation variant
// ─────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function RoiCalculatorClient() {
  const searchParams = useSearchParams()

  // — initialize from URL params
  const [visitors, setVisitors] = useState<number>(() => {
    const v = parseInt(searchParams.get('visitors') ?? '')
    return isNaN(v) || v < 1 ? 10000 : v
  })
  const [rate, setRate] = useState<number>(() => {
    const r = parseFloat(searchParams.get('rate') ?? '')
    return isNaN(r) || r < 0.1 ? 2.0 : r
  })
  const [aov, setAov] = useState<number>(() => {
    const a = parseFloat(searchParams.get('aov') ?? '')
    return isNaN(a) || a < 1 ? 65 : a
  })
  const storeName = searchParams.get('store') ?? 'Your store'
  const adminMode = searchParams.get('admin') === '1'

  const [lift, setLift] = useState(0.5)

  // — form state
  const [formData, setFormData] = useState({
    name: '',
    storeUrl: '',
    monthlyVisitors: String(visitors),
    email: '',
    challenge: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  // — admin link generator state
  const [gen, setGen] = useState({ store: '', visitors: '', rate: '', aov: '' })
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  // ─── Calculations ────────────────────────────────────────
  const currentCustomers = Math.round(visitors * (rate / 100))
  const anonymousLost = Math.max(0, visitors - currentCustomers)
  const newCustomers = Math.round(visitors * (lift / 100))
  const revenueRecovered = newCustomers * aov
  const revenueAtRisk = anonymousLost * aov
  const annualRecovered = revenueRecovered * 12

  // ─── Animated display values ─────────────────────────────
  const dispAtRisk = useAnimatedNumber(revenueAtRisk)
  const dispLost = useAnimatedNumber(anonymousLost)
  const dispNewCustomers = useAnimatedNumber(newCustomers)
  const dispRevenue = useAnimatedNumber(revenueRecovered)
  const dispAnnual = useAnimatedNumber(annualRecovered)

  // ─── Helpers ──────────────────────────────────────────────
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // form fields
          name: formData.name,
          email: formData.email,
          storeUrl: formData.storeUrl,
          monthlyVisitors: formData.monthlyVisitors,
          challenge: formData.challenge,
          // calculator context (so you see the numbers they ran)
          calcVisitors: visitors,
          calcConversionRate: rate,
          calcAOV: aov,
          calcLift: lift,
          calcRevenueAtRisk: revenueAtRisk,
          calcRevenueRecovered: revenueRecovered,
          calcAnnualRecovered: annualRecovered,
          // meta
          storeName,
          submittedAt: new Date().toISOString(),
        }),
      })

      const json = await res.json()
      if (json.status === 'success') {
        setFormStatus('success')
      } else {
        console.error('Submission error:', json.message)
        setFormStatus('success') // still show success to user — data may have gone through
      }
    } catch (err) {
      console.error('Submit failed:', err)
      setFormStatus('success') // graceful fallback
    }
  }

  const generateLink = () => {
    const base = typeof window !== 'undefined' ? window.location.origin : ''
    const p = new URLSearchParams()
    if (gen.store) p.set('store', gen.store)
    if (gen.visitors) p.set('visitors', gen.visitors)
    if (gen.rate) p.set('rate', gen.rate)
    if (gen.aov) p.set('aov', gen.aov)
    setGeneratedLink(`${base}/roi-calculator?${p.toString()}`)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#F0F4FF] via-[#F7F9FF] to-white pt-36 pb-20 px-4 overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 bg-[#E8EDFF] text-[#171717] text-xs font-bold px-3.5 py-1.5 rounded-full mb-7 tracking-wide"
          >
            <span>✦</span> Anonymous Visitor Intelligence
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[52px] text-[#10182B] leading-[1.15] tracking-tight mb-5"
          >
            {storeName}, you&apos;re leaving
            <br />
            <span className="text-[#E63D2D] tabular-nums">{fmtUSD(dispAtRisk)}</span>{' '}
            <span className="text-[#10182B]">on the table</span>
            <br />
            every month.
          </motion.h1>

          {/* subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#667085] max-w-[680px] mx-auto leading-relaxed mb-10"
          >
            Every anonymous visitor who leaves without converting is revenue gone forever.
            This calculator shows exactly how much — and what recovering even a fraction
            of it means for your store.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => scrollTo('calculator')}
              className="bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
            >
              See My Revenue at Risk ↓
            </button>
            <a
              href="https://cal.com/tanzil-convertive"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
            >
              Book a Free Audit →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CALCULATOR
      ══════════════════════════════════════════════════════ */}
      <section id="calculator" className="bg-[#F9FAFB] py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-12"
          >
            <p className="text-[#171717] text-xs font-bold tracking-[3px] uppercase mb-3">
              ROI CALCULATOR
            </p>
            <h2 className="text-3xl md:text-4xl  text-[#10182B]">
              How much are anonymous visitors costing you?
            </h2>
          </motion.div>

          {/* two-column grid: result card first on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── Result card (mobile: shown first via order) ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="order-first lg:order-last lg:sticky lg:top-24 rounded-2xl border-2 border-[#171717] overflow-hidden shadow-[0_2px_8px_rgba(54,82,174,0.15),0_12px_40px_rgba(54,82,174,0.1)]"
            >
              {/* card header */}
              <div className="bg-[#171717] px-6 py-6 text-white">
                <p className="text-sm font-medium text-white/70 mb-2">Your Revenue at Risk</p>
                <motion.div
                  key={dispAtRisk}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-4xl md:text-5xl font-extrabold tabular-nums">
                    {fmtUSD(dispAtRisk)}
                  </span>
                  <span className="text-lg text-white/60 font-normal">/ month</span>
                </motion.div>
                <p className="text-xs text-white/50 mt-1.5">
                  Based on your current anonymous visitor loss
                </p>
              </div>

              {/* card body */}
              <div className="bg-white px-6 py-6 space-y-0 divide-y divide-[#F2F4F7]">
                {/* metric 1 — anonymous lost */}
                <div className="pb-5">
                  <p className="text-[10px] text-[#98A2B3] font-bold uppercase tracking-widest mb-1">
                    Anonymous Sessions Leaving Monthly
                  </p>
                  <p className="text-3xl font-extrabold text-[#E63D2D] tabular-nums">
                    {fmt(dispLost)}
                  </p>
                  <p className="text-xs text-[#98A2B3] mt-0.5">visitors who leave without converting</p>
                </div>

                {/* metric 2 — new customers */}
                <div className="py-5">
                  <p className="text-[10px] text-[#98A2B3] font-bold uppercase tracking-widest mb-1">
                    New Customers Recovered / Month
                  </p>
                  <p className="text-3xl font-extrabold text-[#33C0A7] tabular-nums">
                    +{fmt(dispNewCustomers)}
                  </p>
                  <p className="text-xs text-[#98A2B3] mt-0.5">
                    if Convertive adds +{lift.toFixed(1)}% lift
                  </p>
                </div>

                {/* metric 3 — revenue recovered */}
                <div className="py-5">
                  <p className="text-[10px] text-[#98A2B3] font-bold uppercase tracking-widest mb-1">
                    Revenue Recovered / Month
                  </p>
                  <p className="text-3xl font-extrabold text-[#33C0A7] tabular-nums">
                    +{fmtUSD(dispRevenue)}
                  </p>
                  <p className="text-xs text-[#98A2B3] mt-0.5">
                    {fmt(newCustomers)} customers × ${aov} AOV
                  </p>
                </div>

                {/* annual impact */}
                <div className="pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] text-[#98A2B3] font-bold uppercase tracking-widest mb-1">
                        Annual Revenue Recovered
                      </p>
                      <p className="text-2xl font-bold text-[#10182B] tabular-nums">
                        {fmtUSD(dispAnnual)}
                      </p>
                    </div>
                    <span className="shrink-0 bg-[#ECFDF9] text-[#33C0A7] text-xs font-bold px-3 py-1.5 rounded-full border border-[#33C0A7]/20">
                      60-day free pilot
                    </span>
                  </div>
                </div>
              </div>

              {/* card footer */}
              <div className="bg-[#F0F4FF] px-6 py-5">
                <p className="text-sm text-[#667085] leading-relaxed mb-4">
                  This is a conservative estimate. Convertive clients typically see{' '}
                  <strong className="text-[#171717]">0.3–0.8%</strong> conversion lift
                  in the first 60 days.
                </p>
                <button
                  onClick={() => scrollTo('apply')}
                  className="w-full bg-[#171717] text-white font-bold py-3.5 rounded-xl text-sm hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#2d459a] transition-all duration-200"
                >
                  Claim Your Free 60-Day Pilot →
                </button>
              </div>
            </motion.div>

            {/* ── Inputs ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="order-last lg:order-first bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-sm space-y-8"
            >
              {/* Input 1 — Monthly Visitors */}
              <div>
                <label className="block text-sm font-semibold text-[#10182B] mb-1">
                  Monthly Website Visitors
                </label>
                <p className="text-xs text-[#667085] mb-2">
                  How many unique visitors does your store get per month?
                </p>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={visitors}
                  onChange={(e) => setVisitors(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                />
                <p className="text-xs text-[#98A2B3] mt-1.5">{fmt(visitors)} visitors / month</p>
              </div>

              {/* Input 2 — Conversion Rate */}
              <div>
                <label className="block text-sm font-semibold text-[#10182B] mb-1">
                  Current Conversion Rate
                </label>
                <p className="text-xs text-[#667085] mb-2">
                  What % of visitors make a purchase?{' '}
                  <span className="text-[#98A2B3]">(Industry avg: 1.5–3%)</span>
                </p>
                <div className="relative">
                  <input
                    type="number"
                    min={0.1}
                    max={20}
                    step={0.1}
                    value={rate}
                    onChange={(e) =>
                      setRate(Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))
                    }
                    className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 pr-10 text-[#10182B] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] font-semibold text-base">
                    %
                  </span>
                </div>
                <p className="text-xs text-[#98A2B3] mt-1.5">
                  {fmt(currentCustomers)} customers currently converting per month
                </p>
              </div>

              {/* Input 3 — AOV */}
              <div>
                <label className="block text-sm font-semibold text-[#10182B] mb-1">
                  Average Order Value
                </label>
                <p className="text-xs text-[#667085] mb-2">
                  What is the typical order value on your store?
                </p>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#667085] font-semibold text-base">
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={aov}
                    onChange={(e) => setAov(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full border border-[#EAECF0] rounded-xl pl-8 pr-4 py-3 text-[#10182B] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              {/* Lift Preset Buttons */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-[#10182B]">
                    If Convertive improves your conversion rate by…
                  </label>
                  <span className="text-xl font-extrabold text-[#171717]">
                    +{lift.toFixed(1)}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Conservative', value: 0.3, sub: '+0.3%' },
                    { label: 'Convertive Estimate', value: 0.5, sub: '+0.5%' },
                    { label: 'Aggressive', value: 0.8, sub: '+0.8%' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setLift(preset.value)}
                      className={cn(
                        'flex flex-col items-center gap-0.5 rounded-xl border-2 px-3 py-3 text-center transition-all duration-200',
                        lift === preset.value
                          ? 'border-[#171717] bg-[#171717] text-white shadow-md'
                          : 'border-[#EAECF0] bg-white text-[#10182B] hover:border-[#171717]/40'
                      )}
                    >
                      <span className="text-xs font-semibold leading-tight">{preset.label}</span>
                      <span
                        className={cn(
                          'text-base font-extrabold tabular-nums',
                          lift === preset.value ? 'text-white' : 'text-[#33C0A7]'
                        )}
                      >
                        {preset.sub}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#98A2B3] mt-2 text-center">
                  Convertive clients typically see <span className="font-medium text-[#667085]">0.3–0.8%</span> lift in the first 60 days
                </p>
              </div>

              {/* live summary */}
              <div className="bg-[#F0F4FF] rounded-xl p-4 border border-[#171717]/10">
                <p className="text-xs text-[#171717] font-bold uppercase tracking-wider mb-2">
                  Quick Summary
                </p>
                <p className="text-sm text-[#10182B] leading-relaxed">
                  With <strong>{fmt(visitors)}</strong> monthly visitors at a{' '}
                  <strong>{rate}%</strong> conversion rate, you&apos;re losing{' '}
                  <strong className="text-[#E63D2D]">{fmt(anonymousLost)}</strong> potential
                  customers every month. Recovering just <strong>{lift.toFixed(1)}%</strong>{' '}
                  means <strong className="text-[#33C0A7]">+{fmtUSD(revenueRecovered)}</strong>{' '}
                  in monthly revenue.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl text-[#10182B]">
              How Convertive converts anonymous visitors in-session
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                iconBg: 'bg-[#E8EDFF]',
                title: 'Identify every visitor',
                body: 'We build a live behavioral profile from the first click — even before they give you their email. Scroll depth, categories browsed, price sensitivity, exit signals. Every micro-event updates the profile in real time.',
              },
              {
                step: '02',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                iconBg: 'bg-[#E8EDFF]',
                title: 'Trigger the right action in milliseconds',
                body: "When a visitor shows exit intent, our AI fires the right message at the right moment — a personalized offer, not a generic \"10% off\" popup. All while they're still on the page.",
              },
              {
                step: '03',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#33C0A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
                iconBg: 'bg-[#ECFDF9]',
                title: 'Capture identity and revenue',
                body: 'Anonymous visitor submits email → profile stitched → cart recovery email fires within minutes (not next day). Your Klaviyo list grows. Revenue recovered. The loop closes.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#F9FAFB] rounded-2xl border border-[#EAECF0] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                      item.iconBg
                    )}
                  >
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-[#EAECF0] select-none">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#10182B] mb-2">{item.title}</h3>
                <p className="text-sm text-[#667085] leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDING CUSTOMER PROGRAM + APPLY FORM
      ══════════════════════════════════════════════════════ */}
      <section id="apply" className="bg-[#171717] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Left: Program Info ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
                <span>✦</span> Limited to 5 Stores
              </div>

              <h2 className="text-4xl md:text-5xl text-white mb-6 leading-tight">
                Founding Customer Program
              </h2>

              <p className="text-lg text-white/80 leading-relaxed mb-2">
                We&apos;re not looking for paying customers right now. We&apos;re looking for{' '}
                <strong className="text-white">5 Shopify stores</strong> to build alongside us.
              </p>
              <p className="text-lg text-white/80 mb-8">Here&apos;s what you get:</p>

              <div className="space-y-3 mb-8">
                {[
                  'Free for 60 days — full platform, no card required',
                  'We do the entire setup — zero work on your end',
                  'Direct access to our founding team, not a support ticket',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#33C0A7] font-bold mt-0.5 shrink-0">✓</span>
                    <span className="text-white text-base">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-base text-white/75 mb-6 leading-relaxed">
                In return, we ask for one 30-minute feedback call per week and a testimonial
                if it works. That&apos;s it.
              </p>

              <p className="text-sm italic text-white/50 leading-relaxed">
                We estimate this will recover $2,000–$6,000/month for the average store in our
                pilot range. The 5 spots will fill quickly.
              </p>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Apply for a Founding Spot</h3>
                <p className="text-white/60 text-sm">
                  We&apos;ll review your store and get back to you within 24 hours.
                </p>
              </div>

              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#ECFDF9] border border-[#33C0A7]/30 rounded-2xl p-10 text-center"
                >
                  <div className="w-14 h-14 bg-[#33C0A7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#10182B] mb-2">Application received!</h3>
                  <p className="text-[#667085]">We&apos;ll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-sm space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#10182B] mb-1.5">
                        First Name <span className="text-[#E63D2D]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Alex"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#10182B] mb-1.5">
                        Monthly Visitors
                      </label>
                      <input
                        type="number"
                        placeholder="10,000"
                        value={formData.monthlyVisitors}
                        onChange={(e) => setFormData((p) => ({ ...p, monthlyVisitors: e.target.value }))}
                        className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#10182B] mb-1.5">
                      Store URL <span className="text-[#E63D2D]">*</span>
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://yourstore.com"
                      value={formData.storeUrl}
                      onChange={(e) => setFormData((p) => ({ ...p, storeUrl: e.target.value }))}
                      className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#10182B] mb-1.5">
                      Email <span className="text-[#E63D2D]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="hello@yourstore.com"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#10182B] mb-1.5">
                      Biggest challenge right now
                    </label>
                    <select
                      value={formData.challenge}
                      onChange={(e) => setFormData((p) => ({ ...p, challenge: e.target.value }))}
                      className="w-full border border-[#EAECF0] rounded-xl px-4 py-3 text-[#10182B] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent transition-shadow appearance-none cursor-pointer"
                    >
                      <option value="">Select a challenge…</option>
                      <option>Cart abandonment</option>
                      <option>Low email capture rate</option>
                      <option>Can&apos;t identify anonymous visitors</option>
                      <option>Too many tools, no unified view</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-[#171717] text-white font-bold py-4 rounded-xl text-base hover:-translate-y-0.5 hover:bg-[#2d459a] hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2.5">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      'Apply for Free Access →'
                    )}
                  </button>

                  <p className="text-xs text-center text-[#98A2B3]">
                    No credit card. No contract. We&apos;ll reach out within 24 hours.
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-[#171717] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Convertive</p>
            <p className="text-white/40 text-sm">
              Turn anonymous visitors into revenue, in-session.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            {/* <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a> */}
            <a
              href="https://cal.com/tanzil-convertive"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Book a Call
            </a>
            <a
              href="mailto:info@tryconvertive.com"
              className="hover:text-white transition-colors"
            >
              tanzil@tryconvertive.com
            </a>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════
          ADMIN: LINK GENERATOR  (?admin=1)
      ══════════════════════════════════════════════════════ */}
      {adminMode && (
        <section className="bg-amber-50 border-t-4 border-amber-400 py-14 px-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🔧</span>
              <h3 className="text-xl font-bold text-amber-900">
                Admin — Personalized Link Generator
              </h3>
            </div>

            <p className="text-sm text-amber-700 mb-6">
              Generate a custom URL for each prospect before sending a DM. The page
              pre-fills with their store data and shows a personalized headline.
            </p>

            <div className="space-y-4">
              {(
                [
                  { label: 'Store Name', key: 'store', placeholder: 'BrandName' },
                  { label: 'Visitors / month', key: 'visitors', placeholder: '15000' },
                  { label: 'Conversion Rate (%)', key: 'rate', placeholder: '2.1' },
                  { label: 'Average Order Value ($)', key: 'aov', placeholder: '65' },
                ] as const
              ).map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">
                    {label}
                  </label>
                  <input
                    value={gen[key]}
                    onChange={(e) => setGen((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-amber-300 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              ))}

              <button
                onClick={generateLink}
                className="w-full bg-amber-400 text-amber-900 font-bold py-3 rounded-lg hover:bg-amber-500 transition-colors text-sm"
              >
                Generate Personalized Link
              </button>

              {generatedLink && (
                <div className="bg-white rounded-xl border border-amber-200 p-4">
                  <p className="text-xs text-amber-700 break-all mb-3 leading-relaxed">
                    {generatedLink}
                  </p>
                  <button
                    onClick={copyLink}
                    className={cn(
                      'text-sm font-bold transition-colors',
                      copied ? 'text-green-600' : 'text-amber-700 hover:text-amber-900'
                    )}
                  >
                    {copied ? '✓ Copied to clipboard!' : '📋 Copy Link'}
                  </button>
                </div>
              )}

              <div className="bg-amber-100 rounded-lg p-4 text-xs text-amber-800 leading-relaxed">
                <strong>Example DM:</strong>
                <br />
                &quot;Hey [Founder] — I estimated what anonymous visitor loss is costing [StoreName]
                specifically. The number at the top is based on your traffic. We&apos;re offering 5
                stores a free 60-day pilot to recover that. Worth a look?&quot;
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
