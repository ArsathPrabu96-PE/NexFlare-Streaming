'use client'

import React, { useState, useEffect, memo } from 'react'

// Hook to detect mobile devices and performance preferences
const usePerformanceMode = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    // Check reduced motion preference
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, prefersReducedMotion }
}

// Simple static logo for mobile/reduced motion
const SimpleLogo: React.FC = memo(() => (
  <div className="flex items-center space-x-3">
    <div className="relative flex items-center">
      {/* Simple static film reel */}
      <div className="w-10 h-10 border-2 border-slate-300 rounded-full relative">
        <div className="absolute inset-1 border border-slate-400/70 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Static spokes */}
        <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-slate-300 transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-slate-300 transform -translate-x-1/2"></div>
        <div className="absolute left-0 top-1/2 h-0.5 w-4 bg-slate-300 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 h-0.5 w-4 bg-slate-300 transform -translate-y-1/2"></div>
      </div>
      
      {/* Simple play icon */}
      <div className="relative ml-4">
        <div className="w-8 h-8 bg-slate-400/30 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[8px] border-l-slate-200 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
        </div>
      </div>
    </div>
    
    {/* Simple text */}
    <div className="relative">
      <div className="text-slate-200 font-bold text-sm tracking-wider">
        STREAM
      </div>
    </div>
  </div>
))

SimpleLogo.displayName = 'SimpleLogo'

