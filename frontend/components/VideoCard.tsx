'use client'

import { useState, memo, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { PlayIcon, PlusIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/outline'
import VideoPlayer from './VideoPlayer'

interface Video {
  _id: string
  title: string
  description?: string
  thumbnail: string
  videoUrl?: string
  duration: number
  rating: string
  releaseYear: number
  isPremium: boolean
  views?: number
  likes?: number
}

interface VideoCardProps {
  video: Video
  priority?: boolean
  index?: number
}

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

const VideoCard: React.FC<VideoCardProps> = memo(({ video, priority = false, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isMobile = useIsMobile()

  const formatDuration = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovered(true)
    }
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false)
    }
  }, [isMobile])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  // Simplified mobile version
  if (isMobile) {
    return (
      <div className="group relative min-w-[150px] cursor-pointer">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          <Image 
            src={video.thumbnail} 
            alt={video.title}
            width={300}
            height={169}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Mobile overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-active:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>
        
        {/* Simplified info */}
        <div className="p-2 space-y-1">
          <h3 className="font-semibold text-sm text-white line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{video.releaseYear}</span>
            <span className="text-yellow-500">{video.rating}</span>
          </div>
        </div>
      </div>
    )
  }

  // Full desktop version with animations
  return (
    <div 
      className="group relative min-w-[200px] md:min-w-[300px] cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-20 hover:rotate-1 perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        filter: isHovered ? 'drop-shadow(0 25px 50px rgba(229, 9, 20, 0.6)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))' : 'none'
      }}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_50px_rgba(229,9,20,0.8),_0_0_100px_rgba(59,130,246,0.4)] transition-all duration-500 border border-transparent group-hover:border-gradient-to-r group-hover:from-primary/50 group-hover:via-accent-blue/50 group-hover:to-accent-purple/50">
        {/* Loading skeleton */}
        <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
        
        <Image 
          src={video.thumbnail} 
          alt={video.title}
          width={400}
          height={225}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleImageLoad}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent-blue/20 to-accent-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        
        {/* Enhanced glass morphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-blue/10 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Premium badge with neon effect */}
        {video.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary via-accent-pink to-accent-purple backdrop-blur-md px-4 py-2 rounded-full text-xs font-black shadow-2xl border border-white/30 animate-pulse flex items-center">
            <span className="graphics-icon graphics-icon-sparkle">👑</span>
            <span className="text-rainbow drop-shadow-lg">PREMIUM</span>
            <span className="graphics-icon graphics-icon-diamond">✨</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple rounded-full blur-md opacity-50 -z-10" />
          </div>
        )}
        
        {/* Enhanced play button with multiple effects */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={() => setShowPlayer(true)}
              className="relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl hover:from-white/40 hover:to-white/20 p-6 rounded-full transition-all duration-500 hover:scale-125 group border border-white/30 shadow-2xl"
            >
              <PlayIcon className="w-12 h-12 text-white drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent-purple/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-accent-purple/20 blur-lg opacity-75" />
            </button>
          </div>
        )}
        
        {/* Enhanced progress bar with glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60 backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-primary via-accent-pink to-accent-purple w-1/3 transition-all duration-500 shadow-lg shadow-primary/50 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-pink blur-sm opacity-75" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4 px-2">
        <h3 className="font-display font-black text-sm md:text-base line-clamp-2 text-rainbow transition-all duration-500 drop-shadow-lg tracking-tight flex items-center">
          <span className="graphics-icon graphics-icon-fire mr-1">🎥</span>
          {video.title}
          <span className="graphics-icon graphics-icon-sparkle ml-1">⭐</span>
        </h3>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-3">
            <span className="bg-gradient-to-r from-yellow-400 via-accent-orange to-red-500 text-black px-3 py-1 rounded-full font-black text-xs shadow-lg border border-yellow-300/50 relative overflow-hidden flex items-center">
              <span className="graphics-icon graphics-icon-star">⭐</span>
              <span className="relative z-10">8.5</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-accent-orange/50 animate-pulse" />
            </span>
            <span className="text-neon-green font-bold flex items-center">
              <span className="graphics-icon graphics-icon-diamond">📅</span>
              {video.releaseYear}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-ocean font-bold flex items-center">
              <span className="graphics-icon graphics-icon-fire">⏱️</span>
              {formatDuration(video.duration)}
            </span>
            <span className="bg-gradient-to-r from-gray-700/80 to-gray-600/80 backdrop-blur-sm px-3 py-1 rounded-full font-bold border border-gray-500/50 shadow-md text-neon-pink flex items-center">
              <span className="graphics-icon graphics-icon-sparkle">🏆</span>
              {video.rating}
            </span>
          </div>
        </div>
        
        {/* Enhanced action buttons */}
        {isHovered && (
          <div className="flex items-center justify-between mt-6 px-2 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowPlayer(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary via-accent-pink to-accent-purple hover:from-primary-dark hover:via-accent-pink hover:to-accent-purple px-6 py-3 rounded-full text-xs font-black transition-all duration-500 hover:scale-110 shadow-2xl border border-white/30 relative overflow-hidden group"
              >
                <span className="graphics-icon graphics-icon-fire">▶️</span>
                <PlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 text-rainbow">Play</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="p-3 bg-gradient-to-r from-accent-blue/20 to-accent-teal/20 backdrop-blur-md hover:from-accent-blue/40 hover:to-accent-teal/40 rounded-full transition-all duration-500 hover:scale-125 border border-accent-blue/30 shadow-xl hover:shadow-2xl hover:shadow-accent-blue/25 group flex items-center">
                <span className="graphics-icon graphics-icon-star">❤️</span>
                <PlusIcon className="w-4 h-4 text-neon-green group-hover:text-accent-teal group-hover:rotate-180 transition-all duration-300" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-500 hover:scale-125 border shadow-xl group flex items-center ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-accent-pink text-white border-red-400/50 shadow-red-500/50' 
                    : 'bg-gradient-to-r from-red-500/20 to-accent-pink/20 backdrop-blur-md hover:from-red-500/40 hover:to-accent-pink/40 border-red-400/30 hover:shadow-red-500/25'
                }`}
              >
                <span className="graphics-icon graphics-icon-fire">💖</span>
                <HeartIcon className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'animate-pulse scale-110 text-white' : 'text-neon-pink group-hover:text-red-300 group-hover:scale-110'}`} />
              </button>
              <button className="p-3 bg-gradient-to-r from-accent-emerald/20 to-accent-teal/20 backdrop-blur-md hover:from-accent-emerald/40 hover:to-accent-teal/40 rounded-full transition-all duration-500 hover:scale-125 border border-accent-emerald/30 shadow-xl hover:shadow-2xl hover:shadow-accent-emerald/25 group flex items-center">
                <span className="graphics-icon graphics-icon-diamond">🚀</span>
                <ShareIcon className="w-4 h-4 text-ocean group-hover:text-accent-teal group-hover:rotate-12 transition-all duration-300" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Video Player Modal */}
      {showPlayer && (
        <VideoPlayer
          src={video.videoUrl || video.thumbnail}
          poster={video.thumbnail}
          title={video.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </div>
  )
})

VideoCard.displayName = 'VideoCard'

export default VideoCard