'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import React from 'react'

function Counter({ to, label, suffix = '%', prefix = '' }: { to: number; label: string; suffix?: string; prefix?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    controls.start({ val: to, transition: { duration: 1.2, ease: 'easeOut' } } as never)
  }, [inView])
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="text-center p-4 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60">
      <motion.span
        initial={{ val: 0 } as never}
        animate={controls}
        onUpdate={(latest: any) => setValue(Math.round(latest.val as number))}
        className="block text-3xl sm:text-4xl font-title text-[hsl(var(--app-text))]"
      >
        {prefix}{value}{suffix}
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Proven Results</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">Convert anonymous visitors in-session. Measurable impact from the same traffic.</p>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <Counter to={30} label="Higher conversion via in-session intervention" suffix="%" />
          <Counter to={28} label="Anonymous visitors converted before exit" suffix="%" />
          <Counter to={100} label="Average decision-to-delivery time" suffix="ms" prefix="<" />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <Counter to={25} label="Lift in ROAS" suffix="%" />
          <Counter to={50} label="Stack simplification" suffix="%" />
        </div>
      </div>
    </section>
  )
}

