import Link from 'next/link'
import OuthadMark from './outhad-mark'

export default function OuthadLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-[#1A1410] bg-transparent">
      <OuthadMark className="w-[26px] h-[26px] sm:w-7 sm:h-7 shrink-0" />
      <span className="flex flex-col">
        <span className="text-sm sm:text-base font-bold tracking-[0.18em] uppercase leading-tight">
          Outhad
        </span>
        <span className="text-[9px] tracking-[0.18em] uppercase text-[hsl(var(--app-text-muted))] leading-tight">
          AI Research Lab
        </span>
      </span>
    </Link>
  )
}
