'use client'

import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/toast/button'

type Props = {
  roleSlug: 'careers-la' | 'careers-ny'
  roleTitle: string
  location: 'Los Angeles' | 'New York'
}

const COUNTRY_CODES = [
  '+1', '+44', '+91', '+61', '+33', '+49', '+81', '+86', '+82', '+34', '+39',
  '+55', '+52', '+27', '+971', '+65', '+31', '+46', '+47', '+45', '+41',
]

const MAX_RESUME_BYTES = 4 * 1024 * 1024 // 4MB

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        const base64 = result.split(',')[1] ?? ''
        resolve(base64)
      } else {
        reject(new Error('Unexpected file reader result'))
      }
    }
    reader.onerror = () => reject(reader.error ?? new Error('File read failed'))
    reader.readAsDataURL(file)
  })
}

export default function CareersApplyDialog({ roleSlug, roleTitle, location }: Props) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [resumeName, setResumeName] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const locationQuestion = `Are you currently based in ${location} or able to meet e-commerce operators/agencies in ${location === 'Los Angeles' ? 'LA' : 'NY'}?`

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const resumeFile = formData.get('resume') as File | null

    let resumeBase64: string | null = null
    let resumeFileName: string | null = null
    let resumeMimeType: string | null = null

    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > MAX_RESUME_BYTES) {
        setStatus('error')
        setErrorMessage(
          `Resume too large (max ${(MAX_RESUME_BYTES / (1024 * 1024)).toFixed(0)}MB). Email it to info@tryconvertive.com instead.`,
        )
        return
      }
      try {
        resumeBase64 = await readFileAsBase64(resumeFile)
        resumeFileName = resumeFile.name
        resumeMimeType = resumeFile.type || 'application/octet-stream'
      } catch {
        setStatus('error')
        setErrorMessage('Could not read resume file. Email it to info@tryconvertive.com instead.')
        return
      }
    }

    const payload = {
      source: roleSlug,
      roleTitle,
      location,
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phoneCountryCode: String(formData.get('phoneCountryCode') ?? '').trim(),
      mobilePhone: String(formData.get('mobilePhone') ?? '').trim(),
      locationQuestion,
      locationAnswer: String(formData.get('locationAnswer') ?? '').trim(),
      outboundComfort: String(formData.get('outboundComfort') ?? '').trim(),
      hoursPerWeek: String(formData.get('hoursPerWeek') ?? '').trim(),
      whyJoin: String(formData.get('whyJoin') ?? '').trim(),
      threeBrands: String(formData.get('threeBrands') ?? '').trim(),
      linkedinMessage: String(formData.get('linkedinMessage') ?? '').trim(),
      resumeFileName,
      resumeMimeType,
      resumeBase64,
      submittedAt: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.message ?? `Server responded with ${response.status}`)
      }

      setStatus('success')
      form.reset()
      setResumeName(null)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? `${err.message}. You can also email info@tryconvertive.com directly.`
          : 'Submission failed. Email info@tryconvertive.com directly.',
      )
    }
  }

  function resetAndClose(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setStatus('idle')
      setErrorMessage(null)
      setResumeName(null)
      formRef.current?.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-[#1A1410] text-[#F5F0EB] rounded-lg px-6 hover:bg-[#2D2420] transition-colors">
          Apply for this role
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] p-0 gap-0 bg-[#FAFAF8] border-[#E8DDD4] flex flex-col overflow-hidden sm:rounded-lg rounded-xl">
        <DialogHeader className="shrink-0 px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-[#E8DDD4]">
          <DialogTitle className="text-base sm:text-xl font-title text-[#1A1410] pr-6 leading-tight">Apply — {roleTitle}</DialogTitle>
          <DialogDescription className="text-[11px] sm:text-xs text-[#5C4E44]">
            {location} · Remote-friendly · 10–15 hrs/week · $18–$25/hr
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className="px-6 py-10 text-center overflow-y-auto">
            <p className="text-2xl font-title text-[#1A1410]">Thanks — application received.</p>
            <p className="mt-3 text-sm text-[#5C4E44] max-w-md mx-auto">
              We will review and reach out by email within 5 business days. If you have not heard back, ping{' '}
              <a href="mailto:info@tryconvertive.com" className="text-[#C87941] underline">info@tryconvertive.com</a>.
            </p>
            <div className="mt-6">
              <Button
                onClick={() => resetAndClose(false)}
                className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-6 hover:bg-[#2D2420]"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" name="firstName" required />
              <Field label="Last Name" name="lastName" required />
            </div>

            <Field label="Email" name="email" type="email" required />

            <div className="grid grid-cols-[110px_1fr] gap-3">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9C8B7E] font-semibold mb-1">
                  Code
                </label>
                <select
                  name="phoneCountryCode"
                  required
                  defaultValue={location === 'Los Angeles' || location === 'New York' ? '+1' : '+1'}
                  className="w-full rounded-md border border-[#E8DDD4] bg-white px-3 py-2 text-sm text-[#1A1410] focus:outline-none focus:border-[#1A1410]"
                >
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Mobile Phone" name="mobilePhone" type="tel" required noWrapper />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#9C8B7E] font-semibold mb-1">
                Upload Resume (PDF / DOC, max 4MB)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? null)}
                className="block w-full text-sm text-[#1A1410] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1A1410] file:text-[#F5F0EB] file:text-xs file:font-semibold hover:file:bg-[#2D2420]"
              />
              {resumeName && (
                <p className="mt-1 text-xs text-[#5C4E44]">Selected: {resumeName}</p>
              )}
            </div>

            <TextareaField
              label={locationQuestion}
              name="locationAnswer"
              required
              rows={2}
            />

            <TextareaField
              label="Are you comfortable doing outbound outreach on LinkedIn/email/in-person to founders, ecommerce operators, and agency leaders?"
              name="outboundComfort"
              required
              rows={2}
            />

            <Field label="How many hours per week can you commit to this role?" name="hoursPerWeek" required />

            <TextareaField
              label="Why do you want to work with us?"
              name="whyJoin"
              required
              rows={4}
            />

            <div className="rounded-md border border-[#EBBF94] bg-[#FDF0E0] p-3">
              <p className="text-[10px] uppercase tracking-widest text-[#C87941] font-semibold mb-1">Pre-application questions</p>
              <p className="text-xs text-[#5C4E44]">
                Quick exercise so we can see how you think. Short answers are fine.
              </p>
            </div>

            <TextareaField
              label={`Find 3 ecommerce/DTC brands in ${location === 'Los Angeles' ? 'LA' : 'NY'} that you think Convertive should talk to. For each, explain why. (You can use AI for research.)`}
              name="threeBrands"
              required
              rows={6}
            />

            <TextareaField
              label="Write a short LinkedIn message inviting a Head of Ecommerce to a 15-minute conversation about anonymous traffic and conversion (for Convertive)."
              name="linkedinMessage"
              required
              rows={5}
            />

            {status === 'error' && errorMessage && (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700">
                {errorMessage}
              </div>
            )}
            </div>

            <DialogFooter className="shrink-0 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end px-4 sm:px-6 py-3 sm:py-4 bg-[#FAFAF8] border-t border-[#E8DDD4]">
              <Button
                type="button"
                variant="outline"
                onClick={() => resetAndClose(false)}
                className="w-full sm:w-auto rounded-lg border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto bg-[#1A1410] text-[#F5F0EB] rounded-lg px-6 hover:bg-[#2D2420] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit application'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  noWrapper,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  noWrapper?: boolean
}) {
  return (
    <div className={noWrapper ? '' : ''}>
      <label className="block text-xs uppercase tracking-widest text-[#9C8B7E] font-semibold mb-1">
        {label}{required && <span className="text-[#C87941] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-md border border-[#E8DDD4] bg-white px-3 py-2 text-sm text-[#1A1410] focus:outline-none focus:border-[#1A1410]"
      />
    </div>
  )
}

function TextareaField({
  label,
  name,
  required,
  rows = 3,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-[#9C8B7E] font-semibold mb-1">
        {label}{required && <span className="text-[#C87941] ml-1">*</span>}
      </label>
      <textarea
        name={name}
        required={required}
        rows={rows}
        className="w-full rounded-md border border-[#E8DDD4] bg-white px-3 py-2 text-sm text-[#1A1410] focus:outline-none focus:border-[#1A1410] resize-vertical"
      />
    </div>
  )
}
