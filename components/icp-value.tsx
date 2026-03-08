'use client'

import { motion } from 'framer-motion'

export default function IcpValue() {
  return (
    <section id="icp" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Built For Commerce Teams</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Losing 70-98% of traffic to anonymity? Convert them in-session, before they leave.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-6">
            <h3 className="font-title text-lg text-[hsl(var(--app-text))] mb-2">Who it's for</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm font-mono text-[hsl(var(--app-text))]">
              <li>Apparel & Footwear, Beauty, Electronics, Home/Lifestyle</li>
              <li>70-98% of traffic leaves anonymous—no way to re-engage</li>
              <li>2-4% conversion, cart emails arrive too late</li>
              <li>Collect data but can't act in-session, before they leave</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-6">
            <h3 className="font-title text-lg text-[hsl(var(--app-text))] mb-2">Value Proposition</h3>
            <p className="text-sm font-mono text-[hsl(var(--app-text))]">
              Convert anonymous visitors into customers before they leave your site. Real-time AI intervention during the live session—capturing intent, identity, and revenue in milliseconds, not hours later.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

