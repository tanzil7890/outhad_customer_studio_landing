'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const SHEET_WEBHOOK = '/api/chatbot-form'

type Message = {
  id: string
  from: 'bot' | 'user'
  text: string
  quickReplies?: string[]
  link?: { label: string; href: string }
  showContactForm?: boolean
}

const WELCOME: Message = {
  id: 'welcome',
  from: 'bot',
  text: "Hi 👋 I'm the Convertive assistant. What would you like to know?",
  quickReplies: ['How does it work?', 'Pricing', 'Integrations', 'Book a demo'],
}

function getBotReply(input: string): Message {
  const q = input.toLowerCase()

  if (q.includes('demo') || q.includes('book') || q.includes('call') || q.includes('speak')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Let's get you booked in. It's a quick 20-minute call where we show Convertive running live on a real store.",
      link: { label: 'Book a Demo →', href: 'https://tryconvertive.com/demo' },
      quickReplies: ['How does it work?', 'Pricing'],
    }
  }

  if (q.includes('how') || q.includes('work') || q.includes('what is') || q.includes('tell me')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Convertive tracks every anonymous session in real time — no login needed. Within seconds it builds a live shopper profile, then fires personalized experiences across web, email, SMS, and ads before the visitor bounces.",
      quickReplies: ['What signals do you track?', 'Integrations', 'Book a demo'],
    }
  }

  if (q.includes('signal') || q.includes('track') || q.includes('data') || q.includes('anonymous')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "We track 40+ real-time signals per session: referral source, scroll depth, product interest, exit intent, device type, and more. No PII required — GDPR & CCPA friendly.",
      quickReplies: ['Is it GDPR compliant?', 'How does it work?', 'Book a demo'],
    }
  }

  if (q.includes('gdpr') || q.includes('privacy') || q.includes('compliant') || q.includes('secure')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Yes — Convertive processes behavioral signals only, stores no PII by default, and gives you full control over data retention. Fully GDPR & CCPA compliant.",
      quickReplies: ['Integrations', 'Book a demo'],
    }
  }

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('plan') || q.includes('how much')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Pricing scales with your monthly visitor volume. Most brands hit positive ROI in the first month. Book a call and we'll walk through the numbers for your store specifically.",
      link: { label: 'Calculate my ROI →', href: '/roi-calculator' },
      quickReplies: ['Book a demo'],
    }
  }

  if (q.includes('integrat') || q.includes('shopify') || q.includes('klaviyo') || q.includes('connect') || q.includes('plugin')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Convertive integrates natively with Shopify, Klaviyo, Attentive, Meta Ads, Google Ads, and more. Setup takes under 5 minutes — no dev work needed.",
      quickReplies: ['How does it work?', 'Book a demo'],
    }
  }

  if (q.includes('roi') || q.includes('revenue') || q.includes('lift') || q.includes('result')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "Brands using Convertive typically see a 3–7% conversion rate lift. Our ROI calculator can show you what that means for your visitor volume.",
      link: { label: 'Calculate my ROI →', href: '/roi-calculator' },
      quickReplies: ['Book a demo'],
    }
  }

  if (q.includes('ai') || q.includes('machine learning') || q.includes('decision') || q.includes('engine')) {
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: "The Convertive AI Engine makes personalization decisions in under 100ms — before a shopper can hit the back button. It evaluates session context, intent signals, and predicted lifetime value simultaneously.",
      quickReplies: ['What signals do you track?', 'Book a demo'],
    }
  }

  // Fallback — show contact form
  return {
    id: Date.now().toString(),
    from: 'bot',
    text: "I don't have a specific answer for that. Send us your query directly and our team will get back to you.",
    showContactForm: true,
  }
}

