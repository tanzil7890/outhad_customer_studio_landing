'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Lock, MousePointer2, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY, type ScreenState } from '@/lib/landing/story'

const EASE = [0.22, 1, 0.36, 1] as const
const usd = (n: number) => `$${n.toFixed(2)}`

/** Simple side-view boot, so the mock store needs no third-party product photography. */
export function BootIllustration({ className, tone = 'walnut' }: { className?: string; tone?: 'walnut' | 'slate' }) {
  const upper = tone === 'walnut' ? '#7A5A44' : '#5C4E44'
  const panel = tone === 'walnut' ? '#8E6A50' : '#6E6056'
  return (
    <svg viewBox="0 0 140 100" className={className} aria-hidden>
      <path
        d="M38 14 L72 11 Q77 11 77 16 L79 50 Q81 57 90 59 L118 65 Q128 67 128 77 L128 80 L26 80 L26 71 Q26 63 31 57 L36 17 Q36 14 38 14 Z"
        fill={upper}
      />
      <path d="M79 50 Q81 57 90 59 L118 65 Q128 67 128 77 L128 80 L74 80 L74 58 Q76 52 79 50 Z" fill={panel} />
      <path d="M36 17 Q36 14 38 14 L72 11 Q77 11 77 16 L77.5 22 L36 25 Z" fill="#2D2420" />
      {[30, 37, 44, 51].map((y) => (
        <line key={y} x1="56" y1={y} x2="76" y2={y - 2} stroke="#EBBF94" strokeWidth="2.2" strokeLinecap="round" />
      ))}
      <rect x="22" y="80" width="110" height="9" rx="3" fill="#2D2420" />
      <path d="M24 89 h106" stroke="#1A1410" strokeWidth="3" strokeDasharray="6 4" />
    </svg>
  )
}

function ProductTile({ name, price, tone }: { name: string; price: number; tone: 'walnut' | 'slate' }) {
  return (
    <div>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-surface-sunken">
        <BootIllustration className="w-[78%]" tone={tone} />
      </div>
      <p className="mt-2 text-[13px] font-semibold leading-tight text-ink">{name}</p>
      <p className="text-[13px] text-ink-secondary">${price}</p>
    </div>
  )
}

interface Props {
  screen: ScreenState
  className?: string
}

/**
 * The shopper's view of an unbranded store, one state per story beat.
 * Purely visual: wrap in an aria-hidden container and pair with a transcript.
 */
