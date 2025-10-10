'use client'

import { useState } from 'react'
import { PlayIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { usePerformanceOptimizer, generatePerformanceClasses } from '../hooks/usePerformanceOptimizer'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  rating: string
  releaseYear: number
}

interface OptimizedVideoCardProps {
  video: Video
  className?: string
}

export default function OptimizedVideoCard({ video, className = '' }: OptimizedVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Performance optimization
  const { metrics, settings } = usePerformanceOptimizer()
  const performanceClasses = generatePerformanceClasses(settings)

  return (
    <div 
      className={`relative group performance-card memory-efficient ${performanceClasses} ${className}`}
      onMouseEnter={() => settings.enableAnimations && setIsHovered(true)}
      onMouseLeave={() => settings.enableAnimations && setIsHovered(false)}
    >
      {/* Optimized image with lazy loading */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 efficient-skeleton rounded-lg" />
        )}
        
        {/* Optimized image */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Adaptive overlay */}
        {settings.enableGradients ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-black/30" />
        )}
        
        {/* Conditional hover effects */}
        {settings.enableAnimations && isHovered && !metrics.isMobile && (
          <div className="absolute inset-0 bg-black/20 optimized-fade" />
        )}
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <h3 className={`font-bold text-sm md:text-base text-white mb-1 line-clamp-2 ${
          settings.enableShadows ? 'efficient-glow' : ''
        }`}>
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-300">
            <span className="bg-black/50 px-2 py-1 rounded">{video.rating}</span>
            <span>{video.releaseYear}</span>
          </div>
          
          {/* Conditional action buttons for high-end devices */}
          {!metrics.isMobile && settings.enableAnimations && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                <PlayIcon className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                <PlusIcon className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                <InformationCircleIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Performance-based quality indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400" title={`Quality: ${metrics.graphicsQuality}`} />
      )}
    </div>
  )
}