'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, isAdminUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
    if (!loading && user && !isAdminUser) {
      router.push('/admin/login?error=unauthorized')
    }
  }, [user, loading, isAdminUser, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-6">
            <a href="/admin/blogs" className="text-lg font-semibold tracking-tight">
              Convertive <span className="text-zinc-500 font-normal">CMS</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              <a
                href="/admin/blogs"
                className="px-3 py-1.5 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                Blogs
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

function SignOutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <button
      onClick={() => signOut().then(() => router.push('/admin/login'))}
      className="text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-md px-3 py-1.5 hover:bg-zinc-800 transition-colors"
    >
      Sign Out
    </button>
  )
}
