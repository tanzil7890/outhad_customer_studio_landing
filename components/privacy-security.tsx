'use client'

import { motion } from 'framer-motion'

export default function PrivacySecurity() {
  const items = [
    'First‑party data by design',
    'Transparent controls & consent',
    'Lightweight footprint; fast page loads',
    'Regional data options; export anytime',
  ]
  return (
    <section id="privacy" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Privacy & Security</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Privacy‑first growth, built for modern compliance needs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-4 text-sm font-mono text-[hsl(var(--app-text))]"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

