'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

const SKIP_PATHS = ['/demo', '/roi-calculator', '/admin']

function shouldSkip(path: string) {
  return SKIP_PATHS.some((p) => path === p || path.startsWith(p + '/'))
}

const PAGE_MESSAGES: Record<string, { text: string; cta?: { label: string; href: string } }> = {
  '/convertive-ai-engine': {
    text: "You're reading about AI decisioning. It fires in under 100ms — before your shopper hits the back button.",
    cta: { label: 'See it in action →', href: 'https://tryconvertive.com/demo' },
  },
  '/convertive-data-platform': {
    text: 'Every anonymous click becomes a live profile. No login required. No delay.',
    cta: { label: 'How it works →', href: '/#how-it-works' },
  },
  '/convertive-audiences': {
    text: "These audiences update from live session behavior — not yesterday's warehouse snapshot.",
    cta: { label: 'See the platform →', href: 'https://tryconvertive.com/demo' },
  },
  '/convertive-journey-orchestration': {
    text: 'Web → Email → SMS → Ads. One brain. One decision. No tool-switching.',
    cta: { label: 'Book a demo →', href: 'https://tryconvertive.com/demo' },
  },
  '/convertive-reporting': {
    text: 'Every conversion traced back to the exact in-session moment it happened.',
    cta: { label: 'See reporting →', href: 'https://tryconvertive.com/demo' },
  },
  '/manifesto': {
    text: "You're reading our thinking. We'd love to know yours.",
    cta: { label: 'Book 20 min →', href: 'https://tryconvertive.com/demo' },
  },
}

function getPageMessage(path: string) {
  if (PAGE_MESSAGES[path]) return PAGE_MESSAGES[path]
  if (path.startsWith('/blogs/')) {
    return {
      text: 'Convertive acts on visitors reading exactly this kind of content — while they\'re still on the page.',
      cta: { label: 'See how →', href: '/#how-it-works' },
    }
  }
  return null
}

