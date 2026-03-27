'use client'
import React from 'react'

const images = [
  '/images/agen-studio/studio1.png',
  '/images/agen-studio/studio2.png',
  '/images/agen-studio/studio3.png',
  '/images/agen-studio/studio4.png',
  '/images/agen-studio/studio5.png',
  '/images/agen-studio/studio6.png',
  '/images/agen-studio/studio7.png',
  '/images/agen-studio/studio8.png',
  '/images/agen-studio/studio9.png',
  '/images/agen-studio/studio10.png',
  '/images/agen-studio/studio11.png',
  '/images/agen-studio/studio12.png',
]

export default function AgentStudioSlider() {
  const [index, setIndex] = React.useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-b-none">
        <img
          src={images[index]}
          alt={`Agent Studio screenshot ${index + 1}`}
          className="h-full w-full object-cover transition duration-500"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Controls */}
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--app-background))]/60 text-[hsl(var(--app-text))] backdrop-blur px-2 py-2 border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-background))]/80"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5A1 1 0 1 1 12.707 5.293L8.414 9.586l4.293 4.293a1 1 0 0 1 0 1.414Z"/></svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--app-background))]/60 text-[hsl(var(--app-text))] backdrop-blur px-2 py-2 border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-background))]/80"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.293 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 7.293 14.707L11.586 10 7.293 5.707a1 1 0 0 1 0-1.414Z"/></svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto p-3 border-t border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60">
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`relative h-14 w-24 shrink-0 overflow-hidden rounded border transition ${
              i === index
                ? 'border-[hsl(var(--accent-foreground))] ring-1 ring-[hsl(var(--accent-foreground))]'
                : 'border-[hsl(var(--app-border))] hover:border-[hsl(var(--app-text-muted))]'
            }`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
