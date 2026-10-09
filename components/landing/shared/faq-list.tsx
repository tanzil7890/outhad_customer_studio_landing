import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tone } from './tone'

/** Native <details> so every answer stays in the server HTML (and matches FAQ JSON-LD). */
export default function FaqList({
  faqs,
  tone = 'light',
  className,
}: {
  faqs: readonly { question: string; answer: string }[]
  tone?: Tone
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={cn('divide-y border-y', dark ? 'divide-night-line border-night-line' : 'divide-line border-line', className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary
            className={cn(
              'flex min-h-0 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden',
              dark ? 'focus-visible:ring-night-text focus-visible:ring-offset-night' : 'focus-visible:ring-ink',
            )}
          >
            <span className={cn('text-lg font-semibold', dark ? 'text-night-text' : 'text-ink')}>
              {faq.question}
            </span>
            <Plus
              aria-hidden
              className={cn(
                'h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none',
                dark ? 'text-night-soft' : 'text-ink-secondary',
              )}
            />
          </summary>
          <p className={cn('max-w-3xl pb-6 text-base leading-relaxed', dark ? 'text-night-soft' : 'text-ink-secondary')}>
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