export default function StoreMock({ screen, className }: Props) {
  const { product, offer, captured } = STORY
  const inCart = screen !== 'browse'
  const onProduct = screen !== 'browse' && screen !== 'confirmed'
  const drawerOpen = screen === 'hesitate' || screen === 'offer' || screen === 'capture' || screen === 'closed'
  const sheet = screen === 'offer' || screen === 'capture' ? screen : null

  return (
    <div className={cn('relative flex h-full flex-col bg-white pt-9 text-ink', className)}>
      {/* Browser chrome */}
      <div className="px-3">
        <div className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-surface-sunken text-[13px] text-ink-secondary">
          <Lock className="h-3 w-3" aria-hidden />
          {STORY.storeDomain}
        </div>
      </div>
      {/* Store header */}
      <div className="flex items-center justify-between border-b border-line-subtle px-4 py-3">
        <span className="text-[15px] font-extrabold tracking-tight">yourstore</span>
        <span className="relative">
          <ShoppingBag className="h-5 w-5" aria-hidden />
          <AnimatePresence>
            {inCart && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white"
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>

      {/* Base page */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {screen === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 px-4 pt-4"
            >
              <p className="text-[17px] font-bold">Trail boots</p>
              <p className="text-[13px] text-ink-muted">24 styles</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ProductTile name={product.name} price={product.price} tone="walnut" />
                <ProductTile name="Summit Hiker" price={149} tone="slate" />
              </div>
            </motion.div>
          )}
          {onProduct && (
            <motion.div
              key="product"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 px-4 pt-4"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-surface-sunken">
                <BootIllustration className="w-[70%]" />
              </div>
              <p className="mt-3 text-[16px] font-bold leading-tight">{product.name}</p>
              <p className="text-[13px] text-ink-secondary">{product.variant}</p>
              <p className="mt-1 text-[16px] font-semibold">{usd(product.price)}</p>
              <div className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-success text-[14px] font-semibold text-white">
                <Check className="h-4 w-4" aria-hidden /> Added to cart
              </div>
            </motion.div>
          )}
          {screen === 'confirmed' && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success">
                <Check className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-4 text-[18px] font-bold">Order confirmed</p>
              <p className="text-[14px] text-ink-secondary">Thank you, {STORY.persona}.</p>
              <div className="mt-5 w-full rounded-xl bg-surface-warm p-4 text-left ring-1 ring-line">
                <div className="flex justify-between text-[13px] text-ink-secondary">
                  <span>{product.name}</span>
                  <span className="line-through">{usd(product.price)}</span>
                </div>
                <div className="mt-1 flex justify-between text-[13px] text-success">
                  <span>10% off today</span>
                  <span>−{usd(product.price - captured)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-line pt-2 text-[15px] font-bold">
                  <span>Total</span>
                  <span>{usd(captured)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-4 pb-5 pt-4 shadow-[0_-12px_30px_-12px_rgba(26,20,16,0.25)] ring-1 ring-line"
            >
              <p className="text-[15px] font-bold">Your cart (1)</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-sunken">
                  <BootIllustration className="w-[85%]" />
                </div>
                <div className="flex-1 text-[13px]">
                  <p className="font-semibold leading-tight">{product.name}</p>
                  <p className="text-ink-muted">{product.variant}</p>
                </div>
                <p className="text-[14px] font-semibold">{usd(product.price)}</p>
              </div>
              <div className="mt-3 space-y-1 border-t border-line-subtle pt-3 text-[13px]">
                <div className="flex justify-between text-ink-secondary">
                  <span>Subtotal</span>
                  <span>{usd(product.price)}</span>
                </div>
                <div className={cn('flex justify-between rounded px-1 -mx-1', screen === 'hesitate' ? 'bg-warning-bg text-warning' : 'text-ink-secondary')}>
                  <span>Shipping</span>
                  <span>$12.00</span>
                </div>
              </div>
              <div className="mt-3 flex h-10 items-center justify-center rounded-lg bg-ink text-[14px] font-semibold text-white">
                Checkout
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit-intent cursor drifting toward the tab bar */}
        <AnimatePresence>
          {screen === 'hesitate' && (
            <motion.div
              key="cursor"
              initial={{ x: 150, y: 260, opacity: 0 }}
              animate={{ x: 190, y: 8, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
              className="absolute left-0 top-0 z-10 text-ink"
            >
              <MousePointer2 className="h-6 w-6 fill-white drop-shadow" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offer sheet */}
        <AnimatePresence>
          {sheet && (
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-night/35"
            />
          )}
          {sheet && (
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-x-0 bottom-0 z-20 rounded-t-3xl bg-white px-5 pb-6 pt-5"
            >
              <div className="flex items-start justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Before you go</p>
                <X className="h-4 w-4 text-ink-muted" aria-hidden />
              </div>
              <p className="mt-2 text-[17px] font-bold leading-snug">{offer.copy}</p>
              <div
                className={cn(
                  'mt-4 flex h-11 items-center rounded-lg px-3 text-[14px] ring-1',
                  sheet === 'capture' ? 'text-ink ring-ink' : 'text-ink-placeholder ring-line-strong',
                )}
              >
                {sheet === 'capture' ? 'sarah.k@gmail.com' : 'Email address'}
              </div>
              <div
                className={cn(
                  'mt-2 flex h-11 items-center justify-center gap-1.5 rounded-lg text-[14px] font-semibold text-white transition-colors',
                  sheet === 'capture' ? 'bg-success' : 'bg-ink',
                )}
              >
                {sheet === 'capture' ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden /> 10% applied · {usd(captured)}
                  </>
                ) : (
                  'Unlock 10% off'
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab closed */}
        <AnimatePresence>
          {screen === 'closed' && (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-sunken/95 px-6 text-center backdrop-blur-[2px]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-secondary ring-1 ring-line">
                <X className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-4 text-[17px] font-bold">Tab closed</p>
              <p className="mt-1 text-[14px] text-ink-secondary">1 item left in an anonymous cart.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
