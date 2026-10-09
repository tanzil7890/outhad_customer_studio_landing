'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY, formatClock } from '@/lib/landing/story'
import DesktopStore, { STORE_H, STORE_W, type StoreState } from '../v2/desktop-store'

/**
 * Product UI shown inside the pastel panels. Illustrative, built from the
 * same story data as the other concepts, and aria-hidden by the caller.
 */

const decision = STORY.timelines.with.decision!
const mono = 'font-[family-name:var(--font-geist-mono)]'

/** Scales a fixed-size child to the width of its container. */
export function Fit({ width, height, children, className }: { width: number; height: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.getBoundingClientRect().width / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ height: height * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

/** "Convertive is reading the session…" typed out once when it scrolls into view. */
export function TypingChip({ text, icon = true, className }: { text: string; icon?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setCount(text.length)
      return
    }
    const id = setInterval(() => setCount((c) => (c >= text.length ? c : c + 1)), 38)
    return () => clearInterval(id)
  }, [inView, reduced, text])
  const done = count >= text.length
  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-[14px] font-medium text-[#1A1410] shadow-[0_12px_30px_-16px_rgba(26,20,16,0.45)] ring-1 ring-black/5', className)}
    >
      {icon && <Sparkles aria-hidden className="h-4 w-4 text-ember-deep" />}
      <span>
        {text.slice(0, count)}
        <span className={cn('inline-block w-6 text-left', done ? 'animate-pulse' : '')}>{done ? '…' : '|'}</span>
      </span>
    </span>
  )
}

const card = 'rounded-2xl bg-white shadow-[0_20px_50px_-28px_rgba(26,20,16,0.5)] ring-1 ring-black/5'

const productState = (overrides: Partial<StoreState>): StoreState => ({
  screen: 'product',
  hoverTile: -1,
  sizePicked: true,
  inCart: true,
  drawer: 1,
  shippingWarn: false,
  closeHot: 0,
  offer: 0,
  email: '',
  applied: false,
  ...overrides,
})

