import { Check, Lock, ShoppingBag, X } from 'lucide-react'
import { STORY } from '../../../lib/landing/story'
import { C, font } from '../theme'

const usd = (n: number) => `$${n.toFixed(2)}`

export function Boot({ width, tone = 'walnut' }: { width: number | string; tone?: 'walnut' | 'slate' }) {
  const upper = tone === 'walnut' ? '#7A5A44' : '#5C4E44'
  const panel = tone === 'walnut' ? '#8E6A50' : '#6E6056'
  return (
    <svg viewBox="0 0 140 100" style={{ width, display: 'block' }}>
      <path d="M38 14 L72 11 Q77 11 77 16 L79 50 Q81 57 90 59 L118 65 Q128 67 128 77 L128 80 L26 80 L26 71 Q26 63 31 57 L36 17 Q36 14 38 14 Z" fill={upper} />
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

/** Every visual state of the store, as numbers the scenes animate (0..1 unless noted). */
export interface StoreView {
  browse: number
  product: number
  confirmed: number
  cart: number // badge count
  added: number // "Added to cart" state of the button
  drawer: number
  shippingWarn: number
  sheet: number
  email: string
  caret: boolean
  applied: number
  closed: number
  cursor?: { x: number; y: number; o: number }
  desaturate?: number
}

export const VIEW: StoreView = {
  browse: 1,
  product: 0,
  confirmed: 0,
  cart: 0,
  added: 0,
  drawer: 0,
  shippingWarn: 0,
  sheet: 0,
  email: '',
  caret: false,
  applied: 0,
  closed: 0,
}

const T = { fontFamily: font, color: C.ink }

export function StoreScreen({ v }: { v: StoreView }) {
  const { product, offer, captured } = STORY
  return (
    <div style={{ position: 'absolute', inset: 0, ...T, filter: v.desaturate ? `grayscale(${v.desaturate}) brightness(${1 - v.desaturate * 0.12})` : undefined }}>
      {/* Status + browser chrome */}
      <div style={{ position: 'absolute', top: 18, left: 34, fontSize: 17, fontWeight: 700 }}>9:41</div>
      <div style={{ position: 'absolute', top: 62, left: 16, right: 16, height: 42, borderRadius: 12, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 17, color: C.ink2 }}>
        <Lock size={15} /> {STORY.storeDomain}
      </div>
      <div style={{ position: 'absolute', top: 116, left: 0, right: 0, height: 60, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px' }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>yourstore</span>
        <span style={{ position: 'relative' }}>
          <ShoppingBag size={26} />
          {v.cart > 0 && (
            <span style={{ position: 'absolute', top: -8, right: -9, width: 20, height: 20, borderRadius: 10, background: C.ink, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {v.cart}
            </span>
          )}
        </span>
      </div>

      {/* Pages */}
      <div style={{ position: 'absolute', top: 176, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {v.browse > 0 && (
          <div style={{ position: 'absolute', inset: 0, padding: '22px 22px', opacity: v.browse, transform: `translateX(${(v.browse - 1) * 40}px)` }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>Trail boots</div>
            <div style={{ fontSize: 17, color: C.inkMuted, marginTop: 2 }}>24 styles</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
              {[
                { name: product.name, price: product.price, tone: 'walnut' as const },
                { name: 'Summit Hiker', price: 149, tone: 'slate' as const },
                { name: 'Canyon Mid', price: 139, tone: 'slate' as const },
                { name: 'Ridge Low', price: 119, tone: 'walnut' as const },
              ].map((p) => (
                <div key={p.name}>
                  <div style={{ aspectRatio: '1', borderRadius: 14, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Boot width="80%" tone={p.tone} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>{p.name}</div>
                  <div style={{ fontSize: 16, color: C.ink2 }}>${p.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {v.product > 0 && (
          <div style={{ position: 'absolute', inset: 0, padding: '22px', opacity: v.product, transform: `translateX(${(1 - v.product) * 60}px)` }}>
            <div style={{ aspectRatio: '4 / 3', borderRadius: 16, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boot width="72%" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 18, letterSpacing: '-0.02em' }}>{product.name}</div>
            <div style={{ fontSize: 17, color: C.ink2, marginTop: 2 }}>{product.variant}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>{usd(product.price)}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[7, 8, 9, 10].map((size) => (
                <div key={size} style={{ width: 52, height: 44, borderRadius: 10, border: `2px solid ${size === 8 ? C.ink : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700 }}>
                  {size}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                height: 56,
                borderRadius: 14,
                background: v.added > 0.5 ? C.success : C.ink,
                color: '#fff',
                fontSize: 19,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {v.added > 0.5 ? (
                <>
                  <Check size={20} /> Added to cart
                </>
              ) : (
                'Add to cart'
              )}
            </div>
          </div>
        )}

        {v.confirmed > 0 && (
          <div style={{ position: 'absolute', inset: 0, padding: '60px 26px', opacity: v.confirmed, transform: `scale(${0.96 + v.confirmed * 0.04})`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 84, height: 84, borderRadius: 42, background: '#D4F4E8', color: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={44} strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, marginTop: 22, letterSpacing: '-0.02em' }}>Order confirmed</div>
            <div style={{ fontSize: 19, color: C.ink2, marginTop: 6 }}>Thank you, {STORY.persona}.</div>
            <div style={{ width: '100%', marginTop: 30, borderRadius: 18, background: C.warm, border: `1px solid ${C.border}`, padding: 20, textAlign: 'left' }}>
              <Row label={product.name} value={usd(product.price)} strike />
              <Row label="10% off today" value={`−${usd(product.price - captured)}`} color={C.success} />
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10 }}>
                <Row label="Total" value={usd(captured)} bold />
              </div>
            </div>
          </div>
        )}

        {/* Cart drawer */}
        {v.drawer > 0 && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, transform: `translateY(${(1 - v.drawer) * 100}%)`, background: '#fff', borderRadius: '24px 24px 0 0', boxShadow: '0 -20px 40px -16px rgba(26,20,16,0.3)', padding: '22px 22px 26px', borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 21, fontWeight: 800 }}>Your cart (1)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
              <div style={{ width: 62, height: 62, borderRadius: 12, background: C.sunken, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Boot width="86%" />
              </div>
              <div style={{ flex: 1, fontSize: 16 }}>
                <div style={{ fontWeight: 700 }}>{product.name}</div>
                <div style={{ color: C.inkMuted }}>{product.variant}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{usd(product.price)}</div>
            </div>
            <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 12, fontSize: 17, color: C.ink2 }}>
              <Row label="Subtotal" value={usd(product.price)} />
              <div style={{ margin: '4px -8px 0', padding: '4px 8px', borderRadius: 8, background: `rgba(253,239,208,${v.shippingWarn})`, color: v.shippingWarn > 0.5 ? '#8B5C00' : C.ink2 }}>
                <Row label="Shipping" value="$12.00" />
              </div>
            </div>
            <div style={{ marginTop: 14, height: 54, borderRadius: 14, background: C.ink, color: '#fff', fontSize: 19, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Checkout</div>
          </div>
        )}

        {/* Offer sheet */}
        {v.sheet > 0 && (
          <>
            <div style={{ position: 'absolute', inset: 0, background: `rgba(26,20,16,${0.4 * v.sheet})` }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, transform: `translateY(${(1 - v.sheet) * 100}%)`, background: '#fff', borderRadius: '28px 28px 0 0', padding: '26px 24px 30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.16em', color: C.inkMuted }}>BEFORE YOU GO</span>
                <X size={20} color={C.inkMuted} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.18, marginTop: 10, letterSpacing: '-0.02em' }}>{offer.copy}</div>
              <div style={{ marginTop: 18, height: 54, borderRadius: 12, border: `2px solid ${v.email ? C.ink : C.border}`, display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 19, color: v.email ? C.ink : C.inkMuted }}>
                {v.email || 'Email address'}
                {v.caret && <span style={{ width: 2, height: 24, background: C.ink, marginLeft: 2 }} />}
              </div>
              <div style={{ marginTop: 10, height: 56, borderRadius: 14, background: v.applied > 0.5 ? C.success : C.ink, color: '#fff', fontSize: 19, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {v.applied > 0.5 ? (
                  <>
                    <Check size={20} /> 10% applied · {usd(captured)}
                  </>
                ) : (
                  'Unlock 10% off'
                )}
              </div>
            </div>
          </>
        )}

        {/* Tab closed */}
        {v.closed > 0 && (
          <div style={{ position: 'absolute', inset: 0, background: `rgba(240,232,224,${0.96 * v.closed})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: v.closed }}>
            <div style={{ width: 76, height: 76, borderRadius: 38, background: '#fff', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={36} color={C.ink2} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 18 }}>Tab closed</div>
            <div style={{ fontSize: 18, color: C.ink2, marginTop: 6 }}>1 item left in an anonymous cart</div>
          </div>
        )}
      </div>

      {/* Cursor */}
      {v.cursor && v.cursor.o > 0 && (
        <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: 'absolute', left: v.cursor.x, top: v.cursor.y, opacity: v.cursor.o, zIndex: 40, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }}>
          <path d="M4 2 L4 19 L8.5 14.8 L11.5 21.5 L14.5 20.2 L11.6 13.6 L18 13.4 Z" fill="#fff" stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

function Row({ label, value, strike, bold, color }: { label: string; value: string; strike?: boolean; bold?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: bold ? 21 : 17, fontWeight: bold ? 800 : 500, color: color ?? (bold ? C.ink : C.ink2), marginTop: 4 }}>
      <span>{label}</span>
      <span style={{ textDecoration: strike ? 'line-through' : undefined }}>{value}</span>
    </div>
  )
}
