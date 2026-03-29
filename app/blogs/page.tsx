import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { getPublishedCaseStudiesServer } from '@/lib/blogs-server'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Blogs',
  description:
    'See how brands use Convertive to drive real-time personalization, reduce cart abandonment, and grow conversions with measurable results.',
  path: '/blogs',
  keywords: [
    'ecommerce blogs',
    'real-time personalization blogs',
    'customer activation success stories',
    'conversion optimization examples',
  ],
  image: '/images/convertive-customer-activation-platform/hero-home.png',
})

function BlogCard({ blog }: { blog: Awaited<ReturnType<typeof getPublishedCaseStudiesServer>>[number] }) {
  return (
    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
      <article className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl overflow-hidden hover:border-[hsl(var(--app-text))] transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        {blog.coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-sm text-[hsl(var(--app-text-muted))] mb-4 line-clamp-3 flex-1">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[hsl(var(--app-border))]">
            <div className="flex items-center gap-2">
              {blog.companyLogo && (
                <img
                  src={blog.companyLogo}
                  alt={blog.companyName}
                  className="w-5 h-5 rounded object-contain"
                />
              )}
              <span className="text-xs text-[hsl(var(--app-text-muted))]">{blog.authorName}</span>
            </div>
            {blog.industry && (
              <span className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] rounded-full px-2 py-0.5">
                {blog.industry}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function BlogsPage() {
  const blogs = await getPublishedCaseStudiesServer()

  const comparisons = blogs.filter((b) => b.slug.startsWith('convertive-vs-'))
  const caseStudies = blogs.filter((b) => !b.slug.startsWith('convertive-vs-'))

  const blogsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Convertive Blogs',
    url: 'https://tryconvertive.com/blogs',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://tryconvertive.com/blogs/${blog.slug}`,
        name: blog.title,
      })),
    },
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Blogs', url: absoluteUrl('/blogs') },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([blogsListSchema, breadcrumbs]) }}
      />

      <section className="pt-40 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[hsl(var(--app-text))] mb-6 leading-tight">
            Customer Success Stories
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] max-w-2xl mx-auto">
            See how leading brands use Convertive to drive real-time personalization, reduce cart abandonment, and
            lift conversions.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {caseStudies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[hsl(var(--app-text-muted))]">No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>

      {/* Platform Comparisons — auto-populated from CMS when slugs start with convertive-vs- */}
      {comparisons.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl text-[hsl(var(--app-text))] mb-2">Platform Comparisons</h2>
            <p className="text-sm text-[hsl(var(--app-text-muted))]">
              See how Convertive stacks up against other ecommerce personalization and CDP platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
