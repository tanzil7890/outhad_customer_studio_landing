import type { Metadata } from 'next'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Manifesto',
  description:
    'Read the Convertive manifesto on customer-first commerce, privacy-aware data practices, and real-time AI for ecommerce growth.',
  path: '/manifesto',
  keywords: [
    'company manifesto',
    'customer-first commerce',
    'privacy-aware personalization',
    'responsible AI for ecommerce',
    'customer activation philosophy',
  ],
  type: 'article',
})

export default function ManifestoPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Manifesto', url: absoluteUrl('/manifesto') },
  ])
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--app-background))]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
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
            <p className="text-lg text-[hsl(var(--app-text))] leading-relaxed">
              At Convertive, we believe every digital action—every click, scroll, and hesitation—is a signal of intent, not noise. We exist to listen in real time and transform that intent into immersive, predictive commerce, delivered across web, mobile, email, SMS, and ads without delay.
            </p>
          </div>

          {/* Core Beliefs */}
          <div className="space-y-8">
            
            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Unified Intelligence</h3>
              <p className="text-[hsl(var(--app-text-muted))] leading-relaxed">
                We unify fragmented behaviors into live, evolving shopper profiles that understand who users are and what they need—before they even know it themselves.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Hyper-Personalization</h3>
              <p className="text-[hsl(var(--app-text-muted))] leading-relaxed">
                We deliver hyper-personalized experiences, fueled by real-time behavior and AI: dynamic nudges, upsells, offers, and optimizations that feel intuitive, not intrusive.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Autonomous Optimization</h3>
              <p className="text-[hsl(var(--app-text-muted))] leading-relaxed">
                We strip away the manual grind of experimentation. With our AI-powered autonomy, every test writes its own future, continuously learning, optimizing, and deploying—no engineers required.
              </p>
            </div>

            <div>
              <h3 className="text-lg text-[hsl(var(--app-text))] font-semibold mb-3 font-title">Real-Time Integration</h3>
              <p className="text-[hsl(var(--app-text-muted))] leading-relaxed">
                We inject real-time intelligence into the heart of your stack—layering on top of CDPs, ESPs, checkout platforms, and ad networks—so you build powerful growth workflows in days instead of months.
              </p>
            </div>

          </div>

          {/* Our Promise */}
          <div>
            <h3 className="text-xl text-[hsl(var(--app-text))] font-semibold mb-6 font-title">Our Promise</h3>
            
            <div className="space-y-4">
              <p className="text-[hsl(var(--app-text))]">
                Per-session relevance that turns hesitation into conversion.
              </p>
              <p className="text-[hsl(var(--app-text))]">
                Intelligent personalization that lifts AOV and ROAS, without guesswork.
              </p>
              <p className="text-[hsl(var(--app-text))]">
                A lean, unified stack that saves cost, time, and mental overhead.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <p className="text-lg text-[hsl(var(--app-text))] leading-relaxed mb-4">
              Because in today's attention-short world, standing still is giving up.
            </p>
            <p className="text-lg text-[hsl(var(--app-text))] leading-relaxed font-semibold">
              We're here to help you move intelligently, adapt instantly, and compound growth—one live moment at a time.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
