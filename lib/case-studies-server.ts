import 'server-only'

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

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { nullValue: null }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } }

type FirestoreDocument = {
  name?: string
  fields?: Record<string, FirestoreValue>
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const baseUrl =
  projectId && apiKey
    ? `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`
    : null

function parseFirestoreValue(value: FirestoreValue | undefined): unknown {
  if (!value) return null
  if ('stringValue' in value) return value.stringValue
  if ('integerValue' in value) return Number(value.integerValue)
  if ('doubleValue' in value) return value.doubleValue
  if ('booleanValue' in value) return value.booleanValue
  if ('timestampValue' in value) return value.timestampValue
  if ('nullValue' in value) return null
  if ('arrayValue' in value) {
    return (value.arrayValue.values ?? []).map((item) => parseFirestoreValue(item))
  }
  if ('mapValue' in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields ?? {}).map(([key, item]) => [key, parseFirestoreValue(item)])
    )
  }
  return null
}

function parseCaseStudy(document: FirestoreDocument): PublicCaseStudy {
  const data = parseFirestoreValue({ mapValue: { fields: document.fields ?? {} } }) as Record<string, unknown>

  return {
    id: document.name?.split('/').pop() ?? '',
    title: String(data.title ?? ''),
    slug: String(data.slug ?? ''),
    excerpt: String(data.excerpt ?? ''),
    content: String(data.content ?? ''),
    coverImage: String(data.coverImage ?? ''),
    companyName: String(data.companyName ?? ''),
    companyLogo: String(data.companyLogo ?? ''),
    industry: String(data.industry ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    metrics: Array.isArray(data.metrics)
      ? data.metrics.map((metric) => {
          const item = typeof metric === 'object' && metric !== null ? (metric as Record<string, unknown>) : {}

          return {
            label: String(item.label ?? ''),
            value: String(item.value ?? ''),
            description: item.description ? String(item.description) : undefined,
          }
        })
      : [],
    status: data.status === 'draft' ? 'draft' : 'published',
    authorName: String(data.authorName ?? ''),
    authorEmail: String(data.authorEmail ?? ''),
    publishedAt: typeof data.publishedAt === 'string' ? data.publishedAt : null,
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : null,
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null,
  }
}

async function runQuery(structuredQuery: Record<string, unknown>) {
  if (!baseUrl) return []

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ structuredQuery }),
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Failed to fetch case studies from Firestore:', response.status, response.statusText)
    return []
  }

  const rows = (await response.json()) as Array<{ document?: FirestoreDocument }>
  return rows
    .map((row) => row.document)
    .filter((document): document is FirestoreDocument => Boolean(document?.fields))
}

export async function getPublishedCaseStudiesServer(): Promise<PublicCaseStudy[]> {
  const documents = await runQuery({
    from: [{ collectionId: 'caseStudies' }],
    where: {
      fieldFilter: {
        field: { fieldPath: 'status' },
        op: 'EQUAL',
        value: { stringValue: 'published' },
      },
    },
    orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
  })

  return documents.map(parseCaseStudy)
}

export async function getPublishedCaseStudyBySlugServer(slug: string): Promise<PublicCaseStudy | null> {
  const documents = await runQuery({
    from: [{ collectionId: 'caseStudies' }],
    where: {
      fieldFilter: {
        field: { fieldPath: 'slug' },
        op: 'EQUAL',
        value: { stringValue: slug },
      },
    },
    limit: 1,
  })

  const caseStudy = documents[0] ? parseCaseStudy(documents[0]) : null

  if (!caseStudy || caseStudy.status !== 'published') {
    return null
  }

  return caseStudy
}
