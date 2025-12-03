import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertive Engine - Machine Learning for Customer Activation',
  description: 'Power your customer activation with advanced ML algorithms that predict behavior, personalize experiences, and optimize engagement in real-time. Predictive analytics, smart recommendations, and automated optimization.',
  keywords: [
    'AI customer activation',
    'machine learning personalization',
    'predictive analytics',
    'customer behavior prediction',
    'AI personalization engine',
    'smart recommendations',
    'real-time optimization',
    'customer lifetime value',
    'churn prevention AI',
    'anomaly detection',
    'reinforcement learning',
    'automated experimentation',
    'AI decisioning',
    'behavioral AI',
    'predictive modeling'
  ],
  openGraph: {
    title: 'Convertive Engine - Machine Learning for Customer Activation',
    description: 'Advanced ML algorithms that predict behavior, personalize experiences, and optimize engagement in real-time.',
    url: 'https://tryconvertive.com/convertive-ai-engine',
    images: [
      {
        url: '/images/convertive-customer-activation-platform/Optimized-Customer-AI-Assistants.webp',
        width: 1200,
        height: 630,
        alt: 'Convertive Engine - Machine learning powered customer activation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertive Engine - Machine Learning for Customer Activation',
    description: 'Advanced ML algorithms that predict behavior, personalize experiences, and optimize engagement in real-time.',
    images: ['/images/convertive-customer-activation-platform/Optimized-Customer-AI-Assistants.webp'],
  },
  alternates: {
    canonical: '/convertive-ai-engine',
  },
}

export default function AIEngineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}