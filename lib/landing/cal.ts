'use client'

import { getCalApi } from '@calcom/embed-react'
import { BOOK_DEMO } from './content'

type CalApi = Awaited<ReturnType<typeof getCalApi>>

let calPromise: Promise<CalApi> | null = null
let calReady = false

/**
 * getCalApi resolves immediately with a queueing stub even if embed.js never loads
 * (blocked, offline). The script registers <cal-modal-box> when it actually runs,
 * so treat that as the readiness signal.
 */
function whenEmbedLoaded(timeoutMs = 8000): Promise<void> {
  return Promise.race([
    customElements.whenDefined('cal-modal-box').then(() => undefined),
    new Promise<void>((_, reject) => setTimeout(() => reject(new Error('Cal embed did not load')), timeoutMs)),
  ])
}

/**
 * Lazily load the Cal.com embed once per page lifetime. Uses its own namespace
 * (not /demo's inline embed namespace) so booking callbacks never double-fire.
 */
export function loadCal(): Promise<CalApi> {
  if (!calPromise) {
    calPromise = getCalApi({ namespace: BOOK_DEMO.calNamespace })
      .then(async (cal) => {
        await whenEmbedLoaded()
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          cssVarsPerTheme: {
            light: { 'cal-brand': '#1A1410' },
            dark: { 'cal-brand': '#F5F0EB' },
          },
        })
        cal('on', {
          action: 'bookingSuccessful',
          callback: () => {
            const w = window as unknown as { lintrk?: (...args: unknown[]) => void }
            w.lintrk?.('track', { conversion_id: 25171748 })
            w.lintrk?.('track', { conversion_id: 25171724 })
            pushDataLayer({ event: 'book_demo_booked', source: 'modal' })
          },
        })
        calReady = true
        return cal
      })
      .catch((error) => {
        calPromise = null
        throw error
      })
  }
  return calPromise
}

export function isCalReady() {
  return calReady
}

/** Opens the booking modal; `prefill.email` fills Cal's email field. */
export async function openCal(prefill?: { email?: string }) {
  const cal = await loadCal()
  cal('modal', { calLink: BOOK_DEMO.calLink, config: { layout: 'month_view', ...(prefill?.email ? { email: prefill.email } : {}) } })
}

export function pushDataLayer(payload: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(payload)
}
