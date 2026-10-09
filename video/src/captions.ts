import { FPS } from './anim'
import { SCENES } from './timeline'

export interface Cue {
  /** Global seconds. */
  start: number
  end: number
  text: string
}

const MAX_CHARS = 58

/** Split a narration line into readable cues (sentences, then clauses if long). */
function chunk(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? [text]
  const out: string[] = []
  for (const sentence of sentences) {
    if (sentence.length <= MAX_CHARS) {
      out.push(sentence)
      continue
    }
    let current = ''
    for (const part of sentence.split(/(?<=,|:)\s+/)) {
      if (current && (current + ' ' + part).length > MAX_CHARS) {
        out.push(current)
        current = part
      } else {
        current = current ? `${current} ${part}` : part
      }
    }
    if (current) out.push(current)
  }
  return out
}

/** Cue timing is proportional to characters across each narration line. */
export const CUES: Cue[] = SCENES.flatMap((scene) => {
  const parts = chunk(scene.text)
  const total = parts.reduce((n, p) => n + p.length + 6, 0)
  const voStart = scene.start / FPS + scene.voAt
  let acc = 0
  return parts.map((text, i) => {
    const start = voStart + (acc / total) * scene.voDur
    acc += text.length + 6
    const end = i === parts.length - 1 ? voStart + scene.voDur + 0.25 : voStart + (acc / total) * scene.voDur
    return { start, end, text }
  })
})

const stamp = (sec: number) => {
  const ms = Math.round(sec * 1000)
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`
}

export function toVtt(cues: Cue[] = CUES) {
  return ['WEBVTT', '', ...cues.map((c, i) => `${i + 1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`)].join('\n')
}
