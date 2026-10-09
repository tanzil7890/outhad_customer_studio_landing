import { cn } from '@/lib/utils'
import type { LogoItem } from '@/lib/landing/content'
import type { Tone } from './tone'

/** Customer logos. Placeholder entries render as dashed, labelled tiles. */
export default function LogoStrip({ logos, tone = 'light', className }: { logos: LogoItem[]; tone?: Tone; className?: string }) {
  const dark = tone === 'dark'
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6', className)}>
      {logos.map((logo) => (
        <li
          key={logo.name}
          className={cn(
            'flex h-16 items-center justify-center px-4',
            logo.placeholder &&
              cn(
                'rounded-xl border border-dashed text-[13px] font-medium',
                dark ? 'border-night-line text-night-muted' : 'border-line-strong text-ink-muted',
              ),
          )}
        >
          {logo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={logo.name}
              className={cn('max-h-8 w-auto object-contain opacity-80 grayscale', dark && 'brightness-0 invert')}
            />
          ) : (
            <span>{logo.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
