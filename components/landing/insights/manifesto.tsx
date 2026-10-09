import { Check } from 'lucide-react'
import { MANIFESTO } from '@/lib/landing/insights'
import { Reveal } from '../shared/reveal'
import { container } from '../shared/layout'
import InsightShell, { InsightSection } from './insight-shell'
import ManifestoBeliefs from './manifesto-beliefs'

export default function Manifesto() {
  const m = MANIFESTO
  const [lead, ...rest] = m.opening[0].split('—')
  return (
    <InsightShell
      insight="manifesto"
      title={m.title}
      lede={m.lede}
      secondary={{ label: 'How the mechanism works', href: '/the-mechanism' }}
      closing={{ title: 'Convert the traffic you already have.', body: 'While the session is still live. See what Convertive would do with your shoppers in a 15-minute demo.' }}
    >
      {/* The two numbers behind the problem, as the original lede states them */}
      <section className="pb-24 sm:pb-28">
        <div className={container}>
          <dl aria-hidden className="grid gap-px overflow-hidden rounded-3xl bg-night-line sm:grid-cols-2">
            {[
              { value: '~70%', label: 'of carts are abandoned' },
              { value: '~95%', label: 'of sessions stay anonymous' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2 bg-night p-8 sm:p-10">
                <dt className="text-lg text-night-soft">{s.label}</dt>
                <dd className="text-7xl font-semibold tracking-tight text-night-text sm:text-8xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Opening */}
      <InsightSection>
        <div className="max-w-5xl space-y-10">
          <Reveal>
            <p className="text-3xl font-semibold leading-[1.25] tracking-tight text-night-text sm:text-[2.6rem]">
              {lead}
              {rest.length > 0 && <span className="text-night-soft">—{rest.join('—')}</span>}
            </p>
          </Reveal>
          <Reveal>
            <p className="max-w-3xl text-xl leading-relaxed text-night-soft sm:text-2xl">{m.opening[1]}</p>
          </Reveal>
        </div>
      </InsightSection>

      <InsightSection eyebrow="What we believe" title="Four beliefs.">
        <ManifestoBeliefs />
      </InsightSection>

      <InsightSection eyebrow="Our promise" title="What you can hold us to.">
        <ul className="space-y-4">
          {m.promise.map((p, i) => (
            <li key={p}>
              <Reveal delay={i * 0.08}>
                <p className="flex items-start gap-5 rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line sm:p-9">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-text text-night">
                    <Check aria-hidden className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="text-2xl font-semibold leading-snug tracking-tight text-night-text sm:text-3xl">{p}</span>
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </InsightSection>

      {/* Closing */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <Reveal>
            <p className="mx-auto max-w-4xl text-center text-2xl leading-relaxed text-night-soft sm:text-3xl">{m.closing[0]}</p>
            <p className="mx-auto mt-6 max-w-4xl text-center text-3xl font-semibold leading-tight tracking-tight text-night-text sm:text-5xl">{m.closing[1]}</p>
          </Reveal>
        </div>
      </section>
    </InsightShell>
  )
}
