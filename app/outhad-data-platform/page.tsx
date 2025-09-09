import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../components/ui/toast/button'
import Footer from '../../components/footer'

export const metadata: Metadata = {
  title: 'Outhad Data Platform - Unified Customer Data & Real-Time Analytics',
  description: 'Unify customer data across all touchpoints with privacy-first architecture. Real-time data integration, lightning-fast performance, and advanced analytics for complete customer intelligence.',
  keywords: [
    'customer data platform',
    'unified customer profiles',
    'real-time data integration',
    'customer analytics',
    'behavioral data',
    'CDP alternative',
    'privacy-first data',
    'customer intelligence',
    'data unification',
    'real-time analytics',
    'customer 360',
    'data platform',
    'GDPR compliant',
    'CCPA compliant',
    'customer journey analytics'
  ],
  openGraph: {
    title: 'Outhad Data Platform - Unified Customer Data & Real-Time Analytics',
    description: 'Unify customer data across all touchpoints with privacy-first architecture and real-time analytics.',
    url: 'https://outhad.com/outhad-data-platform',
    images: [
      {
        url: '/images/outhad-customer-activation-platform/ea_single_platform_dedicated_to_your_customer_data.png',
        width: 1200,
        height: 630,
        alt: 'Outhad Data Platform - Single platform dedicated to your customer data',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outhad Data Platform - Unified Customer Data & Real-Time Analytics',
    description: 'Unify customer data across all touchpoints with privacy-first architecture and real-time analytics.',
    images: ['/images/outhad-customer-activation-platform/ea_single_platform_dedicated_to_your_customer_data.png'],
  },
  alternates: {
    canonical: '/outhad-data-platform',
  },
}

export default function OuthadDataPlatformPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-48 sm:pt-56">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] mb-6" style={{fontFamily: 'Nib Pro, sans-serif'}}>
              Outhad Data Platform
            </h1>
            <p className="text-xl text-[hsl(var(--app-text-muted))] mb-8 font-mono">
              Unify customer data across all touchpoints with our comprehensive data platform that brings together every interaction, transaction, and behavioral signal into a single source of truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="https://cal.com/tanzilouthad" target="_blank">
                <Button 
                  size="lg"
                  className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] hover:bg-[hsl(var(--app-text-muted))] rounded-full transition-colors duration-200 px-8"
                >
                  Book Demo
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-mono bg-transparent border border-[hsl(var(--app-text))]/20 text-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-text))]/10 rounded-full transition-colors duration-200 px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/images/outhad-customer-activation-platform/ea_single_platform_dedicated_to_your_customer_data.png"
                alt="Outhad Data Platform - Single platform dedicated to your customer data"
                width={600}
                height={400}
                className=""
                priority
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Real-time Data Integration</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Connect and sync data from all your sources in real-time, ensuring your customer profiles are always up-to-date.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Privacy-First Architecture</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Built with privacy and compliance at its core, ensuring GDPR, CCPA, and other regulatory requirements are met.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Lightning Fast Performance</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Query billions of data points instantly with our optimized data architecture and caching layer.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Flexible Data Models</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Adapt to any data structure with our flexible schema that grows with your business needs.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Advanced Analytics</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Get deep insights into customer behavior with built-in analytics and machine learning capabilities.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>API-First Design</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Integrate seamlessly with your existing tech stack through our comprehensive REST and GraphQL APIs.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Ready to unify your customer data?</h2>
          <p className="text-lg text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            Transform your scattered data into actionable insights with the Outhad Data Platform.
          </p>
          <Link href="https://cal.com/tanzilouthad" target="_blank">
            <Button 
              size="lg"
              className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] hover:bg-[hsl(var(--app-text-muted))] rounded-full transition-colors duration-200 px-8"
            >
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}