/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'nexflare-videos.s3.amazonaws.com', 'nexflare-backend.onrender.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://nexflare-backend.onrender.com/api',
  },
  // For Render deployment
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig