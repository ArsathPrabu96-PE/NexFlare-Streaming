/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['localhost', 'nexflare-videos.s3.amazonaws.com'],
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.herokuapp.com/api',
  },
  // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/NexFlare-Streaming' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/NexFlare-Streaming/' : '',
}

module.exports = nextConfig