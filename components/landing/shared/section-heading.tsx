import type { ReactNode } from 'react'
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
}

export default function SectionHeading({
  eyebrow,
  lines,
  lede,
  badge,
  tone = 'light',
  align = 'left',
  as = 'h2',
  className,
}: {
  eyebrow?: string
  lines: readonly string[]
  lede?: string
  /** Small live element rendered after the eyebrow (e.g. a read marker). */
  badge?: ReactNode
  tone?: Tone
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const s = styles[tone]
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      {(eyebrow || badge) && (
        <div className={cn(s.eyebrow, 'mb-4 flex flex-wrap items-center gap-3', align === 'center' && 'justify-center')}>
          {eyebrow && <p>{eyebrow}</p>}
          {badge}
        </div>
      )}
      <InViewLineReveal as={as} lines={lines} className={s.heading} />
      {lede && <p className={cn(s.lede, 'mt-5 max-w-2xl', align === 'center' && 'mx-auto')}>{lede}</p>}
    </div>
  )
}
