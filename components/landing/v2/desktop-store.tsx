import { Check, Lock, Search, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY } from '@/lib/landing/story'
import { BootIllustration } from '../shared/store-mock'

/**
 * An unbranded desktop store in a browser window, drawn at a fixed 1200×760
 * and scaled by the parent. Every state is a plain prop, so the scroll story
 * can render any moment of Sarah's session. Purely visual (aria-hidden by the
 * caller).
 */

export const STORE_W = 1200
export const STORE_H = 760
const usd = (n: number) => `$${n.toFixed(2)}`

export interface StoreState {
  screen: 'collection' | 'product' | 'confirmed'
  hoverTile: number
  sizePicked: boolean
  inCart: boolean
  /** 0..1 slide of the cart drawer. */
  drawer: number
  shippingWarn: boolean
  /** 0..1 glow on the tab's close button. */
  closeHot: number
  /** 0..1 offer sheet. */
  offer: number
  /** Characters of the email typed so far. */
  email: string
  applied: boolean
}

const TILES = [
  { name: STORY.product.name, price: STORY.product.price, tone: 'walnut' as const },
  { name: 'Summit Hiker', price: 149, tone: 'slate' as const },
  { name: 'Canyon Mid', price: 139, tone: 'slate' as const },
  { name: 'Ridge Low', price: 119, tone: 'walnut' as const },
]

