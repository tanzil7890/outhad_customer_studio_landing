'use client'

import { motion } from 'framer-motion'

export default function WhyUs() {
  const items = [
    {
      title: 'Real-Time Intervention, Not Batch Campaigns',
      desc: 'Act in milliseconds during the session—not hours or days later via email. Shift from batch campaigns to in-session triggers and nudges that execute before they leave.',
    },
    {
      title: 'Anonymous-to-Known in One Session',
      desc: 'Convert anonymous visitors before they leave—most tools can\'t even see them. Identity capture, cart recovery, and conversion all happen in-session without waiting for email.',
    },
    {
      title: 'AI Decisioning at Speed',
      desc: 'Predictive AI chooses the perfect action in <100ms—fast enough to save the session. Real-time intent signals trigger the next-best intervention before the moment passes.',
    },
    {
      title: 'Unified Data to Delivery',
      desc: 'Close the gap: warehouse truth + real-time decisioning + cross-channel execution. One profile drives every touchpoint—web, email, SMS, ads—with consistent, governed data.',
    },
    {
      title: 'Measurable Incremental Lift',
      desc: 'Closed-loop measurement back to the warehouse proves incremental lift and ROAS. No guesswork—just data-driven proof of in-session intervention impact.',
    },
  ]

  return (
    <section id="why" className="bg-[hsl(var(--app-background))] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[hsl(var(--app-text))]">Why Convertive</h2>
          <p className="mt-3 text-sm sm:text-base text-[hsl(var(--app-text-muted))]">Act in-session, not after-the-fact. Convert anonymous visitors before the moment passes.</p>
        </div>
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {items.map((it, i) => {
            // Define card sizes based on strategic positioning
            let colSpan = 'col-span-12' // Default full width on mobile
            let smColSpan = 'sm:col-span-6' // Default half width on small screens
            let lgColSpan = 'lg:col-span-4' // Default third width on large screens

            // Strategic sizing for 5 cards
            if (i === 0) {
              // First card - hero positioning (Real-Time Intervention)
              lgColSpan = 'lg:col-span-7'
            } else if (i === 1) {
              // Second card - Anonymous conversion
              lgColSpan = 'lg:col-span-5'
            } else if (i === 2) {
              // Third card - AI Speed
              lgColSpan = 'lg:col-span-5'
            } else if (i === 3) {
              // Fourth card - Unified Data
              lgColSpan = 'lg:col-span-4'
            } else if (i === 4) {
              // Fifth card - ROI
              lgColSpan = 'lg:col-span-3'
            }

            // Determine if this is a featured card (larger sizing)
            const isFeatured = i === 0
            const isCompact = i === 4
            
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
                  <p className={`mt-3 text-[hsl(var(--app-text-muted))] leading-relaxed
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

