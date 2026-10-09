import { ease, rand, tw } from '../anim'
import { Eyebrow, Fade, Headline } from '../components/Text'
import { C, font } from '../theme'
import { Abs, Backdrop, type SceneProps } from './shared'

const BOUGHT = new Set([23, 58, 81])
const GRID = { x: 1110, y: 250, gap: 64, r: 11 }

/** 100 visitors arrive; 97 drift away without buying. */
export function Problem({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const leaveAt = vo + 2.45
  return (
    <Backdrop glow={{ x: 72, y: 45 }}>
      <Abs x={120} y={300} w={860}>
        <Eyebrow s={s} at={0.2}>
          Ecommerce, today
        </Eyebrow>
        <div style={{ position: 'relative', marginTop: 22, height: 260 }}>
          <Headline s={s} at={0.3} out={leaveAt - 0.3} text="Every campaign brings shoppers to your store." size={78} style={{ position: 'absolute', inset: 0 }} />
          <Headline s={s} at={leaveAt} text="97 of 100 leave without buying." size={78} style={{ position: 'absolute', inset: 0 }} />
        </div>
        <Fade s={s} at={vo + 4.5} style={{ fontFamily: font, fontSize: 38, fontWeight: 500, color: C.soft, marginTop: 8, lineHeight: 1.3 }}>
          …and without telling you who they were.
        </Fade>
      </Abs>

      {Array.from({ length: 100 }, (_, i) => {
        const col = i % 10
        const row = Math.floor(i / 10)
        const tx = GRID.x + col * GRID.gap
        const ty = GRID.y + row * GRID.gap
        const enter = tw(s, 0.2 + rand(i, 3) * 1.4, 1.2 + rand(i, 3) * 1.4, 0, 1, ease.outQuint)
        const bought = BOUGHT.has(i)
        const leave = bought ? 0 : tw(s, leaveAt + rand(i, 7) * 1.3, leaveAt + 1.3 + rand(i, 7) * 1.3, 0, 1, ease.in)
        const x = tx - (1 - enter) * 180 + leave * (240 + rand(i, 11) * 420)
        const y = ty + (rand(i, 5) - 0.5) * (1 - enter) * 60 + leave * (rand(i, 13) - 0.5) * 160
        const opacity = enter * (1 - leave)
        const glow = bought ? tw(s, leaveAt + 0.8, leaveAt + 1.6) : 0
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - GRID.r,
              top: y - GRID.r,
              width: GRID.r * 2,
              height: GRID.r * 2,
              borderRadius: GRID.r,
              background: bought ? C.text : C.soft,
              opacity: bought ? enter : opacity * 0.85,
              boxShadow: glow ? `0 0 0 ${glow * 8}px rgba(245,240,235,${0.12 * glow})` : undefined,
            }}
          />
        )
      })}
    </Backdrop>
  )
}
