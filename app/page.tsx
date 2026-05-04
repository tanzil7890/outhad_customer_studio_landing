import type { Metadata } from 'next'
import ProductVideo from "@/components/product-video"
import Link from "next/link"
import Footer from "../components/footer"
import { Button } from "../components/ui/button"
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
import BlogsSection from "@/components/blogs-section"
import HeroAnimation from "@/components/hero-animation"
import HeroRoiCalculator from "@/components/hero-roi-calculator"
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { faqSchema, videoObjectSchema, howToSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Real-Time Customer Activation Platform for Ecommerce',
  description:
    'Convert anonymous ecommerce visitors before they leave. Convertive uses real-time AI, session-aware audiences, and in-session decisioning to increase conversions.',
  path: '/',
  keywords: [
    'real-time customer activation platform',
    'convert anonymous visitors',
    'ecommerce personalization software',
    'in-session AI personalization',
    'anonymous visitor conversion',
    'journey orchestration for ecommerce',
  ],
})

const platformPages = [
  {
    href: '/convertive-data-platform',
    title: 'Data Platform',
    description: 'Stream events, stitch identity, and keep every shopper profile activation-ready in real time.',
  },
  {
    href: '/convertive-audiences',
    title: 'Audiences',
    description: 'Build segments that update from live browsing behavior, not delayed warehouse snapshots.',
  },
  {
    href: '/convertive-ai-engine',
    title: 'Decisioning',
    description: 'Rank the next best action for each shopper using current context, intent, and value signals.',
  },
  {
    href: '/convertive-journey-orchestration',
    title: 'Journey Orchestration',
    description: 'Coordinate on-site and cross-channel journeys with guardrails, suppression, and shared state.',
  },
  {
    href: '/convertive-reporting',
    title: 'Reporting',
    description: 'Measure identity progression, decision quality, and lift with operator-friendly diagnostics.',
  },
  {
    href: '/blogs',
    title: 'Blogs',
    description: 'Review real customer outcomes and how brands use Convertive to grow conversions.',
  },
]

const homeFaqs = [
  {
    question: 'What does Convertive do?',
    answer:
      'Convertive helps ecommerce brands convert anonymous visitors before they leave by using live behavioral signals, real-time identity progression, and in-session decisioning to trigger the best next action.',
  },
  {
    question: 'Who is Convertive built for?',
    answer:
      'Convertive is built for ecommerce teams that want stronger conversion, higher cart recovery, and better personalization without stitching together multiple disconnected tools.',
  },
  {
    question: 'How is Convertive different from a traditional CDP or marketing automation tool?',
    answer:
      'Traditional tools often depend on delayed data and channel silos. Convertive focuses on live session context, real-time activation, and coordinated next-best-action decisions while the shopper is still on-site.',
  },
  {
    question: 'Which parts of the platform should I explore first?',
    answer:
      'Start with the data platform, audiences, and AI decisioning pages. They explain how Convertive captures behavior, builds live segments, and selects the best intervention for each shopper.',
  },
]

