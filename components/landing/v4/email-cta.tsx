'use client'

import { useId, useState, type FormEvent } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { BOOK_DEMO, EMBER } from '@/lib/landing/content'
import { isCalReady, loadCal, openCal, pushDataLayer } from '@/lib/landing/cal'
import { variantForPath } from '@/lib/landing/variants'

/**
 * Work-email field + Book a demo. Opens the Cal modal with the email
 * prefilled when the embed is warm; otherwise continues to /demo.
 */
export default function EmailCta() {
  const id = useId()
  const router = useRouter()
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const warm = () => {
    loadCal().catch(() => {})
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    pushDataLayer({ event: 'book_demo_click', landing_variant: variantForPath(pathname)?.id ?? pathname, cta_location: 'final-email' })
    const fallback = () => router.push(`${BOOK_DEMO.href}${email ? `?email=${encodeURIComponent(email)}` : ''}`)
    if (!isCalReady()) return fallback()
    openCal({ email }).catch(fallback)
  }

  return (
    <form onSubmit={submit} className="w-full">
      <label htmlFor={`${id}-email`} className="text-[17px] font-semibold text-ink">
        {EMBER.final.formLabel}
      </label>
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white p-1.5 ring-1 ring-pastel-line transition-shadow focus-within:ring-2 focus-within:ring-ink">
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={warm}
          placeholder={EMBER.final.placeholder}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-ink outline-none placeholder:text-ink-muted"
        />
        <button
          type="submit"
          onPointerEnter={warm}
          className="group inline-flex h-12 min-h-0 min-w-0 shrink-0 items-center gap-2 rounded-xl bg-ink px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
        >
          {BOOK_DEMO.label}
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </button>
      </div>
    </form>
  )
}
