'use client'

import React, { useState, useEffect, memo } from 'react'

interface StyledTextProps {
  text: string
  className?: string
}

// Hook to detect mobile and performance preferences
const usePerformanceMode = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, prefersReducedMotion, isClient }
}

// Simple text component for mobile
const SimpleText: React.FC<StyledTextProps> = memo(({ text, className = '' }) => (
  <span className={`text-gradient ${className}`}>
    {text}
  </span>
))

SimpleText.displayName = 'SimpleText'

export default function StyledText({ text, className = '' }: StyledTextProps) {
  const { isMobile, prefersReducedMotion, isClient } = usePerformanceMode()

  // Return simple version for mobile, reduced motion, or during SSR
  if (!isClient || isMobile || prefersReducedMotion) {
    return <SimpleText text={text} className={className} />
  }

  const letterStyles = [
    'letter-style-1', 'letter-style-2', 'letter-style-3', 'letter-style-4', 'letter-style-5',
    'letter-style-6', 'letter-style-7', 'letter-style-8', 'letter-style-9', 'letter-style-10'
  ]

  const renderStyledText = (inputText: string) => {
    return inputText.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className="mx-1">&nbsp;</span>
      }
      
      const styleIndex = index % letterStyles.length
      const letterClass = letterStyles[styleIndex]
      
      return (
        <span 
          key={index} 
          className={`${letterClass} inline-block mx-0.5`}
          style={{ 
            animationDelay: `${index * 0.15}s`,
            animationFillMode: 'both',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <span className={`inline-flex items-center flex-wrap ${className}`} suppressHydrationWarning>
      {renderStyledText(text)}
    </span>
  )
}

// Predefined styled components for common sections
export function TrendingNowText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mega-graphics-icon mega-graphics-trending">🔥</span>
      <StyledText text="TRENDING NOW" className="text-4xl md:text-5xl font-black" />
      <span className="mega-graphics-icon mega-graphics-trending">💥</span>
    </div>
  )
}

export function AnimationText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mega-graphics-icon mega-graphics-animation">🎬</span>
      <StyledText text="ANIMATION" className="text-4xl md:text-5xl font-black" />
      <span className="mega-graphics-icon mega-graphics-animation">�</span>
    </div>
  )
}

export function PremiumContentText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mega-graphics-icon mega-graphics-premium">👑</span>
      <StyledText text="PREMIUM CONTENT" className="text-4xl md:text-5xl font-black" />
      <span className="mega-graphics-icon mega-graphics-premium">💎</span>
    </div>
  )
}

export function SciFiText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mega-graphics-icon mega-graphics-scifi">🚀</span>
      <StyledText text="SCI-FI" className="text-4xl md:text-5xl font-black" />
      <span className="mega-graphics-icon mega-graphics-scifi">⚡</span>
    </div>
  )
}

export function AllVideosText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mega-graphics-icon mega-graphics-all">📺</span>
      <StyledText text="ALL VIDEOS" className="text-4xl md:text-5xl font-black" />
      <span className="mega-graphics-icon mega-graphics-all">�</span>
    </div>
  )
}