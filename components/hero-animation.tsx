'use client'

import { useRef } from 'react'
import { OrbitingCircles } from './ui/orbiting-circles'
import Icons from './global/icons'
import { AnimatedBeam } from './ui/magicui/animated-beam'
import IPhoneMockup from './iphone-mockup'

export default function HeroAnimation() {
  const componentRef = useRef<HTMLDivElement>(null)
  const aiSignalsRef = useRef<HTMLDivElement>(null)
  const aiDecisioningRef = useRef<HTMLDivElement>(null)
  const personasRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const intentRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen lg:h-screen"
      ref={containerRef}
    >
      {/* iPhone Mockup - Center Display */}
      <div
        ref={componentRef}
        className="hidden sm:flex absolute inset-0 items-center justify-center z-40 px-4"
      >
        <IPhoneMockup />
      </div>

      {/* Mobile: phone on top, feature cards stacked below */}
      <div className="sm:hidden z-40 px-4 pt-6 flex flex-col items-center gap-4">
        <IPhoneMockup />
        <div className="w-full max-w-[320px] flex flex-col gap-3">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 shadow-lg backdrop-blur-sm bg-opacity-80">
            <div className="text-xs text-[hsl(var(--app-text))] mb-2">AI Customer Intelligence</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[hsl(var(--app-background))] px-2 py-1 rounded text-[hsl(var(--app-text-muted))]">Intent: 0.82</div>
              <div className="bg-[hsl(var(--app-background))] px-2 py-1 rounded text-[hsl(var(--app-text-muted))]">LTV: High</div>
            </div>
          </div>
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 shadow-lg backdrop-blur-sm bg-opacity-80">
            <div className="text-xs text-[hsl(var(--app-text))] mb-2">AI Decisioning • Reasoning</div>
            <div className="space-y-1">
              {[
                { label: "Browsing sequence model", weight: 0.38 },
                { label: "Behavioral pattern mining", weight: 0.27 },
                { label: "Attribution & channel synergy", weight: 0.21 },
              ].map((f, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-[hsl(var(--app-text-muted))]">{f.label}</span>
                  <span className="text-[hsl(var(--app-text))] bg-[hsl(var(--app-background))] px-2 py-0.5 rounded">{f.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Signals Card - Top Left */}
      <div ref={aiSignalsRef} className="absolute top-16 left-4 sm:top-20 sm:left-8 lg:left-16 z-30 hidden sm:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-2">AI Intent Signals</div>
          <div className="space-y-1">
            {[
              "category_recommendation: Hiking",
              "purchase_recency: 90 days",
              "price_sensitivity: medium",
              "propensity_to_buy: 0.82"
            ].map((badge, i) => (
              <div key={i} className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-background))] px-2 py-1 rounded">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Decisioning Card - Top Right */}
      <div ref={aiDecisioningRef} className="absolute top-16 right-4 sm:top-20 sm:right-8 lg:right-16 z-30 hidden md:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-sm">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-3">AI Decisioning • Reasoning</div>
          <div className="space-y-2">
            {[
              { label: "Browsing sequence model", weight: 0.38 },
              { label: "Behavioral pattern mining", weight: 0.27 },
              { label: "Attribution & channel synergy", weight: 0.21 },
            ].map((factor, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-xs text-[hsl(var(--app-text-muted))]">{factor.label}</span>
                <span className="text-xs text-[hsl(var(--app-text))] bg-[hsl(var(--app-background))] px-2 py-0.5 rounded">{factor.weight}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-[hsl(var(--app-text-muted))] mt-3 pt-2 border-t border-[hsl(var(--app-border))]">
            Confidence: 0.82 • Privacy‑first governance
          </div>
        </div>
      </div>

      {/* Personas Card - Left Middle */}
      <div ref={personasRef} className="absolute top-1/2 left-4 sm:left-8 lg:left-16 -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-3">Customer Personas</div>
          <div className="space-y-2">
            {["Aisha • High‑LTV explorer", "Mateo • Deal‑driven", "Riya • Loyal subscriber"].map((persona, i) => (
              <div key={i} className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-background))] px-2 py-1.5 rounded flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                {persona}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Capabilities Card - Right Middle */}
      <div ref={capabilitiesRef} className="absolute top-1/2 right-4 sm:right-8 lg:right-16 -translate-y-1/2 z-30 hidden lg:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-3">Core Capabilities</div>
          <div className="space-y-2">
            {["Unified Profiles", "Real‑time Intent", "Explainable & Private"].map((point, i) => (
              <div key={i} className="text-xs text-[hsl(var(--app-text))] bg-[hsl(var(--app-background))] px-3 py-2 rounded flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intent Recognition Card - Bottom Left */}
      <div ref={intentRef} className="absolute bottom-32 left-4 sm:bottom-40 sm:left-8 lg:left-16 z-30 hidden sm:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-2">Intent Recognition</div>
          <div className="bg-[hsl(var(--app-background))] rounded px-3 py-2 text-xs text-[hsl(var(--app-text-muted))] border border-[hsl(var(--app-border))]">
            &quot;hiking boots waterproof&quot;
          </div>
          <div className="text-xs text-[hsl(var(--app-text-muted))] mt-2">
            Category: Outdoor Gear → Intent: High Purchase
          </div>
        </div>
      </div>

      {/* Live Performance Card - Bottom Right */}
      <div ref={performanceRef} className="absolute bottom-32 right-4 sm:bottom-40 sm:right-8 lg:right-16 z-30 hidden sm:block">
        <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
          <div className="text-xs sm:text-sm text-[hsl(var(--app-text))] mb-3">Live Performance</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[hsl(var(--app-text-muted))]">Conversion Rate</span>
              <span className="text-xs text-green-400">+23.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[hsl(var(--app-text-muted))]">Revenue/Visitor</span>
              <span className="text-xs text-green-400">+18.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[hsl(var(--app-text-muted))]">Email CTR</span>
              <span className="text-xs text-green-400">+31.2%</span>
            </div>
          </div>
          <div className="text-xs text-[hsl(var(--app-text-muted))] mt-3 pt-2 border-t border-[hsl(var(--app-border))] flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live • Updated 2s ago
          </div>
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={aiSignalsRef} toRef={componentRef} curvature={-30} className="hidden sm:block" />
      <AnimatedBeam containerRef={containerRef} fromRef={aiDecisioningRef} toRef={componentRef} curvature={30} className="hidden md:block" />
      <AnimatedBeam containerRef={containerRef} fromRef={personasRef} toRef={componentRef} curvature={-20} className="hidden lg:block" />
      <AnimatedBeam containerRef={containerRef} fromRef={capabilitiesRef} toRef={componentRef} curvature={20} className="hidden lg:block" />
      <AnimatedBeam containerRef={containerRef} fromRef={intentRef} toRef={componentRef} curvature={-30} className="hidden sm:block" />
      <AnimatedBeam containerRef={containerRef} fromRef={performanceRef} toRef={componentRef} curvature={30} className="hidden sm:block" />

      {/* Orbiting Circles - Right Bottom Corner */}
      <div className="absolute -bottom-48 -right-48 sm:-bottom-96 sm:-right-96 z-20 pointer-events-none">
        <div className="relative w-[400px] h-[400px] sm:w-[768px] sm:h-[768px] flex items-center justify-center">
          <OrbitingCircles speed={0.5} radius={60} className="sm:hidden">
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-70" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={90} className="sm:hidden">
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={120} className="sm:hidden">
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.5} radius={120} className="hidden sm:block">
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-70" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={180} className="hidden sm:block">
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={240} className="hidden sm:block">
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.05} radius={300} className="hidden sm:block">
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.08} radius={360} className="hidden sm:block">
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
          </OrbitingCircles>
        </div>
      </div>

      {/* Orbiting Circles - Left Bottom Corner */}
      <div className="absolute -bottom-48 -left-48 sm:-bottom-96 sm:-left-96 z-20 pointer-events-none">
        <div className="relative w-[400px] h-[400px] sm:w-[768px] sm:h-[768px] flex items-center justify-center">
          <OrbitingCircles speed={0.5} radius={60} className="sm:hidden" reverse>
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-70" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={90} className="sm:hidden" reverse>
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={120} className="sm:hidden" reverse>
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.5} radius={120} className="hidden sm:block" reverse>
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-70" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={180} className="hidden sm:block" reverse>
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={240} className="hidden sm:block" reverse>
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
            <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.05} radius={300} className="hidden sm:block" reverse>
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.08} radius={360} className="hidden sm:block" reverse>
            <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
            <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
            <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  )
}
