'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Footer from '@/components/footer'

type Faq = { question: string; answer: string }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const deliverables = [
  {
    title: 'Anonymous traffic at a glance',
    desc: 'How much of your traffic stays anonymous and bounces before any flow can fire — quantified for your store, not industry averages.',
  },
  {
    title: 'Revenue-at-risk number',
    desc: 'A defensible monthly dollar figure of what your anonymous traffic is leaving on the table — and the share recoverable in-session.',
  },
  {
    title: 'Stack-leverage analysis',
    desc: 'Where your existing tools (Klaviyo, Rebuy, Shopify) are leaving lift behind because they only act after the bounce.',
  },
  {
    title: 'Projected lift with Convertive',
    desc: 'A 2-slide ROI breakdown showing the conversion lift, recovered revenue, and payback period — modeled on your traffic.',
  },
]

const trustItems = [
  { label: 'Delivered in 12 hours', desc: 'Submit today, your custom ROI report lands in your inbox by tomorrow morning.' },
  { label: '2-slide format', desc: 'No 30-page deck. Two slides. Numbers that matter, modeled on your store.' },
  { label: 'No call required', desc: 'You read it on your time. Book a follow-up only if the numbers earn it.' },
]

const steps = [
  { n: '01', label: 'You submit the form', desc: 'Store URL + rough traffic. That is enough to start modeling.' },
  { n: '02', label: 'We pull live signals', desc: 'Our team analyzes your traffic, stack, and anonymous-visitor profile coverage.' },
  { n: '03', label: 'We model your ROI', desc: 'A 2-slide breakdown — anonymous loss, recoverable revenue, projected lift.' },
  { n: '04', label: 'Report in your inbox', desc: 'Within 12 hours. Yours to keep — pilot or no pilot.' },
]