export default function SyntheticV0PageForDeployment() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            faqSchema(homeFaqs),
            videoObjectSchema({
              name: 'Convertive Platform Demo: Real-Time Anonymous Visitor Conversion',
              description:
                'Watch how Convertive converts anonymous ecommerce visitors before they leave using real-time AI, session-aware audiences, and in-session decisioning.',
              thumbnailUrl: absoluteUrl('/images/convertive-customer-activation-platform/hero-home.png'),
              uploadDate: '2024-10-01T00:00:00Z',
              contentUrl: absoluteUrl('/videos/product_demo4.mp4'),
              duration: 'PT2M',
            }),
            howToSchema([
              {
                name: 'Live Detection',
                text: 'Detect live session signals — scroll depth, product views, cart activity, pause behavior — to identify visitor intent in real time before they leave.',
              },
              {
                name: 'Instant Decision',
                text: 'Rank the next-best action for each anonymous visitor using current context, predicted value, and intent signals — all within the active session.',
              },
              {
                name: 'In-Session Delivery',
                text: 'Deliver the chosen personalized intervention on-site during the live session, before the shopper navigates away or abandons.',
              },
              {
                name: 'Anonymous to Known',
                text: 'Capture visitor identity progressively and stitch anonymous behavioral history into a permanent known profile for future activation.',
              },
            ]),
          ]),
        }}
      />

      {/* Hero Content */}
      <div className="bg-[#FAFAF8] pt-36 pb-10 sm:pt-32 sm:pb-16 px-4 overflow-x-clip">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — 50% — text content */}
            <div>
              <Link href="https://gwaycapital.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mb-6 hover:opacity-80 transition-opacity">
                <span className="text-sm text-[#9C8B7E]">Backed by</span>
                <img
                  src="https://gwaycapital.com/wp-content/uploads/2021/05/Gateway.png"
                  alt="Gateway Capital"
                  className="inline-block h-8 mx-3 opacity-80"
                />
              </Link>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1410] mb-5 leading-tight">
                Convert anonymous visitors before they leave.
              </h1>

              <p className="text-base sm:text-lg text-[#9C8B7E] mb-8 leading-relaxed">
                Convertive uses real-time AI to predict intent and intervene during the live session, converting anonymous visitors into buyers before they ever leave your site.
              </p>

              <div className="flex flex-row flex-wrap gap-2 sm:gap-3 items-center pl-8 sm:pl-14">
                <div className="relative">
                  <img
                    src="/images/arrows/arrow-11.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute -left-8 sm:-left-14 -top-0 h-8 sm:h-10 w-auto -rotate-[20deg] opacity-100"
                  />
                  <Link href="https://tryconvertive.com/demo" target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#1A1410] text-[#F5F0EB] border-2 border-[#1A1410] hover:bg-[#F5F0EB] hover:text-[#1A1410] rounded-full transition-all duration-300 shadow-lg px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium min-h-[44px] whitespace-nowrap"
                    >
                      Book Demo
                    </Button>
                  </Link>
                </div>
                <Link href="/roi-calculator">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#E8DDD4] text-[#1A1410] hover:bg-[#F5EFE8] rounded-full transition-all duration-300 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium min-h-[44px] whitespace-nowrap"
                  >
                    Full ROI Calculator →
                  </Button>
                </Link>
              </div>

              {/* Member of AWS Startup, NVIDIA Inception program */}
              <div className="mt-6 flex flex-col items-left sm:items-start gap-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8B7E] font-semibold">
                  Member of
                </p>
                <div className="flex flex-wrap items-center justify-left sm:justify-start gap-4 sm:gap-6 md:gap-7 max-w-full">
                  <img
                    src="/images/aws_startup.png"
                    alt="AWS Startup member"
                    className="h-10 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-none object-contain"
                  />
                  <img
                    src="/images/Nvidia_Inception_program.png"
                    alt="NVIDIA Inception Program member"
                    className="h-14 sm:h-16 md:h-20 w-auto max-w-[180px] sm:max-w-none object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right — 50% — ROI calculator */}
            <div>
              <HeroRoiCalculator />
            </div>

          </div>
        </div>
      </div>
      <img src="https://cdn.prod.website-files.com/6350808bc45bd0c902af10e6/66e47654be5d3e3979ea567e_rocket-illustration-updated.avif" loading="eager" width="387" height="Auto" alt="Convertive rocket illustration" className="am-rocket-illustration absolute z-20 hidden md:block" style={{opacity: 1, width: '300px', top: '500px', right: '0px', animation: 'float 3s ease-in-out infinite'}} />

      
      {/* Product Video */}
      <div className="bg-[#FAFAF8] px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-[#E8DDD4] shadow-xl">
          <ProductVideo src="/videos/product_demo4.mp4" />
        </div>
      </div>

     


      <BeforeAfterSection />
      <ProblemsWeSolve />
      <CustomerActivation />
      <Storylines />
      <HowItWorks />
      <HeroAnimation />
      <WhyUs />
      <Outcomes />
      <IcpValue />
      <Integrations />

      <section className="bg-[#F5EFE8] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[#1A1410]">
              Explore the Convertive platform
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9C8B7E] leading-relaxed">
              Each page below explains one part of the system in more detail so search engines and buyers can
              understand how Convertive turns live shopper behavior into conversion growth.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformPages.map((page) => (
              <article
                key={page.href}
                className="rounded-2xl border border-[#E8DDD4] bg-white p-6"
              >
                <h3 className="text-xl font-title text-[#1A1410]">
                  <Link href={page.href} className="hover:underline underline-offset-4">
                    {page.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9C8B7E]">
                  {page.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-title text-[#1A1410]">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9C8B7E]">
              These answers cover the core problems Convertive solves and reinforce the main topics this site should
              rank for.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {homeFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-[#E8DDD4] bg-[#FAFAF8] p-6"
              >
                <h3 className="text-lg sm:text-xl font-title text-[#1A1410]">{faq.question}</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#9C8B7E]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <PrivacySecurity /> */}
      <FinalCta />

      <BlogsSection />

      {/* Particle Component Section */}

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
