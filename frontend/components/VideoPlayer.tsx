'use client'

import React, { useState, useRef, useEffect } from 'react'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  onClose: () => void
}

export default function VideoPlayer({ src, poster, title, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  const togglePlay = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        // Enhanced mobile play handling with user gesture detection
        if (isMobile) {
          // Ensure video is ready for mobile playback
          videoRef.current.load()
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
        }
      }
      setIsPlaying(!isPlaying)
      if (isMobile) setShowControls(true)
    } catch (error) {
      console.error('Video play error:', error)
      // More specific error handling for mobile
      if (isMobile && error.name === 'NotAllowedError') {
        setError('Tap the play button to start video playback.')
      } else {
        setError('Failed to play video. Please try again.')
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsLoading(false)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setError('Failed to load video. Please check your internet connection and try again.')
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
              <h3 className="font-bold mb-2">Video Error</h3>
              <p className="mb-4">{error}</p>
              <button 
                onClick={onClose}
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={`w-full h-full object-contain ${isMobile ? 'mobile-video-player' : ''}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          onClick={handleVideoClick}
          preload="metadata"
          playsInline={true}
          controls={false}
          autoPlay={false}
          muted={isMuted}
          style={{
            objectFit: 'contain'
          } as React.CSSProperties}
          {...(isMobile && {
            'webkit-playsinline': 'true',
            'x5-video-player-type': 'h5',
            'x5-video-player-fullscreen': 'true'
          })}
        />

        {/* Custom Controls Overlay */}
        {showControls && !error && (
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              {title && (
                <h2 className="text-white font-semibold text-lg truncate mr-4">{title}</h2>
              )}
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
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                  }}
                />
              </div>

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

                  {/* Time Display */}
                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

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
        )}
      </div>

      {/* Mobile Instructions */}
      {isMobile && showControls && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-lg">
          Tap screen to toggle controls
        </div>
      )}
    </div>
  )
}