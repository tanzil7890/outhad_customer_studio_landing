"use client"

import Component from "../components/vercel-logo-particles"
import Companies from "../components/companies"
import Footer from "../components/footer"
import { OrbitingCircles } from "../components/ui/orbiting-circles"
import Icons from "../components/global/icons"
import AnimatedBeamDemo from "../components/ui/magicui/animated-beam-demo"
import { AnimatedBeam } from "../components/ui/magicui/animated-beam"

import IPhoneMockup from "../components/iphone-mockup"
import { useRef } from "react"
import { Button } from "../components/ui/button"
import Link from "next/link"
import CustomerActivation from "@/components/customer-activation"
import ProblemsWeSolve from "@/components/problems-we-solve"
import Storylines from "@/components/storylines"
import HowItWorks from "@/components/how-it-works"
import Outcomes from "@/components/outcomes"
import IcpValue from "@/components/icp-value"
import Integrations from "@/components/integrations"
import PrivacySecurity from "@/components/privacy-security"
import FinalCta from "@/components/final-cta"
import WhyUs from "@/components/why-us"

export default function SyntheticV0PageForDeployment() {
  // Refs for animated beams
  const componentRef = useRef<HTMLDivElement>(null)
  const aiSignalsRef = useRef<HTMLDivElement>(null)
  const aiDecisioningRef = useRef<HTMLDivElement>(null)
  const personasRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const intentRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  

  return (
    <div className="min-h-screen">
      {/* Hero Content */}
      <div className="bg-[hsl(var(--app-background))] pt-48 pb-5 sm:pt-56 sm:pb-16 px-4">
        <div className="text-center  ">
          <Link href={"https://gwaycapital.com/"} target="_blank" rel="noopener noreferrer" className="inline-block mb-6 hover:text-[hsl(var(--app-text-muted))]" >
          <div className="mb-6 font-mono">
            Backed by 
            <img 
              src="https://gwaycapital.com/wp-content/uploads/2021/05/Gateway.png" 
              alt="Gateway Capital" 
              className="inline-block h-10 mx-4 opacity-80"
            />
          </div>
          </Link>
          <h1 className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl  text-[hsl(var(--app-text))] mb-6 leading-tight max-w-6xl mx-auto" style={{fontFamily: 'var(--font-nib-pro)'}}>
            Deliver 1:1 Personalization, not just campaigns to your Shoppers
          </h1>
          {/* style={{fontFamily: 'var(--font-labil-grotesk)'}} */}
          <p className="text-base sm:text-lg md:text-xl text-[hsl(var(--app-text-muted))] mb-8 max-w-4xl mx-auto leading-relaxed font-mono" >
            Convertive is the all‑in‑one marketing platform that turns live shopper behavior into revenue. Deliver real‑time personalization, recover carts, and build unified customer profiles to boost conversions by 15–30% and eliminate abandonment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
            {/* Add Arrow Image */}
            <img 
              src="/images/arrows/arrow-11.svg" 
              alt="Arrow pointing to Book Demo" 
              className="w-20 h-20 text-[hsl(var(--app-text-muted))] opacity-70 pointer-events-none hidden sm:block animate-bounce mr-2"
              style={{
                filter: 'brightness(0) saturate(100%) invert(21%) sepia(0%) saturate(2%) hue-rotate(346deg) brightness(95%) contrast(86%)',
                transform: 'scaleY(-1)',
                transformOrigin: 'center'
              }}
            />
            <Link href="https://cal.com/tanzil-meeting" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
              >
                Book Demo
              </Button>
            </Link>
            <Link href="https://cal.com/tanzil-meeting" target="_blank">
              <Button 
                variant="outline"
                size="sm"
                className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
              >
                See Convertive in action
              </Button>
            </Link>
            <img src="https://cdn.prod.website-files.com/6350808bc45bd0c902af10e6/66e47654be5d3e3979ea567e_rocket-illustration-updated.avif" loading="eager" width="387" height="Auto" alt="" className="am-rocket-illustration absolute z-20 hidden md:block" style={{opacity: 1, width: '300px', top: '-100px', right: '0px', animation: 'float 3s ease-in-out infinite'}} />
            
          </div>

          {/* <div className="mt-6 text-sm text-[hsl(var(--app-text-muted))] italic max-w-2xl mx-auto">
            Backed by industry leaders from  
            <span className="font-semibold text-[hsl(var(--app-text))] mx-1">Amazon</span>, 
            <span className="font-semibold text-[hsl(var(--app-text))] mx-1">Clorox</span>, and 
            <span className="font-semibold text-[hsl(var(--app-text))] mx-1">TechGear</span>
          </div> */}
        </div>
      </div>

      {/* Convertive in action */}
      {/* Mobile: avoid full viewport height to remove large top gap */}
      <div
        className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen lg:h-screen"
        ref={containerRef}
      >
        {/* <div ref={componentRef} className="absolute inset-0 flex items-center justify-center">
          
          <Component />
        </div> */}

        {/* iPhone Mockup - Center Display */}
        {/* Desktop/Tablet: keep centered absolute; Mobile handled below */}
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
            {/* Compact summary, same style as previous mobile compact card */}
            <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 shadow-lg backdrop-blur-sm bg-opacity-80">
              <div className="text-xs font-mono text-[hsl(var(--app-text))] mb-2">AI Customer Intelligence</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[hsl(var(--app-background))] px-2 py-1 rounded text-[hsl(var(--app-text-muted))]">Intent: 0.82</div>
                <div className="bg-[hsl(var(--app-background))] px-2 py-1 rounded text-[hsl(var(--app-text-muted))]">LTV: High</div>
              </div>
            </div>
            {/* AI Decisioning */}
            <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 shadow-lg backdrop-blur-sm bg-opacity-80">
              <div className="text-xs font-mono text-[hsl(var(--app-text))] mb-2">AI Decisioning • Reasoning</div>
              <div className="space-y-1">
                {[
                  { label: "Browsing sequence model", weight: 0.38 },
                  { label: "Behavioral pattern mining", weight: 0.27 },
                  { label: "Attribution & channel synergy", weight: 0.21 },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[hsl(var(--app-text-muted))]">{f.label}</span>
                    <span className="text-[hsl(var(--app-text))] bg-[hsl(var(--app-background))] px-2 py-0.5 rounded">{f.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Note: Remaining feature cards hidden on mobile to keep only two */}
          </div>
        </div>
        
        {/* Feature Cards - Floating around the hero */}
        {/* AI Badges Card - Top Left */}
        <div ref={aiSignalsRef} className="absolute top-16 left-4 sm:top-20 sm:left-8 lg:left-16 z-30 hidden sm:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-2">AI Intent Signals</div>
            <div className="space-y-1">
              {[
                "category_recommendation: Hiking",
                "purchase_recency: 90 days", 
                "price_sensitivity: medium",
                "propensity_to_buy: 0.82"
              ].map((badge, i) => (
                <div key={i} className="text-xs text-[hsl(var(--app-text-muted))] font-mono bg-[hsl(var(--app-background))] px-2 py-1 rounded">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Decisioning Card - Top Right */}
        <div ref={aiDecisioningRef} className="absolute top-16 right-4 sm:top-20 sm:right-8 lg:right-16 z-30 hidden md:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-sm">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-3">AI Decisioning • Reasoning</div>
            <div className="space-y-2">
              {[
                {label: "Browsing sequence model", weight: 0.38},
                {label: "Behavioral pattern mining", weight: 0.27},
                {label: "Attribution & channel synergy", weight: 0.21}
              ].map((factor, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs text-[hsl(var(--app-text-muted))] font-mono">{factor.label}</span>
                  <span className="text-xs text-[hsl(var(--app-text))] font-mono bg-[hsl(var(--app-background))] px-2 py-0.5 rounded">{factor.weight}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-[hsl(var(--app-text-muted))] font-mono mt-3 pt-2 border-t border-[hsl(var(--app-border))]">
              Confidence: 0.82 • Privacy‑first governance
            </div>
          </div>
        </div>

        {/* Personas Card - Left Middle */}
        <div ref={personasRef} className="absolute top-1/2 left-4 sm:left-8 lg:left-16 -translate-y-1/2 z-30 hidden lg:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-3">Customer Personas</div>
            <div className="space-y-2">
              {[
                "Aisha • High‑LTV explorer",
                "Mateo • Deal‑driven", 
                "Riya • Loyal subscriber"
              ].map((persona, i) => (
                <div key={i} className="text-xs text-[hsl(var(--app-text-muted))] font-mono bg-[hsl(var(--app-background))] px-2 py-1.5 rounded flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                  {persona}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proof Points Card - Right Middle */}
        <div ref={capabilitiesRef} className="absolute top-1/2 right-4 sm:right-8 lg:right-16 -translate-y-1/2 z-30 hidden lg:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-3">Core Capabilities</div>
            <div className="space-y-2">
              {[
                "Unified Profiles",
                "Real‑time Intent", 
                "Explainable & Private"
              ].map((point, i) => (
                <div key={i} className="text-xs text-[hsl(var(--app-text))] font-mono bg-[hsl(var(--app-background))] px-3 py-2 rounded flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Intent Card - Bottom Left */}
        <div ref={intentRef} className="absolute bottom-32 left-4 sm:bottom-40 sm:left-8 lg:left-16 z-30 hidden sm:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-2">Intent Recognition</div>
            <div className="bg-[hsl(var(--app-background))] rounded px-3 py-2 text-xs text-[hsl(var(--app-text-muted))] font-mono border border-[hsl(var(--app-border))]">
              "hiking boots waterproof"
            </div>
            <div className="text-xs text-[hsl(var(--app-text-muted))] font-mono mt-2">
              Category: Outdoor Gear → Intent: High Purchase
            </div>
          </div>
        </div>

        {/* Real-time Performance Card - Bottom Right */}
        <div ref={performanceRef} className=" absolute bottom-32 right-4 sm:bottom-40 sm:right-8 lg:right-16 z-30 hidden sm:block">
          <div className="bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-lg p-3 sm:p-4 shadow-lg backdrop-blur-sm bg-opacity-80 max-w-xs">
            <div className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] mb-3">Live Performance</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[hsl(var(--app-text-muted))] font-mono">Conversion Rate</span>
                <span className="text-xs text-green-400 font-mono">+23.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[hsl(var(--app-text-muted))] font-mono">Revenue/Visitor</span>
                <span className="text-xs text-green-400 font-mono">+18.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[hsl(var(--app-text-muted))] font-mono">Email CTR</span>
                <span className="text-xs text-green-400 font-mono">+31.2%</span>
              </div>
            </div>
            <div className="text-xs text-[hsl(var(--app-text-muted))] font-mono mt-3 pt-2 border-t border-[hsl(var(--app-border))] flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live • Updated 2s ago
            </div>
          </div>
        </div>

        {/* Mobile Compact Card (legacy) removed — replaced with stacked cards under phone */}

        {/* Animated Beams connecting cards directly to the iPhone center */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={aiSignalsRef}
          toRef={componentRef}
          curvature={-30}
          className="hidden sm:block"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={aiDecisioningRef}
          toRef={componentRef}
          curvature={30}
          className="hidden md:block"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={personasRef}
          toRef={componentRef}
          curvature={-20}
          className="hidden lg:block"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={capabilitiesRef}
          toRef={componentRef}
          curvature={20}
          className="hidden lg:block"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={intentRef}
          toRef={componentRef}
          curvature={-30}
          className="hidden sm:block"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={performanceRef}
          toRef={componentRef}
          curvature={30}
          className="hidden sm:block"
        />
        
        {/* Orbiting Circles - Right Bottom Corner */}
        <div className="absolute -bottom-48 -right-48 sm:-bottom-96 sm:-right-96 z-20 pointer-events-none">
          <div className="relative w-[400px] h-[400px] sm:w-[768px] sm:h-[768px] flex items-center justify-center">
            
              {/* Mobile: Smaller radii, Desktop: Full size */}
              <OrbitingCircles
                speed={0.5}
                radius={60}
                className="sm:hidden"
              >
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-70" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-80" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.25}
                radius={90}
                className="sm:hidden"
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.1}
                radius={120}
                className="sm:hidden"
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
              </OrbitingCircles>
              
              {/* Desktop: Original larger sizes */}
              <OrbitingCircles
                speed={0.5}
                radius={120}
                className="hidden sm:block"
              >
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-70" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-80" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.25}
                radius={180}
                className="hidden sm:block"
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.1}
                radius={240}
                className="hidden sm:block"
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.05}
                radius={300}
                className="hidden sm:block"
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.08}
                radius={360}
                className="hidden sm:block"
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
          </div>
        </div>

        {/* Orbiting Circles - Left Bottom Corner */}
        <div className="absolute -bottom-48 -left-48 sm:-bottom-96 sm:-left-96 z-20 pointer-events-none">
          <div className="relative w-[400px] h-[400px] sm:w-[768px] sm:h-[768px] flex items-center justify-center">
            
              {/* Mobile: Smaller radii, Desktop: Full size */}
              <OrbitingCircles
                speed={0.5}
                radius={60}
                className="sm:hidden"
                reverse
              >
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-70" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-80" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.25}
                radius={90}
                className="sm:hidden"
                reverse
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.1}
                radius={120}
                className="sm:hidden"
                reverse
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-90" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-60" />
              </OrbitingCircles>
              
              {/* Desktop: Original larger sizes */}
              <OrbitingCircles
                speed={0.5}
                radius={120}
                className="hidden sm:block"
                reverse
              >
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-70" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-80" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.25}
                radius={180}
                className="hidden sm:block"
                reverse
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.1}
                radius={240}
                className="hidden sm:block"
                reverse
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.05}
                radius={300}
                className="hidden sm:block"
                reverse
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.08}
                radius={360}
                className="hidden sm:block"
                reverse
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
          </div>
        </div>
      </div>
      
      {/* Companies section below */}
      {/* <div className="bg-[hsl(var(--app-background))] relative z-10 mt-[80px]">
        <Companies />
      </div> */}

      <ProblemsWeSolve />
      <CustomerActivation />
      <Storylines />
      <HowItWorks />
      <WhyUs />
      <Outcomes />
      <IcpValue />
      <Integrations />
      <PrivacySecurity />
      <FinalCta />




      {/* Particle Component Section */}
      <div className="bg-[hsl(var(--app-background))] relative z-10">
        <Component />
      </div>

      {/* Footer */}
      <Footer />
      
            {/* Animated Beam Demo Section - Mobile Optimized */}
      {/* <div className="bg-[hsl(var(--app-background))] relative z-10 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono text-[hsl(var(--app-text))] mb-3 sm:mb-4 leading-tight">
              AI Integration Network
            </h2>
            <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] font-mono max-w-2xl mx-auto px-4">
              Connect your tools and automate workflows with AI-powered integrations
            </p>
          </div>
          
         
          <div className="w-full overflow-hidden">
            <AnimatedBeamDemo />
          </div>
        </div>
      </div> */}
    </div>
  )
}
