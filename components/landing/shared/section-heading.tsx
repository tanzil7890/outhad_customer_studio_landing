import { cn } from '@/lib/utils'
import { InViewLineReveal } from './reveal'
import type { Tone } from './tone'

const styles: Record<Tone, { eyebrow: string; heading: string; lede: string }> = {
  light: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted',
    heading: 'text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl',
    lede: 'text-base leading-relaxed text-ink-secondary sm:text-lg',
  },
  dark: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.18em] text-night-muted',
    heading: 'text-3xl font-semibold leading-[1.08] tracking-tight text-night-text sm:text-4xl lg:text-5xl',
    lede: 'text-base leading-relaxed text-night-soft sm:text-lg',
  },
  editorial: {
    eyebrow: 'text-xs font-medium uppercase tracking-[0.22em] text-ink-secondary',
    heading: 'font-display text-4xl font-normal leading-[1.04] tracking-[-0.015em] text-ink sm:text-5xl lg:text-6xl',
    lede: 'text-base leading-relaxed text-ink-secondary sm:text-lg',
  },
}

export default function SectionHeading({
  eyebrow,
  lines,
  lede,
  number,
  tone = 'light',
  align = 'left',
  as = 'h2',
  className,
}: {
  eyebrow?: string
  lines: readonly string[]
  lede?: string
  /** Editorial section number, rendered as N°01. */
  number?: string
  tone?: Tone
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const s = styles[tone]
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      {(eyebrow || number) && (
        <p className={cn(s.eyebrow, 'mb-4 flex items-center gap-3', align === 'center' && 'justify-center')}>
          {number && <span className="font-display text-sm normal-case tracking-normal">N°{number}</span>}
          {number && eyebrow && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <InViewLineReveal as={as} lines={lines} className={s.heading} />
      {lede && <p className={cn(s.lede, 'mt-5 max-w-2xl', align === 'center' && 'mx-auto')}>{lede}</p>}
    </div>
  )
}
