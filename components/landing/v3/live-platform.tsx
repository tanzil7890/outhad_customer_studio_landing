'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLATFORM } from '@/lib/landing/content'
import type { SessionSnapshot } from '@/lib/landing/session-reader'
import { useSession } from './session-provider'
import { LiveDot } from './ui'

const integer = new Intl.NumberFormat('en-US')

/** One live line per module, describing what it is doing with this visit. */
function liveLine(href: string, s: SessionSnapshot) {
  const top = s.read.actions[0]
  switch (href) {
    case '/convertive-data-platform':
      return `${integer.format(s.counters.events)} events streamed into ${s.anonId}`
    case '/convertive-audiences':
      return `You just joined “${s.read.segment}”`
    case '/convertive-ai-engine':
      return `${s.read.actions.length} actions ranked · top: ${top.id === 'save' ? 'do nothing' : top.id}`
    case '/convertive-journey-orchestration':
      return s.frozen ? 'Exit moment: acting now' : 'Exit offer: eligible, capped at once per visit'
    default:
      return `This visit so far: still anonymous, ${s.counters.sectionsRead.length} sections read`
  }
}

const SPANS = ['md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3']

export default function LivePlatform() {
  const s = useSession()
  return (
    <ul className="grid gap-4 md:grid-cols-6">
      {PLATFORM.modules.map((module, i) => (
        <li key={module.href} className={SPANS[i]}>
          <Link
            href={module.href}
            className="group flex h-full min-h-0 min-w-0 flex-col justify-between gap-8 rounded-3xl bg-surface-base p-6 ring-1 ring-line transition-shadow hover:shadow-[0_24px_60px_-40px_rgba(26,20,16,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:p-7"
          >
            <span>
              <span className="flex items-start justify-between gap-4">
                <span className="text-xl font-semibold text-ink">{module.title}</span>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none"
                />
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-ink-secondary">{module.description}</span>
            </span>
            <span className={cn('flex items-center gap-2.5 rounded-xl bg-surface-warm px-3.5 py-2.5 font-mono text-[12.5px] text-ink-secondary ring-1 ring-line-subtle')}>
              <LiveDot frozen={s?.frozen} className="h-2 w-2 [&>span]:h-2 [&>span]:w-2" />
              <span className="min-w-0 truncate">{s ? liveLine(module.href, s) : 'Waiting for your session…'}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
