'use client'

import { useId } from 'react'

/**
 * The Convertive mark (rounded square with an up-right arrow cut through it,
 * and the small square it springs from), redrawn as a vector so it takes
 * `currentColor` and sits cleanly on any background. The PNGs in /public
 * carry an opaque background and are kept only for favicons and schema.
 */
export default function LogoMark({ className }: { className?: string }) {
  const mask = `cv-mark-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="15 14 71 70" className={className} fill="currentColor" aria-hidden focusable="false">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="white" />
          {/* Arrow: top bar and right bar meeting in a rounded corner */}
          <path d="M36.4 34.4H64.9V63.2" fill="none" stroke="black" strokeWidth="9.3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Shaft, from the corner out through the notch */}
          <path d="M64.9 34.4L28 71.3" fill="none" stroke="black" strokeWidth="10.6" />
        </mask>
      </defs>
      <path
        mask={`url(#${mask})`}
        d="M20.7 15.6H80.4A3.6 3.6 0 0 1 84 19.2V77.9A3.6 3.6 0 0 1 80.4 81.5H44.6A2.1 2.1 0 0 1 42.5 79.4V57.1H19.2A2.1 2.1 0 0 1 17.1 55V19.2A3.6 3.6 0 0 1 20.7 15.6Z"
      />
      <rect x="17.1" y="62" width="20" height="19.5" rx="2.1" />
    </svg>
  )
}
