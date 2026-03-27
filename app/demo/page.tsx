import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo',
  description: 'Book a Convertive demo.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      <iframe
        title="Cal.com Demo Booking"
        src="https://cal.com/tanzil-convertive/30min"
        style={{ width: "100%", height: "100vh", border: 0 }}
        allow="camera; microphone; fullscreen; autoplay"
      />
    </main>
  )
}
