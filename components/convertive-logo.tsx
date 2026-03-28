import Image from 'next/image'
import Link from 'next/link'

export default function ConvertiveLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 bg-transparent">
      <div className="w-7 h-7 sm:w-8 sm:h-8">
        <Image
          src="/logo-black.png"
          alt="Convertive"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm sm:text-base font-bold tracking-wide text-gray-900 leading-tight">Convertive</span>
        <span className="text-[9px] sm:text-[9px] tracking-wider text-gray-500 uppercase leading-tight">Customer Activation Platform</span>
      </div>
    </Link>
  )
}
