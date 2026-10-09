import type { ReactNode } from 'react'
import { ArrowRight, Check, Rewind } from 'lucide-react'
import { STORY } from '../../../lib/landing/story'
import { ease, lookup, tw } from '../anim'
import { Clock, DecisionCard, Panel, SignalList } from '../components/Panel'
import { Phone } from '../components/Phone'
import { StoreScreen, VIEW, type StoreView } from '../components/Store'
import { Eyebrow, Fade, Headline } from '../components/Text'
import { C, font } from '../theme'
import { Abs, Backdrop, L, type SceneProps } from './shared'

const WITH = STORY.timelines.with
const WITHOUT = STORY.timelines.without

// ── Shared pieces ───────────────────────────────────────────────────────────

/** Cursor path on the phone screen as a function of story time (same in both timelines up to 0:32). */
function cursorAt(t: number) {
  const pts: [number, number, number][] = [
    // [storyT, x, y]
    [11.5, 300, 420],
    [14.5, 190, 640],
    [26.0, 190, 640],
    [27.5, 300, 650],
    [31.0, 300, 560],
    [32.0, 300, 330],
    [36.0, 320, 40],
  ]
  const xs = pts.map((p) => p[0])
  return {
    x: lookup(t, xs, pts.map((p) => p[1])),
    y: lookup(t, xs, pts.map((p) => p[2])),
    o: tw(t, 11.5, 12.3),
  }
}

/** Store state for the shared part of the session (0:00 – 0:32). */
function sessionView(t: number): StoreView {
  return {
    ...VIEW,
    browse: 1 - tw(t, 10.5, 12),
    product: tw(t, 10.5, 12),
    added: t >= 15 ? 1 : 0,
    cart: t >= 15 ? 1 : 0,
    drawer: tw(t, 24, 26),
    shippingWarn: tw(t, 27, 28),
    cursor: cursorAt(t),
  }
}

function signalAppear(t: number) {
  return (sig: { at: number }) => tw(t, sig.at, sig.at + 1.4)
}

function LeftColumn({ children }: { children: ReactNode }) {
  return (
    <Abs x={L.left} y={L.eyebrowY} w={L.colW}>
      {children}
    </Abs>
  )
}

function Headlines({ s, items }: { s: number; items: { at: number; out?: number; text: string }[] }) {
  return (
    <div style={{ position: 'relative', marginTop: 22, height: 260 }}>
      {items.map((h) => (
        <Headline key={h.text} s={s} at={h.at} out={h.out} text={h.text} size={60} style={{ position: 'absolute', inset: 0, width: L.colW }} />
      ))}
    </div>
  )
}

function ClockAt({ seconds, total, color, note }: { seconds: number; total?: number; color?: string; note?: ReactNode }) {
  return (
    <Abs x={L.left} y={L.clockY}>
      <Clock seconds={seconds} total={total} color={color} />
      {note}
    </Abs>
  )
}

const Lower = ({ opacity = 1, children }: { opacity?: number; children: ReactNode }) => (
  <div style={{ position: 'absolute', inset: 0, opacity }}>{children}</div>
)

// ── Scenes ──────────────────────────────────────────────────────────────────

