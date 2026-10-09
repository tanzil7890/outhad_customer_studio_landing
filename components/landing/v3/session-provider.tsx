'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { rankActions, type RankedAction } from '@/lib/landing/self-read'
import { SessionReader, type FreezeInfo, type FreezeTrigger, type SessionSnapshot } from '@/lib/landing/session-reader'

export interface FreezeState extends FreezeInfo {
  snapshot: SessionSnapshot
  actions: RankedAction[]
  /** Measured cost of one ranking pass in this browser, in ms. */
  decideMs: number
}

interface MirrorContext {
  reader: SessionReader | null
  lens: boolean
  setLens: (on: boolean) => void
  freeze: FreezeState | null
  openFreeze: (trigger: FreezeTrigger, awayMs?: number) => void
  closeFreeze: () => void
}

const Context = createContext<MirrorContext | null>(null)

export function useMirror() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useMirror must be used inside <SessionProvider>')
  return ctx
}

const noopSubscribe = () => () => {}
const nullSnapshot = () => null

/** The visitor's live session, or null during SSR and before the reader starts. */
export function useSession(): SessionSnapshot | null {
  const { reader } = useMirror()
  return useSyncExternalStore(reader ? reader.subscribe : noopSubscribe, reader ? reader.getSnapshot : nullSnapshot, nullSnapshot)
}

/** Runs the ranking many times so the per-pass cost is measurable with coarse timers. */
function measureDecision(snapshot: SessionSnapshot) {
  const runs = 400
  let actions = rankActions(snapshot.counters)
  const t0 = performance.now()
  for (let i = 0; i < runs; i++) actions = rankActions(snapshot.counters)
  return { actions, decideMs: (performance.now() - t0) / runs }
}

export default function SessionProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [reader, setReader] = useState<SessionReader | null>(null)
  const [lens, setLens] = useState(true)
  const [freeze, setFreeze] = useState<FreezeState | null>(null)

  const openFreeze = useCallback(
    (trigger: FreezeTrigger, awayMs?: number) => {
      if (!reader || reader.getSnapshot().frozen) return
      reader.setFrozen(true)
      const snapshot = reader.getSnapshot()
      setFreeze({ trigger, awayMs, snapshot, ...measureDecision(snapshot) })
    },
    [reader],
  )

  const closeFreeze = useCallback(() => {
    reader?.setFrozen(false)
    setFreeze(null)
  }, [reader])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const next = new SessionReader()
    const stop = next.start(root)
    setReader(next)
    return () => {
      stop()
      setReader(null)
    }
  }, [])

  useEffect(() => {
    if (!reader) return
    return reader.onFreeze(({ trigger, awayMs }) => openFreeze(trigger, awayMs))
  }, [reader, openFreeze])

  const value = useMemo(
    () => ({ reader, lens, setLens, freeze, openFreeze, closeFreeze }),
    [reader, lens, freeze, openFreeze, closeFreeze],
  )

  return (
    <Context.Provider value={value}>
      <div ref={rootRef}>{children}</div>
    </Context.Provider>
  )
}
