'use client'

import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowDown, Check, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MIRROR } from '@/lib/landing/content'
import { formatElapsed, formatElapsedPrecise, type ActionId } from '@/lib/landing/self-read'
import BookDemoButton from '../shared/book-demo-button'
import { useMirror } from './session-provider'
import { Brackets } from './ui'

const formatMs = (ms: number) => (ms >= 0.1 ? ms.toFixed(2) : ms >= 0.001 ? ms.toFixed(3) : '<0.001')

/**
 * Exit intent, the "Try to leave" button, or a return from another tab stops
 * the clock and shows the visitor what Convertive would weigh for them right
 * now, with reasons drawn from their own session.
 */
export default function FreezeDialog() {
  const { freeze, closeFreeze, reader } = useMirror()
  const after = useRef<(() => void) | null>(null)
  const [settled, setSettled] = useState(false)
  // Keep rendering the last freeze while the dialog animates out.
  const last = useRef(freeze)
  if (freeze) last.current = freeze
  const view = freeze ?? last.current

  useEffect(() => {
    if (!freeze) return
    setSettled(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSettled(true)))
    return () => cancelAnimationFrame(id)
  }, [freeze])

  const closeThen = (next?: () => void) => {
    after.current = next ?? null
    closeFreeze()
  }

  const futures = view?.actions.slice(0, 3) ?? []
  const chosen = futures[0]
  const s = view?.snapshot

  return (
    <Dialog.Root open={!!freeze} onOpenChange={(open) => !open && closeThen()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-surface-canvas/45 backdrop-blur-[3px] backdrop-grayscale data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            const next = after.current
            after.current = null
            if (!next) return
            event.preventDefault()
            next()
          }}
          className="fixed inset-x-3 top-[4vh] z-[61] mx-auto max-h-[92vh] max-w-3xl overflow-y-auto rounded-[2rem] bg-surface-base p-6 shadow-[0_60px_140px_-40px_rgba(26,20,16,0.55)] ring-1 ring-line focus:outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97] motion-reduce:animate-none sm:inset-x-6 sm:top-[7vh] sm:p-10"
        >
          {view && s && chosen && (
            <>
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-warning">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-warning" />
                  {MIRROR.freeze.eyebrow} · {s.anonId}
                </p>
                <Dialog.Close
                  aria-label="Close"
                  className="-mr-2 -mt-2 flex h-10 w-10 min-h-0 min-w-0 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <X className="h-5 w-5" aria-hidden />
                </Dialog.Close>
              </div>

              <div className="relative mt-6 inline-block px-3 py-1">
                <Brackets />
                <p className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-ink sm:text-7xl">
                  {formatElapsedPrecise(s.counters.elapsedMs)}
                </p>
              </div>

              <Dialog.Title className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {MIRROR.freeze.titles[view.trigger]}
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                {view.trigger === 'return' && view.awayMs !== undefined && (
                  <>
                    You were gone {formatElapsed(view.awayMs)}, and your exit risk had reached {Math.round(s.read.exitRisk * 100)}%.{' '}
                  </>
                )}
                {MIRROR.freeze.lede}
              </Dialog.Description>

              <ol className="mt-8 space-y-3">
                {futures.map((action, i) => {
                  const top = i === 0
                  return (
                    <li
                      key={action.id}
                      className={cn(
                        'rounded-2xl p-4 transition-[opacity,transform] duration-500 motion-reduce:transition-none sm:p-5',
                        top ? 'bg-surface-warm ring-2 ring-ink' : 'ring-1 ring-line',
                        settled ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                      )}
                      style={{ transitionDelay: `${120 + i * 110}ms` }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] sm:text-base', top ? 'font-semibold text-ink' : 'text-ink-secondary')}>
                          <span className="w-5 shrink-0 font-mono text-[13px] text-ink-muted">{i + 1}.</span>
                          {action.label}
                          {top && (
                            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-semibold text-success">
                              <Check aria-hidden className="h-3 w-3" /> Chosen
                            </span>
                          )}
                        </p>
                        <span className="font-mono text-[14px] tabular-nums text-ink-secondary">{action.score.toFixed(2)}</span>
                      </div>
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                        <div
                          className={cn('h-full origin-left rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none', top ? 'bg-ink' : 'bg-ink-muted')}
                          style={{ transform: `scaleX(${settled ? action.score : 0})`, transitionDelay: `${260 + i * 110}ms` }}
                        />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {action.reasons.slice(0, 2).map((reason) => (
                          <li key={reason} className="text-[14px] leading-snug text-ink-secondary">
                            <span aria-hidden className="mr-2 text-ink-muted">→</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ChosenAction
                  id={chosen.id}
                  onClose={closeThen}
                  onSave={() => reader?.saveSpot()}
                />
                <button
                  type="button"
                  onClick={() => {
                    reader?.saveSpot()
                    closeThen()
                  }}
                  className="min-h-0 min-w-0 self-start text-[15px] font-semibold text-ink-secondary underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:self-auto"
                >
                  {MIRROR.freeze.leave}
                </button>
              </div>

              <div className="mt-8 space-y-1.5 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-muted">
                <p>
                  <span className="font-mono text-ink-secondary">Ranked in {formatMs(view.decideMs)} ms, in your browser.</span>{' '}
                  {MIRROR.freeze.production}
                </p>
                <p>{MIRROR.disclaimer}</p>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const actionButton =
  'group inline-flex h-12 min-h-0 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-primary px-6 text-[15px] font-semibold text-night-text transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'

function ChosenAction({
  id,
  onClose,
  onSave,
}: {
  id: ActionId
  onClose: (next?: () => void) => void
  onSave: () => void
}) {
  const scrollTo = (selector: string, then?: (el: HTMLElement) => void) => () => {
    const el = document.querySelector<HTMLElement>(selector)
    if (!el) return
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    then?.(el)
  }

  if (id === 'demo') {
    // Close first so the Cal modal (or /demo) is not trapped behind this dialog.
    return (
      <span onClickCapture={() => onClose()}>
        <BookDemoButton location="mirror-freeze">Book a 15-minute demo</BookDemoButton>
      </span>
    )
  }
  if (id === 'roi') {
    return (
      <button type="button" className={actionButton} onClick={() => onClose(scrollTo('#roi', (el) => el.querySelector('input')?.focus({ preventScroll: true })))}>
        Show me the numbers <ArrowDown aria-hidden className="h-4 w-4" />
      </button>
    )
  }
  if (id === 'film') {
    return (
      <button
        type="button"
        className={actionButton}
        onClick={() => onClose(scrollTo('#film', (el) => el.querySelector<HTMLButtonElement>('button')?.click()))}
      >
        <Play aria-hidden className="h-4 w-4 fill-current" /> Play the film · 0:48
      </button>
    )
  }
  return (
    <button
      type="button"
      className={actionButton}
      onClick={() => {
        onSave()
        onClose()
      }}
    >
      Keep my place
    </button>
  )
}
