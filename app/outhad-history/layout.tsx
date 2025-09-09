import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outhad History - Our Journey in Customer Activation Innovation',
  description: 'Discover the story behind Outhad AI and our evolution in real-time customer activation. Learn about our journey, milestones, and vision for the future of personalized commerce.',
  keywords: [
    'company history',
    'Outhad story',
    'customer activation innovation',
    'AI company journey',
    'commerce technology evolution',
    'startup story',
    'company timeline',
    'technology milestones',
    'innovation journey',
    'company background',
    'founding story',
    'business evolution',
    'technology development',
    'company culture'
  ],
  openGraph: {
    title: 'Outhad History - Our Journey in Customer Activation Innovation',
    description: 'Discover the story behind Outhad AI and our evolution in real-time customer activation.',
    url: 'https://outhad.com/outhad-history',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Outhad History - Our Journey in Customer Activation Innovation',
    description: 'Discover the story behind Outhad AI and our evolution in real-time customer activation.',
  },
  alternates: {
    canonical: '/outhad-history',
  },
}

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}