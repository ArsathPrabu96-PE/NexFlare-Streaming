'use client'

import { useEffect, useState, memo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  className?: string
}

// Hook to detect mobile devices and performance preferences
const usePerformanceMode = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, prefersReducedMotion }
}

// Simple static gradient for mobile
const SimpleBackground: React.FC<{ className: string }> = memo(({ className }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
  </div>
))

SimpleBackground.displayName = 'SimpleBackground'

export default function FloatingParticles({ 
  count = 30, 
  colors = ['#E50914', '#FF1E2D', '#B20710', '#FF6B9D', '#9D4EDD'],
  className = ''
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const { isMobile, prefersReducedMotion } = usePerformanceMode()

  useEffect(() => {
    // Return simple background for mobile or reduced motion - but still create effect
    if (isMobile || prefersReducedMotion) {
      return
    }

    const newParticles: Particle[] = []
    
    // Reduce particle count for performance
    const adjustedCount = Math.min(count, 15)
    
    for (let i = 0; i < adjustedCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    
    setParticles(newParticles)
  }, [count, colors, isMobile, prefersReducedMotion])

  // Return simple background for mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return <SimpleBackground className={className} />
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Reduced glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-gradient-conic from-primary/10 via-purple-500/5 to-primary/10 animate-spin" style={{ animationDuration: '20s' }} />
    </div>
  )
}