'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import VideoCard from './VideoCard'
import StyledText, { 
  TrendingNowText, 
  AnimationText, 
  PremiumContentText, 
  SciFiText, 
  AllVideosText 
} from './StyledText'

interface Video {
  _id: string
  title: string
  thumbnail: string
  duration: number
  rating: string
  releaseYear: number
  isPremium: boolean
}

interface VideoRowProps {
  title: string
  videos: Video[]
}

export default function VideoRow({ title, videos }: VideoRowProps) {
  const scrollLeft = () => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  // Function to render styled title based on section name
  const renderStyledTitle = () => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('trending')) {
      return <TrendingNowText className="mb-4" />
    } else if (titleLower.includes('animation')) {
      return <AnimationText className="mb-4" />
    } else if (titleLower.includes('premium')) {
      return <PremiumContentText className="mb-4" />
    } else if (titleLower.includes('sci-fi') || titleLower.includes('scifi')) {
      return <SciFiText className="mb-4" />
    } else if (titleLower.includes('all') && titleLower.includes('video')) {
      return <AllVideosText className="mb-4" />
    } else {
      // Default styled text for other sections
      return (
        <div className="flex items-center mb-4">
          <span className="graphics-icon graphics-icon-star mr-3 text-4xl">🎯</span>
          <StyledText text={title.toUpperCase()} className="text-3xl md:text-4xl font-black" />
          <span className="graphics-icon graphics-icon-sparkle ml-3 text-4xl">💫</span>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {renderStyledTitle()}
      
      <div className="relative group">
                <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-primary/80 to-accent-purple/80 hover:from-primary hover:to-accent-purple p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
        >
          <span className="graphics-icon graphics-icon-fire">⬅️</span>
          <ChevronLeftIcon className="w-6 h-6 text-neon-green" />
        </button>
        
        <div 
          id={`row-${title}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-accent-blue/80 to-accent-teal/80 hover:from-accent-blue hover:to-accent-teal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/20"
        >
          <ChevronRightIcon className="w-6 h-6 text-neon-pink" />
          <span className="graphics-icon graphics-icon-diamond">➡️</span>
        </button>
      </div>
    </div>
  )
}