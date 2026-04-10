'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, useAnimation } from 'framer-motion'
import RoiCalculatorEmbed from '@/components/roi-calculator-embed'
import Footer from '@/components/footer'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com','yahoo.com','hotmail.com','outlook.com','live.com','icloud.com',
  'aol.com','mail.com','protonmail.com','proton.me','ymail.com','msn.com',
  'googlemail.com','me.com','mac.com','inbox.com','zoho.com','yandex.com',
  'rediffmail.com','gmx.com','gmx.net','fastmail.com','hey.com','tutanota.com',
])

function isBusinessEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? !FREE_EMAIL_DOMAINS.has(domain) : false
}

function Counter({ to, suffix = '%', prefix = '', label }: { to: number; suffix?: string; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    controls.start({ val: to, transition: { duration: 1.4, ease: 'easeOut' } } as never)
  }, [inView, controls, to])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-6 bg-white border border-[#E8DDD4] rounded-2xl hover:border-[#D4C4B8] hover:shadow-sm transition-all"
    >
      <motion.span
        initial={{ val: 0 } as never}
        animate={controls}
        onUpdate={(latest: any) => setValue(Math.round(latest.val as number))}
        className="block text-4xl md:text-5xl font-black text-[#C87941] mb-2"
      >
        {prefix}{value}{suffix}
      </motion.span>
      <span className="text-xs text-[#9C8B7E] leading-snug max-w-[140px]">{label}</span>
    </motion.div>
  )
}

