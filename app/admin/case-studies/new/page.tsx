'use client'

import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import CaseStudyForm from '@/components/admin/case-study-form'
import { createCaseStudy, CaseStudyInput } from '@/lib/case-studies'

export default function NewCaseStudyPage() {
  const router = useRouter()

  const handleCreate = async (data: CaseStudyInput) => {
    const id = await createCaseStudy(data)
    router.push('/admin/case-studies')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/case-studies')}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">New Case Study</h1>
            <p className="text-zinc-500 text-sm mt-1">
              Create a new customer success story
            </p>
          </div>
        </div>

        <CaseStudyForm onSubmit={handleCreate} submitLabel="Create Case Study" />
      </div>
    </AdminLayout>
  )
}
