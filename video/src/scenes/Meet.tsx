import { X } from 'lucide-react'
import { ease, spring, tw } from '../anim'
import { Phone } from '../components/Phone'
import { StoreScreen, VIEW } from '../components/Store'
import { Eyebrow, Headline } from '../components/Text'
import { C, font, mono } from '../theme'
import { Abs, Backdrop, L, type SceneProps } from './shared'

/** One dot becomes "anon_7f3d", who lands from an Instagram ad with no account, email or history. */
export function Meet({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const end = spec.dur / 30
  // Chip grows out of a single dot.
  const grow = tw(s, 0.15, 0.95, 0, 1, ease.outQuint)
  const chipW = 26 + grow * 400
  const chipH = 26 + grow * 62
  // Phone rises in, then slides to the product-scene position at the end.
  const rise = spring(s, vo + 0.9, { stiffness: 90, damping: 15 })
  const toLayout = tw(s, end - 0.9, end - 0.1, 0, 1, ease.inOut)
  const phoneX = 1180 + (L.phoneX - 1180) * toLayout
  const phoneY = L.phoneY + (1 - rise) * 700
  const leftFade = 1 - toLayout

  const chips: { at: number; text: string; negative?: boolean }[] = [
    { at: vo + 1.4, text: 'via Instagram ad' },
    { at: vo + 3.0, text: 'No account', negative: true },
    { at: vo + 3.6, text: 'No email', negative: true },
    { at: vo + 4.2, text: 'No history', negative: true },
  ]

  return (
    <Backdrop glow={{ x: 40, y: 50 }}>
      <div style={{ opacity: leftFade }}>
        <Abs x={L.left} y={L.eyebrowY} w={760}>
          <Eyebrow s={s} at={vo}>
            One visitor
          </Eyebrow>
          <div style={{ position: 'relative', marginTop: 22, height: 180 }}>
            <Headline s={s} at={vo} out={vo + 1.1} text="Take one of them." size={72} style={{ position: 'absolute', inset: 0 }} />
            <Headline s={s} at={vo + 1.3} text="She lands from an Instagram ad." size={72} style={{ position: 'absolute', inset: 0, width: 760 }} />
          </div>
        </Abs>

        <Abs x={L.left} y={500}>
          <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em', color: C.muted, opacity: tw(s, 0.8, 1.3), marginBottom: 16 }}>
            ANONYMOUS VISITOR
          </div>
          <div
            style={{
              width: chipW,
              height: chipH,
              borderRadius: chipH / 2,
              background: C.raised,
              boxShadow: `0 0 0 2px ${C.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: mono,
              fontSize: 46,
              fontWeight: 600,
              color: C.text,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ opacity: tw(s, 0.7, 1.1) }}>anon_7f3d</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 26, width: 760 }}>
            {chips.map((chip) => {
              const p = tw(s, chip.at, chip.at + 0.45, 0, 1, ease.outQuint)
              return (
                <div
                  key={chip.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 62,
                    padding: '0 24px',
                    borderRadius: 31,
                    fontFamily: font,
                    fontSize: 27,
                    fontWeight: 600,
                    color: chip.negative ? C.soft : C.text,
                    background: chip.negative ? 'transparent' : C.raised,
                    boxShadow: `0 0 0 2px ${chip.negative ? C.line : C.muted}`,
                    opacity: p,
                    transform: `translateY(${(1 - p) * 18}px)`,
                  }}
                >
                  {chip.negative && <X size={24} color={C.muted} />}
                  {chip.text}
                </div>
              )
            })}
          </div>
        </Abs>
      </div>

      <Phone x={phoneX} y={phoneY} style={{ opacity: tw(s, vo + 0.9, vo + 1.3) }}>
        <StoreScreen v={VIEW} />
      </Phone>
    </Backdrop>
  )
}
