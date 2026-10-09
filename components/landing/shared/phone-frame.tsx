import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Warm-black CSS phone body; children render inside the screen. */
export default function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[9/19] w-full rounded-[2.75rem] bg-night p-[9px] shadow-[0_40px_80px_-30px_rgba(26,20,16,0.55)] ring-1 ring-night-line',
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-white">
        <div aria-hidden className="absolute left-1/2 top-2 z-30 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-night" />
        {children}
      </div>
    </div>
  )
}
