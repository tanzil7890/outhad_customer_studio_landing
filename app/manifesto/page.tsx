'use client'

export default function ManifestoPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--app-background))]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--app-text))] mb-4 font-title">
            Outhad AI Manifesto
          </h1>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">
          
          {/* Opening Statement */}
          <div className="mb-12">
            <p className="text-lg font-mono text-[hsl(var(--app-text))] leading-relaxed">
              At Outhad AI, we believe every digital action—every click, scroll, and hesitation—is a signal of intent, not noise. We exist to listen in real time and transform that intent into immersive, predictive commerce, delivered across web, mobile, email, SMS, and ads without delay.
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

          {/* Why This Works */}
          <div className="pt-12 border-t border-[hsl(var(--app-border))]">
            <h3 className="text-xl text-[hsl(var(--app-text))] font-semibold mb-6 font-title">Why This Works</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-[hsl(var(--app-text))] font-semibold mb-2 font-title">Rallies Emotion & Clarity</h4>
                <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">
                  It starts with a bold claim and anchors the brand in the philosophy that real-time behavior matters.
                </p>
              </div>
              
              <div>
                <h4 className="text-[hsl(var(--app-text))] font-semibold mb-2 font-title">Speaks in Real-Time</h4>
                <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">
                  The focus on "live," "real time," and "session-aware" ties back to your key differentiator—acting within the moment.
                </p>
              </div>
              
              <div>
                <h4 className="text-[hsl(var(--app-text))] font-semibold mb-2 font-title">Human Touch</h4>
                <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">
                  Phrases like "we believe" and "listening to signals" give warmth and intention.
                </p>
              </div>
              
              <div>
                <h4 className="text-[hsl(var(--app-text))] font-semibold mb-2 font-title">Emphasizes Impact</h4>
                <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">
                  It clearly states the benefits—conversion, personalization, lean tech stack.
                </p>
              </div>

              <div>
                <h4 className="text-[hsl(var(--app-text))] font-semibold mb-2 font-title">Aligned with Strategy</h4>
                <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">
                  Reinforces your value props of autonomous experimentation, unified profiles, cart/session rescue, and omnichannel consistency.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
