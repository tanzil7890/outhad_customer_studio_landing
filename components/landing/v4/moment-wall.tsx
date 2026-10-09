'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EMBER } from '@/lib/landing/content'
import { BootIllustration } from '../shared/store-mock'

/**
 * The hero wall: unbranded mini storefronts, each caught at the moment
 * Convertive renders something for the shopper. Three rows drift in
 * opposite directions under an ember wash, Flint-style. Purely decorative.
 */

type Product = 'boot' | 'bottle' | 'mug' | 'chair' | 'lamp' | 'tee'

function ProductArt({ kind }: { kind: Product }) {
  if (kind === 'boot') return <BootIllustration className="w-[86%]" />
  return (
    <svg viewBox="0 0 100 100" className="w-[62%]" aria-hidden>
      {kind === 'bottle' && (
        <>
          <rect x="38" y="8" width="24" height="14" rx="3" fill="#1A1410" />
          <rect x="28" y="22" width="44" height="70" rx="12" fill="#FFFFFF" opacity="0.9" />
          <rect x="34" y="44" width="32" height="22" rx="4" fill="#1A1410" opacity="0.12" />
        </>
      )}
      {kind === 'mug' && (
        <>
          <rect x="20" y="28" width="48" height="56" rx="10" fill="#FFFFFF" opacity="0.92" />
          <path d="M68 40 h8 a10 10 0 0 1 0 22 h-8" stroke="#FFFFFF" strokeWidth="7" fill="none" opacity="0.92" />
          <path d="M34 14 q4 6 0 10 M46 12 q4 6 0 10" stroke="#1A1410" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round" />
        </>
      )}
      {kind === 'chair' && (
        <>
          <rect x="26" y="12" width="48" height="44" rx="10" fill="#FFFFFF" opacity="0.92" />
          <rect x="20" y="52" width="60" height="16" rx="6" fill="#FFFFFF" />
          <path d="M28 68 L24 92 M72 68 L76 92" stroke="#1A1410" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {kind === 'lamp' && (
        <>
          <path d="M30 40 L44 12 h12 L70 40 Z" fill="#FFFFFF" opacity="0.92" />
          <rect x="47" y="40" width="6" height="40" fill="#1A1410" />
          <rect x="32" y="80" width="36" height="8" rx="4" fill="#1A1410" />
        </>
      )}
      {kind === 'tee' && (
        <path d="M30 14 L16 26 L24 40 L32 34 L32 88 H68 V34 L76 40 L84 26 L70 14 Q60 22 50 22 Q40 22 30 14 Z" fill="#FFFFFF" opacity="0.92" />
      )}
    </svg>
  )
}

interface Moment {
  domain: string
  product: Product
  tint: string
  price: string
  eyebrow: string
  text: string
  action?: string
  progress?: number
  field?: boolean
}

const MOMENTS: Moment[] = [
  { domain: 'trailhead.com', product: 'boot', tint: 'bg-pastel-apricot', price: '$129', eyebrow: 'Before you go', text: 'Complete your order today and get 10% off.', field: true, action: 'Unlock 10%' },
  { domain: 'lumenskin.com', product: 'bottle', tint: 'bg-pastel-lilac', price: '$38', eyebrow: 'Almost there', text: 'You’re $14 away from free shipping.', progress: 0.72 },
  { domain: 'roastandco.com', product: 'mug', tint: 'bg-pastel-butter', price: '$24', eyebrow: 'Pairs well', text: 'Add the hand grinder and save 15%.', action: 'Add both' },
  { domain: 'nookhome.com', product: 'chair', tint: 'bg-pastel-sky', price: '$420', eyebrow: 'Back in stock', text: 'Oat is back. Want a heads-up when yours ships?', field: true },
  { domain: 'stride.run', product: 'boot', tint: 'bg-pastel-mint', price: '$149', eyebrow: 'Size helper', text: 'Runs small. Most buyers in your size go up half.', action: 'Pick 8½' },
  { domain: 'petalwear.com', product: 'tee', tint: 'bg-pastel-apricot', price: '$42', eyebrow: 'Welcome back', text: 'Your cart is saved. Free returns for 60 days.', action: 'Resume' },
  { domain: 'hauslamp.co', product: 'lamp', tint: 'bg-pastel-teal', price: '$185', eyebrow: 'Still deciding?', text: 'Compare it with the two lamps you viewed.', action: 'Compare' },
  { domain: 'kettleworks.com', product: 'mug', tint: 'bg-pastel-lilac', price: '$59', eyebrow: 'Today only', text: 'Free engraving if you order in the next hour.', action: 'Claim' },
  { domain: 'fieldnotes.shop', product: 'bottle', tint: 'bg-pastel-sky', price: '$18', eyebrow: 'Stay in the loop', text: 'Get 10% off your first order by email.', field: true },
]

function StoreCard({ m }: { m: Moment }) {
  return (
    <div className="w-[300px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(26,20,16,0.45)] ring-1 ring-black/5">
      <div className="flex h-7 items-center gap-1.5 bg-pastel-paper px-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-black/15" />
        ))}
        <span className="ml-2 rounded-full bg-white px-2.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[9.5px] text-black/50">{m.domain}</span>
      </div>
      <div className="relative flex h-[168px] gap-3 p-3">
        <div className={cn('flex w-[46%] items-center justify-center rounded-xl', m.tint)}>
          <ProductArt kind={m.product} />
        </div>
        <div className="flex-1 space-y-1.5 pt-1">
          <div className="h-2 w-[80%] rounded-full bg-black/15" />
          <div className="h-2 w-[55%] rounded-full bg-black/10" />
          <p className="pt-1 text-[12px] font-semibold text-black/70">{m.price}</p>
          <div className="h-5 w-full rounded-md bg-[#1A1410]" />
        </div>
        {/* The intervention */}
        <div className="absolute bottom-2.5 left-[26%] right-2.5 rounded-xl bg-white p-2.5 shadow-[0_10px_30px_-12px_rgba(26,20,16,0.5)] ring-1 ring-black/5">
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-black/45">{m.eyebrow}</p>
          <p className="mt-0.5 text-[11.5px] font-semibold leading-snug text-[#1A1410]">{m.text}</p>
          {m.progress !== undefined && (
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-ember" style={{ width: `${m.progress * 100}%` }} />
            </div>
          )}
          {(m.field || m.action) && (
            <div className="mt-1.5 flex gap-1.5">
              {m.field && <div className="h-5 flex-1 rounded-md ring-1 ring-black/15" />}
              {m.action && <div className="flex h-5 items-center rounded-md bg-[#1A1410] px-2 text-[9px] font-semibold text-white">{m.action}</div>}
              {m.field && !m.action && <div className="h-5 w-10 rounded-md bg-[#1A1410]" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ items, duration, reverse = false, offset = 0 }: { items: Moment[]; duration: number; reverse?: boolean; offset?: number }) {
  const track = (hidden: boolean): ReactNode => (
    <div className="flex shrink-0 gap-5 pr-5" aria-hidden={hidden || undefined}>
      {items.map((m) => (
        <StoreCard key={m.domain} m={m} />
      ))}
    </div>
  )
  return (
    <div className="flex overflow-hidden" style={{ marginLeft: -offset }}>
      <div
        className={cn('flex w-max animate-marquee motion-reduce:animate-none', reverse && '[animation-direction:reverse]')}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  )
}

const rotate = (n: number) => [...MOMENTS.slice(n), ...MOMENTS.slice(0, n)]

export default function MomentWall({ children }: { children?: ReactNode }) {
  const [paused, setPaused] = useState(false)
  return (
    <div className="relative">
      <div
        aria-hidden
        className={cn('space-y-5 [&_.animate-marquee]:[animation-play-state:var(--wall-state)]')}
        style={{ '--wall-state': paused ? 'paused' : 'running' } as CSSProperties}
      >
        <Row items={MOMENTS} duration={90} offset={40} />
        <Row items={rotate(3)} duration={110} reverse offset={180} />
        <Row items={rotate(6)} duration={100} offset={90} />
      </div>
      {/* Ember wash, white at the top like a sunrise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,138,80,0.28)_38%,rgba(255,91,31,0.72)_100%)] mix-blend-multiply"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
      <p className="sr-only">{EMBER.wall.label}</p>
      {children}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play the storefront wall' : 'Pause the storefront wall'}
        className="absolute bottom-5 right-5 z-10 flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-full bg-white/90 text-[#1A1410] shadow ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1410] motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden className="h-3.5 w-3.5" /> : <Pause aria-hidden className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}
