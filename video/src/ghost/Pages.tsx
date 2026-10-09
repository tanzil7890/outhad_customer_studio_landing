import type { ReactNode } from 'react'
import { Check, Lock, Search, ShoppingBag, X } from 'lucide-react'
import { STORY } from '../../../lib/landing/story'
import { Boot } from '../components/Store'
import { C, font } from '../theme'
import { PAGE } from './world'

const usd = (n: number) => `$${n.toFixed(2)}`

/** Desktop browser window with a tab whose close button the shopper heads for. */
export function BrowserWindow({ x, y, cart = 0, closeHot = 0, children }: { x: number; y: number; cart?: number; closeHot?: number; children: ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: PAGE.w,
        height: PAGE.h,
        borderRadius: 18,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 50px 120px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(245,240,235,0.08)',
        fontFamily: font,
        color: C.ink,
      }}
    >
      {/* Tab strip */}
      <div style={{ height: 52, background: C.sunken, display: 'flex', alignItems: 'flex-end', padding: '0 18px', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignSelf: 'center', marginRight: 14 }}>
          {['#E0796B', '#E8B85C', '#8DBF7A'].map((c) => (
            <span key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
          ))}
        </div>
        <div style={{ width: 250, height: 40, background: '#fff', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, fontSize: 16, fontWeight: 600 }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: C.ink }} />
          <span style={{ flex: 1 }}>yourstore.com</span>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `rgba(240,204,136,${0.9 * closeHot})`,
              boxShadow: closeHot > 0.5 ? `0 0 0 ${6 * closeHot}px rgba(240,204,136,0.25)` : undefined,
            }}
          >
            <X size={15} strokeWidth={2.5} />
          </span>
        </div>
      </div>
      {/* Address bar */}
      <div style={{ height: 50, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 18px' }}>
        <div style={{ flex: 1, height: 34, borderRadius: 10, background: C.sunken, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 15, color: C.ink2 }}>
          <Lock size={13} /> yourstore.com
        </div>
      </div>
      {/* Store header */}
      <div style={{ height: 64, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 34, fontSize: 17, fontWeight: 600 }}>
        <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginRight: 'auto' }}>yourstore</span>
        <span style={{ color: C.ink2 }}>Boots</span>
        <span style={{ color: C.ink2 }}>Trail</span>
        <span style={{ color: C.ink2 }}>Sale</span>
        <Search size={20} />
        <span style={{ position: 'relative' }}>
          <ShoppingBag size={22} />
          {cart > 0 && (
            <span style={{ position: 'absolute', top: -8, right: -10, width: 20, height: 20, borderRadius: 10, background: C.ink, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cart}
            </span>
          )}
        </span>
      </div>
      <div style={{ position: 'absolute', top: 166, left: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  )
}

export function CollectionPage({ hover }: { hover: number }) {
  const tiles = [
    { name: STORY.product.name, price: STORY.product.price, tone: 'walnut' as const },
    { name: 'Summit Hiker', price: 149, tone: 'slate' as const },
    { name: 'Canyon Mid', price: 139, tone: 'slate' as const },
    { name: 'Ridge Low', price: 119, tone: 'walnut' as const },
  ]
  return (
    <div style={{ padding: '26px 60px' }}>
      <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' }}>Trail boots</div>
      <div style={{ fontSize: 17, color: C.inkMuted, marginTop: 2 }}>24 styles · Free returns</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30, marginTop: 26 }}>
        {tiles.map((tile, i) => (
          <div key={tile.name}>
            <div
              style={{
                aspectRatio: '1',
                borderRadius: 16,
                background: C.sunken,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: hover === i ? `0 0 0 3px ${C.ink}` : undefined,
              }}
            >
              <Boot width="78%" tone={tile.tone} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>{tile.name}</div>
            <div style={{ fontSize: 17, color: C.ink2 }}>${tile.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export interface ProductState {
  added: boolean
  drawer: number
  shippingWarn: number
  modal: number
  email: string
  caret: boolean
  applied: boolean
}

export function ProductPage({ st }: { st: ProductState }) {
  const { product, offer, captured } = STORY
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 50, top: 30, width: 560, height: 520, borderRadius: 20, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Boot width="76%" />
      </div>
      <div style={{ position: 'absolute', left: 660, top: 40, width: 480 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.14em', color: C.inkMuted }}>TRAIL · WATERPROOF</div>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1.05 }}>{product.name}</div>
        <div style={{ fontSize: 18, color: C.ink2, marginTop: 6 }}>{product.variant}</div>
        <div style={{ fontSize: 30, fontWeight: 700, marginTop: 14 }}>{usd(product.price)}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          {[7, 8, 9, 10].map((size) => (
            <div key={size} style={{ width: 64, height: 50, borderRadius: 12, border: `2px solid ${size === 8 ? C.ink : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>
              {size}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, height: 62, borderRadius: 14, background: st.added ? C.success : C.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 20, fontWeight: 700 }}>
          {st.added ? (
            <>
              <Check size={22} /> Added to cart
            </>
          ) : (
            'Add to cart'
          )}
        </div>
        <div style={{ marginTop: 18, fontSize: 17, color: C.ink2, textDecoration: 'underline' }}>Size guide</div>
        <div style={{ marginTop: 8, fontSize: 17, color: C.ink2 }}>Shipping calculated at checkout</div>
      </div>

      {/* Cart drawer */}
      {st.drawer > 0 && (
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 400, transform: `translateX(${(1 - st.drawer) * 100}%)`, background: '#fff', borderLeft: `1px solid ${C.border}`, boxShadow: '-30px 0 60px -30px rgba(26,20,16,0.35)', padding: 30 }}>
          <div style={{ fontSize: 24, fontWeight: 800 }}>Your cart (1)</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 22 }}>
            <div style={{ width: 80, height: 80, borderRadius: 14, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boot width="86%" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{product.name}</div>
              <div style={{ fontSize: 16, color: C.inkMuted }}>{product.variant}</div>
            </div>
          </div>
          <div style={{ marginTop: 26, fontSize: 18, color: C.ink2 }}>
            <Row label="Subtotal" value={usd(product.price)} />
            <div style={{ margin: '8px -10px 0', padding: '6px 10px', borderRadius: 10, background: `rgba(253,239,208,${st.shippingWarn})`, color: st.shippingWarn > 0.5 ? '#8B5C00' : C.ink2 }}>
              <Row label="Shipping" value="$12.00" />
            </div>
          </div>
          <div style={{ position: 'absolute', left: 30, right: 30, bottom: 34, height: 60, borderRadius: 14, background: C.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>Checkout</div>
        </div>
      )}

      {/* Offer modal */}
      {st.modal > 0 && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: `rgba(26,20,16,${0.45 * st.modal})` }} />
          <div
            style={{
              position: 'absolute',
              left: 340,
              top: 120,
              width: 520,
              borderRadius: 26,
              background: '#fff',
              padding: '30px 34px 34px',
              opacity: st.modal,
              transform: `translateY(${(1 - st.modal) * 30}px) scale(${0.96 + 0.04 * st.modal})`,
              boxShadow: '0 40px 80px -30px rgba(26,20,16,0.6)',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.16em', color: C.inkMuted }}>BEFORE YOU GO</div>
            <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, marginTop: 10, letterSpacing: '-0.02em' }}>{offer.copy}</div>
            <div style={{ marginTop: 22, height: 60, borderRadius: 14, border: `2px solid ${st.email ? C.ink : C.border}`, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 21, color: st.email ? C.ink : C.inkMuted }}>
              {st.email || 'Email address'}
              {st.caret && <span style={{ width: 2, height: 26, background: C.ink, marginLeft: 2 }} />}
            </div>
            <div style={{ marginTop: 12, height: 62, borderRadius: 14, background: st.applied ? C.success : C.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 21, fontWeight: 700 }}>
              {st.applied ? (
                <>
                  <Check size={22} /> 10% applied · {usd(captured)}
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

export function ConfirmationPage() {
  const { product, captured } = STORY
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50 }}>
      <div style={{ width: 96, height: 96, borderRadius: 48, background: '#D4F4E8', color: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Check size={52} strokeWidth={2.5} />
      </div>
      <div style={{ fontSize: 44, fontWeight: 800, marginTop: 22, letterSpacing: '-0.03em' }}>Order confirmed</div>
      <div style={{ fontSize: 20, color: C.ink2, marginTop: 6 }}>Thank you, {STORY.persona}. It ships tomorrow.</div>
      <div style={{ width: 520, marginTop: 30, borderRadius: 20, background: C.warm, border: `1px solid ${C.border}`, padding: 26 }}>
        <Row label={product.name} value={usd(product.price)} strike />
        <Row label="10% off today" value={`−${usd(product.price - captured)}`} color={C.success} />
        <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 12 }}>
          <Row label="Total" value={usd(captured)} bold />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, strike, bold, color }: { label: string; value: string; strike?: boolean; bold?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: bold ? 24 : 18, fontWeight: bold ? 800 : 500, color: color ?? (bold ? C.ink : C.ink2), marginTop: 6 }}>
      <span>{label}</span>
      <span style={{ textDecoration: strike ? 'line-through' : undefined }}>{value}</span>
    </div>
  )
}
