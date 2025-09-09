'use client'

import { motion } from 'framer-motion'

export default function HowItWorks() {
  // Data → Decision → Delivery pipeline
  const steps = [
    { title: 'Data', desc: 'Click, scrolls, pause, Warehouse truth + live session signals unify into one profile.' },
    { title: 'Decision', desc: 'Policies + ML select the next‑best action in real time.' },
    { title: 'Delivery', desc: 'Execute across web, checkout, email, SMS, offer, and ads instantly.' },
  ]

  return (
    <section id="how" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Data → Decision → Delivery</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Unify data, pick the action, deliver it—within the same session.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-9 h-1 bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
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
