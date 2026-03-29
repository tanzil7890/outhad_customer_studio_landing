'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

function ExitIntentModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      >
        {/* Dark top */}
        <div className="bg-[#10182B] px-6 pt-6 pb-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
          >
            ×
          </button>
          <div className="inline-flex items-center gap-1.5 bg-[#E63D2D]/15 border border-[#E63D2D]/30 rounded-full px-2.5 py-1 mb-3">
            <span className="text-[#E63D2D] text-[10px] font-bold tracking-wider uppercase">⚡ Wait</span>
          </div>
          <p className="text-lg font-bold leading-snug mb-1">Before you leave —</p>
          <p className="text-sm text-white/60 leading-relaxed">
            97% of your store's visitors are anonymous right now. They're browsing, hesitating, and leaving without a trace.
          </p>
        </div>

        {/* White bottom */}
        <div className="px-6 py-5">
          <div className="space-y-2.5 mb-5">
            {[
              'Convertive identifies them before they leave',
              'Fires cart recovery within minutes',
              'Builds live profiles from click #1 — no login needed',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="text-[#33C0A7] mt-0.5 text-sm shrink-0">✓</span>
                <span className="text-sm text-[#344054]">{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="https://tryconvertive.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center w-full bg-[#10182B] text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity mb-2"
          >
            See it live — takes 20 min →
          </Link>
          <button
            onClick={onClose}
            className="w-full text-[10px] text-[#98A2B3] hover:text-[#667085] transition-colors py-1"
          >
            I'm okay leaving revenue on the table
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DemoPage() {
  const [showExitModal, setShowExitModal] = useState(false)
  const [exitShown, setExitShown] = useState(false)

  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 4 && !exitShown) {
        setShowExitModal(true)
        setExitShown(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [exitShown])

  return (
    <>
      <AnimatePresence>
        {showExitModal && <ExitIntentModal onClose={() => setShowExitModal(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-[#10182B] flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#33C0A7]/15 border border-[#33C0A7]/30 rounded-full px-3 py-1.5 mb-6">
          <span className="text-[#33C0A7] text-xs font-bold tracking-wider uppercase">⚡ Live Demo</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight max-w-xl">
          See Convertive convert an anonymous visitor
        </h1>
        <p className="text-white/50 text-base mb-8 max-w-md leading-relaxed">
          In 20 minutes, you'll see the in-session AI, live profile building, and cart recovery — all live, on your store's data.
        </p>

        <Link
          href="https://tryconvertive.com/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#10182B] font-bold px-8 py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-2xl mb-4"
        >
          Book your 20-min demo →
        </Link>

        <p className="text-white/30 text-xs">No commitment. See live results on your store.</p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-6 mt-14 max-w-sm w-full">
          {[
            { stat: '97%', label: 'of visitors are anonymous' },
            { stat: '70%', label: 'cart abandonment rate' },
            { stat: '<100ms', label: 'in-session response time' },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center">
              <p className="text-2xl font-black text-[#33C0A7]">{stat}</p>
              <p className="text-[10px] text-white/40 leading-snug mt-1">{label}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
