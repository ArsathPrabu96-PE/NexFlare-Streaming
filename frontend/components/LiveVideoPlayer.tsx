import React, { useState, useRef, useEffect } from 'react'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon, UserGroupIcon, SignalIcon } from '@heroicons/react/24/solid'

interface LiveVideoPlayerProps {
  src: string
  poster?: string
  title?: string
  onClose: () => void
  isLive?: boolean
  liveViewers?: number
  streamQuality?: string[]
  streamLanguage?: string
}

export default function LiveVideoPlayer({ 
  src, 
  poster, 
  title, 
  onClose, 
  isLive = false, 
  liveViewers = 0,
  streamQuality = ['720p'],
  streamLanguage = 'English'
}: LiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState(streamQuality[0])
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'buffering' | 'disconnected'>('connected')

  // Detect mobile device with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    
    const checkMobile = () => {
      // Debounce resize events and batch DOM reads
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         window.innerWidth <= 768
          setIsMobile(mobile)
        })
      }, 150)
    }
    
    // Initial check
    checkMobile()
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile, { passive: true })
      return () => {
        window.removeEventListener('resize', checkMobile)
        clearTimeout(resizeTimeout)
      }
    }
  }, [])

  // Auto-hide controls on mobile
  useEffect(() => {
    if (!isMobile) return

    let timeoutId: NodeJS.Timeout
    const hideControls = () => {
      timeoutId = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    if (isPlaying) {
      hideControls()
    }

    return () => clearTimeout(timeoutId)
  }, [isPlaying, isMobile])

  // Simulate live connection status for demo
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const statuses: Array<'connected' | 'buffering' | 'disconnected'> = ['connected', 'buffering']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setConnectionStatus(randomStatus)
    }, 10000) // Change status every 10 seconds for demo

    return () => clearInterval(interval)
  }, [isLive])

  const togglePlay = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
        }
      }
      setIsPlaying(!isPlaying)
      if (isMobile) setShowControls(true)
    } catch (error) {
      console.error('Video play error:', error)
      setError('Failed to play live stream. Please check your connection and try again.')
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setIsLoading(false)
      // Auto-play live streams
      if (isLive) {
        videoRef.current.play().catch(console.error)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = vol
      setVolume(vol)
      setIsMuted(vol === 0)
    }
  }

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality)
    setShowQualityMenu(false)
    // In a real implementation, you would switch the video source here
    console.log(`Switching to ${quality} quality`)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    if (isLive) {
      setError('Live stream temporarily unavailable. Click retry to reconnect.')
    } else {
      setError('Failed to load video. Please check your internet connection and try again.')
    }
  }

  const retryConnection = () => {
    setError(null)
    setIsLoading(true)
    setConnectionStatus('buffering')
    
    if (videoRef.current) {
      // Reset video source to trigger reload
      const currentSrc = videoRef.current.src
      videoRef.current.src = ''
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = currentSrc
          videoRef.current.load()
        }
      }, 100)
    }
  }

  const handleVideoClick = () => {
    if (isMobile) {
      setShowControls(true)
      setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault()
      togglePlay()
    } else if (e.code === 'Escape') {
      onClose()
    }
  }

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400'
      case 'buffering': return 'text-yellow-400'
      case 'disconnected': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Live'
      case 'buffering': return 'Buffering'
      case 'disconnected': return 'Reconnecting'
      default: return 'Unknown'
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <div className="bg-red-600/90 text-white p-6 rounded-lg max-w-md text-center">
              <h3 className="font-bold mb-2">{isLive ? 'Live Stream Error' : 'Video Error'}</h3>
              <p className="mb-4">{error}</p>
              <div className="flex space-x-3 justify-center">
                {isLive && (
                  <button 
                    onClick={retryConnection}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors"
                  >
                    Retry Connection
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-contain"
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          onClick={handleVideoClick}
          preload="metadata"
          playsInline
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          autoPlay={isLive}
          muted={isLive} // Live streams often need to start muted for autoplay
        />

        {/* Live Stream Indicator */}
        {isLive && (
          <div className="absolute top-4 left-4 z-30">
            <div className="flex items-center space-x-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}

        {/* Custom Controls Overlay */}
        {showControls && !error && (
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {title && (
                  <h2 className="text-white font-semibold text-lg truncate mr-4">{title}</h2>
                )}
                
                {/* Live Viewer Count */}
                {isLive && liveViewers > 0 && (
                  <div className="flex items-center space-x-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{formatViewerCount(liveViewers)} watching</span>
                  </div>
                )}
                
                {/* Connection Status */}
                {isLive && (
                  <div className={`flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full text-sm ${getConnectionStatusColor()}`}>
                    <SignalIcon className="w-4 h-4" />
                    <span>{getConnectionStatusText()}</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={onClose}
                className="text-white hover:text-red-400 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Center Play Button */}
            {!isPlaying && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-primary/80 hover:bg-primary text-white rounded-full p-4 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <PlayIcon className="w-12 h-12 ml-1" />
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              {/* Live streams don't have progress bars */}
              {!isLive && (
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-600 rounded-lg">
                    <div className="h-2 bg-primary rounded-lg" style={{ width: '0%' }}></div>
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-primary transition-colors"
                  >
                    {isPlaying ? 
                      <PauseIcon className="w-8 h-8" /> : 
                      <PlayIcon className="w-8 h-8" />
                    }
                  </button>

                  {/* Volume Controls (Hidden on mobile) */}
                  {!isMobile && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {isMuted || volume === 0 ? 
                          <SpeakerXMarkIcon className="w-6 h-6" /> : 
                          <SpeakerWaveIcon className="w-6 h-6" />
                        }
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Stream Language */}
                  {isLive && streamLanguage && (
                    <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {streamLanguage}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quality Selector */}
                  {streamQuality.length > 1 && (
                    <div className="relative">
                      <button
                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                        className="text-white hover:text-primary transition-colors bg-black/50 px-3 py-1 rounded text-sm"
                      >
                        {selectedQuality}
                      </button>
                      {showQualityMenu && (
                        <div className="absolute bottom-8 right-0 bg-black/90 rounded-lg overflow-hidden">
                          {streamQuality.map((quality) => (
                            <button
                              key={quality}
                              onClick={() => handleQualityChange(quality)}
                              className={`block w-full px-4 py-2 text-left text-white hover:bg-primary/50 transition-colors ${
                                quality === selectedQuality ? 'bg-primary/30' : ''
                              }`}
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mobile-specific touch-friendly close button */}
                  {isMobile && (
                    <button 
                      onClick={onClose}
                      className="text-white hover:text-red-400 transition-colors p-3 bg-black/50 rounded-full"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Instructions */}
      {isMobile && showControls && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-lg">
          {isLive ? 'Tap screen to toggle controls' : 'Tap screen to toggle controls'}
        </div>
      )}
    </div>
  )
}