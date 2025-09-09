'use client'

import { motion } from 'framer-motion'

export default function Storylines() {
  const stories = [
    {
      title: 'Exit‑Intent Recovery',
      persona: 'Headphones shopper',
      steps: [
        'Pause + scroll at checkout → detect exit intent',
        'Personal popup (10% + free shipping)',
        'Capture identity → SMS/email follow‑up in minutes'
      ],
      outcome: 'Recover ~15–28% of abandoners'
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
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Three real moments Outhad activates—right when it matters.</p>
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
                <span className="text-[10px] font-mono text-[hsl(var(--app-text-muted))]">{s.persona}</span>
              </div>
              <div className="mt-4 space-y-2">
                {s.steps.map(step => (
                  <div key={step} className="text-xs font-mono text-[hsl(var(--app-text))] flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--app-primary))]" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[hsl(var(--app-border))] text-xs font-mono text-[hsl(var(--app-text-muted))]">{s.outcome}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

