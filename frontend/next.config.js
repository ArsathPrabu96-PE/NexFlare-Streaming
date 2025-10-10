/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['localhost', 'nexflare-videos.s3.amazonaws.com', 'nexflare-backend.onrender.com'],
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://nexflare-backend.onrender.com/api',
  },
  // Remove GitHub Pages paths for Render deployment
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig