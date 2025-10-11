/** @type {import('next').NextConfig} */
const nextConfig = {
  // Re-enable static export for Render compatibility
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['localhost', 'nexflare-videos.s3.amazonaws.com', 'nexflare-backend.onrender.com'],
    unoptimized: true, // Required for static export
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://nexflare-backend.onrender.com/api',
  },
  
  // Static export configuration for Render
  basePath: '',
  assetPrefix: '',
  
  // Performance optimizations
  experimental: {
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Build optimizations
  swcMinify: true,
  
  // Note: Headers are not supported with static export
  // Performance optimizations are handled via other means
}

module.exports = nextConfig