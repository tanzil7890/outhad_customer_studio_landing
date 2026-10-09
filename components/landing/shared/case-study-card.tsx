import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/lib/landing/content'
import type { Tone } from './tone'

export default function CaseStudyCard({ study, tone = 'light' }: { study: CaseStudy; tone?: Tone }) {
  const dark = tone === 'dark'
  const editorial = tone === 'editorial'

  const body = (
    <article
      className={cn(
        'relative flex h-full flex-col gap-6',
        editorial ? 'border-t border-ink/80 pt-6' : 'rounded-3xl p-7',
        !editorial && (dark ? 'bg-night-raised' : 'bg-surface-base ring-1 ring-line'),
        study.placeholder && !editorial && (dark ? 'outline-dashed outline-1 outline-night-line' : 'border border-dashed border-line-strong ring-0'),
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn('text-sm font-semibold', dark ? 'text-night-text' : 'text-ink')}>{study.company}</p>
          <p className={cn('text-sm', dark ? 'text-night-muted' : 'text-ink-muted')}>{study.segment}</p>
        </div>
        {study.placeholder ? (
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
              dark ? 'bg-night text-night-muted' : 'bg-surface-sunken text-ink-muted',
            )}
          >
            Placeholder
          </span>
        ) : (
          study.href && <ArrowUpRight aria-hidden className={cn('h-5 w-5', dark ? 'text-night-soft' : 'text-ink-secondary')} />
        )}
      </div>
      <h3
        className={cn(
          editorial ? 'font-display text-2xl font-normal leading-tight' : 'text-lg font-semibold leading-snug',
          dark ? 'text-night-text' : 'text-ink',
        )}
      >
        {study.headline}
      </h3>
      <dl className="mt-auto grid grid-cols-2 gap-4">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse gap-1">
            <dt className={cn('text-sm', dark ? 'text-night-soft' : 'text-ink-secondary')}>{metric.label}</dt>
            <dd
              className={cn(
                editorial ? 'font-display text-4xl font-normal tabular-nums' : 'text-3xl font-extrabold tabular-nums tracking-tight',
                metric.kind === 'money'
                  ? dark
                    ? 'text-night-copper'
                    : 'text-copper-400'
                  : dark
                    ? 'text-night-text'
                    : 'text-ink',
              )}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className={cn('text-sm leading-relaxed', dark ? 'text-night-soft' : 'text-ink-secondary')}>{study.summary}</p>
    </article>
  )

  if (!study.href) return body
  return (
    <Link href={study.href} className="block h-full min-h-0 min-w-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current">
      {body}
    </Link>
  )
}
