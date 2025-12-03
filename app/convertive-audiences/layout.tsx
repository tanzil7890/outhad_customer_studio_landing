import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertive Audiences - Advanced Customer Segmentation & Targeting',
  description: 'Build and manage precise customer segments with real-time behavioral data, predictive analytics, and AI-powered targeting. Dynamic audience updates and cross-platform activation.',
  keywords: [
    'customer segmentation',
    'audience targeting',
    'behavioral segmentation',
    'dynamic audiences',
    'customer segments',
    'predictive segmentation',
    'real-time segmentation',
    'audience analytics',
    'customer profiling',
    'audience intelligence',
    'segment management',
    'targeting optimization',
    'audience insights',
    'cohort analysis',
    'lookalike audiences'
  ],
  openGraph: {
    title: 'Convertive Audiences - Advanced Customer Segmentation & Targeting',
    description: 'Build and manage precise customer segments with real-time behavioral data and AI-powered targeting.',
    url: 'https://tryconvertive.com/convertive-audiences',
    images: [
      {
        url: '/images/convertive-customer-activation-platform/segementation_precise_targeting.webp',
        width: 1200,
        height: 630,
        alt: 'Convertive Audiences - Advanced customer segmentation and targeting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertive Audiences - Advanced Customer Segmentation & Targeting',
    description: 'Build and manage precise customer segments with real-time behavioral data and AI-powered targeting.',
    images: ['/images/convertive-customer-activation-platform/segementation_precise_targeting.webp'],
  },
  alternates: {
    canonical: '/convertive-audiences',
  },
}

export default function AudiencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}