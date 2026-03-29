'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import CaseStudyForm from '@/components/admin/blogs-form'
import {
  getCaseStudyById,
  updateCaseStudy,
  CaseStudy,
  CaseStudyInput,
} from '@/lib/blogs'

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [blog, setBlog] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getCaseStudyById(id)
        if (!data) {
          setError('Blog not found')
        } else {
          setBlog(data)
        }
      } catch (err) {
        setError('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleUpdate = async (data: CaseStudyInput) => {
    await updateCaseStudy(id, data)
    router.push('/admin/blogs')
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  if (error || !blog) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-red-400 text-sm">{error || 'Something went wrong'}</p>
          <button
            onClick={() => router.push('/admin/blogs')}
            className="mt-4 text-blue-500 hover:text-blue-400 text-sm underline"
          >
            Back to list
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/blogs')}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Edit Blog</h1>
            <p className="text-zinc-500 text-sm mt-1">{blog.title}</p>
          </div>
        </div>

        <CaseStudyForm
          initialData={blog}
          onSubmit={handleUpdate}
          submitLabel="Update Blog"
        />
      </div>
    </AdminLayout>
  )
}
