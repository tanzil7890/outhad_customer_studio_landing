'use client'

import { motion } from 'framer-motion'

const logos = [
  'Shopify', 'BigCommerce', 'SFCC', 'Magento/Adobe',
  'GA4', 'Segment', 'Klaviyo', 'Iterable',
  'Meta Ads', 'Google Ads'
]

export default function Integrations() {
  return (
    <section id="integrations" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Integrations</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Layers on top in days—not months.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="h-16 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 flex items-center justify-center text-sm font-mono text-[hsl(var(--app-text))]"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

