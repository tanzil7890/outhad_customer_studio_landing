import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, Pause } from 'lucide-react'
import { STORY, formatClock } from '../../../lib/landing/story'
import { FPS, clamp, ease, spring, tw } from '../anim'
import { Headline } from '../components/Text'
import { C, H, W, font, mono } from '../theme'
import { CURSOR_PATH, Crowd, SessionGrid } from './Canvas'
import { BrowserWindow, CollectionPage, ConfirmationPage, ProductPage } from './Pages'
import { T, VO } from './timeline'
import { MAP, ORIGIN, PINS, camAt, camSpeed, cursorWorld, exitRiskAt, intentAt, project, storyAt, type Cam } from './world'

const EMAIL = 'sarah.k@gmail.com'
const OPTIONS = STORY.timelines.with.decision!.options

export function GhostFilm({ frame }: { frame: number }) {
  const t = frame / FPS
  const story = storyAt(t)
  const cam = camAt(t)
  const frozen = tw(t, T.freeze, T.freeze + 0.12) * (1 - tw(t, T.unfreeze, T.unfreeze + 0.35))
  const worldOn = tw(t, T.dive, T.dive + 0.7)
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: C.night, fontFamily: font }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1500px 900px at 50% 40%, #2b211b 0%, #1A1410 60%, #120d0a 100%)' }} />
      {t < T.dive + 1.2 && (
        <div style={{ opacity: 1 - tw(t, T.dive - 0.2, T.dive + 0.6) }}>
          <Crowd t={t} />
        </div>
      )}
      {worldOn > 0 && t < T.end + 0.8 && <World t={t} cam={cam} story={story} frozen={frozen} opacity={worldOn} />}
      <SessionGrid t={t} cam={cam} />
      {worldOn > 0 && t < T.whip + 0.4 && <Pins t={t} cam={cam} story={story} frozen={frozen} />}
      <Protagonist t={t} cam={cam} story={story} />
      <FreezeLayer t={t} cam={cam} />
      <Hud t={t} story={story} frozen={frozen} />
      <BottomShade t={t} />
      <Words t={t} />
      <Money t={t} />
      <EndCard t={t} />
      <Vignette />
      <div style={{ position: 'absolute', inset: 0, background: C.night, opacity: 1 - tw(t, 0, 0.6), pointerEvents: 'none' }} />
    </div>
  )
}

// ── World: the store as a map the camera travels ───────────────────────────

function World({ t, cam, story, frozen, opacity }: { t: number; cam: Cam; story: number; frozen: number; opacity: number }) {
  const blur = Math.min(9, Math.max(0, camSpeed(t) * 0.0028 - 1.2))
  const st = {
    added: story >= 15,
    drawer: tw(story, 23, 24.5),
    shippingWarn: tw(story, 26.5, 27.2),
    modal: tw(t, T.unfreeze + 0.15, T.unfreeze + 0.7, 0, 1, ease.outQuint),
    email: EMAIL.slice(0, Math.floor(tw(t, T.typing, T.typing + 1.0, 0, EMAIL.length, ease.linear))),
    caret: t > T.typing - 0.2 && t < T.named && Math.floor(t * 2.5) % 2 === 0,
    applied: t >= T.named + 0.3,
  }
  const hover = story < 2.5 ? -1 : story < 5 ? 0 : story < 7.5 ? 1 : story < 10.6 ? 0 : -1
  const trail: string[] = []
  for (let s = 0; s <= story; s += 0.12) trail.push(cursorWorld(s).join(','))
  trail.push(cursorWorld(story).join(','))
  const gridFade = clamp((cam.s - 0.45) / 0.4)
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        filter: `grayscale(${frozen}) brightness(${1 - 0.65 * frozen})${blur > 0.2 ? ` blur(${blur.toFixed(1)}px)` : ''}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transformOrigin: '0 0',
          transform: `translate(${W / 2 - cam.x * cam.s}px, ${H / 2 - cam.y * cam.s}px) scale(${cam.s})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -3000,
            top: -2400,
            width: 10400,
            height: 6000,
            opacity: gridFade,
            backgroundImage: 'radial-gradient(circle, rgba(245,240,235,0.10) 2px, transparent 2.5px)',
            backgroundSize: '56px 56px',
          }}
        />
        <BrowserWindow x={ORIGIN.coll.x} y={ORIGIN.coll.y} cart={0}>
          <CollectionPage hover={hover} />
        </BrowserWindow>
        <BrowserWindow x={ORIGIN.prod.x} y={ORIGIN.prod.y} cart={st.added ? 1 : 0} closeHot={tw(story, 29.5, 31.5)}>
          <ProductPage st={st} />
        </BrowserWindow>
        <BrowserWindow x={ORIGIN.conf.x} y={ORIGIN.conf.y} cart={0}>
          <ConfirmationPage />
        </BrowserWindow>
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={MAP.w} height={MAP.h}>
          <polyline points={trail.join(' ')} fill="none" stroke="rgba(245,240,235,0.10)" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <polyline points={trail.join(' ')} fill="none" stroke="rgba(245,240,235,0.75)" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  )
}

