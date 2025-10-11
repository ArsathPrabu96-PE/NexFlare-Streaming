'use client'

import { useState, useEffect } from 'react'
import { PlayIcon, PlusIcon, InformationCircleIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline'
import { usePerformanceOptimizer, generatePerformanceClasses, generatePerformanceVars } from '../hooks/usePerformanceOptimizer'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  rating: string
  releaseYear: number
}

interface HeroProps {
  video?: Video
}

// Optimized particle component
const OptimizedParticles = ({ count, className }: { count: number, className: string }) => {
  if (count === 0) return null
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      {[...Array(Math.min(count, 50))].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full optimized-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.3 + Math.random() * 0.4
          }}
        />
      ))}
    </div>
  )
}

export default function OptimizedHero({ video }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // Performance optimization system with error handling
  let metrics, settings, frameRate, isPerformanceGood
  
  try {
    const optimizerResult = usePerformanceOptimizer()
    metrics = optimizerResult.metrics
    settings = optimizerResult.settings
    frameRate = optimizerResult.frameRate
    isPerformanceGood = optimizerResult.isPerformanceGood
  } catch (error) {
    console.error('Performance optimizer error:', error)
    // Fallback values
    metrics = {
      devicePixelRatio: 1,
      hardwareConcurrency: 2,
      isMobile: false,
      isLowEnd: false,
      preferReducedMotion: false,
      graphicsQuality: 'medium' as const
    }
    settings = {
      enableAnimations: true,
      enableParticles: false,
      enableGradients: true,
      enableBlur: false,
      enableShadows: false,
      animationDuration: 300,
      particleCount: 0,
      blurRadius: 0
    }
    frameRate = 60
    isPerformanceGood = true
  }

  // Preload image
  useEffect(() => {
    if (video?.thumbnail) {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
      img.src = video.thumbnail
    }
  }, [video?.thumbnail])

  if (!video) {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">No Video Selected</h2>
          <p className="text-gray-400">Please select a video to preview</p>
        </div>
      </div>
    )
  }

  let performanceClasses = ''
  let performanceVars = {}
  
  try {
    performanceClasses = generatePerformanceClasses(settings)
    performanceVars = generatePerformanceVars(settings)
  } catch (error) {
    console.error('Performance class generation error:', error)
    performanceClasses = 'fallback-performance'
    performanceVars = {}
  }

  return (
    <div 
      className={`relative h-screen overflow-hidden memory-efficient quality-${metrics.graphicsQuality} ${performanceClasses}`}
      style={performanceVars as React.CSSProperties}
    >
      {/* Adaptive Background System */}
      <div className="absolute inset-0">
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading {video.title}...</p>
            </div>
          </div>
        )}
        
        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-2">Image Load Error</h3>
              <p className="text-gray-300">Failed to load {video.title} preview</p>
            </div>
          </div>
        )}
        
        {/* Main background when loaded */}
        {imageLoaded && !imageError && (
          <>
            {settings.enableAnimations && !metrics.isMobile ? (
              // Enhanced animated background for high-end devices
              <div 
                className="absolute inset-0 bg-cover bg-center hw-accelerate"
                style={{ 
                  backgroundImage: `url(${video.thumbnail})`,
                  transform: 'scale(1.1)'
                }}
              />
            ) : (
              // Static optimized background
              <div 
                className="absolute inset-0 bg-cover bg-center performance-hero"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              />
            )}
          </>
        )}
      </div>
      
      {/* Adaptive overlays based on graphics quality */}
      {settings.enableGradients ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/60" />
      )}
      
      {/* Conditional particle effects based on performance */}
      {settings.enableParticles && (
        <OptimizedParticles count={settings.particleCount} className="opacity-30" />
      )}
      
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-20 right-4 bg-black/80 text-white p-3 rounded-lg text-sm z-50">
          <div className="space-y-1">
            <div>Quality: <span className="font-bold text-blue-400">{metrics.graphicsQuality}</span></div>
            <div>FPS: <span className={`font-bold ${frameRate >= 30 ? 'text-green-400' : 'text-red-400'}`}>{frameRate}</span></div>
            <div>Device: <span className="font-bold">{metrics.isMobile ? 'Mobile' : 'Desktop'}</span></div>
            <div>Performance: {isPerformanceGood ? '✅' : '⚠️'}</div>
            <div className="text-xs text-gray-400 mt-2">
              Animations: {settings.enableAnimations ? '✅' : '❌'}<br />
              Particles: {settings.enableParticles ? '✅' : '❌'}<br />
              Gradients: {settings.enableGradients ? '✅' : '❌'}<br />
              Blur: {settings.enableBlur ? '✅' : '❌'}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 lg:px-16 z-10 max-w-6xl">
        <div className={`space-y-4 md:space-y-6 ${settings.enableAnimations ? 'optimized-fade' : ''}`}>
          {/* Optimized title with adaptive styling */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white ${
            settings.enableGradients && !metrics.isMobile 
              ? 'efficient-gradient-text' 
              : ''
          } ${settings.enableShadows && !metrics.isMobile ? 'efficient-glow' : ''}`}>
            {video.title}
          </h1>
          
          {/* Performance-optimized rating section */}
          <div className="flex items-center space-x-3 md:space-x-6 flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current ${
                    settings.enableAnimations && !metrics.isMobile ? 'optimized-pulse' : ''
                  }`}
                  style={{ 
                    animationDelay: settings.enableAnimations ? `${i * 0.1}s` : undefined,
                    animationDuration: settings.enableAnimations ? '2s' : undefined
                  }} 
                />
              ))}
              <span className="font-bold ml-2 text-sm md:text-xl text-green-400">
                8.8
              </span>
            </div>
            <span className="bg-black/60 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-blue-400 border border-gray-500/50">
              {video.rating}
            </span>
            <span className="font-bold text-sm md:text-lg text-red-400">
              {video.releaseYear}
            </span>
            <span className="font-bold text-sm md:text-lg text-pink-400">
              2h 28m
            </span>
          </div>
          
          {/* Optimized description */}
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 line-clamp-3 max-w-4xl leading-relaxed font-medium">
            {video.description}
          </p>
          
          {/* Performance-optimized action buttons */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-white text-black rounded-full font-bold shadow-lg performance-button ${
              metrics.isMobile 
                ? 'px-6 py-3 text-base' 
                : 'px-10 py-5 text-xl'
            }`}>
              <PlayIcon className={`${metrics.isMobile ? 'w-5 h-5' : 'w-7 h-7'} ${
                settings.enableAnimations ? 'transition-transform duration-300 group-hover:scale-125' : ''
              }`} />
              <span>Play Now</span>
            </button>
            
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-black/60 border border-purple-400/40 text-purple-400 rounded-full font-bold performance-button ${
              metrics.isMobile 
                ? 'px-4 py-3 text-sm' 
                : 'px-8 py-4 text-lg'
            }`}>
              <PlusIcon className={`${metrics.isMobile ? 'w-4 h-4' : 'w-6 h-6'} ${
                settings.enableAnimations ? 'transition-transform duration-500 group-hover:rotate-180' : ''
              }`} />
              <span>My List</span>
            </button>
            
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-black/60 border border-blue-400/40 text-blue-400 rounded-full font-bold performance-button ${
              metrics.isMobile 
                ? 'px-4 py-3 text-sm' 
                : 'px-8 py-4 text-lg'
            }`}>
              <InformationCircleIcon className={`${metrics.isMobile ? 'w-4 h-4' : 'w-6 h-6'} ${
                settings.enableAnimations ? 'transition-transform duration-300 group-hover:rotate-12' : ''
              }`} />
              <span>More Info</span>
            </button>
          </div>
          
          {/* Optimized secondary actions */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className={`bg-black/60 rounded-full border border-red-400/30 group flex items-center performance-button ${
              metrics.isMobile ? 'p-3' : 'p-4'
            }`}>
              <HeartIcon className={`text-red-400 ${metrics.isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${
                settings.enableAnimations ? 'transition-all duration-300 group-hover:text-red-300 group-hover:fill-current' : ''
              }`} />
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`bg-black/60 rounded-full border border-green-400/30 group flex items-center performance-button ${
                metrics.isMobile ? 'p-3' : 'p-4'
              }`}
            >
              {isMuted ? 
                <SpeakerXMarkIcon className={`text-red-400 ${metrics.isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${
                  settings.enableAnimations ? 'transition-colors duration-300 group-hover:text-green-400' : ''
                }`} /> : 
                <SpeakerWaveIcon className={`text-green-400 ${metrics.isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${
                  settings.enableAnimations ? 'transition-colors duration-300 group-hover:text-blue-400' : ''
                }`} />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}