import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outhad Reporting - Advanced Analytics & Real-Time Dashboards',
  description: 'Transform data into actionable insights with advanced analytics, real-time dashboards, and comprehensive reporting tools. Custom report builder, automated alerts, and collaborative sharing.',
  keywords: [
    'customer analytics',
    'real-time dashboards',
    'business intelligence',
    'advanced analytics',
    'custom reporting',
    'data visualization',
    'KPI dashboards',
    'automated reporting',
    'marketing analytics',
    'conversion analytics',
    'customer insights',
    'behavioral analytics',
    'performance metrics',
    'data insights',
    'analytics platform'
  ],
  openGraph: {
    title: 'Outhad Reporting - Advanced Analytics & Real-Time Dashboards',
    description: 'Transform data into actionable insights with advanced analytics and real-time dashboards.',
    url: 'https://outhad.com/outhad-reporting',
    images: [
      {
        url: '/images/outhad-customer-activation-platform/outhad-features.avif',
        width: 1200,
        height: 630,
        alt: 'Outhad Reporting - Advanced analytics and real-time dashboards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outhad Reporting - Advanced Analytics & Real-Time Dashboards',
    description: 'Transform data into actionable insights with advanced analytics and real-time dashboards.',
    images: ['/images/outhad-customer-activation-platform/outhad-features.avif'],
  },
  alternates: {
    canonical: '/outhad-reporting',
  },
}

export default function ReportingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}