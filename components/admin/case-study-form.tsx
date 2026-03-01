'use client'

import { useState } from 'react'
import RichTextEditor from './rich-text-editor'
import { CaseStudyInput, CaseStudyMetric, generateSlug } from '@/lib/case-studies'
import { Timestamp } from 'firebase/firestore'

interface CaseStudyFormProps {
  initialData?: Partial<CaseStudyInput>
  onSubmit: (data: CaseStudyInput) => Promise<void>
  submitLabel?: string
}

export default function CaseStudyForm({
  initialData,
  onSubmit,
  submitLabel = 'Create Case Study',
}: CaseStudyFormProps) {
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'meta' | 'metrics'>('content')

  // Form state
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '')
  const [companyName, setCompanyName] = useState(initialData?.companyName || '')
  const [companyLogo, setCompanyLogo] = useState(initialData?.companyLogo || '')
  const [industry, setIndustry] = useState(initialData?.industry || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [metrics, setMetrics] = useState<CaseStudyMetric[]>(
    initialData?.metrics || [{ label: '', value: '', description: '' }]
  )
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status || 'draft')
  const [authorName, setAuthorName] = useState(initialData?.authorName || '')
  const [authorEmail, setAuthorEmail] = useState(initialData?.authorEmail || '')

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!initialData?.slug) {
      setSlug(generateSlug(val))
    }
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const addMetric = () => {
    setMetrics([...metrics, { label: '', value: '', description: '' }])
  }

  const updateMetric = (index: number, field: keyof CaseStudyMetric, value: string) => {
    const updated = [...metrics]
    updated[index] = { ...updated[index], [field]: value }
    setMetrics(updated)
  }

  const removeMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        title,
        slug: slug || generateSlug(title),
        excerpt,
        content,
        coverImage,
        companyName,
        companyLogo,
        industry,
        tags,
        metrics: metrics.filter((m) => m.label && m.value),
        status,
        authorName,
        authorEmail,
        publishedAt: status === 'published' ? Timestamp.now() : null,
      })
    } catch (err) {
      console.error('Failed to save:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1 w-fit">
        {(['content', 'meta', 'metrics'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Content Tab ─── */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="How Company X Achieved 30% More Conversions"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 text-sm">/case-studies/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="how-company-x-achieved-conversions"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Excerpt *
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              placeholder="A brief summary of this case study..."
              required
            />
            <p className="text-xs text-zinc-600 mt-1">
              {excerpt.length}/200 characters
            </p>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-zinc-800">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Content *
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>
      )}

      {/* ─── Meta Tab ─── */}
      {activeTab === 'meta' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Acme Corp"
                required
              />
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Company Logo URL
              </label>
              <input
                type="url"
                value={companyLogo}
                onChange={(e) => setCompanyLogo(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="https://example.com/logo.svg"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">Select industry...</option>
                <option value="E-commerce">E-commerce</option>
                <option value="SaaS">SaaS</option>
                <option value="Retail">Retail</option>
                <option value="Fashion">Fashion</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Electronics">Electronics</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                <option value="Automotive">Automotive</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="John Doe"
              />
            </div>

            {/* Author Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Author Email
              </label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-zinc-500 hover:text-white ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-zinc-800 text-zinc-300 rounded-lg px-3 py-2 text-sm hover:bg-zinc-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Metrics Tab ─── */}
      {activeTab === 'metrics' && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-500">
            Add key metrics to showcase the results (e.g., &ldquo;Conversion Rate&rdquo; → &ldquo;+30%&rdquo;).
          </p>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">
                  Metric {index + 1}
                </span>
                {metrics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    className="text-xs text-red-500/70 hover:text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => updateMetric(index, 'label', e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Metric label (e.g., Conversion Rate)"
                />
                <input
                  type="text"
                  value={metric.value}
                  onChange={(e) => updateMetric(index, 'value', e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Metric value (e.g., +30%)"
                />
              </div>
              <input
                type="text"
                value={metric.description || ''}
                onChange={(e) => updateMetric(index, 'description', e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Brief description (optional)"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMetric}
            className="w-full border border-dashed border-zinc-700 rounded-xl py-3 text-sm text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
          >
            + Add Metric
          </button>
        </div>
      )}

      {/* ─── Submit Bar ─── */}
      <div className="sticky bottom-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 -mx-6 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2 py-0.5 ${
              status === 'published'
                ? 'bg-green-500/10 text-green-400'
                : 'bg-yellow-500/10 text-yellow-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'published' ? 'bg-green-400' : 'bg-yellow-400'
              }`}
            />
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setStatus('draft')
            }}
            className="text-sm text-zinc-400 hover:text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={saving || !title || !excerpt}
            className="bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
