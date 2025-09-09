'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import React from 'react'

function Counter({ to, label }: { to: number; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    controls.start({ val: to, transition: { duration: 1.2, ease: 'easeOut' } })
  }, [inView])
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="text-center p-4 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60">
      <motion.span
        initial={{ val: 0 }}
        animate={controls}
        onUpdate={(latest: any) => setValue(Math.round(latest.val as number))}
        className="block text-3xl sm:text-4xl font-title text-[hsl(var(--app-text))]"
      >
        {value}%
      </motion.span>
      <span className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text-muted))]">{label}</span>
    </motion.div>
  )
}

export default function Outcomes() {
  return (
    <section id="outcomes" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Outcomes</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Measurable, compounding growth from the same traffic.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Counter to={30} label="Higher conversion via session‑aware nudging" />
          <Counter to={25} label="Lift in ROAS by removing guesswork" />
          <Counter to={50} label="Stack simplification, faster iteration" />
        </div>
      </div>
    </section>
  )
}

