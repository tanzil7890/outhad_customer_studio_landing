import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../components/ui/toast/button'
import Footer from '../../components/footer'

export const metadata: Metadata = {
  title: 'Journey Orchestration - Personalized Customer Journey Automation | Outhad',
  description: 'Design and automate personalized customer journeys that adapt in real-time. Multi-channel orchestration, AI-powered optimization, and advanced segmentation for maximum engagement and conversion.',
  keywords: [
    'customer journey orchestration',
    'personalized customer journeys',
    'journey automation',
    'multi-channel orchestration',
    'customer experience automation',
    'behavioral triggers',
    'journey mapping',
    'real-time personalization',
    'customer lifecycle management',
    'automated marketing',
    'journey optimization',
    'cross-channel marketing',
    'customer engagement',
    'retention automation',
    'onboarding automation'
  ],
  openGraph: {
    title: 'Journey Orchestration - Personalized Customer Journey Automation | Outhad',
    description: 'Design and automate personalized customer journeys with real-time adaptation and multi-channel orchestration.',
    url: 'https://outhad.com/outhad-journey-orchestration',
    images: [
      {
        url: '/images/outhad-customer-activation-platform/outhad-orchestration.png',
        width: 1200,
        height: 630,
        alt: 'Outhad Journey Orchestration - Automated customer journey flows',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journey Orchestration - Personalized Customer Journey Automation | Outhad',
    description: 'Design and automate personalized customer journeys with real-time adaptation and multi-channel orchestration.',
    images: ['/images/outhad-customer-activation-platform/outhad-orchestration.png'],
  },
  alternates: {
    canonical: '/outhad-journey-orchestration',
  },
}

export default function OuthadJourneyOrchestrationPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-48 sm:pt-56">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl  sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] mb-6" style={{fontFamily: 'Nib Pro, sans-serif'}}>
              Journey Orchestration
            </h1>
            <p className="text-xl text-[hsl(var(--app-text-muted))] mb-8 font-mono">
              Design and automate personalized customer journeys that adapt in real-time based on behavior, preferences, and business rules to maximize engagement and conversion.
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
                src="/images/outhad-customer-activation-platform/outhad-orchestration.png"
                alt="Outhad Journey Orchestration - Automated customer journey flows"
                width={600}
                height={400}
                className=" "
                priority
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Visual Journey Builder</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Design complex customer journeys with our intuitive drag-and-drop interface, no coding required.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Real-time Personalization</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Adapt journeys instantly based on customer actions, preferences, and real-time behavioral signals.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Multi-channel Orchestration</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Coordinate touchpoints across email, SMS, push notifications, in-app messages, and more.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>AI-Powered Optimization</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Automatically optimize send times, content, and pathways using machine learning algorithms.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Advanced Segmentation</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Create dynamic audience segments that update in real-time based on customer behavior and attributes.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Smart Timing</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Deliver messages at the optimal time for each individual customer based on their engagement patterns.</p>
          </div>
        </div>

        {/* Journey Types Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] text-center mb-12" style={{fontFamily: 'Nib Pro, sans-serif'}}>Pre-built Journey Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Onboarding Journey</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Guide new users through your product with personalized onboarding sequences that adapt based on their progress and engagement.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Welcome email sequences</li>
                <li>• Feature introduction tutorials</li>
                <li>• Progress tracking and encouragement</li>
                <li>• Abandoned onboarding recovery</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Re-engagement Journey</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Win back inactive customers with targeted campaigns that remind them of your value and encourage return visits.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Inactivity detection and triggers</li>
                <li>• Personalized win-back offers</li>
                <li>• Content recommendations</li>
                <li>• Sunset campaigns for unresponsive users</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Purchase Journey</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Guide customers from consideration to purchase with tailored content, offers, and nudges at every stage of the buying process.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Browse abandonment recovery</li>
                <li>• Cart abandonment sequences</li>
                <li>• Cross-sell and upsell campaigns</li>
                <li>• Post-purchase follow-up</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Lifecycle Journey</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Nurture customers throughout their entire lifecycle with your brand, from first touch to loyal advocate.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Birthday and anniversary campaigns</li>
                <li>• Loyalty program engagement</li>
                <li>• Referral program activation</li>
                <li>• VIP tier progression</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Ready to orchestrate perfect customer journeys?</h2>
          <p className="text-lg text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            Transform one-size-fits-all campaigns into personalized experiences that drive engagement and growth.
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