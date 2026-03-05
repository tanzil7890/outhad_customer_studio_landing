'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProblemsWeSolve() {
  const items = [
    {
      title: 'Anonymous traffic lost forever',
      stat: '70-98% leave',
      desc: '70-98% of visitors leave anonymous—with no way to re-engage. Mobile/social flows break context; identity is lost before you can act.'
    },
    {
      title: 'Timing is everything',
      stat: 'Too late',
      desc: 'By the time you send that cart recovery email, the moment is gone. Teams miss in-session intent—actions land too late to capture revenue.'
    },
    {
      title: 'Real-time decision speed',
      stat: 'Seconds, not weeks',
      desc: 'Batch testing takes weeks. Intent signals expire in seconds. You need to act now, not later.'
    },
    {
      title: 'Fragmented data',
      stat: '68% siloed',
      desc: 'Only ~11% unify multi-type data into usable profiles.'
    },
    {
      title: 'UX revenue loss',
      stat: '23% at risk',
      desc: 'Poor experiences drain revenue; attention windows are short.'
    },
    {
      title: 'Conversion stagnation',
      stat: '~2-4% baseline',
      desc: 'Without in-session intervention, conversions remain stuck at industry lows.'
    }
  ]

  return (
    <section id="problems" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Problems We Solve</h2>
              <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Real‑time intent is perishable. Convertive acts before the moment passes.</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:flex-1 lg:max-w-md flex justify-center lg:justify-end mt-2 sm:mt-3"
            >
              <Image
                src="/images/convertive-customer-activation-platform/convertive-problem-we-solve.avif"
                alt="Problems We Solve visualization"
                width={320}
                height={200}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 320px"
                className="w-[70vw] max-w-[220px] sm:max-w-[260px] md:max-w-[300px] h-auto object-contain opacity-90"
                priority={false}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 backdrop-blur-sm p-5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-title text-[hsl(var(--app-text))] text-lg">{it.title}</h3>
                <span className="text-xs font-mono text-[hsl(var(--app-text-muted))]">{it.stat}</span>
              </div>
              <p className="mt-2 text-sm font-mono text-[hsl(var(--app-text-muted))]">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
