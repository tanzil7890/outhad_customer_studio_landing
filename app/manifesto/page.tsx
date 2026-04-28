import type { Metadata } from 'next'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'The Manifesto: Ecommerce Has an Anonymous Conversion Problem',
  description:
    'Ecommerce does not have a traffic problem. It has an anonymous conversion problem. The Convertive manifesto on real-time intent, hyper-personalization, autonomous optimization, and converting visitors before they bounce.',
  path: '/manifesto',
  keywords: [
    'anonymous conversion problem',
    'ecommerce manifesto',
    'in-session personalization philosophy',
    'real-time intent activation',
    'customer-first commerce',
    'responsible AI for ecommerce',
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
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C87941] font-bold mb-4">The Manifesto</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[hsl(var(--app-text))] mb-6 font-title leading-tight">
            Ecommerce does not have a traffic problem. It has an anonymous conversion problem.
          </h1>
          <p className="text-sm text-[hsl(var(--app-text-muted))] max-w-xl mx-auto">
            Roughly 70% of carts are abandoned. ~95% of sessions stay anonymous. The leak is not the top of the funnel.
          </p>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">

          {/* Opening Statement */}
          <div className="mb-12">
            <p className="text-lg text-[hsl(var(--app-text))] leading-relaxed">
              At Convertive, we believe every digital action—every click, scroll, and hesitation—is a signal of intent, not noise. We exist to listen in real time and transform that intent into immersive, predictive commerce, delivered across web, mobile, email, SMS, and ads without delay.
            </p>
            <p className="mt-4 text-lg text-[hsl(var(--app-text))] leading-relaxed">
              Most of the stack waits hours or days to act. By then the visitor is gone, retargeting is the only play, and CAC has already been paid twice. The fix is not more traffic. It is converting the traffic you already have — while the session is still live.
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
