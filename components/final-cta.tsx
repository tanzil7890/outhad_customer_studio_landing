'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCta() {
  return (
    <section id="contact" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Stop Losing 70% of Your Traffic to Anonymity</h2>
        <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Convert anonymous visitors in-session, before they leave. Real-time AI intervention that captures revenue in milliseconds, not hours later.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="https://cal.com/tanzil-convertive" target="_blank" className="inline-block bg-black rounded-full">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 rounded-full text-sm font-mono text-[hsl(var(--app-background))]" style={{ backgroundImage: 'linear-gradient(90deg, hsl(var(--app-primary)), hsl(var(--app-secondary)))' }}>
              Book Demo
            </motion.button>
          </Link>
          <Link href="/roi-calculator" target="_blank" className="inline-block">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 rounded-full text-sm font-mono border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))] bg-[hsl(var(--app-surface))]/60">
              Calculate Your ROI
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

