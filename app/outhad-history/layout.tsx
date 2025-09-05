import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outhad AI Manifesto - Our Vision for Real-Time Customer Activation',
  description: 'Read the Outhad AI manifesto: Why we believe every digital action is a signal of intent, not noise. Our commitment to real-time commerce intelligence and customer activation.',
  keywords: [
    'Outhad AI manifesto',
    'real-time commerce philosophy',
    'customer activation vision',
    'AI personalization mission',
    'digital intent signals',
    'commerce intelligence manifesto'
  ],
  openGraph: {
    title: 'Outhad AI Manifesto - Our Vision for Real-Time Customer Activation',
    description: 'Our philosophy: Every click, scroll, and hesitation is a signal of intent. Learn how we transform digital behavior into predictive commerce.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outhad AI Manifesto - Our Vision for Real-Time Customer Activation',
    description: 'Our philosophy: Every click, scroll, and hesitation is a signal of intent. Learn how we transform digital behavior into predictive commerce.',
  },
}

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}