import { NextRequest, NextResponse } from 'next/server'

const ROI_URL = process.env.GOOGLE_APPS_SCRIPT_URL
const AUDIT_URL = process.env.GOOGLE_APPS_SCRIPT_AUDIT_URL

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const target =
      data.source === 'anonymous-traffic-audit' ? AUDIT_URL : ROI_URL

    console.log('[submit-lead] source=%s target=%s', data.source, target ? 'set' : 'MISSING')

    if (!target) {
      return NextResponse.json(
        {
          status: 'error',
          message: `Apps Script URL is not configured for source "${data.source ?? 'default'}"`,
        },
        { status: 500 }
      )
    }

    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      redirect: 'follow',
    })

    const bodyText = await response.text().catch(() => '')
    console.log('[submit-lead] status=%s redirected=%s body=%s', response.status, response.redirected, bodyText.slice(0, 300))

    if (response.ok || response.status === 302 || response.redirected) {
      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.json(
      { status: 'error', message: `Script returned ${response.status}: ${bodyText.slice(0, 200)}` },
      { status: 500 }
    )
  } catch (err) {
    console.error('[submit-lead] error', err)
    return NextResponse.json(
      { status: 'error', message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
