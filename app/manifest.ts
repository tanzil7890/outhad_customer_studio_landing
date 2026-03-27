import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Convertive',
    short_name: 'Convertive',
    description:
      'Real-time customer activation platform for ecommerce teams that want to convert anonymous visitors before they leave.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4efe7',
    theme_color: '#f4efe7',
    icons: [
      {
        src: '/logo-black.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo-black.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  }
}
