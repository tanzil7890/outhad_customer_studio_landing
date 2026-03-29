import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// ─── Types ────────────────────────────────────────────────────
export interface CaseStudy {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // HTML from Tiptap
  coverImage: string
  companyName: string
  companyLogo: string
  industry: string
  tags: string[]
  metrics: CaseStudyMetric[]
  status: 'draft' | 'published'
  authorName: string
  authorEmail: string
  publishedAt: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CaseStudyMetric {
  label: string
  value: string
  description?: string
}

export type CaseStudyInput = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>

// ─── Collection ref ───────────────────────────────────────────
const COLLECTION = 'caseStudies'
const caseStudiesRef = collection(db, COLLECTION)

// ─── Helpers ──────────────────────────────────────────────────
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── CRUD Operations ─────────────────────────────────────────

/** Create a new case study */
export async function createCaseStudy(data: CaseStudyInput): Promise<string> {
  const docRef = await addDoc(caseStudiesRef, {
    ...data,
    slug: data.slug || generateSlug(data.title),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

/** Get all case studies (optionally filter by status) */
export async function getCaseStudies(
  status?: 'draft' | 'published'
): Promise<CaseStudy[]> {
  let q = query(caseStudiesRef, orderBy('createdAt', 'desc'))
  if (status) {
    q = query(caseStudiesRef, where('status', '==', status), orderBy('createdAt', 'desc'))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CaseStudy[]
}

/** Get a single case study by ID */
export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const docRef = doc(db, COLLECTION, id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as CaseStudy
}

/** Get a single case study by slug */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const q = query(caseStudiesRef, where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return { id: docSnap.id, ...docSnap.data() } as CaseStudy
}

/** Update a case study */
export async function updateCaseStudy(
  id: string,
  data: Partial<CaseStudyInput>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/** Delete a case study */
export async function deleteCaseStudy(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id)
  await deleteDoc(docRef)
}

/** Publish / unpublish a case study */
export async function togglePublish(
  id: string,
  publish: boolean
): Promise<void> {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, {
    status: publish ? 'published' : 'draft',
    publishedAt: publish ? serverTimestamp() : null,
    updatedAt: serverTimestamp(),
  })
}
