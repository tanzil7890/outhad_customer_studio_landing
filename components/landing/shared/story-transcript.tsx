import { formatClock, type Timeline } from '@/lib/landing/story'

/** Screen-reader version of a session story; the animated panes are aria-hidden. */
export default function StoryTranscript({ timeline, title }: { timeline: Timeline; title: string }) {
  return (
    <div className="sr-only">
      <h3>{title}</h3>
      <ol>
        {timeline.beats.map((beat) => (
          <li key={beat.id}>
            {formatClock(beat.at)}: {beat.title}. {beat.shopper} {beat.engine}
          </li>
        ))}
      </ol>
      <p>
        Outcome: {timeline.outcome.headline}. {timeline.outcome.summary}
      </p>
    </div>
  )
}
