'use client'

import { motion } from 'framer-motion'

export default function IcpValue() {
  return (
    <section id="icp" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">ICP & Value</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Built for mid‑market to enterprise commerce with high SKU breadth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-6">
            <h3 className="font-title text-lg text-[hsl(var(--app-text))] mb-2">Who it’s for</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm font-mono text-[hsl(var(--app-text))]">
              <li>Apparel & Footwear, Beauty, Electronics, Home/Lifestyle</li>
              <li>2–4% conversion, ~70% abandonment, slow A/Bs</li>
              <li>Collect first‑party data but can’t act in real time</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-6">
            <h3 className="font-title text-lg text-[hsl(var(--app-text))] mb-2">Value Proposition</h3>
            <p className="text-sm font-mono text-[hsl(var(--app-text))]">
              Turn overlooked behavior into predictable, compounding revenue with real‑time, personalized engagement—powered by adaptive AI agents and a unified commerce intelligence layer.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

