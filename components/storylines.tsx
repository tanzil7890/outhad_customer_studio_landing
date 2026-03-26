'use client'

import { motion } from 'framer-motion'

export default function Storylines() {
  const stories = [
    {
      title: 'Anonymous to Customer in 47 Seconds',
      persona: 'Real-time conversion',
      steps: [
        '0:00 - Sarah lands from Instagram (anonymous)',
        '0:15 - Browses hiking boots, adds $129 item to cart',
        '0:32 - AI detects: high intent + price sensitivity + exit risk',
        '0:33 - Shows: "Complete order + get 10% off today only"',
        '0:38 - Sarah enters email for discount',
        '0:47 - Purchase complete ($116.10 captured revenue)'
      ],
      outcome: 'Anonymous visitor → Known customer → Sale in <1 minute'
    },
    {
      title: 'Autonomous Product Promotion',
      persona: 'Stanley Bottles surge',
      steps: [
        'Detect trend + who engages',
        'Segment high‑propensity cohort',
        'Orchestrate recommendations, notifications, ads'
      ],
      outcome: 'Lift discovery, conversion, and AOV'
    },
    {
      title: 'Journey Churn Prevention',
      persona: 'Anna, Jamal, Priya',
      steps: [
        'IG traffic → show shipping earlier / free',
        'High‑AOV repeat → auto‑fill & trim checkout',
        'Scroller → bundles + “see it on you”'
      ],
      outcome: 'Reduce bounce; move from browse → buy'
    }
  ]

  return (
    <section id="storylines" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Storylines</h2>
          <p className="mt-3 text-sm sm:text-base text-[hsl(var(--app-text-muted))]">Three real moments Convertive activates—right when it matters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 backdrop-blur-sm p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-title text-lg text-[hsl(var(--app-text))]">{s.title}</h3>
                <span className="text-[10px] text-[hsl(var(--app-text-muted))]">{s.persona}</span>
              </div>
              <div className="mt-4 space-y-2">
                {s.steps.map(step => (
                  <div key={step} className="text-xs text-[hsl(var(--app-text))] flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--app-primary))]" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[hsl(var(--app-border))] text-xs text-[hsl(var(--app-text-muted))]">{s.outcome}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

