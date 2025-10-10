import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './mobile-optimizations.css'
import { Providers } from './providers'
import MobileNavigationFix from '../components/MobileNavigationFix'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Reduce preload warnings
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Nexflare - Stream Your World',
  description: 'Premium streaming platform with ultra-fast mobile performance',
  keywords: 'streaming, video, mobile, entertainment, fast',
  authors: [{ name: 'NexFlare Team' }],
  creator: 'NexFlare',
  publisher: 'NexFlare',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <Providers>
          <MobileNavigationFix />
          {children}
        </Providers>
      </body>
    </html>
  )
}