export default function LinkedInLandingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', website: '' })
  const [submitting, setSubmitting] = useState(false)
  const [emailError, setEmailError] = useState('')

  function validateEmail(email: string) {
    if (email && !isBusinessEmail(email)) {
      setEmailError('Please use your work email — not Gmail, Yahoo, or similar.')
    } else {
      setEmailError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isBusinessEmail(form.email)) {
      setEmailError('Please use your work email — not Gmail, Yahoo, or similar.')
      return
    }
    setSubmitting(true)

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_AUDIT_BOOKING_URL
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify({
            ...form,
            submittedAt: new Date().toISOString(),
            source: 'linkedin',
          }),
        })
      } catch (_) {
        // non-blocking — still redirect even if sheet write fails
      }
    }

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
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            {/* Left — copy */}
            <div className="flex flex-col">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 bg-[#F7E4D0] border border-[#EBBF94] rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C87941] inline-block" />
                  <span className="text-[#7A4420] text-xs font-bold tracking-widest uppercase">For E-Commerce Teams</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1A1410] leading-[1.1] tracking-tight mb-6"
              >
                You're paying for traffic your stack{' '}
                <span className="text-[#C87941]">can't convert</span>{' '}
                in-session.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[#5C4E44] text-lg leading-relaxed mb-8"
              >
                Convertive turns anonymous shopper behavior into live next-best actions
                before the visitor leaves.
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <a
                  href="/demo"
                  className="inline-flex items-center gap-1.5 bg-[#1A1410] text-[#F5F0EB] text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#2D2420] transition-colors"
                >
                  Book Demo →
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm text-[#9C8B7E] hover:text-[#5C4E44] transition-colors"
                >
                  See how it works ↓
                </a>
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="bg-white border border-[#E8DDD4] rounded-2xl p-6 md:p-8 space-y-3 shadow-sm"
            >
              <p className="text-[#1A1410] font-bold text-base mb-1">Book your Anonymous Traffic Audit</p>
              <p className="text-[#9C8B7E] text-xs mb-4">Free · 15 minutes · Live on your store's data</p>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#FAFAF8] border border-[#D4C4B8] text-[#1A1410] placeholder-[#9C8B7E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <div>
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); validateEmail(e.target.value) }}
                  className={`w-full bg-[#FAFAF8] border text-[#1A1410] placeholder-[#9C8B7E] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${emailError ? 'border-red-400 focus:border-red-400' : 'border-[#D4C4B8] focus:border-[#C87941]'}`}
                />
                {emailError && <p className="mt-1.5 text-xs text-red-500">{emailError}</p>}
              </div>
              <input
                type="text"
                required
                placeholder="Company"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="w-full bg-[#FAFAF8] border border-[#D4C4B8] text-[#1A1410] placeholder-[#9C8B7E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <input
                type="text"
                placeholder="Role (e.g. Head of Ecommerce)"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full bg-[#FAFAF8] border border-[#D4C4B8] text-[#1A1410] placeholder-[#9C8B7E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <input
                type="url"
                placeholder="Website (https://...)"
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                className="w-full bg-[#FAFAF8] border border-[#D4C4B8] text-[#1A1410] placeholder-[#9C8B7E] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1A1410] text-[#F5F0EB] font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#2D2420] transition-colors shadow-lg disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Request my audit →'}
              </button>
              <p className="text-[#9C8B7E] text-xs text-center">No commitment · 15 minutes · Live on your store's data</p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ── Product Video ── */}
      <section className="bg-[#F5EFE8] border-y border-[#E8DDD4] py-14 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3 text-center">See it in action</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1410] text-center mb-8 max-w-xl mx-auto leading-tight">
              Watch Convertive convert an anonymous visitor — live.
            </h2>
            <div className="rounded-2xl overflow-hidden border border-[#E8DDD4] shadow-lg">
              <video
                src="/videos/product_demo4.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Outcomes / Stats ── */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3 text-center">
              Results you will see
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-[#1A1410] text-center mb-2 max-w-3xl mx-auto leading-tight">
              Measurable impact from the same traffic.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9C8B7E] text-sm text-center mb-10 max-w-2xl mx-auto">
              No new ad spend. No new audience. Just more from what you already have.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Counter to={30} suffix="%" label="Higher conversion via in-session intervention" />
              <Counter to={28} suffix="%" label="Anonymous visitors converted before exit" />
              <Counter to={100} suffix="ms" prefix="<" label="Average decision-to-delivery time" />
              <Counter to={25} suffix="%" label="Lift in ROAS" />
              <Counter to={50} suffix="%" label="Stack simplification" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2 — The Problem ── */}
      <section className="bg-[#F5EFE8] border-y border-[#E8DDD4] py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto">
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

      {/* ── Integrations ── */}
      <section className="py-16 md:py-24 px-4 bg-white border-t border-[#E8DDD4]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3 text-center">
              Integrations
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-[#1A1410] text-center mb-2 max-w-xl mx-auto leading-tight">
              Layers on top of your stack in days — not months.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9C8B7E] text-sm text-center mb-10 max-w-md mx-auto">
              No rip-and-replace. Convertive works alongside the tools you already use.
            </motion.p>

            {/* Category groups */}
            <div className="space-y-8">
              {[
                {
                  category: 'E-Commerce',
                  items: ['Shopify', 'BigCommerce', 'Salesforce CC', 'Magento / Adobe', 'Stripe', 'WooCommerce', 'Chargebee'],
                },
                {
                  category: 'Data Warehouse',
                  items: ['Snowflake', 'BigQuery', 'Databricks', 'Redshift', 'Azure Synapse', 'PostgreSQL'],
                },
                {
                  category: 'CDP & Analytics',
                  items: ['Segment', 'GA4', 'Amplitude', 'Mixpanel', 'Heap', 'mParticle', 'PostHog', 'FullStory', 'RudderStack'],
                },
                {
                  category: 'Email & SMS',
                  items: ['Klaviyo', 'Braze', 'Iterable', 'Customer.io', 'Mailchimp', 'Postscript', 'ActiveCampaign', 'Sailthru'],
                },
                {
                  category: 'Advertising',
                  items: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Pinterest Ads', 'Snapchat Ads', 'Microsoft Ads', 'Amazon Ads'],
                },
                {
                  category: 'CRM & Sales',
                  items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Outreach', 'Salesloft'],
                },
                {
                  category: 'Support & Engagement',
                  items: ['Zendesk', 'Intercom', 'Freshdesk', 'Gladly', 'Gorgias', 'Richpanel', 'OneSignal', 'LaunchDarkly'],
                },
                {
                  category: 'Reviews & Loyalty',
                  items: ['Yotpo', 'Stamped.io', 'Okendo', 'Loox', 'Judge.me', 'Fera', 'Smile.io', 'LoyaltyLion', 'ReferralCandy', 'Attentive'],
                },
                {
                  category: 'Subscriptions & Upsell',
                  items: ['Recharge', 'Skio', 'Bold Subscriptions', 'ReConvert', 'Zipify Pages', 'Carthook', 'Frequently Bought Together'],
                },
                {
                  category: 'On-site Conversion',
                  items: ['Privy', 'Wisepops', 'Justuno', 'Omnisend', 'SMSBump', 'Recart', 'Tidio', 'Wheelio'],
                },
              ].map(({ category, items }) => (
                <motion.div key={category} variants={fadeUp}>
                  <p className="text-[#9C8B7E] text-[10px] font-bold tracking-widest uppercase mb-3">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((name) => (
                      <div
                        key={name}
                        className="px-4 py-2.5 bg-[#FAFAF8] border border-[#E8DDD4] rounded-xl text-sm font-semibold text-[#1A1410] hover:border-[#C87941] hover:bg-[#FDF8F4] transition-colors"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeUp} className="mt-8 text-center text-[#9C8B7E] text-xs">
              80+ integrations and growing. API-first — custom integrations available on request.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 5 — Audit CTA ── */}
      <section id="audit" className="bg-[#1A1410] py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-start"
          >
            {/* Left — copy + stats */}
            <div>
              <motion.p variants={fadeUp} className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-4">
                Free audit
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-[#F5F0EB] leading-tight mb-4">
                What you'll get in the audit
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#C4A898] text-base leading-relaxed mb-8">
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
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-[#C4A898] text-sm">
                    <span className="text-[#C87941] mt-0.5 shrink-0 text-base leading-none">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-8 border-t border-[#3D3028]">
                {[
                  { stat: '97%', label: 'visitors arrive anonymous' },
                  { stat: '70%', label: 'cart abandonment rate' },
                  { stat: '15–30%', label: 'lift potential in-session' },
                ].map(({ stat, label }) => (
                  <div key={stat}>
                    <p className="text-2xl font-black text-[#C87941] mb-1">{stat}</p>
                    <p className="text-[10px] text-[#7A6558] leading-snug">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — form card */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="bg-[#2D2420] border border-[#3D3028] rounded-2xl p-6 md:p-8 space-y-3"
            >
              <p className="text-[#F5F0EB] font-bold text-base mb-1">Book your Anonymous Traffic Audit</p>
              <p className="text-[#7A6558] text-xs mb-4">Free · 15 minutes · Live on your store's data</p>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#1A1410] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <div>
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); validateEmail(e.target.value) }}
                  className={`w-full bg-[#1A1410] border text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${emailError ? 'border-red-400 focus:border-red-400' : 'border-[#3D3028] focus:border-[#C87941]'}`}
                />
                {emailError && <p className="mt-1.5 text-xs text-red-400">{emailError}</p>}
              </div>
              <input
                type="text"
                required
                placeholder="Company"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="w-full bg-[#1A1410] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <input
                type="text"
                placeholder="Role (e.g. Head of Ecommerce)"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full bg-[#1A1410] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <input
                type="url"
                placeholder="Website (https://...)"
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                className="w-full bg-[#1A1410] border border-[#3D3028] text-[#F5F0EB] placeholder-[#7A6558] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C87941] transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C87941] text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-[#A86331] transition-colors shadow-lg disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Request my audit →'}
              </button>
              <p className="text-[#7A6558] text-xs text-center">No commitment · 15 minutes · Live on your store's data</p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <Footer />

    </main>
  )
}