export function Detect({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const t = tw(s, vo + 0.1, vo + spec.voDur * 0.96, 0, 32, ease.linear)
  const panelIn = tw(s, 0.1, 0.8, 0, 1, ease.outQuint)
  return (
    <Backdrop>
      <LeftColumn>
        <Eyebrow s={s} at={0.2}>
          Detect
        </Eyebrow>
        <Headlines
          s={s}
          items={[
            { at: 0.3, out: vo + 4.6, text: 'Every signal, from the first click.' },
            { at: vo + 4.8, text: 'Intent and exit risk, live.' },
          ]}
        />
      </LeftColumn>
      <ClockAt seconds={t} />
      <Phone x={L.phoneX} y={L.phoneY}>
        <StoreScreen v={sessionView(t)} />
      </Phone>
      <div style={{ opacity: panelIn, transform: `translateX(${(1 - panelIn) * 60}px)` }}>
        <Panel
          x={L.panelX}
          y={L.panelY}
          w={L.panelW}
          h={L.panelH}
          identity="anon_7f3d"
          risk={lookup(t, WITH.tracks.exitRisk.at, WITH.tracks.exitRisk.value)}
          intent={lookup(t, WITH.tracks.intent.at, WITH.tracks.intent.value)}
        >
          <SignalList signals={WITH.signals} appear={signalAppear(t)} />
        </Panel>
      </div>
    </Backdrop>
  )
}

export function Decide({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const end = vo + spec.voDur
  const t = s >= end - 0.1 ? 33 : 32
  const view = { ...sessionView(32), cursor: { ...cursorAt(tw(s, 0.1, 1.8, 32, 36)), o: 1 - tw(s, 1.6, 2.1) } }
  const swap = tw(s, vo + 2.3, vo + 2.8)
  const vignette = tw(s, 0.2, 1.2) * (1 - tw(s, end, end + 0.6))
  return (
    <Backdrop>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(closest-side at 50% 50%, transparent 55%, rgba(0,0,0,0.55))', opacity: vignette }} />
      <LeftColumn>
        <Eyebrow s={s} at={0.2}>
          Decide
        </Eyebrow>
        <Headlines
          s={s}
          items={[
            { at: 0.3, out: vo + 7.1, text: 'She’s about to leave.' },
            { at: vo + 7.3, text: 'Decided in 41 milliseconds.' },
          ]}
        />
      </LeftColumn>
      <ClockAt
        seconds={t}
        note={
          <Fade s={s} at={0.5} style={{ fontFamily: font, fontSize: 26, fontWeight: 700, color: C.amber, marginTop: 14 }}>
            Exit intent detected
          </Fade>
        }
      />
      <Phone x={L.phoneX} y={L.phoneY}>
        <StoreScreen v={view} />
      </Phone>
      <Panel
        x={L.panelX}
        y={L.panelY}
        w={L.panelW}
        h={L.panelH}
        identity="anon_7f3d"
        risk={lookup(32, WITH.tracks.exitRisk.at, WITH.tracks.exitRisk.value)}
        intent={lookup(32, WITH.tracks.intent.at, WITH.tracks.intent.value)}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <Lower opacity={1 - swap}>
            <SignalList signals={WITH.signals} appear={signalAppear(32)} highlight="exit" />
          </Lower>
          <Lower opacity={swap}>
            <DecisionCard
              options={WITH.decision!.options}
              bars={tw(s, vo + 2.6, vo + 5.2)}
              chosen={tw(s, vo + 7.5, vo + 7.9)}
              ms={tw(s, vo + 2.6, vo + 7.7, 0, WITH.decision!.latencyMs, ease.linear)}
            />
          </Lower>
        </div>
      </Panel>
    </Backdrop>
  )
}

export function Deliver({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const t = tw(s, vo + 0.3, vo + 5.4, 33, 38, ease.linear)
  const email = 'sarah.k@gmail.com'
  const typed = Math.floor(tw(s, vo + 3.1, vo + 4.7, 0, email.length, ease.linear))
  const known = tw(s, vo + 5.2, vo + 5.7)
  const view: StoreView = {
    ...sessionView(32),
    shippingWarn: 0,
    cursor: undefined,
    sheet: tw(s, vo + 0.1, vo + 0.8, 0, 1, ease.outQuint),
    email: email.slice(0, typed),
    caret: s > vo + 2.9 && s < vo + 5.0 && Math.floor(s * 2.5) % 2 === 0,
    applied: s >= vo + 5.0 ? 1 : 0,
  }
  const swap = tw(s, vo + 4.9, vo + 5.4)
  const rows = ['6 page views', `$${STORY.product.price} cart`, 'Source · Instagram ad']
  return (
    <Backdrop>
      <LeftColumn>
        <Eyebrow s={s} at={0.2}>
          Deliver & capture
        </Eyebrow>
        <Headlines
          s={s}
          items={[
            { at: 0.3, out: vo + 4.6, text: 'One offer, in the same session.' },
            { at: vo + 4.8, text: 'Then she tells you who she is.' },
          ]}
        />
      </LeftColumn>
      <ClockAt seconds={t} />
      <Phone x={L.phoneX} y={L.phoneY}>
        <StoreScreen v={view} />
      </Phone>
      <Panel
        x={L.panelX}
        y={L.panelY}
        w={L.panelW}
        h={L.panelH}
        identity={known > 0.5 ? email : 'anon_7f3d'}
        known={known}
        risk={lookup(t, WITH.tracks.exitRisk.at, WITH.tracks.exitRisk.value)}
        intent={lookup(t, WITH.tracks.intent.at, WITH.tracks.intent.value)}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <Lower opacity={1 - swap}>
            <DecisionCard options={WITH.decision!.options} bars={1} chosen={1} ms={WITH.decision!.latencyMs} />
          </Lower>
          <Lower opacity={swap}>
            <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, letterSpacing: '0.18em', color: C.muted, marginBottom: 16 }}>PROFILE STITCHED</div>
            {rows.map((row, i) => {
              const p = tw(s, vo + 5.6 + i * 0.4, vo + 6.0 + i * 0.4, 0, 1, ease.outQuint)
              return (
                <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: font, fontSize: 26, color: C.text, padding: '12px 0', borderBottom: `1px solid ${C.line}`, opacity: p, transform: `translateX(${(1 - p) * -20}px)` }}>
                  <Check size={26} color={C.successSoft} /> {row}
                </div>
              )
            })}
            <div
              style={{
                marginTop: 26,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '20px 24px',
                borderRadius: 20,
                background: 'rgba(26,92,64,0.35)',
                fontFamily: font,
                fontSize: 27,
                fontWeight: 700,
                color: C.successSoft,
                opacity: tw(s, vo + 7.4, vo + 7.9),
              }}
            >
              <ArrowRight size={28} /> Synced to your email tools
            </div>
          </Lower>
        </div>
      </Panel>
    </Backdrop>
  )
}