/** Apricot panel: the exit moment, the ranked decision and the offer it rendered. */
export function DecisionMock() {
  return (
    <div className="relative h-full">
      {/* The store bleeds off the bottom and right edge of the panel, like a screenshot */}
      <div className="absolute -right-[16%] bottom-0 left-[14%] overflow-hidden rounded-t-2xl">
        <Fit width={STORE_W} height={STORE_H * 0.86}>
          <DesktopStore state={productState({ offer: 1, closeHot: 0.8 })} />
        </Fit>
      </div>
      <div className={cn(card, 'absolute left-0 top-6 w-[52%] min-w-[13.5rem] p-4')}>
        <div className="mb-3 flex items-center justify-between text-[12px]">
          <span className="font-semibold uppercase tracking-[0.12em] text-black/50">Next best action</span>
          <span className={cn(mono, 'text-black/55')}>{decision.latencyMs} ms</span>
        </div>
        <ul className="space-y-2.5">
          {decision.options.map((option) => (
            <li key={option.action}>
              <div className="flex items-center justify-between gap-3 text-[13px]">
                <span className={cn('flex items-center gap-1.5', option.chosen ? 'font-semibold text-[#1A1410]' : 'text-black/55')}>
                  {option.chosen && <Check aria-hidden className="h-3.5 w-3.5 text-ember-deep" />}
                  {option.action}
                </span>
                <span className={cn(mono, 'text-[12px] text-black/55')}>{option.score.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/5">
                <div className={cn('h-full rounded-full', option.chosen ? 'bg-ember' : 'bg-black/20')} style={{ width: `${option.score * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <span className={cn(card, 'absolute right-0 top-0 flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold text-[#1A1410]')}>
        <span className="h-2 w-2 rounded-full bg-ember" /> Exit risk 82%
      </span>
    </div>
  )
}

const STITCHED = [
  { at: 0, text: 'Landed from an Instagram ad' },
  { at: 8, text: 'Browsed hiking boots' },
  { at: 15, text: `Added the ${STORY.product.name} · $${STORY.product.price}` },
  { at: 21, text: 'Opened the size guide' },
  { at: 27, text: 'Checked shipping twice' },
  { at: 38, text: 'Gave her email for 10% off' },
]

/** Teal panel: the anonymous session stitched to a known profile and synced to the ESP. */
export function IdentityMock() {
  return (
    <div className="relative grid h-full gap-3 overflow-hidden pb-0 sm:grid-cols-[1.25fr_1fr]">
      <div className={cn(card, 'rounded-b-none p-4 sm:h-full')}>
        <div className="flex items-center gap-2 text-[13px]">
          <span className={cn(mono, 'rounded-full bg-black/5 px-2.5 py-1 text-black/55 line-through decoration-black/30')}>anon_7f3d</span>
          <ArrowRight aria-hidden className="h-3.5 w-3.5 text-black/40" />
          <span className={cn(mono, 'rounded-full bg-pastel-mint px-2.5 py-1 font-semibold text-[#1A1410]')}>s•••@gmail.com</span>
        </div>
        <ol className="mt-4 space-y-2 border-l border-black/10 pl-3.5">
          {STITCHED.map((event) => (
            <li key={event.at} className="relative text-[12.5px] text-black/70">
              <span className="absolute -left-[1.15rem] top-1.5 h-1.5 w-1.5 rounded-full bg-[#1A1410]" />
              <span className={cn(mono, 'mr-2 text-black/45')}>{formatClock(event.at)}</span>
              {event.text}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-3">
        <div className={cn(card, 'p-4')}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/50">Synced to your ESP</p>
          <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-[#1A1410]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1410] text-white">
              <Check aria-hidden className="h-3 w-3" />
            </span>
            Klaviyo
          </p>
          <p className="mt-1 text-[12.5px] text-black/55">6 page views and the cart attached</p>
        </div>
        <div className={cn(card, 'p-4')}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/50">Audiences</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['High intent', 'Price-sensitive', 'Instagram'].map((tag) => (
              <span key={tag} className="rounded-full bg-pastel-butter px-2.5 py-1 text-[12px] font-medium text-[#1A1410]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={cn(card, 'hidden flex-1 rounded-b-none p-4 sm:block')}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/50">Next, in your ESP</p>
          <p className="mt-2 text-[14px] font-semibold leading-snug text-[#1A1410]">Her post-purchase flow starts with the whole session in context.</p>
        </div>
      </div>
    </div>
  )
}

/** Sky panel: Convertive reading a live session and the move it recommends. */
export function ReadingMock() {
  return (
    <div className="relative">
      <div className="ml-auto w-[78%] overflow-hidden rounded-t-2xl">
        <Fit width={STORE_W} height={STORE_H * 0.78}>
          <DesktopStore state={productState({ shippingWarn: true })} />
        </Fit>
      </div>
      <div className="absolute left-0 top-[-1.25rem]">
        <TypingChip text="Convertive is reading the session" />
      </div>
      <div className={cn(card, 'absolute bottom-[8%] left-0 w-[52%] min-w-[14rem] p-4')}>
        <span className="rounded-md bg-ember-soft px-2 py-0.5 text-[12px] font-semibold text-ember-deep">High conversion impact</span>
        <p className="mt-2.5 text-[14px] font-semibold leading-snug text-[#1A1410]">Show “{decision.options[0].action}” at exit intent</p>
        <p className="mt-1.5 text-[12.5px] text-black/55">Intent 0.81 · price-sensitive · exit risk 82%</p>
        <p className={cn(mono, 'mt-2 text-[12px] text-black/45')}>
          scored {decision.options[0].score.toFixed(2)} · {decision.latencyMs} ms
        </p>
      </div>
    </div>
  )
}

/** Lilac panel: the anonymous session and the known profile it becomes. */
export function StitchMock() {
  return (
    <div className="relative pt-8">
      <div className="absolute left-1/2 top-[-1.25rem] -translate-x-1/2">
        <TypingChip text="Stitching identity" />
      </div>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className={cn(card, 'p-4')}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/45">Anonymous session</p>
          <p className={cn(mono, 'mt-1 text-[13px] text-black/55')}>anon_7f3d</p>
          <ul className="mt-3 space-y-1.5">
            {['6 page views', `$${STORY.product.price} cart`, 'Source: Instagram ad', 'Exit risk 82%'].map((item) => (
              <li key={item} className="rounded-lg bg-black/[0.04] px-3 py-1.5 text-[12.5px] text-black/60">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <span className="mx-auto flex h-9 w-9 rotate-90 items-center justify-center rounded-full bg-[#1A1410] text-white sm:rotate-0">
          <ArrowRight aria-hidden className="h-4 w-4" />
        </span>
        <div className={cn(card, 'p-4 ring-2 ring-[#1A1410]')}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/45">Known customer</p>
          <p className="mt-1 text-[15px] font-semibold text-[#1A1410]">{STORY.persona} K.</p>
          <p className={cn(mono, 'text-[12.5px] text-black/55')}>s•••@gmail.com</p>
          <ul className="mt-3 space-y-1.5">
            {['History stitched', 'Order $116.10', 'Synced to Klaviyo'].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-lg bg-pastel-mint px-3 py-1.5 text-[12.5px] text-[#1A1410]">
                <Check aria-hidden className="h-3.5 w-3.5" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const LOG = [
  { at: '0:47', who: 'anon_7f3d', action: '10% off, today only', outcome: 'Ordered', good: true },
  { at: '0:31', who: 'anon_2c90', action: 'Free shipping nudge', outcome: 'Email captured', good: true },
  { at: '0:19', who: 'anon_b41e', action: 'Do nothing', outcome: 'Kept browsing', good: true },
  { at: '0:12', who: 'anon_9a07', action: 'Size helper', outcome: 'Left', good: false },
]

/** Mint panel: outcomes flowing back into the model. */
export function LearnMock() {
  return (
    <div className="relative pt-8">
      <div className="absolute left-0 top-[-1.25rem]">
        <TypingChip text="Outcome recorded" />
      </div>
      <div className={cn(card, 'overflow-hidden')}>
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-black/45">
          <span>Decision log</span>
          <span className="normal-case tracking-normal text-black/40">illustrative</span>
        </div>
        <ul>
          {LOG.map((row) => (
            <li key={row.who} className="grid grid-cols-[2.5rem_5.5rem_1fr_auto] items-center gap-3 border-b border-black/5 px-4 py-2.5 text-[12.5px] last:border-0">
              <span className={cn(mono, 'text-black/40')}>{row.at}</span>
              <span className={cn(mono, 'truncate text-black/55')}>{row.who}</span>
              <span className="truncate text-[#1A1410]">{row.action}</span>
              <span
                className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium',
                  row.good ? 'bg-pastel-mint text-[#1A1410]' : 'bg-black/5 text-black/55',
                )}
              >
                {row.good ? <Check aria-hidden className="h-3 w-3" /> : <X aria-hidden className="h-3 w-3" />}
                {row.outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(card, 'mt-3 flex items-center gap-4 p-4')}>
        <svg viewBox="0 0 200 48" className="h-12 flex-1" aria-hidden preserveAspectRatio="none">
          <path d="M0 40 C 30 38, 45 34, 70 30 S 120 22, 140 16 S 180 8, 200 6" fill="none" stroke="#FF5B1F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M0 40 C 30 38, 45 34, 70 30 S 120 22, 140 16 S 180 8, 200 6 L 200 48 L 0 48 Z" fill="url(#learn-fill)" opacity="0.25" />
          <defs>
            <linearGradient id="learn-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FF5B1F" />
              <stop offset="1" stopColor="#FF5B1F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="w-28 text-[12.5px] leading-snug text-black/60">Each outcome sharpens the next decision</span>
      </div>
    </div>
  )
}
