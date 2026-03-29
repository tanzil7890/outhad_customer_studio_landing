'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import {
  getCaseStudies,
  deleteCaseStudy,
  togglePublish,
  CaseStudy,
} from '@/lib/blogs'

export default function BlogsListPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const status = filter === 'all' ? undefined : filter
      const data = await getCaseStudies(status)
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [filter])

  const handleDelete = async (id: string) => {
    try {
      await deleteCaseStudy(id)
      setBlogs((prev) => prev.filter((b) => b.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: string) => {
    try {
      await togglePublish(id, currentStatus !== 'published')
      fetchBlogs()
    } catch (err) {
      console.error('Failed to toggle publish:', err)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
            <p className="text-zinc-500 text-sm mt-1">
              Manage your blogs
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/blogs/new')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            New Blog
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-zinc-600 self-center">
            {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'}
          </span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-zinc-600 text-4xl mb-4">📝</div>
            <p className="text-zinc-500 text-sm">No blogs yet.</p>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="mt-4 text-blue-500 hover:text-blue-400 text-sm underline"
            >
              Create your first one
            </button>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 hidden md:table-cell">Company</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3 hidden lg:table-cell">Industry</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-zinc-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-[300px]">{b.title}</p>
                        <p className="text-xs text-zinc-600 mt-0.5 truncate max-w-[300px]">{b.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {b.companyLogo && (
                          <img src={b.companyLogo} alt={b.companyName} className="w-5 h-5 rounded object-contain" />
                        )}
                        <span className="text-sm text-zinc-400">{b.companyName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-zinc-500 bg-zinc-800 rounded-full px-2 py-0.5">{b.industry}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2 py-0.5 ${b.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${b.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => router.push(`/admin/blogs/${b.id}/edit`)} className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Edit</button>
                        <button onClick={() => handleTogglePublish(b.id, b.status)} className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">
                          {b.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={() => window.open(`/blogs/${b.slug}`, '_blank')} className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">View</button>
                        {deleteConfirm === b.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(b.id)} className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-500/10 transition-colors">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs text-zinc-500 px-2 py-1">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(b.id)} className="text-xs text-red-500/70 hover:text-red-400 px-2 py-1 rounded hover:bg-red-500/10 transition-colors">Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
