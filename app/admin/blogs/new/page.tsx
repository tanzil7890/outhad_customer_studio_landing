'use client'

import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import CaseStudyForm from '@/components/admin/blogs-form'
import { createCaseStudy, CaseStudyInput } from '@/lib/blogs'

export default function NewBlogPage() {
  const router = useRouter()

  const handleCreate = async (data: CaseStudyInput) => {
    const id = await createCaseStudy(data)
    router.push('/admin/blogs')
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
            <h1 className="text-2xl font-semibold tracking-tight">New Blog</h1>
            <p className="text-zinc-500 text-sm mt-1">
              Create a new blog post
            </p>
          </div>
        </div>

        <CaseStudyForm onSubmit={handleCreate} submitLabel="Create Blog" />
      </div>
    </AdminLayout>
  )
}
