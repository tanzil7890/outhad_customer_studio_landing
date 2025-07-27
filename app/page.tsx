"use client"

import Component from "../vercel-logo-particles"
import Companies from "../components/companies"
import { OrbitingCircles } from "../components/ui/orbiting-circles"
import Icons from "../components/global/icons"
import AnimatedBeamDemo from "../components/ui/magicui/animated-beam-demo"

export default function SyntheticV0PageForDeployment() {
  return (
    <div className="min-h-screen">
      {/* Main hero section with particle animation */}
      <div className="h-screen relative">
        <Component />
        
        {/* Orbiting Circles - Half visible at bottom-right edge */}
        <div className="absolute -bottom-96 -right-96 z-20 pointer-events-none">
          <div className="relative w-[768px] h-[768px] flex items-center justify-center">
            
              <OrbitingCircles
                speed={0.5}
                radius={120}
              >
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-70" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-80" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.25}
                radius={180}
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.1}
                radius={240}
              >
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-50" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
                <Icons.circle1 className="size-4 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-90" />
              </OrbitingCircles>
              
              <OrbitingCircles
                speed={0.05}
                radius={300}
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
              <OrbitingCircles
                speed={0.08}
                radius={360}
              >
                <Icons.circle2 className="size-1 text-[hsl(var(--app-text-muted))] opacity-40" />
                <Icons.circle2 className="size-2 text-[hsl(var(--app-text-muted))] opacity-60" />
                <Icons.circle1 className="size-3 text-[hsl(var(--app-text-muted))] opacity-50" />
              </OrbitingCircles>
          </div>
        </div>
      </div>
      
      {/* Companies section below */}
      <div className="bg-[hsl(var(--app-background))] relative z-10 mt-[-150px]">
        <Companies />
      </div>
      
      {/* Animated Beam Demo Section */}
      <div className="bg-[hsl(var(--app-background))] relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-mono text-[hsl(var(--app-text))] mb-4">
              AI Integration Network
            </h2>
            <p className="text-lg text-[hsl(var(--app-text-muted))] font-mono">
              Connect your tools and automate workflows with AI-powered integrations
            </p>
          </div>
          <AnimatedBeamDemo />
        </div>
      </div>
    </div>
  )
}