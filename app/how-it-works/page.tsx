'use client'

import { useRef, useState } from 'react'
import Footer from '@/components/footer'

export default function HowItWorksPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMute() {
    if (!videoRef.current) return
    const next = !muted
    videoRef.current.muted = next
    setMuted(next)
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-32 pb-16">

        {/* Heading */}
        <div className="text-center mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))] mb-3">
            Platform Overview
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-title text-[hsl(var(--app-text))] leading-tight">
            How Convertive Works
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[hsl(var(--app-text-muted))] leading-relaxed">
            Real-time AI that detects intent, decides the best action, and converts anonymous visitors before they leave.
          </p>
        </div>

        {/* Video container */}
        <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-[hsl(var(--app-border))] bg-black">
          <video
            ref={videoRef}
            src="/videos/product_demo4.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto block"
            style={{ maxHeight: '80vh' }}
          />

          {/* Unmute button — shown only when muted */}
          {muted && (
            <button
              onClick={toggleMute}
              className="absolute bottom-16 right-4 flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-200 border border-white/20"
            >
              {/* Muted speaker icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
              </svg>
              Click to unmute
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
