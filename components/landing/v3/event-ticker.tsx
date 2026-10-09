import Marquee from '../shared/marquee'

// Simulated activity feed: the story's own events plus a few generic ones, so the
// ticker reads as many sessions rather than one.
const EVENTS = [
  'visitor 7f3d · Instagram ad · hiking boots',
  'exit risk 82% · decision in 41 ms',
  'offer served · 10% off today',
  'visitor 7f3d identified · s•••@gmail.com',
  'order · +$116.10',
  'visitor a21c · low risk · offer suppressed',
  'visitor 9b04 · size helper shown',
  'visitor 3e7a · free-shipping nudge',
  'visitor c512 · returning, identified on arrival',
]

export default function EventTicker() {
  return (
    <div className="flex items-center gap-5 border-y border-ink/80 py-3">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-secondary">Simulated feed</span>
      <Marquee label="Simulated live events" duration={55} className="min-w-0 flex-1">
        {EVENTS.map((event) => (
          <span key={event} className="flex items-center whitespace-nowrap font-display text-lg italic text-ink">
            {event}
            <span aria-hidden className="mx-6 text-ink-muted">
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