// Enhanced NEXFLARE Logo with Superior Graphics
const EnhancedLogo: React.FC = memo(() => {
  const { isMobile, prefersReducedMotion } = usePerformanceMode()

  // Return simple version for mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return <SimpleLogo />
  }

  return (
    <div className="flex items-center space-x-4 logo-float">
      {/* Premium Animated Graphics Complex */}
      <div className="relative flex items-center">
        {/* Multi-layer Film Reel with Holographic Effect */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-2 bg-gradient-radial from-amber-400/20 via-slate-300/10 to-transparent rounded-full reel-glow-outer"></div>
          <div className="absolute -inset-1 bg-gradient-radial from-amber-300/30 via-slate-400/15 to-transparent rounded-full reel-glow-inner"></div>
          
          {/* Main reel structure */}
          <div className="w-12 h-12 border-2 border-gradient-to-r from-slate-300 via-amber-400 to-slate-300 rounded-full relative shadow-xl reel-spin film-glow">
            <div className="absolute inset-1 border border-slate-400/80 rounded-full bg-gradient-to-br from-slate-800/20 to-amber-900/20"></div>
            <div className="absolute inset-2 bg-gradient-radial from-slate-600/30 via-amber-400/20 to-slate-500/30 rounded-full"></div>
            
            {/* Central hub with metallic finish */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-radial from-amber-300 via-slate-300 to-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-amber-200/50"></div>
            
            {/* Enhanced Animated Spokes with gradient trails */}
            <div className="absolute top-0 left-1/2 w-1 h-5 bg-gradient-to-b from-amber-300 via-slate-300 to-transparent transform -translate-x-1/2 spoke-glow spoke-premium"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-5 bg-gradient-to-t from-amber-300 via-slate-300 to-transparent transform -translate-x-1/2 spoke-glow spoke-premium"></div>
            <div className="absolute left-0 top-1/2 h-1 w-5 bg-gradient-to-r from-amber-300 via-slate-300 to-transparent transform -translate-y-1/2 spoke-glow spoke-premium"></div>
            <div className="absolute right-0 top-1/2 h-1 w-5 bg-gradient-to-l from-amber-300 via-slate-300 to-transparent transform -translate-y-1/2 spoke-glow spoke-premium"></div>
            
            {/* Diagonal spokes for more complex design */}
            <div className="absolute top-1 left-1 w-0.5 h-4 bg-gradient-to-br from-amber-400/80 to-transparent transform rotate-45 spoke-glow-secondary"></div>
            <div className="absolute top-1 right-1 w-0.5 h-4 bg-gradient-to-bl from-amber-400/80 to-transparent transform -rotate-45 spoke-glow-secondary"></div>
            <div className="absolute bottom-1 left-1 w-0.5 h-4 bg-gradient-to-tr from-amber-400/80 to-transparent transform -rotate-45 spoke-glow-secondary"></div>
            <div className="absolute bottom-1 right-1 w-0.5 h-4 bg-gradient-to-tl from-amber-400/80 to-transparent transform rotate-45 spoke-glow-secondary"></div>
          </div>
        </div>
        
        {/* Enhanced Orbiting Elements System */}
        <div className="absolute w-20 h-20 -translate-x-4 -translate-y-4 orbit-rotate">
          <div className="absolute w-3 h-3 bg-gradient-radial from-amber-400 to-amber-600 rounded-full orbit-1 orbit-pulse-premium shadow-amber-400/50 shadow-lg"></div>
          <div className="absolute w-2 h-2 bg-gradient-radial from-slate-300 to-slate-500 rounded-full orbit-2 orbit-pulse-premium shadow-slate-300/40 shadow-md"></div>
          <div className="absolute w-1.5 h-1.5 bg-gradient-radial from-amber-300 to-amber-500 rounded-full orbit-3 orbit-pulse-premium shadow-amber-300/30 shadow-sm"></div>
          <div className="absolute w-1 h-1 bg-gradient-radial from-slate-400 to-slate-600 rounded-full orbit-4 orbit-pulse-premium"></div>
        </div>
        
        {/* Advanced Streaming Particle System */}
        <div className="relative ml-6">
          <div className="particle-trail-premium">
            <div className="absolute w-3 h-3 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-full particle-1 stream-flow-premium shadow-amber-400/60 shadow-lg"></div>
            <div className="absolute w-2.5 h-2.5 bg-gradient-to-r from-slate-300 via-amber-200 to-slate-400 rounded-full particle-2 stream-flow-premium shadow-slate-300/50 shadow-md"></div>
            <div className="absolute w-2 h-2 bg-gradient-to-r from-amber-400/90 via-yellow-300/90 to-amber-300/90 rounded-full particle-3 stream-flow-premium shadow-amber-300/40 shadow-sm"></div>
            <div className="absolute w-1.5 h-1.5 bg-gradient-to-r from-slate-400/80 via-amber-200/80 to-slate-300/80 rounded-full particle-4 stream-flow-premium"></div>
            <div className="absolute w-1 h-1 bg-gradient-to-r from-amber-500/60 via-yellow-200/60 to-amber-400/60 rounded-full particle-5 stream-flow-premium"></div>
            <div className="absolute w-0.5 h-0.5 bg-gradient-to-r from-slate-500/40 via-amber-100/40 to-slate-400/40 rounded-full particle-6 stream-flow-premium"></div>
          </div>
        </div>
        
        {/* Premium Play Icon with Multi-layer Rings */}
        <div className="relative ml-6">
          <div className="absolute w-12 h-12 rounded-full border-2 border-amber-400/20 pulse-ring-1 pulse-wave-premium"></div>
          <div className="absolute w-12 h-12 rounded-full border border-slate-300/30 pulse-ring-2 pulse-wave-premium"></div>
          <div className="absolute w-12 h-12 rounded-full border border-amber-300/15 pulse-ring-3 pulse-wave-premium"></div>
          
          {/* Main play button */}
          <div className="w-12 h-12 bg-gradient-radial from-slate-400/40 via-amber-300/30 to-slate-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-200/30 shadow-xl">
            <div className="w-0 h-0 border-l-[12px] border-l-amber-200 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 drop-shadow-lg filter-glow"></div>
          </div>
          
          {/* Decorative corner sparkles */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse sparkle-1"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse sparkle-2"></div>
        </div>
      </div>
      
      {/* Ultra-Premium Text Effect with Holographic Styling */}
      <div className="relative text-shimmer-premium">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-400 via-amber-300 via-slate-300 to-amber-400 bg-clip-text text-transparent blur-sm opacity-50 layer-drift gradient-animated"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-amber-400 via-slate-200 via-amber-300 to-slate-300 bg-clip-text text-transparent blur-xs opacity-70 layer-drift-2 gradient-animated"></div>
        <div className="relative bg-gradient-to-r from-slate-100 via-amber-400 via-yellow-300 via-amber-400 to-slate-200 bg-clip-text text-transparent font-black text-lg tracking-wider drop-shadow-lg">
          STREAM
        </div>
        <div className="absolute -top-1 -right-2 w-3 h-3 bg-gradient-radial from-amber-400 to-yellow-500 rounded-full animate-pulse opacity-80 mega-sparkle"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-radial from-slate-300 to-slate-500 rounded-full animate-pulse opacity-60 mega-sparkle-2"></div>
      </div>
    </div>
  )
})

EnhancedLogo.displayName = 'EnhancedLogo'

EnhancedLogo.displayName = 'EnhancedLogo'

export default EnhancedLogo