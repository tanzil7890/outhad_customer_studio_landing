import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

/**
 * Above-the-fold line-mask reveal driven by CSS only, so the text is painted
 * in the server HTML and animates without waiting for hydration (good for LCP).
 */
export default function LineReveal({
  lines,
  as: Tag = 'h1',
  className,
  lineClassName,
  delay = 0.05,
  stagger = 0.09,
}: {
  lines: readonly string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <span
            className={cn('block animate-line-rise motion-reduce:animate-none', lineClassName)}
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            {line}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
