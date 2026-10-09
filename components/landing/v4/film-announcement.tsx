'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, Play, X } from 'lucide-react'
import { EMBER, VIDEO } from '@/lib/landing/content'

/** Flint-style announcement card that opens the "Ghosts" film in a dialog. */
export default function FilmAnnouncement() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="group flex w-full max-w-[26rem] min-h-0 min-w-0 items-center gap-4 rounded-2xl bg-white p-3 pr-4 text-left shadow-[0_24px_60px_-28px_rgba(26,20,16,0.55)] ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1410] motion-reduce:transition-none">
        <span className="relative h-[72px] w-[128px] shrink-0 overflow-hidden rounded-xl bg-[#1A1410]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VIDEO.poster} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1A1410]">
              <Play aria-hidden className="ml-0.5 h-3.5 w-3.5 fill-current" />
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2 text-[13px] text-black/55">
            {EMBER.announcement.label} · {VIDEO.duration}
            <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/15 transition-colors group-hover:bg-ember group-hover:ring-ember">
              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </span>
          </span>
          <span className="mt-1 block text-[15px] font-semibold leading-snug text-[#1A1410]">{EMBER.announcement.title}</span>
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#1A1410]/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[min(92vw,64rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-[#1A1410] shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97] motion-reduce:animate-none">
          <Dialog.Title className="sr-only">{EMBER.announcement.title}</Dialog.Title>
          <Dialog.Description className="sr-only">The Convertive film, {VIDEO.duration} long, with captions.</Dialog.Description>
          <video className="aspect-video w-full" poster={VIDEO.poster} controls autoPlay playsInline preload="none">
            {VIDEO.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            <track kind="captions" src="/videos/convertive-film.vtt" srcLang="en" label="English" default />
          </video>
          <Dialog.Close
            aria-label="Close the film"
            className="absolute right-3 top-3 flex h-10 w-10 min-h-0 min-w-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X aria-hidden className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
