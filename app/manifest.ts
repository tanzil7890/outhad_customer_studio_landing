import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Outhad AI',
    short_name: 'Outhad',
    description:
      'Outhad AI is a research and product lab building systems that decide in milliseconds — and the orchestration layer that puts them to work.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4efe7',
    theme_color: '#f4efe7',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
