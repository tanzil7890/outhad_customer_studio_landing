'use client'
import React from 'react'

export default function ConvertiveHistoryPage() {
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
            <p className="text-lg font-mono text-[hsl(var(--app-text))] leading-relaxed">
              Convertive is a AI Research Lab and Product Company. Some products we have worked on is:
            </p>
          </div>

          {/* What We Built Before */}
          <section className="relative">
            <h2 className="text-2xl font-bold text-[hsl(var(--app-text))] mb-6 font-title">
              What We Built Before
            </h2>
            <p className="font-mono text-[hsl(var(--app-text-muted))] mb-8">
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
                    <span className="inline-flex items-center rounded-md bg-[hsl(var(--accent-foreground))]/10 border border-[hsl(var(--accent-foreground))]/20 px-2 py-1 text-xs font-mono text-[hsl(var(--accent-foreground))]">
                      Convertive Agent & Workflow Studio
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 font-title">
                    Visual Agent Orchestration for Real Work
                  </h3>
                  <p className="text-sm font-mono leading-relaxed text-[hsl(var(--app-text-muted))]">
                    Build, test, and ship AI agents that connect to your stack with ready-made connectors and actions. Chain tools, call APIs, and automate multi-step workflows across data sources like Salesforce, Slack, Shopify, Snowflake, Stripe, and more.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs font-mono text-[hsl(var(--app-text-muted))]">studio.tryconvertive.com</span>
                    <a
                      href="https://studio.tryconvertive.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[hsl(var(--accent-foreground))] font-mono text-sm hover:underline underline-offset-4"
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
                    <span className="inline-flex items-center rounded-md bg-[hsl(var(--accent-foreground))]/10 border border-[hsl(var(--accent-foreground))]/20 px-2 py-1 text-xs font-mono text-[hsl(var(--accent-foreground))]">
                      Convertive Search
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 font-title">
                    AI-Powered, Context-Aware Commerce Search
                  </h3>
                  <p className="text-sm font-mono leading-relaxed text-[hsl(var(--app-text-muted))]">
                    Context-aware search with high accuracy, personalized shopping guidance, and real-time insights to lift discovery and conversions. Designed for natural language queries, smarter recommendations, and measurable impact on revenue.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs font-mono text-[hsl(var(--app-text-muted))]">aisearch.tryconvertive.com</span>
                    <a
                      href="https://aisearch.tryconvertive.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[hsl(var(--accent-foreground))] font-mono text-sm hover:underline underline-offset-4"
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

function AgentStudioSlider() {
  const images = [
    '/images/agen-studio/studio1.png',
    '/images/agen-studio/studio2.png',
    '/images/agen-studio/studio3.png',
    '/images/agen-studio/studio4.png',
    '/images/agen-studio/studio5.png',
    '/images/agen-studio/studio6.png',
    '/images/agen-studio/studio7.png',
    '/images/agen-studio/studio8.png',
    '/images/agen-studio/studio9.png',
    '/images/agen-studio/studio10.png',
    '/images/agen-studio/studio11.png',
    '/images/agen-studio/studio12.png',
  ]

  const [index, setIndex] = React.useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-b-none">
        <img
          src={images[index]}
          alt={`Agent Studio screenshot ${index + 1}`}
          className="h-full w-full object-cover transition duration-500"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Controls */}
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--app-background))]/60 text-[hsl(var(--app-text))] backdrop-blur px-2 py-2 border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-background))]/80"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5A1 1 0 1 1 12.707 5.293L8.414 9.586l4.293 4.293a1 1 0 0 1 0 1.414Z"/></svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--app-background))]/60 text-[hsl(var(--app-text))] backdrop-blur px-2 py-2 border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-background))]/80"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.293 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 7.293 14.707L11.586 10 7.293 5.707a1 1 0 0 1 0-1.414Z"/></svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto p-3 border-t border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60">
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`relative h-14 w-24 shrink-0 overflow-hidden rounded border transition ${
              i === index
                ? 'border-[hsl(var(--accent-foreground))] ring-1 ring-[hsl(var(--accent-foreground))]'
                : 'border-[hsl(var(--app-border))] hover:border-[hsl(var(--app-text-muted))]'
            }`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
