import { ArrowRight } from 'lucide-react'
import { INTEGRATIONS } from '../../../lib/landing/content'
import { ease, rise, spring, tw } from '../anim'
import { Eyebrow, Fade, Headline } from '../components/Text'
import { C, font } from '../theme'
import { Abs, Backdrop, type SceneProps } from './shared'

/** "Most tools react hours later" vs "<100 ms, while she's still there". */
export function Why({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const legacy = tw(s, vo + 0.2, vo + 1.9, 0, 1, ease.inOut)
  const second = vo + 2.0
  const barX = 120
  const barW = 1680
  const leaveX = barX + 150
  return (
    <Backdrop glow={{ x: 30, y: 30 }}>
      <Abs x={120} y={140} w={1500}>
        <Eyebrow s={s} at={0.2}>
          The window
        </Eyebrow>
        <Headline s={s} at={0.3} text="Most tools react hours later." size={84} style={{ marginTop: 22, color: s > second ? C.muted : C.text }} />
        <Headline s={s} at={second} text="Convertive acts while she’s still there." size={84} />
      </Abs>

      {/* Shopper-leaves marker */}
      <div style={{ position: 'absolute', left: leaveX, top: 600, height: 300, borderLeft: `2px dashed ${C.muted}`, opacity: tw(s, vo + 0.6, vo + 1.0) }}>
        <div style={{ position: 'absolute', top: -40, left: 12, whiteSpace: 'nowrap', fontFamily: font, fontSize: 24, fontWeight: 600, color: C.soft }}>Shopper leaves</div>
      </div>

      {/* Legacy bar */}
      <Abs x={barX} y={650} w={barW}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font, fontSize: 28, color: C.soft, opacity: tw(s, vo, vo + 0.4) }}>
          <span>Batch tools and recovery emails</span>
          <span style={{ fontWeight: 700, opacity: tw(s, vo + 1.6, vo + 2.0) }}>Hours later</span>
        </div>
        <div style={{ marginTop: 14, height: 22, borderRadius: 11, background: C.raised, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${legacy * 100}%`, background: C.muted, borderRadius: 11 }} />
        </div>
      </Abs>

      {/* Convertive bar */}
      <Abs x={barX} y={790} w={barW} style={{ opacity: tw(s, second, second + 0.4) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font, fontSize: 28, color: C.text, fontWeight: 600 }}>
          <span>Convertive</span>
          <span style={{ fontWeight: 700 }}>Under 100 ms · same session</span>
        </div>
        <div style={{ marginTop: 14, height: 22, borderRadius: 11, background: C.raised, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: 26 * tw(s, second + 0.2, second + 0.5), background: C.text, borderRadius: 11 }} />
        </div>
      </Abs>
    </Backdrop>
  )
}

const MODULES = [
  { title: 'Data Platform', desc: 'Live profiles and stitched identity' },
  { title: 'Audiences', desc: 'Segments that update in-session' },
  { title: 'Decisioning', desc: 'The next best action in under 100 ms' },
  { title: 'Journey Orchestration', desc: 'On-site and cross-channel, in sync' },
  { title: 'Reporting', desc: 'Lift, identity and decision quality' },
]

export function Platform({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const stackAt = vo + 3.4
  return (
    <Backdrop glow={{ x: 50, y: 20 }}>
      <Abs x={120} y={140} w={1600}>
        <Eyebrow s={s} at={0.2}>
          The platform
        </Eyebrow>
        <Headline s={s} at={0.3} text="One live profile behind every decision." size={76} style={{ marginTop: 22 }} />
      </Abs>
      <div style={{ position: 'absolute', left: 120, top: 400, width: 1680, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
        {MODULES.map((m, i) => (
          <div
            key={m.title}
            style={{
              height: 250,
              borderRadius: 28,
              background: C.raised,
              boxShadow: `0 0 0 1.5px ${C.line}`,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: font,
              ...rise(s, vo + 0.2 + i * 0.32, { dist: 40 }),
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: C.muted, fontVariantNumeric: 'tabular-nums' }}>0{i + 1}</div>
            <div>
              <div style={{ fontSize: 30, fontWeight: 750, color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.title}</div>
              <div style={{ fontSize: 21, color: C.soft, marginTop: 10, lineHeight: 1.3 }}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Abs x={120} y={740} w={1680}>
        <Fade s={s} at={stackAt - 0.2} style={{ fontFamily: font, fontSize: 21, fontWeight: 700, letterSpacing: '0.2em', color: C.muted }}>
          ON TOP OF THE STACK YOU ALREADY RUN
        </Fade>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 20 }}>
          {INTEGRATIONS.items.map((item, i) => (
            <div
              key={item}
              style={{
                height: 64,
                padding: '0 28px',
                borderRadius: 32,
                boxShadow: `0 0 0 2px ${C.line}`,
                display: 'flex',
                alignItems: 'center',
                fontFamily: font,
                fontSize: 26,
                fontWeight: 650,
                color: C.soft,
                ...rise(s, stackAt + i * 0.07, { dist: 18, dur: 0.5 }),
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </Abs>
    </Backdrop>
  )
}

export function End({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const logo = spring(s, 0.2, { stiffness: 120, damping: 14 })
  return (
    <Backdrop glow={{ x: 50, y: 42 }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: font }}>
        <img src="logo-mark.png" alt="" style={{ width: 132, opacity: Math.min(1, logo * 1.4), transform: `scale(${0.7 + logo * 0.3})` }} />
        <div style={{ marginTop: 30, fontSize: 64, fontWeight: 800, letterSpacing: '0.14em', color: C.text, ...rise(s, 0.55, { dist: 20 }) }}>CONVERTIVE</div>
        <Headline s={s} at={vo + 1.0} text="Convert anonymous visitors before they leave." size={64} align="center" style={{ marginTop: 44, width: 1500 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 56, ...rise(s, vo + 2.4, { dist: 20 }) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 84, padding: '0 40px', borderRadius: 42, background: C.text, color: C.night, fontSize: 32, fontWeight: 750 }}>
            Book a demo <ArrowRight size={32} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: C.soft }}>tryconvertive.com</div>
        </div>
      </div>
    </Backdrop>
  )
}
