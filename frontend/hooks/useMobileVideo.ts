// Mobile Video Hook for enhanced mobile playback
import { useEffect, useState } from 'react'

export const useMobileVideo = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    // Detect mobile device with better accuracy
    const checkMobile = () => {
      const userAgent = navigator.userAgent
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || 
                     window.innerWidth <= 768 ||
                     ('ontouchstart' in window) ||
                     navigator.maxTouchPoints > 0

      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    // Track user interaction for mobile autoplay policies
    const handleUserInteraction = () => {
      setHasUserInteracted(true)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
    }

    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleUserInteraction, { passive: true })
      document.addEventListener('click', handleUserInteraction, { passive: true })
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  // Helper function to prepare video for mobile playback
  const prepareMobileVideo = async (videoElement: HTMLVideoElement) => {
    if (!isMobile || !videoElement) return true

    try {
      // Ensure video is loaded
      if (videoElement.readyState < 2) {
        videoElement.load()
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Video load timeout')), 5000)
          videoElement.addEventListener('loadeddata', () => {
            clearTimeout(timeout)
            resolve(true)
          }, { once: true })
        })
      }

      // For mobile, we might need to start muted
      if (!hasUserInteracted) {
        videoElement.muted = true
      }

      return true
    } catch (error) {
      console.warn('Mobile video preparation failed:', error)
      return false
    }
  }

  // Helper function to handle mobile play with better error handling
  const playVideoOnMobile = async (videoElement: HTMLVideoElement) => {
    if (!videoElement) throw new Error('No video element provided')

    try {
      // Prepare video for mobile if needed
      if (isMobile) {
        const prepared = await prepareMobileVideo(videoElement)
        if (!prepared) {
          throw new Error('Failed to prepare video for mobile playback')
        }
      }

      // Attempt to play
      const playPromise = videoElement.play()
      if (playPromise !== undefined) {
        await playPromise
      }

      return true
    } catch (error) {
      // Handle specific mobile errors
      if (error.name === 'NotAllowedError') {
        if (isMobile) {
          throw new Error('Tap the play button to start video playback.')
        } else {
          throw new Error('Video playback not allowed. Please interact with the page first.')
        }
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Video format not supported on this device.')
      } else {
        throw new Error('Failed to play video. Please try again.')
      }
    }
  }

  return {
    isMobile,
    hasUserInteracted,
    prepareMobileVideo,
    playVideoOnMobile
  }
}