import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { COMPARISON } from '@/lib/landing/insights'
import type { getPublishedCaseStudiesServer } from '@/lib/blogs-server'
import InsightShell, { InsightSection } from './insight-shell'
import { CategoryExplorer, CoverageMark } from './comparison-widgets'

type Post = Awaited<ReturnType<typeof getPublishedCaseStudiesServer>>[number]

function VendorCard({ blog }: { blog: Post }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-3xl bg-night-raised/60 ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
    >
      {blog.coverImage && (
        <span className="block aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.coverImage} alt="" className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
        </span>
      )}
      <span className="flex flex-1 flex-col p-6">
        <span className="line-clamp-2 text-lg font-semibold leading-snug text-night-text">{blog.title}</span>
        <span className="mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-night-soft">{blog.excerpt}</span>
        <span className="mt-5 flex items-center justify-between border-t border-night-line pt-4 text-[12px] uppercase tracking-[0.12em] text-night-muted">
          {blog.companyName}
          <ArrowUpRight aria-hidden className="h-4 w-4 text-night-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </span>
    </Link>
  )
}

export default function Comparison({ vendors }: { vendors: Post[] }) {
  const c = COMPARISON
  const heads = ['Convertive', ...c.categories.map((cat) => cat.short)]
  return (
    <InsightShell
      insight="comparison"
      title={c.title}
      lede={c.lede}
      secondary={{ label: 'How the mechanism works', href: '/the-mechanism' }}
      faqs={c.faqs}
      closing={{
        title: 'Mapped against your stack.',
        body: 'Get a 12-hr ROI audit that benchmarks your store and identifies which slice your existing tools cover — and where the leak still is.',
      }}
    >
      <InsightSection id="categories" eyebrow="Category deep dive" title="What each category does — and where it stops" className="border-t-0 pt-0 sm:pt-0">
        <CategoryExplorer />
      </InsightSection>

      <InsightSection id="matrix" eyebrow="Capability matrix" title="Side by side" intro={c.legend}>
        <div className="overflow-x-auto rounded-3xl ring-1 ring-night-line">
          <table className="w-full min-w-[46rem] text-[14.5px]">
            <thead>
              <tr className="bg-night-raised text-left">
                <th className="p-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-night-muted">Capability</th>
                {heads.map((h, i) => (
                  <th key={h} className={i === 0 ? 'p-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-night-text' : 'p-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-night-muted'}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.capability} className="border-t border-night-line">
                  <td className="p-4 text-night-text">{r.capability}</td>
                  <td className="bg-night-raised/40 p-4 text-center">
                    <CoverageMark value={r.convertive} strong />
                  </td>
                  {c.categories.map((cat) => (
                    <td key={cat.key} className="p-4 text-center">
                      <CoverageMark value={r[cat.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InsightSection>

      <InsightSection eyebrow="When to add Convertive on top" title="Three signals you have outgrown the slice">
        <ol className="grid gap-4 md:grid-cols-3">
          {c.signals.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-night-raised/60 p-7 ring-1 ring-night-line">
              <span className="font-mono text-sm text-night-muted">0{i + 1}</span>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-night-text">{s.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-night-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </InsightSection>

      {vendors.length > 0 && (
        <InsightSection
          eyebrow="Platform comparisons"
          title="Convertive vs specific tools"
          intro="See how Convertive stacks up against other ecommerce personalization and CDP platforms."
        >
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((blog) => (
              <li key={blog.id}>
                <VendorCard blog={blog} />
              </li>
            ))}
          </ul>
        </InsightSection>
      )}
    </InsightShell>
  )
}
