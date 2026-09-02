/**
 * The Outhad AI mark: an O monogram drawn as a squared ring whose right
 * segment is copper — the live one.
 *
 * The ring uses `currentColor`, so it takes the warm black of light surfaces
 * and the cream of the dark footer without a second asset. The copper segment
 * overlaps the ring's flat ends slightly so the join stays seamless at 16px.
 */
export default function OuthadMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M27 20 A7 7 0 0 1 20 27 L12 27 A7 7 0 0 1 5 20 L5 12 A7 7 0 0 1 12 5 L20 5 A7 7 0 0 1 27 12"
        stroke="currentColor"
        strokeWidth="4.2"
      />
      <rect x="24.9" y="11.6" width="4.2" height="8.8" fill="#C87941" />
    </svg>
  )
}