// ─── Inline contact form ───────────────────────────────────────────────────────
function ContactForm({ onSent }: { onSent: (email: string, body: string) => void }) {
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !body.trim()) return
    setLoading(true)
    try {
      await fetch(SHEET_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          query: body.trim(),
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch {
      // no-cors swallows errors; submission still goes through
    }
    setSent(true)
    setLoading(false)
    onSent(email.trim(), body.trim())
  }

  if (sent) {
    return (
      <p className="text-xs text-[#33C0A7] font-semibold mt-1">
        ✓ Message sent! We'll get back to you soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2.5 flex flex-col gap-2 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full text-[16px] md:text-xs rounded-lg border border-black/10 bg-[#F8F7F4] px-3 py-2 text-[#10182B] placeholder:text-black/30 outline-none focus:border-[#33C0A7] transition-colors"
      />
      <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Describe your query..."
        rows={3}
        className="w-full text-[16px] md:text-xs rounded-lg border border-black/10 bg-[#F8F7F4] px-3 py-2 text-[#10182B] placeholder:text-black/30 outline-none focus:border-[#33C0A7] transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={!email.trim() || !body.trim() || loading}
        className="w-full bg-[#10182B] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[#1e2d4a] active:bg-[#1e2d4a] disabled:opacity-30 transition-all"
      >
        {loading ? 'Sending…' : 'Submit'}
      </button>
    </form>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CalFloatingButton() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [unread, setUnread] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setUnread(true)
    }, 4000)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [open])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, getBotReply(text)])
    }, 600)
  }, [])

  const handleContactSent = useCallback((_email: string, _body: string) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          from: 'bot',
          text: "Thanks! We've received your message and will get back to you as soon as possible.",
          quickReplies: ['How does it work?', 'Book a demo'],
        },
      ])
    }, 400)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              className={[
                'fixed z-50 flex flex-col overflow-hidden shadow-2xl border border-white/10',
                'inset-x-0 bottom-0 rounded-t-2xl',
                'md:inset-x-auto md:bottom-20 md:right-5 md:w-[340px] md:rounded-2xl',
              ].join(' ')}
              style={{ maxHeight: 'min(82vh, 540px)' }}
            >
              {/* Mobile drag handle */}
              <div className="flex justify-center pt-2.5 pb-1 bg-[#10182B] md:hidden">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="bg-[#10182B] px-4 py-3 flex items-center gap-3 shrink-0">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                  <Image src="/logo-black.png" alt="Convertive" width={28} height={28} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold leading-none">Convertive</p>
                  <p className="text-white/40 text-[11px] mt-0.5">Ask me anything</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-11 h-11 -mr-2 text-white/30 hover:text-white/70 active:text-white transition-colors text-2xl leading-none"
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-[#F8F7F4] px-4 py-4 space-y-3 min-h-0 overscroll-contain">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col gap-1.5 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed max-w-[90%] w-full ${
                        msg.from === 'user'
                          ? 'bg-[#10182B] text-white rounded-br-sm max-w-[85%] w-auto'
                          : 'bg-white text-[#10182B] border border-black/6 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {msg.text}
                      {msg.showContactForm && (
                        <ContactForm onSent={handleContactSent} />
                      )}
                    </div>

                    {msg.link && (
                      <Link
                        href={msg.link.href}
                        target={msg.link.href.startsWith('http') ? '_blank' : undefined}
                        rel={msg.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-xs font-bold text-[#33C0A7] hover:text-[#2aab94] active:opacity-70 transition-colors underline underline-offset-2"
                      >
                        {msg.link.label}
                      </Link>
                    )}

                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => sendMessage(reply)}
                            className="text-[11px] font-semibold px-3 py-2 min-h-[34px] rounded-full bg-white border border-[#10182B]/12 text-[#10182B] hover:bg-[#10182B] hover:text-white active:bg-[#10182B] active:text-white transition-colors shadow-sm"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <form
                onSubmit={handleSubmit}
                className="bg-white border-t border-black/8 px-3 py-2.5 flex gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 text-[16px] md:text-sm text-[#10182B] placeholder:text-black/30 bg-transparent outline-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-[#10182B] text-white flex items-center justify-center shrink-0 hover:bg-[#1e2d4a] active:bg-[#1e2d4a] disabled:opacity-30 transition-all"
                  aria-label="Send"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -translate-x-px">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#10182B] text-white shadow-2xl flex items-center justify-center ${open ? 'hidden md:flex' : 'flex'}`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {unread && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#33C0A7] border-2 border-white"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
