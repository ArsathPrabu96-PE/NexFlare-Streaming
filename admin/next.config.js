/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'nexflare-videos.s3.amazonaws.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
}

module.exports = nextConfig