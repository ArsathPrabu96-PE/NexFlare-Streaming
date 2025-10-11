import React from 'react'
import { PlayIcon, UserGroupIcon, SignalIcon, ClockIcon, StarIcon } from '@heroicons/react/24/solid'

interface LiveTVChannelCardProps {
  channel: {
    _id: string
    name: string
    description: string
    logo: string
    thumbnail: string
    streamUrl: string
    category: string
    isPremium: boolean
    isLive: boolean
    currentProgram?: {
      title: string
      description: string
      startTime: Date
      endTime: Date
      rating: string
    }
    upcomingProgram?: {
      title: string
      description: string
      startTime: Date
      endTime: Date
      rating: string
    }
    liveViewers: number
    channelNumber: number
  }
  onWatch: (channel: any) => void
  className?: string
}

export default function LiveTVChannelCard({ channel, onWatch, className = '' }: LiveTVChannelCardProps) {
  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const getProgress = () => {
    if (!channel.currentProgram) return 0
    
    const now = new Date()
    const start = new Date(channel.currentProgram.startTime)
    const end = new Date(channel.currentProgram.endTime)
    const total = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.max(0, Math.min(100, (elapsed / total) * 100))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className={`group relative bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Channel Thumbnail/Preview */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={channel.thumbnail}
          alt={channel.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Channel Number Badge */}
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-bold">
            {channel.channelNumber}
          </div>
        </div>
        
        {/* Live Badge */}
        {channel.isLive && (
          <div className="absolute top-2 right-2 z-10">
            <div className="flex items-center space-x-1 bg-red-600/90 text-white px-2 py-1 rounded text-xs font-semibold">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}
        
        {/* Premium Badge */}
        {channel.isPremium && (
          <div className="absolute top-12 right-2 z-10">
            <div className="flex items-center space-x-1 bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-bold">
              <StarIcon className="w-3 h-3" />
              <span>PREMIUM</span>
            </div>
          </div>
        )}
        
        {/* Channel Logo */}
        <div className="absolute bottom-2 left-2 z-10">
          <img
            src={channel.logo}
            alt={`${channel.name} logo`}
            className="w-8 h-8 rounded bg-white/10 backdrop-blur-sm p-1"
          />
        </div>
        
        {/* Signal Quality */}
        <div className="absolute bottom-2 right-2 z-10">
          <div className="flex items-center space-x-1 bg-black/70 text-green-400 px-2 py-1 rounded text-xs">
            <SignalIcon className="w-3 h-3" />
            <span>HD</span>
          </div>
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <button
            onClick={() => onWatch(channel)}
            className="bg-primary/80 hover:bg-primary text-white rounded-full p-3 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <PlayIcon className="w-8 h-8 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="p-4">
        {/* Channel Name */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors duration-300">
            {channel.name}
          </h3>
          
          {/* Viewer Count */}
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <UserGroupIcon className="w-3 h-3" />
            <span>{formatViewerCount(channel.liveViewers)}</span>
          </div>
        </div>
        
        {/* Current Program */}
        {channel.currentProgram && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-white text-xs line-clamp-1">
                {channel.currentProgram.title}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="bg-gray-700 px-1 py-0.5 rounded text-xs">
                  {channel.currentProgram.rating}
                </span>
                <ClockIcon className="w-3 h-3" />
                <span>{getTimeRemaining(channel.currentProgram.endTime)} left</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-xs line-clamp-1 mb-2">
              {channel.currentProgram.description}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            
            {/* Time Info */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(channel.currentProgram.startTime)}</span>
              <span>{formatTime(channel.currentProgram.endTime)}</span>
            </div>
          </div>
        )}
        
        {/* Upcoming Program */}
        {channel.upcomingProgram && (
          <div className="border-t border-gray-700 pt-2">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-300 text-xs">Up Next:</h5>
              <span className="text-xs text-gray-500">
                {formatTime(channel.upcomingProgram.startTime)}
              </span>
            </div>
            <p className="text-gray-400 text-xs line-clamp-1">
              {channel.upcomingProgram.title}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700">
          <button
            onClick={() => onWatch(channel)}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-300"
          >
            <PlayIcon className="w-3 h-3" />
            <span>Watch Live</span>
          </button>
          
          {/* Category */}
          <span className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs text-gray-300 transition-colors duration-300">
            {channel.category}
          </span>
        </div>
      </div>
      
      {/* Live Channel Pulse Effect */}
      {channel.isLive && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary/20 animate-pulse pointer-events-none"></div>
      )}
    </div>
  )
}