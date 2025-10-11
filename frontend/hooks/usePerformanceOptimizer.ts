/**
 * Graphics Performance Monitor and Optimizer
 * Automatically detects device capabilities and adjusts graphics quality
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

export interface PerformanceMetrics {
  devicePixelRatio: number
  hardwareConcurrency: number
  memoryInfo?: any
  connectionType?: string
  isMobile: boolean
  isLowEnd: boolean
  preferReducedMotion: boolean
  graphicsQuality: 'low' | 'medium' | 'high' | 'ultra'
}

export interface GraphicsSettings {
  enableAnimations: boolean
  enableParticles: boolean
  enableGradients: boolean
  enableBlur: boolean
  enableShadows: boolean
  animationDuration: number
  particleCount: number
  blurRadius: number
}

export const usePerformanceOptimizer = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    devicePixelRatio: 1,
    hardwareConcurrency: 2,
    isMobile: false,
    isLowEnd: false,
    preferReducedMotion: false,
    graphicsQuality: 'medium'
  })

  const [settings, setSettings] = useState<GraphicsSettings>({
    enableAnimations: true,
    enableParticles: true,
    enableGradients: true,
    enableBlur: true,
    enableShadows: true,
    animationDuration: 300,
    particleCount: 50,
    blurRadius: 10
  })

  const [frameRate, setFrameRate] = useState<number>(60)
  const [isPerformanceGood, setIsPerformanceGood] = useState<boolean>(true)

  // Performance detection with debouncing
  const detectPerformanceCapabilities = useCallback(() => {
    if (typeof window === 'undefined') return

    // Use RAF to batch DOM reads and prevent forced reflow
    requestAnimationFrame(() => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const hardwareConcurrency = navigator.hardwareConcurrency || 2
      const memoryInfo = (navigator as any).deviceMemory || (navigator as any).memory
      const connectionType = (navigator as any).connection?.effectiveType

      // Mobile detection - cache window.innerWidth to avoid repeated access
      const windowWidth = window.innerWidth
      const isMobile = windowWidth <= 768 || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // Reduced motion preference
      const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Low-end device detection
      const isLowEnd = hardwareConcurrency <= 2 || 
        (memoryInfo && memoryInfo < 4) || 
        connectionType === 'slow-2g' || 
        connectionType === '2g'

      // Graphics quality determination
      let graphicsQuality: 'low' | 'medium' | 'high' | 'ultra' = 'medium'
      
      if (preferReducedMotion || isLowEnd || isMobile) {
        graphicsQuality = 'low'
      } else if (hardwareConcurrency >= 8 && devicePixelRatio >= 2 && !isMobile) {
        graphicsQuality = 'ultra'
      } else if (hardwareConcurrency >= 4 && !isMobile) {
        graphicsQuality = 'high'
      }

      setMetrics({
        devicePixelRatio,
        hardwareConcurrency,
        memoryInfo,
        connectionType,
        isMobile,
        isLowEnd,
        preferReducedMotion,
        graphicsQuality
      })
    })
  }, [])

  // Frame rate monitoring with throttling
  const monitorFrameRate = useCallback(() => {
    let lastTime = performance.now()
    let frameCount = 0
    let fps = 60
    let animationId: number
    let isMonitoring = true

    const measureFPS = () => {
      if (!isMonitoring) return
      
      frameCount++
      const currentTime = performance.now()
      
      // Only update FPS every 2 seconds to reduce overhead
      if (currentTime - lastTime >= 2000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Batch state updates to prevent excessive re-renders
        requestAnimationFrame(() => {
          setFrameRate(fps)
          setIsPerformanceGood(fps >= 30)
          
          // Auto-adjust quality based on performance (less aggressive)
          if (fps < 15 && metrics.graphicsQuality !== 'low') {
            adjustGraphicsQuality('down')
          } else if (fps >= 58 && metrics.graphicsQuality !== 'ultra') {
            adjustGraphicsQuality('up')
          }
        })
        
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)
    
    // Return cleanup function
    return () => {
      isMonitoring = false
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [metrics.graphicsQuality, adjustGraphicsQuality])

  // Adjust graphics quality
  const adjustGraphicsQuality = useCallback((direction: 'up' | 'down') => {
    setMetrics(prev => {
      let newQuality = prev.graphicsQuality
      
      if (direction === 'down') {
        switch (prev.graphicsQuality) {
          case 'ultra': newQuality = 'high'; break
          case 'high': newQuality = 'medium'; break
          case 'medium': newQuality = 'low'; break
        }
      } else {
        switch (prev.graphicsQuality) {
          case 'low': newQuality = 'medium'; break
          case 'medium': newQuality = 'high'; break
          case 'high': newQuality = 'ultra'; break
        }
      }
      
      return { ...prev, graphicsQuality: newQuality }
    })
  }, [])

  // Update settings based on quality
  const updateGraphicsSettings = useCallback(() => {
    const quality = metrics.graphicsQuality
    
    let newSettings: GraphicsSettings = {
      enableAnimations: true,
      enableParticles: true,
      enableGradients: true,
      enableBlur: true,
      enableShadows: true,
      animationDuration: 300,
      particleCount: 50,
      blurRadius: 10
    }

    switch (quality) {
      case 'low':
        newSettings = {
          enableAnimations: false,
          enableParticles: false,
          enableGradients: false,
          enableBlur: false,
          enableShadows: false,
          animationDuration: 150,
          particleCount: 0,
          blurRadius: 0
        }
        break
        
      case 'medium':
        newSettings = {
          enableAnimations: true,
          enableParticles: false,
          enableGradients: true,
          enableBlur: false,
          enableShadows: false,
          animationDuration: 200,
          particleCount: 0,
          blurRadius: 0
        }
        break
        
      case 'high':
        newSettings = {
          enableAnimations: true,
          enableParticles: true,
          enableGradients: true,
          enableBlur: true,
          enableShadows: true,
          animationDuration: 300,
          particleCount: 30,
          blurRadius: 5
        }
        break
        
      case 'ultra':
        newSettings = {
          enableAnimations: true,
          enableParticles: true,
          enableGradients: true,
          enableBlur: true,
          enableShadows: true,
          animationDuration: 400,
          particleCount: 100,
          blurRadius: 15
        }
        break
    }

    setSettings(newSettings)
  }, [metrics.graphicsQuality])

  // Initialize with debounced resize handler
  useEffect(() => {
    detectPerformanceCapabilities()
    
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      // Debounce resize events to prevent excessive reflows
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        detectPerformanceCapabilities()
      }, 250)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize, { passive: true })
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(resizeTimeout)
      }
    }
  }, [detectPerformanceCapabilities])

  useEffect(() => {
    updateGraphicsSettings()
  }, [updateGraphicsSettings])

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanup = monitorFrameRate()
      return cleanup
    }, 3000) // Start monitoring after initial load to avoid affecting startup performance
    
    return () => {
      clearTimeout(timer)
    }
  }, [monitorFrameRate])

  return {
    metrics,
    settings,
    frameRate,
    isPerformanceGood,
    adjustGraphicsQuality,
    updateGraphicsSettings
  }
}

// CSS class generator based on performance settings
export const generatePerformanceClasses = (settings: GraphicsSettings) => {
  const classes = []
  
  if (!settings.enableAnimations) {
    classes.push('disable-animations')
  }
  
  if (!settings.enableParticles) {
    classes.push('disable-particles')
  }
  
  if (!settings.enableGradients) {
    classes.push('disable-gradients')
  }
  
  if (!settings.enableBlur) {
    classes.push('disable-blur')
  }
  
  if (!settings.enableShadows) {
    classes.push('disable-shadows')
  }
  
  return classes.join(' ')
}

// Performance CSS variables
export const generatePerformanceVars = (settings: GraphicsSettings) => ({
  '--animation-duration': `${settings.animationDuration}ms`,
  '--particle-count': settings.particleCount.toString(),
  '--blur-radius': `${settings.blurRadius}px`
})