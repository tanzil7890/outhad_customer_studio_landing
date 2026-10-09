import type { ComponentType } from 'react'
import { FPS, clamp, tw } from './anim'
import { CUES, type Cue } from './captions'
import { Convert, Decide, Deliver, Detect, Without } from './scenes/Product'
import { End, Platform, Why } from './scenes/Closing'
import { Meet } from './scenes/Meet'
import { Problem } from './scenes/Problem'
import type { SceneProps } from './scenes/shared'
import { C, H, W, font } from './theme'
import { OVERLAP, SCENES, sceneById, type SceneId } from './timeline'

const COMPONENTS: Record<SceneId, ComponentType<SceneProps>> = {
  problem: Problem,
  meet: Meet,
  detect: Detect,
  decide: Decide,
  deliver: Deliver,
  convert: Convert,
  without: Without,
  why: Why,
  platform: Platform,
  end: End,
}

export interface FilmOptions {
  subtitles?: boolean
}

export function Film({ frame, subtitles = true }: { frame: number } & FilmOptions) {
  const seconds = frame / FPS
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: C.night }}>
      {SCENES.map((spec, i) => {
        const local = frame - spec.start
        if (local < 0 || local >= spec.dur) return null
        // Incoming scenes fade in on top of the outgoing one (each scene paints its own backdrop).
        const opacity = i === 0 ? 1 : clamp(local / OVERLAP)
        const Scene = COMPONENTS[spec.id]
        return (
          <div key={spec.id} style={{ position: 'absolute', inset: 0, opacity }}>
            <Scene f={local} s={local / FPS} spec={spec} />
          </div>
        )
      })}
      <IllustrativeTag seconds={seconds} />
      {subtitles && <Subtitle seconds={seconds} />}
      <FadeFromBlack seconds={seconds} />
    </div>
  )
}

// The end card already shows its narration as the on-screen headline.
const endStart = sceneById('end').start / FPS

function Subtitle({ seconds }: { seconds: number }) {
  return <SubtitleOverlay seconds={seconds} cues={CUES.filter((c) => c.start < endStart)} />
}

/** Burned-in subtitle for whichever cue is active. */
export function SubtitleOverlay({ seconds, cues }: { seconds: number; cues: Cue[] }) {
  const cue = cues.find((c) => seconds >= c.start && seconds < c.end)
  if (!cue) return null
  const o = tw(seconds, cue.start, cue.start + 0.15) * (1 - tw(seconds, cue.end - 0.15, cue.end))
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center', opacity: o }}>
      <div
        style={{
          maxWidth: 1500,
          padding: '10px 26px',
          borderRadius: 14,
          background: 'rgba(16,12,9,0.72)',
          fontFamily: font,
          fontSize: 34,
          fontWeight: 600,
          lineHeight: 1.3,
          color: C.text,
          textAlign: 'center',
          letterSpacing: '-0.005em',
        }}
      >
        {cue.text}
      </div>
    </div>
  )
}

function IllustrativeTag({ seconds }: { seconds: number }) {
  const from = sceneById('meet').start / FPS + 0.5
  const to = (sceneById('without').start + sceneById('without').dur) / FPS
  const o = tw(seconds, from, from + 0.6) * (1 - tw(seconds, to - 0.6, to))
  if (o <= 0) return null
  return (
    <div style={{ position: 'absolute', top: 48, right: 120, fontFamily: font, fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: C.muted, opacity: o }}>
      ILLUSTRATIVE SESSION · “SARAH” IS A PERSONA
    </div>
  )
}

function FadeFromBlack({ seconds }: { seconds: number }) {
  const o = 1 - tw(seconds, 0, 0.5)
  if (o <= 0) return null
  return <div style={{ position: 'absolute', inset: 0, background: C.night, opacity: o }} />
}
