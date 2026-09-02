import Link from 'next/link'

export default function OuthadLogo() {
  return (
    <Link href="/" className="inline-flex flex-col bg-transparent">
      <span className="text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-[#1A1410] leading-tight">
        Outhad
      </span>
      <span className="text-[9px] tracking-[0.18em] uppercase text-[hsl(var(--app-text-muted))] leading-tight">
        AI Research Lab
      </span>
    </Link>
  )
}
