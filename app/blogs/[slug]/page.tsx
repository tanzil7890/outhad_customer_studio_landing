import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import { getPublishedCaseStudyBySlugServer } from '@/lib/blogs-server'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const dynamic = 'force-dynamic'

type BlogPageProps = {
  params: Promise<{
    slug: string
  }>
}

function formatPublishDate(date: string | null) {
  if (!date) return null

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getPublishedCaseStudyBySlugServer(slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${blog.slug}`,
    image: blog.coverImage || undefined,
    type: 'article',
    keywords: [
      blog.companyName,
      'customer activation blog',
      'real-time personalization blog',
      blog.industry,
      ...blog.tags,
    ].filter(Boolean),
  })
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await getPublishedCaseStudyBySlugServer(slug)

  if (!blog) {
    notFound()
  }

  const publishDate = formatPublishDate(blog.publishedAt)
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt ?? blog.createdAt ?? undefined,
    dateModified: blog.updatedAt ?? blog.publishedAt ?? blog.createdAt ?? undefined,
    author: blog.authorName
      ? {
          '@type': 'Person',
          name: blog.authorName,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Convertive',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-black.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blogs/${blog.slug}`),
    image: blog.coverImage ? [blog.coverImage] : undefined,
    about: [blog.companyName, blog.industry, ...blog.tags].filter(Boolean),
  }
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Blogs', url: absoluteUrl('/blogs') },
    { name: blog.companyName, url: absoluteUrl(`/blogs/${blog.slug}`) },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([blogSchema, breadcrumbs]),
        }}
      />

      <section className="pt-36 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[hsl(var(--app-text-muted))] mb-8">
            <Link href="/" className="hover:text-[hsl(var(--app-text))]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-[hsl(var(--app-text))]">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--app-text))]">{blog.slug}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {blog.industry && (
              <span className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-full px-3 py-1">
                {blog.industry}
              </span>
            )}
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--app-text))] mb-6 leading-tight"
          >
            {blog.title}
          </h1>

          <p className="text-lg text-[hsl(var(--app-text-muted))] leading-relaxed mb-8">
            {blog.excerpt}
          </p>

          <div className="flex items-center gap-4 pb-8 border-b border-[hsl(var(--app-border))]">
            <div className="flex items-center gap-3">
              {blog.companyLogo && (
                <img
                  src={blog.companyLogo}
                  alt={blog.companyName}
                  className="w-8 h-8 rounded-lg object-contain border border-[hsl(var(--app-border))]"
                />
              )}
              <div>
                <p className="text-sm font-medium text-[hsl(var(--app-text))]">{blog.authorName}</p>
                {publishDate && <p className="text-xs text-[hsl(var(--app-text-muted))]">{publishDate}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {blog.metrics.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blog.metrics.map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-xl p-5 text-center"
              >
                <p
                  className="text-2xl sm:text-3xl font-semibold text-[hsl(var(--app-text))] mb-1"
                >
                  {metric.value}
                </p>
                <p className="text-xs text-[hsl(var(--app-text-muted))]">{metric.label}</p>
                {metric.description && (
                  <p className="text-xs text-[hsl(var(--app-text-muted))] mt-1 opacity-70">
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {blog.coverImage && (
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="rounded-2xl overflow-hidden border border-[hsl(var(--app-border))]">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-auto" />
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <article
          className="blog-content prose prose-neutral max-w-none
            prose-headings:text-[hsl(var(--app-text))] prose-headings:font-semibold
            prose-p:text-[hsl(var(--app-text-muted))] prose-p:leading-relaxed prose-p:
            prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
            prose-strong:text-[hsl(var(--app-text))]
            prose-li:text-[hsl(var(--app-text-muted))] prose-li:
            prose-blockquote:border-l-[hsl(var(--app-text))] prose-blockquote:text-[hsl(var(--app-text-muted))]
            prose-code:text-[hsl(var(--app-text))] prose-code:bg-[hsl(var(--app-surface))] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[hsl(var(--app-surface))] prose-pre:border prose-pre:border-[hsl(var(--app-border))]
            prose-img:rounded-xl prose-img:border prose-img:border-[hsl(var(--app-border))]
            prose-table:border-collapse
            prose-th:bg-[hsl(var(--app-surface))] prose-th:border prose-th:border-[hsl(var(--app-border))] prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-[hsl(var(--app-text))] prose-th:prose-th:text-sm
            prose-td:border prose-td:border-[hsl(var(--app-border))] prose-td:px-4 prose-td:py-2 prose-td:text-[hsl(var(--app-text-muted))] prose-td:prose-td:text-sm
            prose-hr:border-[hsl(var(--app-border))]
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl p-8 sm:p-12 text-center">
          <h2
            className="text-2xl sm:text-3xl text-[hsl(var(--app-text))] mb-4"
          >
            Ready for similar results?
          </h2>
          <p className="text-sm text-[hsl(var(--app-text-muted))] mb-6 max-w-lg mx-auto">
            See how Convertive can transform your customer experience with real-time personalization and AI-driven
            engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://tryconvertive.com/demo"
              target="_blank"
              className="inline-flex items-center justify-center bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Book a Demo
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))] rounded-full px-6 py-3 text-sm font-medium hover:bg-[hsl(var(--app-surface))] transition-colors"
            >
              More Blogs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