// ─── 10s Centered Modal ───────────────────────────────────────────────────────
function TenSecondCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onDismiss} />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.93, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 16, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="relative w-full max-w-md rounded-2xl bg-[#10182B] border border-white/10 shadow-2xl overflow-hidden text-white"
      >
        {/* Close */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors text-xl leading-none z-10"
          aria-label="Dismiss"
        >
          ×
        </button>

        {/* Top section */}
        <div className="px-6 pt-6 pb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#33C0A7]/15 border border-[#33C0A7]/30 rounded-full px-2.5 py-1 mb-4">
            <span className="text-[#33C0A7] text-[10px] font-bold tracking-wider uppercase">⚡ Live Signal</span>
          </div>

          <p className="text-lg font-bold mb-1 leading-snug">Convertive just built your profile</p>
          <p className="text-sm text-white/50 mb-4 leading-relaxed">In the last 10 seconds, we tracked:</p>

          <ul className="space-y-2.5 mb-5">
            {['Where you came from', 'What you first looked at', 'Your scroll depth + engagement'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-5 h-5 rounded-full bg-[#33C0A7]/15 border border-[#33C0A7]/30 flex items-center justify-center shrink-0">
                  <span className="text-[#33C0A7] text-[9px]">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xs text-white/30 leading-relaxed mb-5">
            This is what Convertive does for your anonymous shoppers — in real time, on your Shopify store.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 border-t border-white/8 pt-4">
          <Link
            href="/#how-it-works"
            onClick={onDismiss}
            className="flex items-center justify-center w-full bg-white text-[#10182B] font-bold text-sm py-3 rounded-xl hover:bg-white/90 transition-colors mb-2"
          >
            See how it works →
          </Link>
          <button
            onClick={onDismiss}
            className="w-full text-[10px] text-white/25 hover:text-white/50 transition-colors py-1"
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Page Navigation Bottom Banner ────────────────────────────────────────────
function PageBanner({
  message,
  cta,
  onDismiss,
}: {
  message: string
  cta?: { label: string; href: string }
  onDismiss: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 8000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 48, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[560px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#10182B] border border-white/10 shadow-2xl px-4 py-3.5
        flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3"
    >
      <div className="flex items-start gap-2 flex-1 min-w-0">
        <span className="text-[#33C0A7] text-base shrink-0 mt-0.5">⚡</span>
        <p className="text-xs text-white/80 leading-snug flex-1">{message}</p>
        <button
          onClick={onDismiss}
          className="shrink-0 text-white/30 hover:text-white/70 transition-colors text-lg leading-none sm:hidden"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {cta && (
          <Link
            href={cta.href}
            onClick={onDismiss}
            className="flex-1 sm:flex-none text-center bg-white text-[#10182B] font-bold text-xs px-3.5 py-2 rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            {cta.label}
          </Link>
        )}
        <button
          onClick={onDismiss}
          className="hidden sm:block shrink-0 text-white/30 hover:text-white/70 transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </motion.div>
  )
}

// ─── 30s Center Modal ─────────────────────────────────────────────────────────
function ThirtySecondModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">Intent Signal Detected</DialogTitle>

        {/* Dark top strip */}
        <div className="bg-[#10182B] px-6 pt-6 pb-5 text-white">
          <div className="inline-flex items-center gap-1.5 bg-[#33C0A7]/15 border border-[#33C0A7]/30 rounded-full px-2.5 py-1 mb-3">
            <span className="text-[#33C0A7] text-[10px] font-bold tracking-wider uppercase">⚡ Intent Signal</span>
          </div>
          <p className="text-base font-bold leading-snug mb-0.5">You've been here 30 seconds.</p>
          <p className="text-sm text-white/50">That's a strong intent signal.</p>

          {/* Intent bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Convertive ranked you as</span>
              <span className="text-[10px] font-bold text-[#33C0A7]">High Purchase Intent</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#33C0A7] to-[#33C0A7]/70"
                initial={{ width: '0%' }}
                animate={{ width: '82%' }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* White bottom */}
        <div className="bg-white px-6 py-5">
          <p className="text-xs text-[#667085] uppercase tracking-wider font-bold mb-3">For a store with 10,000 monthly visitors</p>

          <div className="space-y-2 mb-5">
            <div className="flex items-center justify-between rounded-xl bg-[#FEF3F2] border border-[#E63D2D]/20 px-4 py-3">
              <span className="text-xs text-[#667085]">Revenue leaking right now</span>
              <span className="text-base font-black text-[#E63D2D] tabular-nums">$63,700<span className="text-xs font-normal text-[#E63D2D]/60">/mo</span></span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#ECFDF5] border border-[#33C0A7]/20 px-4 py-3">
              <span className="text-xs text-[#667085]">What Convertive recovers</span>
              <span className="text-base font-black text-[#33C0A7] tabular-nums">+$3,185<span className="text-xs font-normal text-[#33C0A7]/60">/mo</span></span>
            </div>
          </div>

          <Link
            href="/roi-calculator"
            onClick={onClose}
            className="flex items-center justify-center w-full bg-[#10182B] text-white font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity mb-2"
          >
            Calculate your store's number →
          </Link>
          <button
            onClick={onClose}
            className="w-full text-[10px] text-[#98A2B3] hover:text-[#667085] transition-colors py-1"
          >
            Not interested in recovering revenue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Controller ──────────────────────────────────────────────────────────
export default function EngagementModals() {
  const pathname = usePathname()
  const [show10s, setShow10s] = useState(false)
  const [show30s, setShow30s] = useState(false)
  const [pageBanner, setPageBanner] = useState<{ message: string; cta?: { label: string; href: string } } | null>(null)

  const dismiss10sTimeRef = useRef<number>(0)
  const timer30sRef = useRef<ReturnType<typeof setTimeout>>()
  const isFirstPageRef = useRef(true)
  const mountedRef = useRef(false)

  // 10s + 30s timers — run only once on mount
  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true

    if (shouldSkip(pathname)) return
    if (sessionStorage.getItem('conv_10s_shown')) return

    const t10 = setTimeout(() => {
      setShow10s(true)
      sessionStorage.setItem('conv_10s_shown', '1')
    }, 10000)

    return () => clearTimeout(t10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 30s timer starts after 10s modal is dismissed (if not already shown)
  function dismiss10s() {
    setShow10s(false)
    dismiss10sTimeRef.current = Date.now()
    if (sessionStorage.getItem('conv_30s_shown')) return

    // If dismissed very quickly (< 2s after appearing), skip 30s modal
    const apparentDuration = Date.now() - (mountedRef.current ? 0 : 9999999)
    if (apparentDuration < 2000) return

    // Start 30s additional wait after dismissing 10s modal
    timer30sRef.current = setTimeout(() => {
      if (!sessionStorage.getItem('conv_30s_shown')) {
        setShow30s(true)
        sessionStorage.setItem('conv_30s_shown', '1')
      }
    }, 30000)
  }

  function dismiss30s() {
    setShow30s(false)
  }

  // Page navigation banner
  useEffect(() => {
    if (isFirstPageRef.current) {
      isFirstPageRef.current = false
      return
    }
    if (shouldSkip(pathname)) return

    const shown: string[] = JSON.parse(sessionStorage.getItem('conv_pages_shown') || '[]')
    if (shown.includes(pathname)) return

    const msg = getPageMessage(pathname)
    if (!msg) return

    sessionStorage.setItem('conv_pages_shown', JSON.stringify([...shown, pathname]))
    setPageBanner(msg)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {show10s && <TenSecondCard key="10s" onDismiss={dismiss10s} />}
      </AnimatePresence>

      <ThirtySecondModal open={show30s} onClose={dismiss30s} />

      <AnimatePresence>
        {pageBanner && (
          <PageBanner
            key={pathname}
            message={pageBanner.text}
            cta={pageBanner.cta}
            onDismiss={() => setPageBanner(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
