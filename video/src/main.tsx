import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { FPS } from './anim'
import { toVtt } from './captions'
import { Film } from './Film'
import { H, W, font } from './theme'
import { SCENES, TOTAL_FRAMES } from './timeline'

declare global {
  interface Window {
    FILM: { fps: number; total: number; scenes: typeof SCENES; vtt: string }
    renderFrame: (frame: number, opts?: { subtitles?: boolean }) => void
  }
}

const params = new URLSearchParams(location.search)
const renderMode = params.has('render')
const root = createRoot(document.getElementById('root')!)

window.FILM = { fps: FPS, total: TOTAL_FRAMES, scenes: SCENES, vtt: toVtt() }

if (renderMode) {
  // Headless capture: the renderer calls this once per frame, then screenshots.
  window.renderFrame = (frame, opts = {}) => {
    flushSync(() => root.render(<Film frame={frame} subtitles={opts.subtitles ?? true} />))
  }
  window.renderFrame(0)
} else {
  root.render(<Preview />)
}

/** Browser preview: play/pause, scrub, jump to scenes. Plays the narration mix if it has been rendered. */
function Preview() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [subs, setSubs] = useState(true)
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
      if (f >= TOTAL_FRAMES) {
        setPlaying(false)
        setFrame(TOTAL_FRAMES - 1)
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
      <audio ref={audio} src="vo-mix.wav" preload="auto" />
      <div style={{ width: W * scale, height: H * scale, overflow: 'hidden', borderRadius: 8 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <Film frame={frame} subtitles={subs} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
        <button style={btn} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <input type="range" min={0} max={TOTAL_FRAMES - 1} value={frame} onChange={(e) => { setPlaying(false); setFrame(Number(e.target.value)) }} style={{ flex: 1, minWidth: 300 }} />
        <span style={{ fontVariantNumeric: 'tabular-nums', width: 120 }}>{(frame / FPS).toFixed(2)}s / {(TOTAL_FRAMES / FPS).toFixed(1)}s</span>
        <label style={{ fontSize: 14 }}><input type="checkbox" checked={subs} onChange={(e) => setSubs(e.target.checked)} /> Subtitles</label>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {SCENES.map((scene) => (
          <button key={scene.id} style={btn} onClick={() => { setPlaying(false); setFrame(scene.start + 12) }}>{scene.id}</button>
        ))}
      </div>
    </div>
  )
}
