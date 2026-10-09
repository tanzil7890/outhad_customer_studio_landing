'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { METHOD } from '@/lib/landing/content'
import { formatElapsed, type ActionId } from '@/lib/landing/self-read'
import type { SessionSnapshot } from '@/lib/landing/session-reader'
import BookDemoButton from '../shared/book-demo-button'
import { useSession } from './session-provider'
import { Brackets, LiveDot } from './ui'

type StepKey = (typeof METHOD.steps)[number]['key']
const integer = new Intl.NumberFormat('en-US')

function PanelFrame({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  const s = useSession()
  return (
    <div className="relative rounded-[1.75rem] bg-surface-base p-6 shadow-[0_30px_80px_-50px_rgba(26,20,16,0.4)] ring-1 ring-line sm:p-8">
      <Brackets className="-inset-2" />
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          <LiveDot frozen={s?.frozen} /> {title}
        </p>
        {meta && <span className="font-mono text-[12.5px] tabular-nums text-ink-secondary">{meta}</span>}
      </div>
      {children}
    </div>
  )
}

function Detect({ s }: { s: SessionSnapshot }) {
  const events = [...s.log].reverse().slice(0, 7)
  return (
    <PanelFrame title={`Event stream · ${s.anonId}`} meta={`${integer.format(s.counters.events)} events`}>
      <ol className="space-y-2">
        {events.map((event, i) => (
          <li key={event.id} className={cn('flex items-baseline gap-4 font-mono text-[13.5px]', i === 0 ? 'animate-fade-up text-ink motion-reduce:animate-none' : 'text-ink-secondary')}>
            <span className="w-10 shrink-0 tabular-nums text-ink-muted">{formatElapsed(event.at)}</span>
            <span className="min-w-0">{event.text}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[14px] leading-relaxed text-ink-secondary">
        Every click, scroll and pause streams into one live profile from the first page view, with no login and no email. In this
        demo, all of it stays in your tab.
      </p>
    </PanelFrame>
  )
}

function Decide({ s }: { s: SessionSnapshot }) {
  return (
    <PanelFrame title="Next best action for you" meta={`re-scored ${integer.format(s.rescored)}×`}>
      <ul className="space-y-4">
        {s.read.actions.map((action, i) => (
          <li key={action.id}>
            <div className="flex items-center justify-between gap-4 text-[15px]">
              <span className={cn('flex items-center gap-2', i === 0 ? 'font-semibold text-ink' : 'text-ink-secondary')}>
                {i === 0 && <Check aria-hidden className="h-4 w-4 text-success" />}
                {action.label}
              </span>
              <span className="font-mono text-[13.5px] tabular-nums text-ink-secondary">{action.score.toFixed(2)}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-sunken">
              <div
                className={cn('h-full origin-left rounded-full transition-transform duration-500', i === 0 ? 'bg-ink' : 'bg-ink-muted')}
                style={{ transform: `scaleX(${action.score})` }}
              />
            </div>
            <p className="mt-1.5 text-[13px] text-ink-muted">{action.reasons[0]}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[14px] leading-relaxed text-ink-secondary">
        Do something on this page and watch the ranking move. Not the first rule that matches: the action with the highest expected lift
        for you, right now.
      </p>
    </PanelFrame>
  )
}

const PREVIEW: Record<ActionId, { eyebrow: string; title: string; cta: string }> = {
  demo: { eyebrow: 'Before you go', title: 'Got 15 minutes? See Convertive on your own traffic.', cta: 'Pick a time' },
  roi: { eyebrow: 'Quick question', title: 'What would a 10% lift be worth on your traffic?', cta: 'Run the numbers' },
  film: { eyebrow: 'Short on time?', title: 'Forty-eight seconds. One shopper. Watch what happens.', cta: 'Play the film' },
  save: { eyebrow: 'Nothing renders', title: 'Convertive stays quiet. Pushing you now would be noise.', cta: '' },
}

function Deliver({ s }: { s: SessionSnapshot }) {
  const top = s.read.actions[0]
  const preview = PREVIEW[top.id]
  return (
    <PanelFrame title="What would render for you now" meta={top.score.toFixed(2)}>
      <div className="mx-auto max-w-sm rounded-2xl bg-surface-warm p-6 ring-1 ring-line">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{preview.eyebrow}</p>
        <p className="mt-2 text-xl font-bold leading-snug text-ink">{preview.title}</p>
        {preview.cta && (
          <div className="mt-5 flex h-11 items-center justify-center rounded-lg bg-ink text-[15px] font-semibold text-night-text">{preview.cta}</div>
        )}
      </div>
      <p className="mt-6 text-[14px] leading-relaxed text-ink-secondary">
        Rendered on-site, inside the same session. Shown once, then capped and suppressed so it never gets noisy.
      </p>
    </PanelFrame>
  )
}

function Capture({ s, labels }: { s: SessionSnapshot; labels: Record<string, string> }) {
  const read = s.counters.sectionsRead.map((id) => labels[id] ?? id)
  const items = [
    `${integer.format(s.counters.events)} events from this visit`,
    `Source: ${s.source.label}`,
    read.length ? `Read: ${read.join(', ')}` : 'Read: nothing yet',
    `Audience: ${s.read.segment}`,
  ]
  return (
    <PanelFrame title="Identity, when it’s worth giving">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[14px]">
        <span className="rounded-full bg-surface-sunken px-3 py-1.5 text-ink-secondary">{s.anonId}</span>
        <ArrowRight aria-hidden className="h-4 w-4 text-ink-muted" />
        <span className="rounded-full border border-dashed border-ink-muted px-3 py-1.5 text-ink-secondary">you@yourcompany.com</span>
      </div>
      <p className="mt-6 text-[14px] font-semibold text-ink">If you booked now, this would come with you:</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-surface-warm px-4 py-3 text-[14px] text-ink-secondary ring-1 ring-line-subtle">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <BookDemoButton location="mirror-capture" />
      </div>
    </PanelFrame>
  )
}

function Panel({ step, s }: { step: StepKey; s: SessionSnapshot | null }) {
  const [labels, setLabels] = useState<Record<string, string>>({})
  useEffect(() => {
    const map: Record<string, string> = {}
    document.querySelectorAll<HTMLElement>('[data-read-id]').forEach((el) => (map[el.dataset.readId!] = el.dataset.readLabel ?? ''))
    setLabels(map)
  }, [])
  if (!s) {
    return (
      <PanelFrame title="Reading your session">
        <p className="text-[15px] text-ink-secondary">Starting up…</p>
      </PanelFrame>
    )
  }
  if (step === 'detect') return <Detect s={s} />
  if (step === 'decide') return <Decide s={s} />
  if (step === 'deliver') return <Deliver s={s} />
  return <Capture s={s} labels={labels} />
}

/** Detect → Decide → Deliver → Capture, each panel fed by the visitor's own session. */
export default function LiveMethod() {
  const s = useSession()
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <ol>
        {METHOD.steps.map((step, i) => {
          const current = i === active
          return (
            <li
              key={step.key}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-step={i}
              className="flex flex-col justify-center border-t border-line py-10 lg:min-h-[62vh] lg:py-0"
            >
              <p className={cn('font-mono text-sm tabular-nums transition-colors', current ? 'text-ink' : 'text-ink-muted')}>0{i + 1}</p>
              <h3
                className={cn(
                  'mt-2 text-4xl font-semibold tracking-tight transition-colors duration-300 sm:text-5xl',
                  current ? 'text-ink' : 'text-ink-muted',
                )}
              >
                {step.title}
              </h3>
              <p className={cn('mt-4 max-w-md text-lg leading-relaxed transition-colors duration-300', current ? 'text-ink-secondary' : 'text-ink-muted')}>
                {step.body}
              </p>
              <div className="mt-8 lg:hidden">
                <Panel step={step.key} s={s} />
              </div>
            </li>
          )
        })}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[max(7rem,calc(50vh-17rem))]">
          <Panel step={METHOD.steps[active].key} s={s} />
        </div>
      </div>
    </div>
  )
}
