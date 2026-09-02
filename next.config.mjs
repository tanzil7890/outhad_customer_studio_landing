/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // `/agent-studio` and `/workflow-studio` were linked from the old nav but
  // never existed; `/case-studies` was renamed to `/blogs`.
  async redirects() {
    return [
      { source: '/agent-studio', destination: '/outhad-studio', permanent: true },
      { source: '/workflow-studio', destination: '/outhad-studio', permanent: true },
      { source: '/case-studies', destination: '/blogs', permanent: true },
      { source: '/case-studies/:slug', destination: '/blogs/:slug', permanent: true },
    ]
  },
  // Blogs content is read from `content/blogs` at build time; keep it in the
  // serverless output trace.
  outputFileTracingIncludes: {
    '/blogs': ['./content/blogs/**'],
    '/convertive': ['./content/blogs/**'],
    '/blogs/[slug]': ['./content/blogs/**'],
    '/comparison': ['./content/blogs/**'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'gwaycapital.com',
      },
    ],
  },
}

export default nextConfig
