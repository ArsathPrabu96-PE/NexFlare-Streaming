'use client'

import { useState, useEffect } from 'react'
import { PlayIcon, PlusIcon, InformationCircleIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline'

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

export default function Hero({ video }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const timer = setTimeout(() => setShowTrailer(true), 3000)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!video) return null

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mobile-optimized background */}
      {isMobile ? (
        // Simple static background for mobile
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${video.thumbnail})` }}
        />
      ) : (
        // Enhanced background for desktop
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[20s] ease-out"
          style={{ backgroundImage: `url(${video.thumbnail})` }}
        />
      )}
      
      {/* Simplified overlays for mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      {/* Conditional particle effects - only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Mobile-friendly static decoration */}
      {isMobile && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full"></div>
        </div>
      )}
      
      <div className="relative z-10 flex items-center h-full px-4 md:px-6 lg:px-20">
        <div className="max-w-5xl animate-in slide-in-from-left duration-1000 space-y-4 md:space-y-8">
          {/* Mobile-optimized genre tags */}
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="bg-black/60 text-cyan-400 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-cyan-400/50 shadow-lg flex items-center">
              {!isMobile && <span className="mr-1">🎬</span>}
              Sci-Fi
              {!isMobile && <span className="ml-1">⚡</span>}
            </span>
            <span className="bg-black/60 text-yellow-400 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-yellow-400/50 shadow-lg flex items-center">
              {!isMobile && <span className="mr-1">⭐</span>}
              IMDB Choice
              {!isMobile && <span className="ml-1">👑</span>}
            </span>
            <span className="bg-black/60 text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-green-400/50 shadow-lg flex items-center">
              {!isMobile && <span className="mr-1">🔥</span>}
              Trending
              {!isMobile && <span className="ml-1">💥</span>}
            </span>
          </div>
          
          {/* Mobile-optimized title */}
          <h1 className={`font-black leading-none tracking-tight drop-shadow-2xl ${
            isMobile 
              ? 'text-3xl text-white' 
              : 'text-display text-6xl md:text-8xl lg:text-9xl text-rainbow'
          } flex items-center justify-center md:justify-start`}>
            {!isMobile && <span className="graphics-icon graphics-icon-fire text-6xl">🌟</span>}
            {video.title}
            {!isMobile && <span className="graphics-icon graphics-icon-diamond text-6xl">✨</span>}
          </h1>
          
          {/* Mobile-optimized rating and info */}
          <div className="flex items-center space-x-3 md:space-x-6 flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current ${!isMobile ? 'icon-pulse' : ''}`} 
                  style={{ animationDelay: !isMobile ? `${i * 0.1}s` : undefined }} 
                />
              ))}
              <span className={`font-bold ml-2 text-sm md:text-xl flex items-center ${
                isMobile ? 'text-green-400' : 'text-neon-green'
              }`}>
                {!isMobile && <span className="graphics-icon graphics-icon-sparkle">⚡</span>}
                8.8
              </span>
            </div>
            <span className="bg-black/60 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-blue-400 border border-gray-500/50 flex items-center">
              {!isMobile && <span className="graphics-icon graphics-icon-diamond">🏆</span>}
              {video.rating}
            </span>
            <span className={`font-bold text-sm md:text-lg flex items-center ${
              isMobile ? 'text-red-400' : 'text-fire'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-star">📅</span>}
              {video.releaseYear}
            </span>
            <span className={`font-bold text-sm md:text-lg flex items-center ${
              isMobile ? 'text-pink-400' : 'text-neon-pink'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-fire">⏱️</span>}
              2h 28m
            </span>
          </div>
          
          {/* Mobile-optimized description */}
          <p className={`line-clamp-3 max-w-4xl leading-relaxed font-medium flex items-start ${
            isMobile 
              ? 'text-base text-gray-300' 
              : 'text-xl md:text-2xl text-metallic-silver'
          }`}>
            {!isMobile && <span className="graphics-icon graphics-icon-sparkle mr-2 mt-1">📖</span>}
            {video.description}
          </p>
          
          {/* Mobile-optimized action buttons */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-white text-black rounded-full font-bold shadow-lg transition-all duration-300 ${
              isMobile 
                ? 'px-6 py-3 text-base hover:bg-gray-200' 
                : 'px-10 py-5 text-xl hover:scale-110 transform'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-fire">▶️</span>}
              <PlayIcon className={`group-hover:scale-125 transition-all duration-300 ${
                isMobile ? 'w-5 h-5' : 'w-7 h-7'
              }`} />
              <span>Play Now</span>
              {!isMobile && <span className="graphics-icon graphics-icon-sparkle">🚀</span>}
            </button>
            
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-black/60 border border-purple-400/40 text-purple-400 rounded-full font-bold transition-all duration-300 ${
              isMobile 
                ? 'px-4 py-3 text-sm hover:bg-black/80' 
                : 'px-8 py-4 text-lg hover:scale-105'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-star">❤️</span>}
              <PlusIcon className={`group-hover:rotate-180 transition-all duration-500 ${
                isMobile ? 'w-4 h-4' : 'w-6 h-6'
              }`} />
              <span>My List</span>
            </button>
            
            <button className={`group flex items-center space-x-2 md:space-x-3 bg-black/60 border border-blue-400/40 text-blue-400 rounded-full font-bold transition-all duration-300 ${
              isMobile 
                ? 'px-4 py-3 text-sm hover:bg-black/80' 
                : 'px-8 py-4 text-lg hover:scale-105'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-diamond">ℹ️</span>}
              <InformationCircleIcon className={`group-hover:rotate-12 transition-all duration-300 ${
                isMobile ? 'w-4 h-4' : 'w-6 h-6'
              }`} />
              <span>More Info</span>
            </button>
          </div>
          
          {/* Mobile-optimized secondary actions */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className={`bg-black/60 rounded-full border border-red-400/30 group flex items-center transition-all duration-300 ${
              isMobile 
                ? 'p-3 hover:bg-black/80' 
                : 'p-4 hover:scale-110'
            }`}>
              {!isMobile && <span className="graphics-icon graphics-icon-fire mr-1">💖</span>}
              <HeartIcon className={`text-red-400 group-hover:text-red-300 group-hover:fill-current transition-all duration-300 ${
                isMobile ? 'w-5 h-5' : 'w-6 h-6'
              }`} />
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`bg-black/60 rounded-full border border-green-400/30 group flex items-center transition-all duration-300 ${
                isMobile 
                  ? 'p-3 hover:bg-black/80' 
                  : 'p-4 hover:scale-110'
              }`}
            >
              {!isMobile && <span className="graphics-icon graphics-icon-star mr-1">🔊</span>}
              {isMuted ? 
                <SpeakerXMarkIcon className={`text-red-400 group-hover:text-green-400 transition-colors duration-300 ${
                  isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} /> : 
                <SpeakerWaveIcon className={`text-green-400 group-hover:text-blue-400 transition-colors duration-300 ${
                  isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
              }
            </button>
          </div>
        </div>
        
        {/* Desktop-only trailer preview */}
        {showTrailer && !isMobile && (
          <div className="absolute bottom-8 right-8 animate-in slide-in-from-right duration-500">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <p className="text-sm text-gray-300 mb-2">Watch Trailer</p>
              <div className="w-32 h-18 bg-gray-700 rounded overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}