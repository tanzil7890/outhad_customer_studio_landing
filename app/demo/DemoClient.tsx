'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

const CAL_NAMESPACE = '15-min-meeting-inquiry-or-general-chat'

export default function DemoClient() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          if (typeof window !== 'undefined' && (window as any).lintrk) {
            ;(window as any).lintrk('track', { conversion_id: 25171748 })
            ;(window as any).lintrk('track', { conversion_id: 25171724 })
          }
        },
      })
    })()
  }, [])

  return (
    <div className="border border-[hsl(var(--app-border))] rounded-xl overflow-hidden bg-[hsl(var(--app-card))]">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink="tanzil-convertive/15-min-meeting-inquiry-or-general-chat"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
      />
    </div>
  )
}
