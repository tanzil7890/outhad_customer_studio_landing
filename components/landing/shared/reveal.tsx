'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade-up on first scroll into view. Use below the fold only. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Masked line-by-line reveal that waits until the heading scrolls into view.
 * Content is visible in server HTML; it is only hidden after mount when offscreen.
 */
export function InViewLineReveal({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  stagger = 0.09,
}: {
  lines: readonly string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top > window.innerHeight) setArmed(true)
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <span
            className={cn(
              'block motion-reduce:translate-y-0 motion-reduce:animate-none',
              armed && (inView ? 'animate-line-rise' : 'translate-y-[105%]'),
              lineClassName,
            )}
            style={armed && inView ? { animationDelay: `${i * stagger}s` } : undefined}
          >
            {line}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