export default function DesktopStore({ state }: { state: StoreState }) {
  const { product, offer, captured } = STORY
  return (
    <div
      className="relative overflow-hidden rounded-[18px] bg-white text-ink shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] ring-1 ring-night-text/10"
      style={{ width: STORE_W, height: STORE_H }}
    >
      {/* Tab strip */}
      <div className="absolute inset-x-0 top-0 flex h-[52px] items-end gap-3 bg-surface-sunken px-[18px]">
        <div className="mb-[19px] mr-3 flex gap-2">
          {['#E0796B', '#E8B85C', '#8DBF7A'].map((c) => (
            <span key={c} className="h-[13px] w-[13px] rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex h-10 w-[260px] items-center gap-2.5 rounded-t-xl bg-white px-3.5 text-[16px] font-semibold">
          <span className="h-4 w-4 rounded bg-ink" />
          <span className="flex-1">yourstore.com</span>
          <span
            className="flex h-[26px] w-[26px] items-center justify-center rounded-full"
            style={{
              background: `rgba(240,204,136,${0.95 * state.closeHot})`,
              boxShadow: state.closeHot > 0.4 ? `0 0 0 ${7 * state.closeHot}px rgba(240,204,136,0.3)` : undefined,
            }}
          >
            <X className="h-[15px] w-[15px]" strokeWidth={2.5} />
          </span>
        </div>
      </div>
      {/* Address bar */}
      <div className="absolute inset-x-0 top-[52px] flex h-[50px] items-center border-b border-line px-[18px]">
        <div className="flex h-[34px] flex-1 items-center gap-2 rounded-[10px] bg-surface-sunken px-3.5 text-[15px] text-ink-secondary">
          <Lock className="h-[13px] w-[13px]" /> yourstore.com
          {state.screen === 'collection' ? '/collections/trail-boots' : state.screen === 'product' ? '/products/ridgeline-trail-boot' : '/checkout/thank-you'}
        </div>
      </div>
      {/* Store header */}
      <div className="absolute inset-x-0 top-[102px] flex h-16 items-center gap-8 border-b border-line px-10 text-[17px] font-semibold">
        <span className="mr-auto text-[26px] font-extrabold tracking-tight">yourstore</span>
        <span className="text-ink-secondary">Boots</span>
        <span className="text-ink-secondary">Trail</span>
        <span className="text-ink-secondary">Sale</span>
        <Search className="h-5 w-5" />
        <span className="relative">
          <ShoppingBag className="h-[22px] w-[22px]" />
          {state.inCart && (
            <span className="absolute -right-2.5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[12px] font-extrabold text-white">
              1
            </span>
          )}
        </span>
      </div>

      {/* Pages */}
      <div className="absolute inset-x-0 bottom-0 top-[166px]">
        {state.screen === 'collection' && (
          <div className="px-[60px] pt-[26px]">
            <p className="text-[40px] font-extrabold tracking-[-0.03em]">Trail boots</p>
            <p className="mt-0.5 text-[17px] text-ink-muted">24 styles · Free returns</p>
            <div className="mt-[26px] grid grid-cols-4 gap-[30px]">
              {TILES.map((tile, i) => (
                <div key={tile.name}>
                  <div
                    className={cn('flex aspect-square items-center justify-center rounded-2xl bg-surface-sunken transition-shadow duration-300', state.hoverTile === i && 'ring-[3px] ring-ink')}
                  >
                    <BootIllustration className="w-[78%]" tone={tile.tone} />
                  </div>
                  <p className="mt-3 text-[18px] font-bold">{tile.name}</p>
                  <p className="text-[17px] text-ink-secondary">${tile.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.screen === 'product' && (
          <>
            <div className="absolute left-[50px] top-[30px] flex h-[520px] w-[560px] items-center justify-center rounded-[20px] bg-surface-sunken">
              <BootIllustration className="w-[76%]" />
            </div>
            <div className="absolute left-[660px] top-[40px] w-[480px]">
              <p className="text-[15px] font-bold tracking-[0.14em] text-ink-muted">TRAIL · WATERPROOF</p>
              <p className="mt-2 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em]">{product.name}</p>
              <p className="mt-1.5 text-[18px] text-ink-secondary">{product.variant}</p>
              <p className="mt-3.5 text-[30px] font-bold">{usd(product.price)}</p>
              <div className="mt-5 flex gap-2.5">
                {[7, 8, 9, 10].map((size) => (
                  <span
                    key={size}
                    className={cn(
                      'flex h-12 w-16 items-center justify-center rounded-xl text-[17px] font-semibold ring-1',
                      size === 8 && state.sizePicked ? 'bg-ink text-white ring-ink' : 'ring-line-strong',
                    )}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="mt-3.5 text-[16px] font-semibold underline decoration-ink/30 underline-offset-4">Size guide</p>
              <div
                className={cn(
                  'mt-4 flex h-14 items-center justify-center gap-2 rounded-xl text-[18px] font-bold text-white',
                  state.inCart ? 'bg-success' : 'bg-ink',
                )}
              >
                {state.inCart ? (
                  <>
                    <Check className="h-5 w-5" /> Added to cart
                  </>
                ) : (
                  'Add to cart'
                )}
              </div>
              <p className="mt-4 text-[16px] text-ink-secondary">Shipping $12.00 · calculated at checkout</p>
            </div>
          </>
        )}

        {state.screen === 'confirmed' && (
          <div className="flex h-full flex-col items-center pt-[60px]">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success-bg text-success">
              <Check className="h-10 w-10" />
            </span>
            <p className="mt-5 text-[36px] font-extrabold tracking-tight">Order confirmed</p>
            <p className="text-[18px] text-ink-secondary">Thank you, {STORY.persona}. A receipt is on its way.</p>
            <div className="mt-8 w-[440px] rounded-2xl bg-surface-warm p-6 ring-1 ring-line">
              <div className="flex justify-between text-[16px] text-ink-secondary">
                <span>{product.name}</span>
                <span className="line-through">{usd(product.price)}</span>
              </div>
              <div className="mt-1.5 flex justify-between text-[16px] text-success">
                <span>10% off today</span>
                <span>−{usd(product.price - captured)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-3 text-[20px] font-extrabold">
                <span>Total</span>
                <span>{usd(captured)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart drawer */}
      {state.screen === 'product' && state.drawer > 0 && (
        <div
          className="absolute bottom-0 right-0 top-[102px] w-[400px] bg-white px-7 pt-7 shadow-[-24px_0_60px_-30px_rgba(26,20,16,0.4)] ring-1 ring-line"
          style={{ transform: `translateX(${(1 - state.drawer) * 100}%)` }}
        >
          <p className="text-[22px] font-extrabold">Your cart (1)</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-surface-sunken">
              <BootIllustration className="w-[85%]" />
            </div>
            <div className="flex-1 text-[16px]">
              <p className="font-bold leading-tight">{product.name}</p>
              <p className="text-ink-muted">{product.variant}</p>
            </div>
            <p className="text-[17px] font-bold">{usd(product.price)}</p>
          </div>
          <div className="mt-7 space-y-2 border-t border-line pt-5 text-[16px]">
            <div className="flex justify-between text-ink-secondary">
              <span>Subtotal</span>
              <span>{usd(product.price)}</span>
            </div>
            <div className={cn('-mx-2 flex justify-between rounded-md px-2 py-0.5 transition-colors', state.shippingWarn ? 'bg-warning-bg text-warning' : 'text-ink-secondary')}>
              <span>Shipping</span>
              <span>$12.00</span>
            </div>
            <div className="flex justify-between pt-1 text-[18px] font-extrabold">
              <span>Total</span>
              <span>{usd(product.price + 12)}</span>
            </div>
          </div>
          <div className="mt-5 flex h-14 items-center justify-center rounded-xl bg-ink text-[18px] font-bold text-white">Checkout</div>
        </div>
      )}

      {/* Offer sheet */}
      {state.offer > 0 && (
        <>
          <div className="absolute inset-0 bg-night/40" style={{ opacity: state.offer }} />
          <div
            className="absolute left-1/2 top-[240px] w-[460px] rounded-3xl bg-white p-8 shadow-2xl"
            style={{ opacity: state.offer, transform: `translate(-50%, ${(1 - state.offer) * 30}px)` }}
          >
            <div className="flex items-start justify-between">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink-muted">Before you go</p>
              <X className="h-4 w-4 text-ink-muted" />
            </div>
            <p className="mt-2 text-[24px] font-extrabold leading-snug">{offer.copy}</p>
            <div className={cn('mt-5 flex h-[52px] items-center rounded-xl px-4 text-[17px] ring-1', state.email ? 'text-ink ring-ink' : 'text-ink-muted ring-line-strong')}>
              {state.email || 'Email address'}
              {state.email && !state.applied && <span className="ml-0.5 h-5 w-0.5 animate-pulse bg-ink" />}
            </div>
            <div
              className={cn(
                'mt-3 flex h-[52px] items-center justify-center gap-2 rounded-xl text-[17px] font-bold text-white',
                state.applied ? 'bg-success' : 'bg-ink',
              )}
            >
              {state.applied ? (
                <>
                  <Check className="h-5 w-5" /> 10% applied · {usd(captured)}
                </>
              ) : (
                'Unlock 10% off'
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