function Pins({ t, cam, story, frozen }: { t: number; cam: Cam; story: number; frozen: number }) {
  const fadeAll = 1 - tw(t, T.freeze + 0.1, T.freeze + 0.5)
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: fadeAll, filter: `grayscale(${frozen})` }}>
      {PINS.map((pin) => {
        const p = clamp((story - pin.at) / 1.0)
        if (p <= 0) return null
        const [ax, ay] = project(cam, ...cursorWorld(pin.at))
        const k = ease.outQuint(p)
        const lx = ax + pin.dx * k
        const ly = ay + pin.dy * k
        return (
          <div key={pin.text} style={{ position: 'absolute', inset: 0, opacity: k }}>
            <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
              <line x1={ax} y1={ay} x2={lx} y2={ly} stroke="rgba(245,240,235,0.45)" strokeWidth={1.5} />
              <circle cx={ax} cy={ay} r={6} fill={pin.warn ? C.amber : C.text} />
            </svg>
            <div
              style={{
                position: 'absolute',
                left: lx,
                top: ly,
                transform: `translate(${pin.dx < 0 ? '-100%' : '0'}, -50%)`,
                whiteSpace: 'nowrap',
                padding: '10px 18px',
                borderRadius: 14,
                background: 'rgba(36,28,23,0.94)',
                boxShadow: `0 0 0 1.5px ${pin.warn ? 'rgba(240,204,136,0.55)' : C.line}, 0 16px 30px -12px rgba(0,0,0,0.6)`,
                fontSize: 26,
                fontWeight: 650,
                color: pin.warn ? C.amber : C.text,
              }}
            >
              {pin.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── The protagonist cursor, with a multiplayer-style name tag ──────────────

function Protagonist({ t, cam, story }: { t: number; cam: Cam; story: number }) {
  const drift: [number, number] = [960 + Math.sin(t * 0.9) * 10, 700 + Math.cos(t * 0.7) * 8]
  const world = project(cam, ...cursorWorld(story))
  const blend = ease.inOut(tw(t, T.dive - 0.3, T.dive + 0.5))
  const x = drift[0] + (world[0] - drift[0]) * blend
  const y = drift[1] + (world[1] - drift[1]) * blend
  const appear = tw(t, T.single, T.single + 0.8)
  const gone = tw(t, T.zoomOut + 0.2, T.zoomOut + 0.8)
  const named = tw(t, T.named, T.named + 0.4)
  const ghost = 1 - named
  const scale = 1.9 * (1 - gone * 0.6)
  const alpha = appear * (1 - gone)
  if (alpha <= 0) return null
  const tagOn = tw(t, T.tag, T.tag + 0.4)
  const ringOn = tw(t, T.read, T.read + 0.6) * (1 - tw(t, T.unfreeze, T.unfreeze + 0.4))
  const intent = intentAt(story)
  const clicks = [10.5, 15, 38].map((c) => clamp((story - c) / 1.2))
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: alpha }}>
      {/* Highlight that singles her out from the crowd */}
      <div
        style={{
          position: 'absolute',
          left: -60,
          top: -60,
          width: 140,
          height: 140,
          borderRadius: 70,
          border: '2px solid rgba(245,240,235,0.5)',
          opacity: tw(t, T.tag - 0.3, T.tag + 0.2) * (1 - tw(t, T.dive, T.dive + 0.6)),
          transform: `scale(${0.8 + 0.2 * spring(t, T.tag - 0.3)})`,
        }}
      />
      {clicks.map((c, i) =>
        c > 0 && c < 1 ? (
          <div key={i} style={{ position: 'absolute', left: -30 * (1 + c * 2), top: -30 * (1 + c * 2), width: 60 * (1 + c * 2), height: 60 * (1 + c * 2), borderRadius: '50%', border: `3px solid rgba(245,240,235,${0.7 * (1 - c)})` }} />
        ) : null,
      )}
      {ringOn > 0 && (
        <svg width={120} height={120} style={{ position: 'absolute', left: -48, top: -48, opacity: ringOn }}>
          <circle cx={60} cy={60} r={46} fill="none" stroke="rgba(245,240,235,0.15)" strokeWidth={4} />
          <circle cx={60} cy={60} r={46} fill="none" stroke={C.text} strokeWidth={4} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 46 * intent} 999`} transform="rotate(-90 60 60)" />
        </svg>
      )}
      <svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24" style={{ position: 'absolute', left: -4 * scale, top: -2 * scale, overflow: 'visible', filter: `drop-shadow(0 0 ${10 + ghost * 14}px rgba(245,240,235,${0.25 + ghost * 0.35}))` }}>
        <path d={CURSOR_PATH} fill={`rgba(245,240,235,${0.42 + 0.58 * named})`} stroke={`rgba(26,20,16,${0.5 + 0.5 * named})`} strokeWidth={1.3} strokeLinejoin="round" />
      </svg>
      {tagOn > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            whiteSpace: 'nowrap',
            padding: '9px 16px',
            borderRadius: 12,
            fontFamily: named > 0.5 ? font : mono,
            fontSize: 24,
            fontWeight: 700,
            color: named > 0.5 ? '#0f2a1f' : C.text,
            background: named > 0.5 ? C.successSoft : 'rgba(45,36,32,0.95)',
            boxShadow: named > 0.5 ? '0 0 0 6px rgba(168,223,200,0.18)' : `0 0 0 1.5px ${C.line}`,
            opacity: tagOn,
            transform: `scale(${1 + Math.sin(Math.PI * clamp((t - T.named) / 0.4)) * 0.12})`,
            transformOrigin: 'left center',
          }}
        >
          {named > 0.5 ? STORY.persona : 'anon_7f3d'}
          {named <= 0.5 && ringOn > 0.5 && <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: C.soft }}>intent {intent.toFixed(2)}</span>}
        </div>
      )}
    </div>
  )
}

// ── Freeze: time stops, three futures, one choice ──────────────────────────

function FreezeLayer({ t, cam }: { t: number; cam: Cam }) {
  if (t < T.freeze - 0.05 || t > T.unfreeze + 1.0) return null
  const [cx, cy] = project(cam, ...cursorWorld(32))
  const ripple = clamp((t - T.freeze) / 0.9)
  const msValue = Math.floor(tw(t, T.ms, T.select - 0.05, 0, STORY.timelines.with.decision!.latencyMs, ease.linear))
  const chosenOn = tw(t, T.select, T.select + 0.3)
  const leave = tw(t, T.unfreeze, T.unfreeze + 0.55, 0, 1, ease.inOut)
  const msOn = tw(t, T.ms - 0.3, T.ms + 0.2) * (1 - tw(t, T.unfreeze, T.unfreeze + 0.3))
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {ripple > 0 && ripple < 1 && (
        <div style={{ position: 'absolute', left: cx - 900 * ripple, top: cy - 900 * ripple, width: 1800 * ripple, height: 1800 * ripple, borderRadius: '50%', border: `3px solid rgba(245,240,235,${0.6 * (1 - ripple)})` }} />
      )}
      {/* The decision clock */}
      <div style={{ position: 'absolute', left: 104, top: 300, opacity: msOn, display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <span
          style={{
            fontSize: 300,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.06em',
            fontVariantNumeric: 'tabular-nums',
            color: msValue >= 41 ? C.text : 'rgba(245,240,235,0.12)',
            WebkitTextStroke: `2px rgba(245,240,235,0.7)`,
          }}
        >
          {String(msValue).padStart(2, '0')}
        </span>
        <span style={{ fontSize: 64, fontWeight: 700, color: C.soft }}>ms</span>
      </div>
      {/* Beam to the winning future */}
      {chosenOn > 0 && leave < 1 && (
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0, opacity: 1 - leave }}>
          <line x1={cx + 20} y1={cy + 20} x2={cx + 330} y2={cy - 175} stroke={C.text} strokeWidth={3} strokeDasharray={`${420 * chosenOn} 999`} style={{ filter: 'drop-shadow(0 0 8px rgba(245,240,235,0.8))' }} />
        </svg>
      )}
      {OPTIONS.map((option, i) => {
        const appear = spring(t, T.futures + i * 0.22, { stiffness: 120, damping: 15 })
        const bars = tw(t, T.ms - 0.4 + i * 0.2, T.ms + 2.2 + i * 0.2)
        const chosen = !!option.chosen
        const dim = chosenOn * (chosen ? 0 : 1)
        // At unfreeze the winner flies to where the on-page offer appears; the rest dissolve.
        const fx = chosen ? (W / 2 - 230 - (cx + 330)) * leave : 0
        const fy = chosen ? (H / 2 - 120 - (cy - 250 + i * 190)) * leave : 0
        const fade = chosen ? 1 - tw(t, T.unfreeze + 0.35, T.unfreeze + 0.65) : 1 - leave
        return (
          <div
            key={option.action}
            style={{
              position: 'absolute',
              left: cx + 330,
              top: cy - 250 + i * 190,
              width: 470,
              padding: '22px 26px',
              borderRadius: 22,
              background: 'rgba(36,28,23,0.96)',
              boxShadow: chosen && chosenOn > 0 ? `0 0 0 2px ${C.text}, 0 0 50px rgba(245,240,235,${0.25 * chosenOn})` : `0 0 0 1.5px ${C.line}`,
              opacity: Math.min(1, appear) * (1 - dim * 0.7) * fade,
              transform: `translate(${fx + (1 - appear) * -60}px, ${fy}px) rotate(${(i - 1) * 2 * (1 - leave)}deg) scale(${(chosen ? 1 + 0.05 * chosenOn : 1) * (0.9 + 0.1 * appear)})`,
              filter: dim > 0 ? `blur(${dim * 2}px)` : undefined,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.18em', color: C.muted }}>POSSIBLE NEXT MOVE · 0{i + 1}</div>
            <div style={{ fontSize: 34, fontWeight: 750, color: C.text, marginTop: 8, letterSpacing: '-0.02em' }}>{option.action}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
              <div style={{ flex: 1, height: 10, borderRadius: 5, background: C.line, overflow: 'hidden' }}>
                <div style={{ width: `${option.score * bars * 100}%`, height: '100%', background: chosen ? C.text : C.muted, borderRadius: 5 }} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color: C.soft }}>{(option.score * bars).toFixed(2)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── HUD ─────────────────────────────────────────────────────────────────────

function Hud({ t, story, frozen }: { t: number; story: number; frozen: number }) {
  const on = tw(t, T.read, T.read + 0.6) * (1 - tw(t, T.whip + 0.9, T.whip + 1.3))
  if (on <= 0) return null
  const risk = exitRiskAt(story)
  const hot = risk > 0.6
  const label = (text: string, color: string = C.muted) => (
    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.2em', color }}>{text}</div>
  )
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: on }}>
      <div style={{ position: 'absolute', left: 84, top: 48, padding: '14px 22px', borderRadius: 18, background: 'rgba(18,13,10,0.82)', boxShadow: `0 0 0 1px ${C.line}` }}>
        {frozen > 0.5 ? (
          label('CLOCK STOPPED', C.amber)
        ) : (
          label('SESSION')
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6, fontSize: 52, fontWeight: 750, fontVariantNumeric: 'tabular-nums', color: frozen > 0.5 ? C.amber : C.text }}>
          {formatClock(story)}
          {frozen > 0.5 && <Pause size={34} fill={C.amber} />}
        </div>
      </div>
      <div style={{ position: 'absolute', right: 84, top: 48, padding: '14px 22px', borderRadius: 18, background: 'rgba(18,13,10,0.82)', boxShadow: `0 0 0 1px ${C.line}`, textAlign: 'right', opacity: 1 - tw(t, T.unfreeze + 0.6, T.unfreeze + 1.2) }}>
        {label('EXIT RISK', hot ? C.amber : C.muted)}
        <div style={{ marginTop: 6, fontSize: 52, fontWeight: 750, fontVariantNumeric: 'tabular-nums', color: hot ? C.amber : C.text }}>{Math.round(risk * 100)}%</div>
      </div>
    </div>
  )
}

// ── Words ───────────────────────────────────────────────────────────────────

function BottomShade({ t }: { t: number }) {
  const on = tw(t, T.read - 0.2, T.read + 0.4) * (1 - tw(t, T.whip, T.whip + 0.4))
  if (on <= 0) return null
  return <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 420, opacity: on, background: 'linear-gradient(to top, rgba(18,13,10,0.92), rgba(18,13,10,0))' }} />
}

/** Captions shown one at a time: each leaves (0.45s exit) before the next arrives. */
function CaptionSequence({ t, items, end }: { t: number; items: { at: number; text: string; size?: number }[]; end: number }) {
  return (
    <>
      {items.map((item, i) => (
        <Caption key={item.text} t={t} at={item.at} out={(i < items.length - 1 ? items[i + 1].at : end + 0.45) - 0.45} text={item.text} size={item.size} />
      ))}
    </>
  )
}

function Caption({ t, at, out, text, size = 76, style }: { t: number; at: number; out: number; text: string; size?: number; style?: CSSProperties }) {
  if (t < at - 0.1 || t > out + 0.6) return null
  return <Headline s={t} at={at} out={out} text={text} size={size} weight={750} style={{ position: 'absolute', left: 104, bottom: 96, width: 1200, ...style }} />
}

function Centered({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...style }}>{children}</div>
}

function Words({ t }: { t: number }) {
  const r = VO.read
  const readDur = r.end - r.at
  return (
    <>
      {/* Hook */}
      {t < VO.ghosts.at + 0.6 && (
        <Centered style={{ top: 170 }}>
          <Headline s={t} at={VO.hook.at - 0.1} out={VO.ghosts.at - 0.25} text="Every day, thousands of shoppers" size={104} weight={300} align="center" style={{ width: 1700 }} />
          <Headline s={t} at={VO.hook.at + 1.3} out={VO.ghosts.at - 0.25} text="walk through your store." size={104} weight={800} align="center" style={{ width: 1700 }} />
        </Centered>
      )}
      {/* Ghosts */}
      {t > VO.ghosts.at - 0.3 && t < VO.follow.at + 0.4 && (
        <Centered style={{ top: 170 }}>
          <div style={{ display: 'flex', gap: 30, alignItems: 'baseline' }}>
            <Headline s={t} at={VO.ghosts.at} out={VO.follow.at - 0.35} text="97 of 100" size={132} weight={800} />
            <Headline s={t} at={VO.ghosts.at + 0.5} out={VO.follow.at - 0.35} text="leave like ghosts." size={132} weight={300} />
          </div>
          <Headline s={t} at={T.noName} out={VO.follow.at - 0.35} text="No name. No trace." size={52} weight={600} color={C.soft} align="center" style={{ marginTop: 24 }} />
        </Centered>
      )}
      {/* Follow one */}
      {t > VO.follow.at - 0.3 && t < T.read + 0.6 && (
        <Centered style={{ top: 250 }}>
          <Headline s={t} at={VO.follow.at - 0.15} out={T.dive - 0.05} text="Follow one." size={150} weight={800} align="center" />
        </Centered>
      )}
      <CaptionSequence
        t={t}
        items={[
          { at: r.at + 0.1, text: 'Convertive reads every move.' },
          { at: r.at + readDur * 0.47, text: 'Where she came from.' },
          { at: r.at + readDur * 0.64, text: 'What she wants.' },
          { at: r.at + readDur * 0.78, text: 'When she starts to hesitate.' },
          { at: VO.leave.at, text: 'She’s about to leave.' },
        ]}
        end={T.freeze - 0.15}
      />
      <CaptionSequence
        t={t}
        items={[
          { at: VO.freeze.at, text: 'Convertive stops the clock.' },
          { at: VO.freeze.at + 2.4, text: 'It weighs every next move.' },
          { at: T.select, text: 'And picks the one most likely to work.', size: 64 },
        ]}
        end={T.unfreeze - 0.3}
      />
      <CaptionSequence
        t={t}
        items={[
          { at: VO.name.at, text: 'One offer. One email.' },
          { at: VO.name.at + 1.45, text: 'The ghost has a name.', size: 92 },
        ]}
        end={T.whip - 0.3}
      />
      {/* Scale */}
      {t > T.grid - 0.2 && t < T.end + 0.6 && (
        <Centered style={{ top: 360 }}>
          <div style={{ position: 'absolute', top: -140, width: 1500, height: 520, background: 'radial-gradient(closest-side, rgba(18,13,10,0.92), rgba(18,13,10,0))', opacity: tw(t, T.grid - 0.2, T.grid + 0.3) * (1 - tw(t, T.end - 0.2, T.end + 0.3)) }} />
          <Headline s={t} at={VO.scale.at + 0.9} out={T.end - 0.2} text="Every visitor." size={128} weight={800} align="center" style={{ position: 'relative' }} />
          <Headline s={t} at={VO.scale.at + 1.8} out={T.end - 0.2} text="Every session." size={128} weight={300} align="center" style={{ position: 'relative' }} />
        </Centered>
      )}
    </>
  )
}

function Money({ t }: { t: number }) {
  const on = tw(t, T.money - 0.1, T.money + 0.3) * (1 - tw(t, T.zoomOut - 0.2, T.zoomOut + 0.4))
  if (on <= 0) return null
  const amount = tw(t, T.money, T.money + 1.0, 0, STORY.captured, ease.out)
  const pop = spring(t, T.money, { stiffness: 160, damping: 13 })
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: on }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,13,10,0.985)' }} />
      <Centered style={{ top: 300 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.24em', color: C.soft }}>ORDER PLACED · {formatClock(47)}</div>
        <div
          style={{
            fontSize: 300,
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1.05,
            fontVariantNumeric: 'tabular-nums',
            color: C.copper,
            textShadow: '0 0 80px rgba(224,154,104,0.35)',
            transform: `scale(${0.85 + 0.15 * pop})`,
          }}
        >
          +${amount.toFixed(2)}
        </div>
        <div style={{ fontSize: 36, fontWeight: 600, color: C.text, opacity: tw(t, T.money + 0.8, T.money + 1.2) }}>From a visitor who had no name 47 seconds ago.</div>
      </Centered>
    </div>
  )
}

function EndCard({ t }: { t: number }) {
  const on = tw(t, T.end, T.end + 0.6)
  if (on <= 0) return null
  const logo = spring(t, T.end + 0.2, { stiffness: 120, damping: 14 })
  const lift = (at: number) => {
    const p = tw(t, at, at + 0.7, 0, 1, ease.outQuint)
    return { opacity: p, transform: `translateY(${(1 - p) * 22}px)` }
  }
  return (
    <div style={{ position: 'absolute', inset: 0, background: `rgba(26,20,16,${on})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src="logo-mark.png" alt="" style={{ width: 128, opacity: Math.min(1, logo * 1.4), transform: `scale(${0.6 + 0.4 * logo})` }} />
      <div style={{ marginTop: 30, fontSize: 64, fontWeight: 800, letterSpacing: '0.14em', color: C.text, ...lift(T.end + 0.45) }}>CONVERTIVE</div>
      <Headline s={t} at={VO.end.at + 1.0} text="Convert anonymous visitors before they leave." size={62} weight={600} align="center" style={{ marginTop: 40, width: 1500, color: C.soft }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 54, ...lift(VO.end.at + 2.2) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 84, padding: '0 40px', borderRadius: 42, background: C.text, color: C.night, fontSize: 32, fontWeight: 750 }}>
          Book a demo <ArrowRight size={32} />
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, color: C.soft }}>tryconvertive.com</div>
      </div>
    </div>
  )
}

function Vignette() {
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(closest-side at 50% 50%, transparent 62%, rgba(8,6,4,0.55) 100%)' }} />
}

