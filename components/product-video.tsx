'use client'

import { useRef, useState } from 'react'

export default function ProductVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto block"
      />

      {/* Unmute prompt — shown until user clicks */}
      {muted && (
        <div
          onClick={toggleMute}
          className="absolute inset-0 flex items-end justify-end p-4 cursor-pointer"
        >
          <div className="flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-200 animate-pulse">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            Click to unmute
          </div>
        </div>
      )}

      {/* Mute button — shown once audio is on */}
      {!muted && (
        <button
          onClick={toggleMute}
          aria-label="Mute video"
          className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          Mute
        </button>
      )}
    </div>
  )
}