export function Convert({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const t = tw(s, 0, 1.5, 38, 47, ease.inOut)
  const amount = tw(s, 0.9, 2.4, 0, STORY.captured, ease.out)
  const view: StoreView = {
    ...VIEW,
    browse: 0,
    product: 1 - tw(s, 0.3, 0.8),
    added: 1,
    cart: 1,
    drawer: 1 - tw(s, 0, 0.45),
    sheet: 1 - tw(s, 0, 0.45),
    email: 'sarah.k@gmail.com',
    applied: 1,
    confirmed: tw(s, 0.45, 1.0),
  }
  return (
    <Backdrop glow={{ x: 78, y: 45 }}>
      <LeftColumn>
        <Eyebrow s={s} at={0.1}>
          Convert
        </Eyebrow>
        <Headlines s={s} items={[{ at: vo, text: 'Order placed at 0:47.' }]} />
      </LeftColumn>
      <ClockAt seconds={t} total={47} />
      <Phone x={L.phoneX} y={L.phoneY}>
        <StoreScreen v={view} />
      </Phone>
      <Abs x={L.panelX + 20} y={330} w={680}>
        <Fade s={s} at={0.7} style={{ fontFamily: font, fontSize: 21, fontWeight: 700, letterSpacing: '0.2em', color: C.muted }}>
          CAPTURED THIS SESSION
        </Fade>
        <div
          style={{
            fontFamily: font,
            fontSize: 168,
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 1.05,
            fontVariantNumeric: 'tabular-nums',
            color: C.copper,
            opacity: tw(s, 0.8, 1.1),
            textShadow: '0 0 60px rgba(224,154,104,0.25)',
          }}
        >
          +${amount.toFixed(2)}
        </div>
        <Fade s={s} at={1.8} style={{ fontFamily: font, fontSize: 34, fontWeight: 600, color: C.soft, marginTop: 14 }}>
          Anonymous → known → customer
        </Fade>
        <Fade s={s} at={2.2} style={{ fontFamily: font, fontSize: 34, fontWeight: 700, color: C.text, marginTop: 4 }}>
          in 47 seconds.
        </Fade>
      </Abs>
    </Backdrop>
  )
}

export function Without({ s, spec }: SceneProps) {
  const vo = spec.voAt
  const rewind = tw(s, 0.05, 0.9, 0, 1, ease.inOut)
  const t = s < 0.9 ? 47 - rewind * 31 : tw(s, vo + 0.2, vo + 3.4, 16, 41, ease.linear)
  const desat = tw(s, 0.1, 0.8)
  const cursorT = Math.min(t, 40)
  const view: StoreView = {
    ...sessionView(Math.max(16, Math.min(t, 32))),
    cursor: { ...cursorAt(cursorT), o: 1 - tw(t, 39.5, 40.5) },
    closed: tw(t, 40.6, 41),
    desaturate: desat * 0.85,
  }
  const outcome = tw(s, vo + 3.6, vo + 4.0)
  const lines = [
    { at: vo + 3.9, text: 'No sale.' },
    { at: vo + 4.6, text: 'No email.' },
    { at: vo + 5.3, text: 'No way back.' },
  ]
  return (
    <Backdrop glow={{ x: 60, y: 40 }}>
      <LeftColumn>
        <Fade s={s} at={0.1} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: font, fontSize: 20, fontWeight: 700, letterSpacing: '0.2em', color: C.amber }}>
          <Rewind size={24} /> WITHOUT CONVERTIVE
        </Fade>
        <Headlines s={s} items={[{ at: vo, text: 'Same visit. Nobody listening.' }]} />
      </LeftColumn>
      <ClockAt seconds={t} color={s < 0.9 ? C.amber : C.text} />
      <Phone x={L.phoneX} y={L.phoneY}>
        <StoreScreen v={view} />
      </Phone>
      <Panel
        x={L.panelX}
        y={L.panelY}
        w={L.panelW}
        h={L.panelH}
        live={false}
        identity="no profile"
        risk={lookup(Math.max(t, 16), WITHOUT.tracks.exitRisk.at, WITHOUT.tracks.exitRisk.value)}
        intent={lookup(Math.max(t, 16), WITHOUT.tracks.intent.at, WITHOUT.tracks.intent.value)}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <Lower opacity={(1 - outcome) * 0.6}>
            <SignalList signals={WITHOUT.signals.filter((sig) => sig.id !== 'ended')} appear={signalAppear(Math.max(t, 16))} />
            <div style={{ fontFamily: font, fontSize: 22, color: C.soft, marginTop: 14 }}>Nothing is reading these signals.</div>
          </Lower>
          <Lower opacity={outcome}>
            <div style={{ fontFamily: font, fontSize: 150, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: C.muted }}>$0</div>
            <div style={{ marginTop: 26 }}>
              {lines.map((line) => {
                const p = tw(s, line.at, line.at + 0.45, 0, 1, ease.outQuint)
                return (
                  <div key={line.text} style={{ fontFamily: font, fontSize: 52, fontWeight: 700, letterSpacing: '-0.02em', color: C.text, opacity: p, transform: `translateY(${(1 - p) * 20}px)`, lineHeight: 1.25 }}>
                    {line.text}
                  </div>
                )
              })}
            </div>
          </Lower>
        </div>
      </Panel>
    </Backdrop>
  )
}
