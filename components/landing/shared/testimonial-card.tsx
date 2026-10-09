import { cn } from '@/lib/utils'
import type { Testimonial } from '@/lib/landing/content'
import type { Tone } from './tone'

export default function TestimonialCard({
  testimonial,
  tone = 'light',
  className,
}: {
  testimonial: Testimonial
  tone?: Tone
  className?: string
}) {
  const { quote, name, role, company, avatar, metric, placeholder } = testimonial
  const dark = tone === 'dark'
  const editorial = tone === 'editorial'

  return (
    <figure
      className={cn(
        'relative flex h-full flex-col justify-between gap-8',
        editorial ? 'border-t border-ink pt-8' : 'rounded-3xl p-8 sm:p-10',
        !editorial && (dark ? 'bg-night-raised' : 'bg-surface-base ring-1 ring-line'),
        placeholder && !editorial && (dark ? 'ring-0 outline-dashed outline-1 outline-night-line' : 'border border-dashed border-line-strong ring-0'),
        className,
      )}
    >
      {placeholder && (
        <span
          className={cn(
            'absolute right-5 top-5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
            dark ? 'bg-night text-night-muted' : 'bg-surface-sunken text-ink-muted',
          )}
        >
          Placeholder
        </span>
      )}
      <blockquote
        className={cn(
          editorial
            ? 'font-display text-3xl italic leading-[1.2] text-ink sm:text-4xl'
            : cn('text-xl font-medium leading-snug sm:text-2xl', dark ? 'text-night-text' : 'text-ink'),
        )}
      >
        “{quote}”
      </blockquote>
      <figcaption className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <span
              aria-hidden
              className={cn('h-12 w-12 rounded-full', dark ? 'bg-night-line' : 'bg-surface-sunken')}
            />
          )}
          <div>
            <p className={cn('font-semibold', dark ? 'text-night-text' : 'text-ink')}>{name}</p>
            <p className={cn('text-sm', dark ? 'text-night-soft' : 'text-ink-secondary')}>
              {role}, {company}
            </p>
          </div>
        </div>
        {metric && (
          <div className="text-right">
            <p className={cn('text-3xl font-extrabold tabular-nums', dark ? 'text-night-copper' : 'text-copper-600')}>
              {metric.value}
            </p>
            <p className={cn('text-sm', dark ? 'text-night-soft' : 'text-ink-secondary')}>{metric.label}</p>
          </div>
        )}
      </figcaption>
    </figure>
  )
}
