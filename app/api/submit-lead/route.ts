import { NextRequest, NextResponse } from 'next/server'

const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: NextRequest) {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      { status: 'error', message: 'GOOGLE_APPS_SCRIPT_URL is not configured' },
      { status: 500 }
    )
  }

  try {
    const data = await request.json()

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    // Google Apps Script redirects on success — treat any 2xx or 3xx as success
    if (response.ok || response.status === 302 || response.redirected) {
      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.json(
      { status: 'error', message: `Script returned ${response.status}` },
      { status: 500 }
    )
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
