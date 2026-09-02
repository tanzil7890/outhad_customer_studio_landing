import 'server-only'

import fs from 'node:fs'
import path from 'node:path'

import { parseFrontmatter, renderMarkdown, type Frontmatter } from './markdown'

export interface PublicCaseStudyMetric {
  label: string
  value: string
  description?: string
}

export interface PublicCaseStudy {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  companyName: string
  companyLogo: string
  industry: string
  tags: string[]
  metrics: PublicCaseStudyMetric[]
  status: 'draft' | 'published'
  authorName: string
  authorEmail: string
  publishedAt: string | null
  createdAt: string | null
  updatedAt: string | null
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blogs')

// ─── Frontmatter coercion ─────────────────────────────────────

function readString(data: Frontmatter, key: string, fallback = ''): string {
  const value = data[key]
  if (value === null || value === undefined) return fallback
  return String(value)
}

function readStringArray(data: Frontmatter, key: string): string[] {
  const value = data[key]
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function readMetrics(data: Frontmatter): PublicCaseStudyMetric[] {
  const value = data.metrics
  if (!Array.isArray(value)) return []

  return value
    .map((entry): PublicCaseStudyMetric | null => {
      if (typeof entry !== 'object' || entry === null) return null
      const item = entry as Record<string, unknown>
      const label = item.label === undefined || item.label === null ? '' : String(item.label)
      const metricValue = item.value === undefined || item.value === null ? '' : String(item.value)
      if (!label && !metricValue) return null

      const metric: PublicCaseStudyMetric = { label, value: metricValue }
      if (item.description !== undefined && item.description !== null) {
        metric.description = String(item.description)
      }
      return metric
    })
    .filter((metric): metric is PublicCaseStudyMetric => metric !== null)
}

/** Frontmatter dates are authored as `YYYY-MM-DD`; normalize to full ISO strings. */
function readDate(data: Frontmatter, key: string): string | null {
  const raw = readString(data, key)
  if (!raw) return null
  const parsed = new Date(raw.length === 10 ? `${raw}T00:00:00.000Z` : raw)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

function toCaseStudy(fileName: string, raw: string): PublicCaseStudy {
  const { data, body } = parseFrontmatter(raw)
  const fallbackSlug = fileName.replace(/\.md$/i, '')
  const publishedAt = readDate(data, 'publishedAt')
  const createdAt = readDate(data, 'createdAt') ?? publishedAt
  const status = readString(data, 'status', 'published') === 'draft' ? 'draft' : 'published'

  return {
    id: fallbackSlug,
    title: readString(data, 'title'),
    slug: readString(data, 'slug', fallbackSlug),
    excerpt: readString(data, 'excerpt'),
    content: renderMarkdown(body),
    coverImage: readString(data, 'coverImage'),
    companyName: readString(data, 'companyName'),
    companyLogo: readString(data, 'companyLogo'),
    industry: readString(data, 'industry'),
    tags: readStringArray(data, 'tags'),
    metrics: readMetrics(data),
    status,
    authorName: readString(data, 'authorName', 'Convertive Team'),
    authorEmail: readString(data, 'authorEmail'),
    publishedAt,
    createdAt,
    updatedAt: readDate(data, 'updatedAt') ?? createdAt,
  }
}

// ─── Content store ────────────────────────────────────────────

let cache: PublicCaseStudy[] | null = null

function sortKey(caseStudy: PublicCaseStudy): number {
  const date = caseStudy.createdAt ?? caseStudy.publishedAt
  return date ? new Date(date).getTime() : 0
}

/**
 * Reads every markdown file in `content/blogs`. Cached per process — content is
 * part of the deployment, so it cannot change between requests.
 */
function loadAll(): PublicCaseStudy[] {
  if (cache) return cache

  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(CONTENT_DIR).filter((name) => name.toLowerCase().endsWith('.md'))
  } catch {
    console.warn(`No blogs content directory found at ${CONTENT_DIR}`)
    cache = []
    return cache
  }

  const caseStudies = fileNames
    .map((fileName) => {
      try {
        return toCaseStudy(fileName, fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8'))
      } catch (error) {
        console.error(`Failed to parse blog content file ${fileName}:`, error)
        return null
      }
    })
    .filter((caseStudy): caseStudy is PublicCaseStudy => caseStudy !== null && Boolean(caseStudy.slug))

  // Newest first, matching the previous `orderBy('createdAt', 'desc')` query.
  caseStudies.sort((a, b) => sortKey(b) - sortKey(a) || a.slug.localeCompare(b.slug))

  cache = caseStudies
  return cache
}

export async function getPublishedCaseStudiesServer(): Promise<PublicCaseStudy[]> {
  return loadAll().filter((caseStudy) => caseStudy.status === 'published')
}

export async function getPublishedCaseStudyBySlugServer(slug: string): Promise<PublicCaseStudy | null> {
  const caseStudy = loadAll().find((entry) => entry.slug === slug)
  if (!caseStudy || caseStudy.status !== 'published') return null
  return caseStudy
}

/** Slugs for `generateStaticParams` on /blogs/[slug]. */
export async function getPublishedCaseStudySlugs(): Promise<string[]> {
  return loadAll()
    .filter((caseStudy) => caseStudy.status === 'published')
    .map((caseStudy) => caseStudy.slug)
}
