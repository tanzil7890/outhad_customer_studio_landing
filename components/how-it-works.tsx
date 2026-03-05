'use client'

import { motion } from 'framer-motion'

export default function HowItWorks() {
  // Live Detection → Instant Decision → In-Session Delivery → Anonymous to Known
  const steps = [
    { title: 'Live Detection', desc: 'Every click, scroll, pause captured in real-time—while they\'re still browsing.' },
    { title: 'Instant Decision', desc: 'AI predicts intent in milliseconds and selects next-best action before they leave.' },
    { title: 'In-Session Delivery', desc: 'Execute across web, email, SMS within the same session—not hours later.' },
    { title: 'Anonymous to Known', desc: 'Convert anonymous visitors by capturing identity at the perfect moment.' },
  ]

  return (
    <section id="how" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Detect → Decide → Deliver → Convert</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Capture intent in real‑time, act instantly, convert before they leave—all within the same session.</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-9 h-1 bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 backdrop-blur-sm p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--app-primary))]/15 border border-[hsl(var(--app-border))] flex items-center justify-center font-mono text-[hsl(var(--app-text))]">
                    {i + 1}
                  </div>
                  <h3 className="font-title text-[hsl(var(--app-text))] text-lg">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm font-mono text-[hsl(var(--app-text-muted))]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
