'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RoiCalculatorEmbed from '@/components/roi-calculator-embed'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function LinkedInLandingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', company: '', role: '', website: '' })
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      ;(window as any).lintrk('track', { conversion_id: 25171748 })
      ;(window as any).lintrk('track', { conversion_id: 25171724 })
    }
    router.push('/audit-booked')
  }

  return (
    <main className="bg-[#FAFAF8] min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 bg-[#F7E4D0] border border-[#EBBF94] rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C87941] inline-block" />
                <span className="text-[#7A4420] text-xs font-bold tracking-widest uppercase">For E-Commerce Teams</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-[#1A1410] leading-[1.1] tracking-tight mb-6 max-w-4xl"
            >
              You're paying for traffic your stack{' '}
              <span className="text-[#C87941]">can't convert</span>{' '}
              in-session.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-[#5C4E44] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              Convertive turns anonymous shopper behavior into live next-best actions
              before the visitor leaves.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1410] text-[#F5F0EB] font-bold px-7 py-4 rounded-xl text-sm md:text-base hover:bg-[#2D2420] transition-colors shadow-lg"
              >
                Book an Anonymous Traffic Conversion Audit →
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-[#D4C4B8] text-[#1A1410] font-semibold px-7 py-4 rounded-xl text-sm md:text-base hover:bg-[#F5EFE8] transition-colors"
              >
                See how it works
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.p variants={fadeUp} className="mt-6 text-xs text-[#9C8B7E]">
              No commitment · 15-minute session · Live on your store's data
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2 — The Problem ── */}
      <section className="bg-[#F5EFE8] border-y border-[#E8DDD4] py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-4">
              The Problem
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-[#1A1410] leading-tight mb-6 max-w-2xl"
            >
              Most of your traffic is anonymous.
              <br />
              Most of your stack starts{' '}
              <span className="relative inline-block">
                too late.
                <span className="absolute left-0 bottom-0.5 w-full h-0.5 bg-[#EBBF94]" />
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[#5C4E44] text-base md:text-lg leading-relaxed mb-12 max-w-2xl"
            >
              Your email platform, CRM, and ad workflows usually start after the session ends.
              By then, the shopper is gone.
            </motion.p>

            {/* Comparison */}
            <motion.div
              variants={fadeUp}
              className="grid md:grid-cols-2 gap-4"
            >
              <div className="bg-white border border-[#E8DDD4] rounded-2xl p-6">
                <div className="inline-flex items-center gap-2 bg-[#FAE0DC] text-[#8B2020] text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-4">
                  Your current stack
                </div>
                <ul className="space-y-3">
                  {[
                    'Visitor arrives, browses, hesitates',
                    'Adds to cart — or doesn\'t',
                    'Session ends',
                    'Email fires 30–60 min later',
                    'Ad retargeting kicks in next day',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#5C4E44]">
                      <span className="text-[#C4B4A8] text-xs font-bold mt-0.5 shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[#F2ECE6]">
                  <p className="text-xs font-semibold text-[#8B2020]">Result: 2–4% baseline conversion</p>
                </div>
              </div>

              <div className="bg-[#1A1410] border border-[#3D3028] rounded-2xl p-6">
                <div className="inline-flex items-center gap-2 bg-[#C87941]/20 text-[#E09A68] text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-4">
                  With Convertive
                </div>
                <ul className="space-y-3">
                  {[
                    'Visitor arrives — live profile starts building',
                    'Intent signals detected in real time',
                    'Next-best action fires in-session',
                    'Web, checkout, email, SMS, or ads',
                    'Revenue recovered before they leave',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#C4A898]">
                      <span className="text-[#C87941] text-xs font-bold mt-0.5 shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[#3D3028]">
                  <p className="text-xs font-semibold text-[#C87941]">Result: 15–30% lift potential</p>
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-[#5C4E44] text-base md:text-lg leading-relaxed max-w-2xl"
            >
              Convertive helps ecommerce teams act during the{' '}
              <strong className="text-[#1A1410]">moment of intent</strong>, not after it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3 — How it works ── */}
      <section id="how-it-works" className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-4">
              How it works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#1A1410] leading-tight mb-12 max-w-xl">
              Four steps. Runs during the session.
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  step: '01',
                  title: 'Watch live shopper behavior',
                  body: 'Convertive tracks clicks, scrolls, carts, and hesitation patterns as they happen — not after.',
                },
                {
                  step: '02',
                  title: 'Build a live profile',
                  body: 'Even when the visitor is still anonymous, Convertive constructs a real-time intent profile from behavioral signals.',
                },
                {
                  step: '03',
                  title: 'Trigger the next-best action',
                  body: 'Across web, checkout, email, SMS, or ads — the right intervention fires at the right moment.',
                },
                {
                  step: '04',
                  title: 'Recover more revenue',
                  body: 'You capture lift from traffic you already paid for — without waiting for a re-engagement campaign.',
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="bg-white border border-[#E8DDD4] rounded-2xl p-6 hover:border-[#D4C4B8] hover:shadow-sm transition-all"
                >
                  <p className="text-[#C87941] text-2xl font-black mb-3">{item.step}</p>
                  <h3 className="text-[#1A1410] font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-[#5C4E44] text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — ROI Calculator ── */}
      <RoiCalculatorEmbed />

      {/* ── Section 5 — Audit CTA ── */}
      <section className="bg-[#1A1410] py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-start gap-12"
          >
            {/* Left */}
            <div className="flex-1">
              <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-4">
                Free audit
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#F5F0EB] leading-tight mb-4">
                What you'll get in the audit
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#C4A898] text-base leading-relaxed mb-8 max-w-md">
                A focused 15-minute session. We look at your traffic, your current stack, and your moments of intent.
              </motion.p>

              <motion.ul variants={stagger} className="space-y-3 mb-10">
                {[
                  'Where anonymous traffic is dropping',
                  'Where your current stack reacts too late',
                  'What moments of intent you could capture in-session',
                  'What Convertive would likely trigger first',
                  'Where your biggest lift opportunities are',
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3 text-[#C4A898] text-sm"
                  >
                    <span className="text-[#C87941] mt-0.5 shrink-0 text-base leading-none">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#2D2420] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Company"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full bg-[#2D2420] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Head of Ecommerce)"
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full bg-[#2D2420] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
                />
                <input
                  type="url"
                  placeholder="Website (https://...)"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  className="w-full bg-[#2D2420] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#C87941] text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#A86331] transition-colors shadow-lg disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Request my audit →'}
                </button>
                <p className="text-[#7A6558] text-xs">No commitment · 15 minutes · Live on your store's data</p>
              </motion.form>
            </div>

            {/* Right — stat card */}
            <motion.div
              variants={fadeUp}
              className="md:w-64 bg-[#2D2420] border border-[#3D3028] rounded-2xl p-6 shrink-0"
            >
              <div className="space-y-6">
                {[
                  { stat: '97%', label: 'of visitors are anonymous when they arrive' },
                  { stat: '70%', label: 'cart abandonment — most stacks react after' },
                  { stat: '15–30%', label: 'lift potential with in-session intervention' },
                ].map(({ stat, label }) => (
                  <div key={stat} className="border-b border-[#3D3028] last:border-0 pb-6 last:pb-0">
                    <p className="text-3xl font-black text-[#C87941] mb-1">{stat}</p>
                    <p className="text-xs text-[#7A6558] leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="bg-[#1A1410] border-t border-[#3D3028] py-6 px-4 text-center">
        <p className="text-[#7A6558] text-xs">© 2025 Convertive. Turn anonymous visitors into buyers.</p>
      </div>

    </main>
  )
}
