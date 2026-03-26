"use client"

import { motion } from "framer-motion"
import { Clock, Zap, X, Check } from "lucide-react"

const afterTheFactSteps = [
  "Visitor browses your site (anonymous)",
  "Visitor leaves without converting",
  "4-24 hours pass...",
  "Retargeting email sent (if you have their email)",
  "Most visitors are gone forever",
]

const inSessionSteps = [
  { action: "Visitor arrives (profiled in real-time)", time: "0:00" },
  { action: "AI predicts intent in milliseconds", time: "0:15" },
  { action: "Perfect intervention triggered in-session", time: "0:18" },
  { action: "Identity captured at the right moment", time: "0:32" },
  { action: "Conversion complete before they leave", time: "0:47" },
]

export default function BeforeAfterSection() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-[hsl(var(--app-background))]">
      <div className=" max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-title text-[hsl(var(--app-text))]">
                Before They Leave vs. After They&apos;re Gone
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[hsl(var(--app-text-muted))]">
                The difference is not only what you do. It is when you do it.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-5 items-stretch text-left">
              <article className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wide text-[hsl(var(--app-text-muted))]">After the fact</p>
                <h3 className="mt-1 text-xl sm:text-2xl font-title text-[hsl(var(--app-text))]">Traditional Marketing Stack</h3>
                <div className="mt-4 space-y-3">
                  {afterTheFactSteps.map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--app-border))] text-xs text-[hsl(var(--app-text))]">
                        {index + 1}
                      </span>
                      <p className="text-sm text-[hsl(var(--app-text-muted))]">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                  <p className="text-sm font-title text-[hsl(var(--app-text))]">Conversion baseline: 2-4%</p>
                  <p className="text-xs uppercase tracking-wide text-[hsl(var(--app-text-muted))]">Too late</p>
                </div>
              </article>

              <div className="flex items-center justify-center">
                <span className="inline-flex rounded-full border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-4 py-1.5 text-xs sm:text-sm tracking-[0.18em] text-[hsl(var(--app-text))]">
                  VS
                </span>
              </div>

              <article className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-surface))]/60 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wide text-[hsl(var(--app-text-muted))]">In-session intervention</p>
                <h3 className="mt-1 text-xl sm:text-2xl font-title text-[hsl(var(--app-text))]">Convertive Real-Time AI</h3>
                <div className="mt-4 space-y-3">
                  {inSessionSteps.map((step, index) => (
                    <div key={step.action} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--app-border))] bg-[hsl(var(--app-primary))]/15 text-xs text-[hsl(var(--app-text))]">
                          {index + 1}
                        </span>
                        <p className="text-sm text-[hsl(var(--app-text))]">{step.action}</p>
                      </div>
                      <span className="mt-0.5 shrink-0 rounded-full border border-[hsl(var(--app-border))] px-2 py-0.5 text-[11px] text-[hsl(var(--app-text-muted))]">
                        {step.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                  <p className="text-sm font-title text-[hsl(var(--app-text))]">Conversion lift potential: 15-30%</p>
                  <p className="text-xs uppercase tracking-wide text-[hsl(var(--app-text-muted))]">Real-time</p>
                </div>
              </article>
            </div>

            <p className="mt-5 text-center text-sm sm:text-base text-[hsl(var(--app-text-muted))]">
              The intent moment is perishable. Convertive acts before it passes.
            </p>
          </div>
    </section>
  )
}
