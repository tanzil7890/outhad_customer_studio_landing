'use client'

import { motion } from 'framer-motion'

export default function WhyUs() {
  const items = [
    {
      title: 'Data → Decision → Delivery',
      desc: 'Close the gap: warehouse truth + real‑time decisioning + cross‑channel execution.',
    },
    {
      title: 'Session latency',
      desc: 'Shift from batch campaigns to in‑session triggers and nudges (ms–s).',
    },
    {
      title: 'Fragmentation',
      desc: 'One profile and audience everywhere—consistent traits across ads, email, SMS, app.',
    },
    {
      title: 'Experimentation speed',
      desc: 'Continuous learning loops with holdouts and real‑time treatment selection.',
    },
    {
      title: 'Anonymous → known',
      desc: 'Identity capture, cart/browse recovery, and channel suppression/activation in one loop.',
    },
    {
      title: 'Ops overhead',
      desc: 'Fewer bespoke pipelines; governed, observable syncs and reliable sends.',
    },
    {
      title: 'ROI proof',
      desc: 'Closed‑loop measurement back to the warehouse for incremental lift and ROAS.',
    },
  ]

  return (
    <section id="why" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Why This Stack</h2>
          <p className="mt-3 text-sm sm:text-base font-mono text-[hsl(var(--app-text-muted))]">From batch guessing to live, governed growth.</p>
        </div>
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {items.map((it, i) => {
            // Calculate content-based sizing
            const titleLength = it.title.length
            const descLength = it.desc.length
            const totalContentLength = titleLength + descLength
            
            // Define card sizes based on content and strategic positioning
            let colSpan = 'col-span-12' // Default full width on mobile
            let smColSpan = 'sm:col-span-6' // Default half width on small screens
            let lgColSpan = 'lg:col-span-4' // Default third width on large screens
            
            // Strategic sizing based on content and position
            if (i === 0) {
              // First card - hero positioning, larger
              lgColSpan = 'lg:col-span-6'
            } else if (i === 1 || i === 2) {
              // Second and third cards - balance the first card
              lgColSpan = 'lg:col-span-3'
            } else if (i === 3) {
              // Fourth card - longer content, needs more space
              lgColSpan = 'lg:col-span-5'
            } else if (i === 4) {
              // Fifth card - medium content
              lgColSpan = 'lg:col-span-4'
            } else if (i === 5) {
              // Sixth card - shorter content
              lgColSpan = 'lg:col-span-3'
            } else if (i === 6) {
              // Last card - ensure it spans the remaining space properly
              lgColSpan = 'lg:col-span-12'
            }
            
            // Determine if this is a featured card (larger sizing)
            const isFeatured = i === 0 || i === 6
            const isCompact = i === 1 || i === 2 || i === 5
            
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`
                  ${colSpan} ${smColSpan} ${lgColSpan}
                  rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 backdrop-blur-sm 
                  hover:border-[hsl(var(--app-primary))]/30 hover:bg-[hsl(var(--app-surface))]/80 
                  hover:shadow-lg hover:shadow-[hsl(var(--app-primary))]/10
                  transition-all duration-300
                  flex flex-col justify-between
                  ${isFeatured ? 'p-6 sm:p-8 min-h-[180px]' : isCompact ? 'p-4 sm:p-5 min-h-[140px]' : 'p-5 sm:p-6 min-h-[160px]'}
                `}
              >
                <div>
                  <h3 className={`font-title text-[hsl(var(--app-text))] leading-tight
                    ${isFeatured ? 'text-xl sm:text-2xl' : isCompact ? 'text-base sm:text-lg' : 'text-lg'}
                  `}>
                    {it.title}
                  </h3>
                  <p className={`mt-3 font-mono text-[hsl(var(--app-text-muted))] leading-relaxed
                    ${isFeatured ? 'text-base' : isCompact ? 'text-xs sm:text-sm' : 'text-sm'}
                  `}>
                    {it.desc}
                  </p>
                </div>
                
                {/* Decorative element with content-aware sizing */}
                <div className="mt-4 flex items-center">
                  <motion.div 
                    className="h-[2px] bg-gradient-to-r from-[hsl(var(--app-primary))] to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ 
                      width: isFeatured ? '80px' : isCompact ? '30px' : '50px' 
                    }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  />
                  {isFeatured && (
                    <motion.div 
                      className="ml-2 w-1 h-1 rounded-full bg-[hsl(var(--app-primary))]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.8 }}
                      viewport={{ once: true }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

