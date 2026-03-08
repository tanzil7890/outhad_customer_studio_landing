import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convertive Manifesto - Our Vision for Customer-First Commerce',
  description: 'Our mission to transform commerce through real-time customer activation, privacy-first data practices, and AI that serves human needs. Read our manifesto on the future of personalized commerce.',
  keywords: [
    'company manifesto',
    'customer-first commerce',
    'AI ethics',
    'privacy-first data',
    'commerce transformation',
    'real-time personalization ethics',
    'responsible AI',
    'customer activation philosophy',
    'data privacy manifesto',
    'ethical commerce',
    'AI transparency',
    'customer empowerment',
    'digital commerce future',
    'human-centered AI'
  ],
  openGraph: {
    title: 'Convertive Manifesto - Our Vision for Customer-First Commerce',
    description: 'Our mission to transform commerce through real-time customer activation and privacy-first AI.',
    url: 'https://tryconvertive.com/manifesto',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Convertive Manifesto - Our Vision for Customer-First Commerce',
    description: 'Our mission to transform commerce through real-time customer activation and privacy-first AI.',
  },
  alternates: {
    canonical: '/manifesto',
  },
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--app-background))]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--app-text))] mb-4 font-title">
            Convertive Manifesto
          </h1>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">
          
          {/* Opening Statement */}
          <div className="mb-12">
            <p className="text-lg font-mono text-[hsl(var(--app-text))] leading-relaxed">
              At Convertive, we believe every digital action—every click, scroll, and hesitation—is a signal of intent, not noise. We exist to listen in real time and transform that intent into immersive, predictive commerce, delivered across web, mobile, email, SMS, and ads without delay.
            </p>
          </div>

          {/* Core Beliefs */}
          <div className="space-y-8">
            
            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Unified Intelligence</h3>
              <p className="text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                We unify fragmented behaviors into live, evolving shopper profiles that understand who users are and what they need—before they even know it themselves.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Hyper-Personalization</h3>
              <p className="text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                We deliver hyper-personalized experiences, fueled by real-time behavior and AI: dynamic nudges, upsells, offers, and optimizations that feel intuitive, not intrusive.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Autonomous Optimization</h3>
              <p className="text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                We strip away the manual grind of experimentation. With our AI-powered autonomy, every test writes its own future, continuously learning, optimizing, and deploying—no engineers required.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Real-Time Integration</h3>
              <p className="text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                We inject real-time intelligence into the heart of your stack—layering on top of CDPs, ESPs, checkout platforms, and ad networks—so you build powerful growth workflows in days instead of months.
              </p>
            </div>

          </div>

          {/* Our Promise */}
          <div>
            <h3 className="text-xl text-[hsl(var(--app-text))] font-semibold mb-6 font-title">Our Promise</h3>
            
            <div className="space-y-4">
              <p className="font-mono text-[hsl(var(--app-text))]">
                Per-session relevance that turns hesitation into conversion.
              </p>
              <p className="font-mono text-[hsl(var(--app-text))]">
                Intelligent personalization that lifts AOV and ROAS, without guesswork.
              </p>
              <p className="font-mono text-[hsl(var(--app-text))]">
                A lean, unified stack that saves cost, time, and mental overhead.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <p className="text-lg font-mono text-[hsl(var(--app-text))] leading-relaxed mb-4">
              Because in today's attention-short world, standing still is giving up.
            </p>
            <p className="text-lg font-mono text-[hsl(var(--app-text))] leading-relaxed font-semibold">
              We're here to help you move intelligently, adapt instantly, and compound growth—one live moment at a time.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
