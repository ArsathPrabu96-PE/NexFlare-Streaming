import React from 'react'
import { PlayIcon, UserGroupIcon, SignalIcon, ClockIcon } from '@heroicons/react/24/solid'

interface LiveVideoCardProps {
  video: {
    _id: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string
    category: string
    views: number
    likes: number
    isPremium: boolean
    isLive: boolean
    liveViewers?: number
    streamStartTime?: Date
    streamLanguage?: string
    streamQuality?: string[]
  }
  onPlay: (video: any) => void
  className?: string
}

export default function LiveVideoCard({ video, onPlay, className = '' }: LiveVideoCardProps) {
  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getStreamDuration = () => {
    if (!video.streamStartTime) return ''
    
    const now = new Date()
    const startTime = new Date(video.streamStartTime)
    const diffMs = now.getTime() - startTime.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`
    }
    return `${diffMinutes}m`
  }

  return (
    <div className={`group relative bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Live Badge */}
        {video.isLive && (
          <div className="absolute top-2 left-2 z-10">
            <div className="flex items-center space-x-1 bg-red-600/90 text-white px-2 py-1 rounded text-xs font-semibold">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}
        
        {/* Premium Badge */}
        {video.isPremium && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-bold">
              PREMIUM
            </div>
          </div>
        )}
        
        {/* Stream Duration */}
        {video.isLive && video.streamStartTime && (
          <div className="absolute bottom-2 left-2 z-10">
            <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
              <ClockIcon className="w-3 h-3" />
              <span>{getStreamDuration()}</span>
            </div>
          </div>
        )}
        
        {/* Quality Badge */}
        {video.streamQuality && video.streamQuality.length > 0 && (
          <div className="absolute bottom-2 right-2 z-10">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
              {video.streamQuality[0]}
            </div>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <button
            onClick={() => onPlay(video)}
            className="bg-primary/80 hover:bg-primary text-white rounded-full p-3 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <PlayIcon className="w-8 h-8 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {video.title}
        </h3>
        
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          {video.isLive && video.liveViewers ? (
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-3 h-3" />
              <span>{formatViewerCount(video.liveViewers)} watching</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span>{formatViewerCount(video.views)} views</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            {/* Connection Quality Indicator */}
            {video.isLive && (
              <div className="flex items-center space-x-1">
                <SignalIcon className="w-3 h-3 text-green-400" />
                <span className="text-green-400">HD</span>
              </div>
            )}
            
            {/* Category */}
            <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">
              {video.category}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-xs line-clamp-2 mb-3">
          {video.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onPlay(video)}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-300"
          >
            <PlayIcon className="w-3 h-3" />
            <span>{video.isLive ? 'Watch Live' : 'Play'}</span>
          </button>
          
          {/* Language */}
          {video.streamLanguage && (
            <div className="text-gray-400 text-xs">
              {video.streamLanguage}
            </div>
          )}
        </div>
      </div>
      
      {/* Live Stream Pulse Effect */}
      {video.isLive && (
        <div className="absolute inset-0 rounded-lg border-2 border-red-500/30 animate-pulse pointer-events-none"></div>
      )}
    </div>
  )
}