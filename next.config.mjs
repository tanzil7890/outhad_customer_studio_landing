/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Blogs content is read from `content/blogs` at build time; keep it in the
  // serverless output trace.
  outputFileTracingIncludes: {
    '/blogs': ['./content/blogs/**'],
    '/blogs/[slug]': ['./content/blogs/**'],
    '/comparison': ['./content/blogs/**'],
    '/': ['./content/blogs/**'],
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
