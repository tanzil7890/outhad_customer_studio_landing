import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { FPS } from './anim'
import { makeCues, toVtt, type Cue } from './captions'
import { Film, SubtitleOverlay } from './Film'
import { GhostFilm } from './ghost/GhostFilm'
import { BEATS, T as GHOST_T, TOTAL_FRAMES as GHOST_TOTAL, VO as GHOST_VO } from './ghost/timeline'
import { H, W, font } from './theme'
import { SCENES, TOTAL_FRAMES } from './timeline'

interface FilmDef {
  total: number
  scenes: { id: string; start: number; dur: number; voAt: number; voDur: number }[]
  cues: Cue[]
  /** Burned-in subtitles by default? */
  subtitles: boolean
  /** Timing data for the score generator (films with music only). */
  score?: unknown
  previewAudio: string
  render: (frame: number, subtitles: boolean) => ReactNode
}

const ghostCues = makeCues(BEATS)

const FILMS: Record<string, FilmDef> = {
  'forty-seven': {
    total: TOTAL_FRAMES,
    scenes: SCENES,
    cues: makeCues(SCENES),
    subtitles: true,
    previewAudio: 'vo-mix.wav',
    render: (frame, subtitles) => <Film frame={frame} subtitles={subtitles} />,
  },
  ghost: {
    total: GHOST_TOTAL,
    scenes: BEATS,
    cues: ghostCues,
    subtitles: false,
    score: { T: GHOST_T, VO: GHOST_VO },
    previewAudio: 'ghost-mix.wav',
    render: (frame, subtitles) => (
      <div style={{ position: 'relative', width: W, height: H }}>
        <GhostFilm frame={frame} />
        {subtitles && <SubtitleOverlay seconds={frame / FPS} cues={ghostCues} />}
      </div>
    ),
  },
}

declare global {
  interface Window {
    FILM: { id: string; fps: number; total: number; scenes: FilmDef['scenes']; vtt: string; subtitles: boolean; score?: unknown }
    renderFrame: (frame: number, opts?: { subtitles?: boolean }) => void
  }
}

const params = new URLSearchParams(location.search)
const renderMode = params.has('render')
const filmId = params.get('film') ?? 'forty-seven'
const film = FILMS[filmId]
if (!film) throw new Error(`Unknown film "${filmId}"`)
const root = createRoot(document.getElementById('root')!)

window.FILM = { id: filmId, fps: FPS, total: film.total, scenes: film.scenes, vtt: toVtt(film.cues), subtitles: film.subtitles, score: film.score }

if (renderMode) {
  // Headless capture: the renderer calls this once per frame, then screenshots.
  window.renderFrame = (frame, opts = {}) => {
    flushSync(() => root.render(<>{film.render(frame, opts.subtitles ?? film.subtitles)}</>))
  }
  window.renderFrame(0)
} else {
  root.render(<Preview />)
}

/** Browser preview: play/pause, scrub, jump to scenes. Plays the rendered narration mix if present. */
function Preview() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [subs, setSubs] = useState(film.subtitles)
  const audio = useRef<HTMLAudioElement>(null)
  const startRef = useRef({ wall: 0, frame: 0 })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => setScale(Math.min((window.innerWidth - 40) / W, (window.innerHeight - 140) / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    if (!playing) return
    startRef.current = { wall: performance.now(), frame }
    if (audio.current) {
      audio.current.currentTime = frame / FPS
      audio.current.play().catch(() => {})
    }
    let raf = 0
    const tick = (now: number) => {
      const f = Math.floor(startRef.current.frame + ((now - startRef.current.wall) / 1000) * FPS)
      if (f >= film.total) {
        setPlaying(false)
        setFrame(film.total - 1)
        return
      }
      setFrame(f)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      audio.current?.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  const btn = { fontFamily: font, fontSize: 14, padding: '8px 12px', borderRadius: 8, border: '1px solid #3D3028', background: '#2D2420', color: '#F5F0EB', cursor: 'pointer' }
  return (
    <div style={{ background: '#0d0a08', minHeight: '100vh', padding: 20, color: '#F5F0EB', fontFamily: font }}>
      <audio ref={audio} src={film.previewAudio} preload="auto" />
      <div style={{ width: W * scale, height: H * scale, overflow: 'hidden', borderRadius: 8 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>{film.render(frame, subs)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
        <select style={btn} value={filmId} onChange={(e) => (location.search = `?film=${e.target.value}`)}>
          {Object.keys(FILMS).map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <button style={btn} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <input type="range" min={0} max={film.total - 1} value={frame} onChange={(e) => { setPlaying(false); setFrame(Number(e.target.value)) }} style={{ flex: 1, minWidth: 300 }} />
        <span style={{ fontVariantNumeric: 'tabular-nums', width: 120 }}>{(frame / FPS).toFixed(2)}s / {(film.total / FPS).toFixed(1)}s</span>
        <label style={{ fontSize: 14 }}><input type="checkbox" checked={subs} onChange={(e) => setSubs(e.target.checked)} /> Subtitles</label>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {film.scenes.map((scene) => (
          <button key={scene.id} style={btn} onClick={() => { setPlaying(false); setFrame(scene.start + 12) }}>{scene.id}</button>
        ))}
      </div>
    </div>
  )
}
