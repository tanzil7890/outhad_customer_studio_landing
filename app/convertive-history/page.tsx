import type { Metadata } from 'next'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import AgentStudioSlider from '@/components/agent-studio-slider'

export const metadata: Metadata = buildMetadata({
  title: 'Our History',
  description:
    "Learn about Convertive's journey as an AI research lab and product company. Explore the products we built — from visual agent orchestration to AI-powered commerce search.",
  path: '/convertive-history',
  keywords: [
    'Convertive history',
    'AI research lab',
    'agent studio',
    'AI-powered ecommerce search',
    'Convertive products',
    'company background',
  ],
})

export default function ConvertiveHistoryPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Our History', url: absoluteUrl('/convertive-history') },
  ])
  return (
    <div 
      className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--app-background))] relative"
      style={{
        backgroundImage: 'url(/pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        backgroundPosition: 'top left'
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-[hsl(var(--app-background))] opacity-90"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--app-text))] mb-4 font-title">
            Convertive History
          </h1>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">
          
          {/* Opening Statement */}
          <div className="mb-12">
            <p className="text-lg text-[hsl(var(--app-text))] leading-relaxed">
              Convertive is a AI Research Lab and Product Company. Some products we have worked on is:
            </p>
          </div>

          {/* What We Built Before */}
          <section className="relative">
            <h2 className="text-2xl font-bold text-[hsl(var(--app-text))] mb-6 font-title">
              What We Built Before
            </h2>
            <p className="text-[hsl(var(--app-text-muted))] mb-8">
              Before our current focus on real-time activation and session-aware personalization, we built foundational products that explored agents and AI-powered search. Here are two highlights from that journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Agent Studio Card */}
              <div
                className="group rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/70 backdrop-blur-sm overflow-hidden transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-[hsl(var(--accent-foreground))]"
              >
                <AgentStudioSlider />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-md bg-[hsl(var(--accent-foreground))]/10 border border-[hsl(var(--accent-foreground))]/20 px-2 py-1 text-xs text-[hsl(var(--accent-foreground))]">
                      Convertive Agent & Workflow Studio
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 font-title">
                    Visual Agent Orchestration for Real Work
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--app-text-muted))]">
                    Build, test, and ship AI agents that connect to your stack with ready-made connectors and actions. Chain tools, call APIs, and automate multi-step workflows across data sources like Salesforce, Slack, Shopify, Snowflake, Stripe, and more.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-[hsl(var(--app-text-muted))]">studio.tryconvertive.com</span>
                    <a
                      href="https://studio.tryconvertive.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[hsl(var(--accent-foreground))] text-sm hover:underline underline-offset-4"
                    >
                      Visit <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 10a1 1 0 0 1 1-1h5.586L9.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 1 1 9.293 13.293L11.586 11H6a1 1 0 0 1-1-1Z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Convertive Search Card */}
              <div
                className="group rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/70 backdrop-blur-sm overflow-hidden transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-[hsl(var(--accent-foreground))]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/aisearch/convertive-aisearch1.png"
                    alt="Convertive Search - context-aware e-commerce search"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-md bg-[hsl(var(--accent-foreground))]/10 border border-[hsl(var(--accent-foreground))]/20 px-2 py-1 text-xs text-[hsl(var(--accent-foreground))]">
                      Convertive Search
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 font-title">
                    AI-Powered, Context-Aware Commerce Search
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--app-text-muted))]">
                    Context-aware search with high accuracy, personalized shopping guidance, and real-time insights to lift discovery and conversions. Designed for natural language queries, smarter recommendations, and measurable impact on revenue.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-[hsl(var(--app-text-muted))]">aisearch.tryconvertive.com</span>
                    <a
                      href="https://aisearch.tryconvertive.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[hsl(var(--accent-foreground))] text-sm hover:underline underline-offset-4"
                    >
                      Visit <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 10a1 1 0 0 1 1-1h5.586L9.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 1 1 9.293 13.293L11.586 11H6a1 1 0 0 1-1-1Z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          

          
        </div>
      </div>
    </div>
  )
}
