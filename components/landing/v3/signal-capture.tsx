'use client'

import type { MouseEvent, ReactNode } from 'react'
import { useMirror } from './session-provider'

/** Turns interactions inside shared components into session signals, without changing those components. */
export default function SignalCapture({
  kind,
  id,
  className,
  children,
}: {
  kind: 'roi' | 'faq' | 'film'
  id?: string
  className?: string
  children: ReactNode
}) {
  const { reader } = useMirror()

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element
    if (kind === 'film' && target.closest('button')) reader?.signal('film')
    if (kind === 'faq') {
      const summary = target.closest('summary')
      const details = summary?.parentElement
      if (summary && details instanceof HTMLDetailsElement && !details.open) reader?.signal('faq', summary.textContent ?? '')
    }
  }

  return (
    <div
      id={id}
      className={className}
      onClickCapture={kind === 'roi' ? undefined : onClickCapture}
      onChangeCapture={kind === 'roi' ? () => reader?.signal('roi') : undefined}
    >
      {children}
    </div>
  )
}
