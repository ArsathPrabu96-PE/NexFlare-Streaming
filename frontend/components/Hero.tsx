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

  useEffect(() => {
    const timer = setTimeout(() => setShowTrailer(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!video) return null

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[20s] ease-out"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      {/* Floating particles effect */}
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
      
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl animate-in slide-in-from-left duration-1000 space-y-8">
          {/* Genre tags */}
          <div className="flex items-center space-x-4">
            <span className="bg-gradient-to-r from-primary/30 to-pink-500/30 backdrop-blur-sm text-neon-pink px-4 py-2 rounded-full text-sm font-bold border border-primary/50 shadow-lg flex items-center">
              <span className="graphics-icon graphics-icon-fire">🎬</span>
              Sci-Fi
              <span className="graphics-icon graphics-icon-sparkle">⚡</span>
            </span>
            <span className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm text-metallic-gold px-4 py-2 rounded-full text-sm font-bold border border-yellow-500/50 shadow-lg flex items-center">
              <span className="graphics-icon graphics-icon-star">⭐</span>
              IMDB Choice
              <span className="graphics-icon graphics-icon-diamond">👑</span>
            </span>
            <span className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm text-neon-green px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/50 shadow-lg flex items-center">
              <span className="graphics-icon graphics-icon-fire">🔥</span>
              Trending
              <span className="graphics-icon graphics-icon-sparkle">💥</span>
            </span>
          </div>
          
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl font-black text-rainbow leading-none tracking-tight drop-shadow-2xl flex items-center justify-center md:justify-start">
            <span className="graphics-icon graphics-icon-fire text-6xl">🌟</span>
            {video.title}
            <span className="graphics-icon graphics-icon-diamond text-6xl">✨</span>
          </h1>
          
          {/* Rating and info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-metallic-gold fill-current icon-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
              <span className="text-neon-green font-black ml-3 text-xl flex items-center">
                <span className="graphics-icon graphics-icon-sparkle">⚡</span>
                8.8
              </span>
            </div>
            <span className="bg-gradient-to-r from-gray-700/80 to-gray-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-ocean border border-gray-500/50 flex items-center">
              <span className="graphics-icon graphics-icon-diamond">🏆</span>
              {video.rating}
            </span>
            <span className="text-fire font-black text-lg flex items-center">
              <span className="graphics-icon graphics-icon-star">📅</span>
              {video.releaseYear}
            </span>
            <span className="text-neon-pink font-bold text-lg flex items-center">
              <span className="graphics-icon graphics-icon-fire">⏱️</span>
              2h 28m
            </span>
          </div>
          
          <p className="text-xl md:text-2xl text-metallic-silver line-clamp-3 max-w-4xl leading-relaxed font-medium flex items-start">
            <span className="graphics-icon graphics-icon-sparkle mr-2 mt-1">📖</span>
            {video.description}
          </p>
          
          {/* Enhanced action buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-white via-gray-100 to-white text-black px-10 py-5 rounded-full hover:from-gradient-start hover:via-gradient-middle hover:to-gradient-end hover:text-white transition-all duration-500 font-black text-xl shadow-2xl hover:shadow-primary/30 hover:scale-110 transform">
              <span className="graphics-icon graphics-icon-fire">▶️</span>
              <PlayIcon className="w-7 h-7 group-hover:scale-125 group-hover:text-white transition-all duration-300" />
              <span>Play Now</span>
              <span className="graphics-icon graphics-icon-sparkle">🚀</span>
            </button>
            
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 backdrop-blur-md border border-accent-purple/40 text-neon-pink px-8 py-4 rounded-full hover:from-accent-purple/30 hover:to-accent-pink/30 transition-all duration-300 font-bold text-lg hover:scale-105 shadow-lg">
              <span className="graphics-icon graphics-icon-star">❤️</span>
              <PlusIcon className="w-6 h-6 group-hover:rotate-180 group-hover:text-accent-pink transition-all duration-500" />
              <span>My List</span>
            </button>
            
            <button className="group flex items-center space-x-3 bg-gradient-to-r from-accent-blue/20 to-accent-teal/20 backdrop-blur-md border border-accent-blue/40 text-ocean px-8 py-4 rounded-full hover:from-accent-blue/30 hover:to-accent-teal/30 transition-all duration-300 font-bold text-lg hover:scale-105 shadow-lg">
              <span className="graphics-icon graphics-icon-diamond">ℹ️</span>
              <InformationCircleIcon className="w-6 h-6 group-hover:rotate-12 group-hover:text-accent-teal transition-all duration-300" />
              <span>More Info</span>
            </button>
          </div>
          
          {/* Secondary actions */}
          <div className="flex items-center space-x-6">
            <button className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-110 border border-red-500/30 group flex items-center">
              <span className="graphics-icon graphics-icon-fire mr-1">💖</span>
              <HeartIcon className="w-6 h-6 text-neon-pink group-hover:text-red-300 group-hover:fill-current transition-all duration-300" />
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 bg-gradient-to-r from-accent-emerald/20 to-accent-teal/20 backdrop-blur-sm rounded-full hover:from-accent-emerald/30 hover:to-accent-teal/30 transition-all duration-300 hover:scale-110 border border-accent-emerald/30 group flex items-center"
            >
              <span className="graphics-icon graphics-icon-star mr-1">🔊</span>
              {isMuted ? 
                <SpeakerXMarkIcon className="w-6 h-6 text-fire group-hover:text-accent-teal transition-colors duration-300" /> : 
                <SpeakerWaveIcon className="w-6 h-6 text-neon-green group-hover:text-accent-teal transition-colors duration-300" />
              }
            </button>
          </div>
        </div>
        
        {/* Trailer preview indicator */}
        {showTrailer && (
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