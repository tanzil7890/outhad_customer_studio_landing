import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertive History - Our Journey in Customer Activation Innovation',
  description: 'Discover the story behind Convertive and our evolution in real-time customer activation. Learn about our journey, milestones, and vision for the future of personalized commerce.',
  keywords: [
    'company history',
    'Convertive story',
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
    title: 'Convertive History - Our Journey in Customer Activation Innovation',
    description: 'Discover the story behind Convertive and our evolution in real-time customer activation.',
    url: 'https://tryconvertive.com/convertive-history',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Convertive History - Our Journey in Customer Activation Innovation',
    description: 'Discover the story behind Convertive and our evolution in real-time customer activation.',
  },
  alternates: {
    canonical: '/convertive-history',
  },
}

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}