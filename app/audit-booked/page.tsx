import Link from 'next/link'

export const metadata = {
  title: 'ROI Audit Report Request Received | Convertive',
  robots: { index: false },
}

export default function AuditBookedPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-4 text-center">

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#F7E4D0] border border-[#EBBF94] flex items-center justify-center mb-8">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C87941" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p className="text-[#C87941] text-xs font-bold tracking-widest uppercase mb-3">Request received</p>

      <h1 className="text-4xl md:text-5xl font-black text-[#1A1410] leading-tight mb-4 max-w-lg">
        Your ROI audit report is on the way.
      </h1>

      <p className="text-[#5C4E44] text-base md:text-lg leading-relaxed mb-10 max-w-md">
        We&apos;ve got your details. Expect your custom 2-slide ROI audit report in your inbox within 12 hours — modeled on your store, your traffic, your stack.
      </p>

      {/* What to expect */}
      <div className="bg-white border border-[#E8DDD4] rounded-2xl p-6 mb-10 max-w-sm w-full text-left">
        <p className="text-[#1A1410] font-bold text-sm mb-4">What happens next</p>
        <ul className="space-y-3">
          {[
            'We pull live signals from your store and stack',
            'Our team models your anonymous-traffic loss and recoverable revenue',
            'A 2-slide ROI audit report lands in your inbox within 12 hours',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#5C4E44]">
              <span className="text-[#C87941] font-black shrink-0 mt-0.5">{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/"
        className="text-sm text-[#9C8B7E] hover:text-[#1A1410] transition-colors"
      >
        ← Back to Convertive
      </Link>

    </main>
  )
}
