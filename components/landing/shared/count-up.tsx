'use client'

import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

interface Props {
  value: number
  format?: (value: number) => string
  /** Seconds. */
  duration?: number
  className?: string
}

/**
 * Animates to `value` the first time it scrolls into view, and to each new
 * value after that (e.g. calculator inputs). Screen readers get the final value.
 */
export default function CountUp({ value, format = (n) => integer.format(n), duration = 1.1, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const current = useMotionValue(0)
  const text = useTransform(current, (n) => format(n))

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      current.set(value)
      return
    }
    const controls = animate(current, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, value, reducedMotion, duration, current])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <motion.span aria-hidden>{text}</motion.span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}
