import Component from "../components/vercel-logo-particles"
import Footer from "../components/footer"
import { Button } from "../components/ui/button"
import Link from "next/link"
import CustomerActivation from "@/components/customer-activation"
import ProblemsWeSolve from "@/components/problems-we-solve"
import Storylines from "@/components/storylines"
import HowItWorks from "@/components/how-it-works"
import Outcomes from "@/components/outcomes"
import IcpValue from "@/components/icp-value"
import Integrations from "@/components/integrations"
import FinalCta from "@/components/final-cta"
import WhyUs from "@/components/why-us"
import BeforeAfterSection from "@/components/before-after-section"
import CaseStudiesSection from "@/components/case-studies-section"
import HeroAnimation from "@/components/hero-animation"

export default function SyntheticV0PageForDeployment() {


  return (
    <div className="min-h-screen">
      {/* Hero Content */}
      <div className="bg-[hsl(var(--app-background))] pt-48 pb-5 sm:pt-40 sm:pb-16 px-4">
        <div className="text-center  ">
          <Link href={"https://gwaycapital.com/"} target="_blank" rel="noopener noreferrer" className="inline-block mb-6 hover:text-[hsl(var(--app-text-muted))]" >
          <div className="mb-6">
            Backed by 
            <img 
              src="https://gwaycapital.com/wp-content/uploads/2021/05/Gateway.png" 
              alt="Gateway Capital" 
              className="inline-block h-10 mx-4 opacity-80"
            />
          </div>
          </Link>
          <h1 className=" text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[hsl(var(--app-text))] mb-6 leading-tight max-w-6xl mx-auto">
            Convert anonymous visitors before they leave. {/* <span className="text-[hsl(var(--app-accent))]">Convert Them Now.</span> */}
          </h1>
          {/* style={{fontFamily: 'var(--font-labil-grotesk)'}} */}
          <p className="text-base sm:text-lg md:text-xl text-[hsl(var(--app-text-muted))] mb-8 max-w-4xl mx-auto leading-relaxed tracking-wide" >
            Convertive uses real-time AI to predict intent and intervene during the live session, converting anonymous visitors into buyers before they ever leave your site.
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
            <Link href="https://cal.com/tanzil-convertive" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
              >
                Book Demo
              </Button>
            </Link>
            <Link href="/roi-calculator">
              <Button
                variant="outline"
                size="sm"
                className="bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] border-2 border-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-background))] hover:text-[hsl(var(--app-text))] rounded-full transition-all duration-300 shadow-lg px-6 py-3 text-sm font-medium min-h-[44px] min-w-[120px]"
              >
                Calculate Your ROI
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

      <HeroAnimation />


      <BeforeAfterSection />
      <ProblemsWeSolve />
      <CustomerActivation />
      <Storylines />
      <HowItWorks />
      <WhyUs />
      <Outcomes />
      <IcpValue />
      <Integrations />
      {/* <PrivacySecurity /> */}
      <FinalCta />

      <CaseStudiesSection />



      {/* Particle Component Section */}
     {/*  <div className="bg-[hsl(var(--app-background))] relative z-10">
        <Component />
      </div> */}

      {/* Footer */}
      <Footer />
      
            {/* Animated Beam Demo Section - Mobile Optimized */}
      {/* <div className="bg-[hsl(var(--app-background))] relative z-10 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[hsl(var(--app-text))] mb-3 sm:mb-4 leading-tight">
              AI Integration Network
            </h2>
            <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] max-w-2xl mx-auto px-4">
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