export default function AuditClient({ faqs }: { faqs: Faq[] }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    storeUrl: '',
    monthlyVisitors: '',
    challenge: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'anonymous-traffic-audit',
          name: form.name,
          email: form.email,
          storeUrl: form.storeUrl,
          monthlyVisitors: form.monthlyVisitors,
          challenge: form.challenge,
          submittedAt: new Date().toISOString(),
        }),
      })
      router.push('/audit-booked')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const scrollToForm = () => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* HERO */}
      <section className="relative pt-36 pb-16 sm:pt-40 sm:pb-24 px-4 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#1A1410 1px, transparent 1px), linear-gradient(90deg, #1A1410 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — pitch */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="inline-flex items-center gap-2 bg-[#FDF0E0] border border-[#EBBF94] text-[#7A4420] text-[11px] font-bold px-3 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87941] animate-pulse" />
              Free 12-hr ROI Audit Report
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1410] leading-[1.1] tracking-tight mb-6">
              Your custom ROI audit report.
              <br />
              <span className="text-[#C87941]">In your inbox</span> in 12 hours.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4E44] leading-relaxed mb-8 max-w-xl">
              Most of your traffic stays anonymous and bounces before Klaviyo, Rebuy, or any flow can fire on it.
              That&apos;s the leaky bucket. Submit your store and we&apos;ll send back a 2-slide ROI audit report
              showing exactly how much that&apos;s costing you — and the in-session lift Convertive recovers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={scrollToForm}
                className="bg-[#1A1410] text-[#F5F0EB] hover:bg-[#2D2420] rounded-full px-6 py-3.5 text-sm font-semibold min-h-[48px] transition-colors duration-200 shadow-lg"
              >
                Get my ROI audit report →
              </button>
              <Link
                href="/roi-calculator"
                className="border border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8] rounded-full px-6 py-3.5 text-sm font-semibold min-h-[48px] inline-flex items-center justify-center transition-colors duration-200"
              >
                Run quick numbers first
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#5C4E44]">
              {['12-hr turnaround', '2-slide ROI audit report', 'No card, no call required'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C87941" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-medium">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Audit request form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="relative"
            id="audit-form"
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FDF0E0] rounded-full blur-3xl opacity-70" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#F7E4D0] rounded-full blur-3xl opacity-60" />

            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl border border-[#E8DDD4] bg-white shadow-xl p-6 sm:p-7 space-y-4"
            >
              <div className="pb-1">
                <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-1.5">Get your report</p>
                <p className="text-lg font-semibold text-[#1A1410] leading-snug">
                  Your custom ROI audit report — delivered in 12 hours.
                </p>
              </div>

              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  className="w-full bg-[#F0E8E0] border border-[#E8DDD4] focus:border-[#D4C4B8] rounded-xl px-4 py-3 text-[#1A1410] placeholder:text-[#B8A89C] focus:outline-none focus:ring-2 focus:ring-[#C87941]/30 transition-shadow"
                />
              </Field>

              <Field label="Work email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@yourstore.com"
                  className="w-full bg-[#F0E8E0] border border-[#E8DDD4] focus:border-[#D4C4B8] rounded-xl px-4 py-3 text-[#1A1410] placeholder:text-[#B8A89C] focus:outline-none focus:ring-2 focus:ring-[#C87941]/30 transition-shadow"
                />
              </Field>

              <Field label="Store URL" required>
                <input
                  type="url"
                  required
                  value={form.storeUrl}
                  onChange={update('storeUrl')}
                  placeholder="https://yourstore.com"
                  className="w-full bg-[#F0E8E0] border border-[#E8DDD4] focus:border-[#D4C4B8] rounded-xl px-4 py-3 text-[#1A1410] placeholder:text-[#B8A89C] focus:outline-none focus:ring-2 focus:ring-[#C87941]/30 transition-shadow"
                />
              </Field>

              <Field label="Monthly visitors">
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.monthlyVisitors}
                  onChange={update('monthlyVisitors')}
                  placeholder="e.g. 50,000"
                  className="w-full bg-[#F0E8E0] border border-[#E8DDD4] focus:border-[#D4C4B8] rounded-xl px-4 py-3 text-[#1A1410] placeholder:text-[#B8A89C] focus:outline-none focus:ring-2 focus:ring-[#C87941]/30 transition-shadow"
                />
              </Field>

              <Field label="Biggest conversion challenge (optional)">
                <textarea
                  value={form.challenge}
                  onChange={update('challenge')}
                  rows={3}
                  placeholder="e.g. PDP traffic is high but cart-add rate is low; returning visitors don't convert; etc."
                  className="w-full bg-[#F0E8E0] border border-[#E8DDD4] focus:border-[#D4C4B8] rounded-xl px-4 py-3 text-[#1A1410] placeholder:text-[#B8A89C] focus:outline-none focus:ring-2 focus:ring-[#C87941]/30 transition-shadow resize-none"
                />
              </Field>

              {error && (
                <div className="rounded-xl bg-[#FAE0DC] border border-[#F0B0A8] text-[#8B2020] text-sm px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#1A1410] text-[#F5F0EB] hover:bg-[#2D2420] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl py-4 text-sm font-bold transition-colors duration-200 shadow-lg"
              >
                {status === 'submitting' ? 'Submitting…' : 'Send me my ROI audit report →'}
              </button>

              <p className="text-[11px] text-[#9C8B7E] text-center leading-relaxed">
                By submitting you agree to our{' '}
                <Link href="/privacy-policy" className="underline hover:text-[#1A1410]">privacy policy</Link>.
                We&apos;ll never share your data.
              </p>
            </form>
          </motion.div>

        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-white py-20 px-4 border-y border-[#F2ECE6]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="max-w-2xl mb-12"
          >
            <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3">What&apos;s in your report</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1410] tracking-tight leading-tight">
              Four numbers your stack isn&apos;t telling you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deliverables.map((d, i) => (
              <motion.article
                key={d.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] p-6 hover:bg-[#FDF8F4] hover:border-[#EBBF94] transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F7E4D0] border border-[#EBBF94] flex items-center justify-center flex-shrink-0 text-[#7A4420] font-extrabold text-sm tabular-nums">
                    0{i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[#1A1410] mb-1.5 leading-snug">{d.title}</h3>
                    <p className="text-sm text-[#5C4E44] leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#FAFAF8] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1410] tracking-tight leading-tight">
              From form submit to ROI audit report — under 12 hours.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-2xl border border-[#E8DDD4] bg-white p-6"
              >
                <p className="text-[#C87941] text-xs font-extrabold tracking-widest mb-3">{s.n}</p>
                <p className="text-[#1A1410] font-semibold text-base mb-2 leading-snug">{s.label}</p>
                <p className="text-sm text-[#5C4E44] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="bg-white py-16 px-4 border-y border-[#F2ECE6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((t) => (
            <div key={t.label} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#1A1410] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C87941" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-[#1A1410] font-semibold text-base mb-1">{t.label}</p>
                <p className="text-sm text-[#5C4E44] leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-4 border-t border-[#F2ECE6]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-10"
          >
            <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1410] tracking-tight leading-tight">
              Common questions about the ROI audit report
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] open:bg-white open:border-[#D4C4B8] transition-colors"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-[#1A1410]">{f.question}</span>
                  <svg
                    className="w-4 h-4 text-[#5C4E44] transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-sm text-[#5C4E44] leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#1A1410] uppercase tracking-widest mb-2">
        {label}
        {required && <span className="text-[#C87941] ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}
