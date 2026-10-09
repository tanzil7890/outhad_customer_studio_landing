'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

/** Framer Motion honours the visitor's reduced-motion setting across every concept. */
export default function LandingShell({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
