'use client'

import { ReactNode, useState } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  className?: string
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = ''
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Store event data before async operation
    const clientX = e.clientX
    const clientY = e.clientY
    const currentTarget = e.currentTarget

    // Batch the DOM read in the next frame to prevent forced reflow
    requestAnimationFrame(() => {
      try {
        // Check if element still exists in DOM
        if (!currentTarget || !document.contains(currentTarget)) {
          return
        }
        
        const rect = currentTarget.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        const id = Date.now()

        setRipples(prev => [...prev, { x, y, id }])
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== id))
        }, 600)
      } catch (error) {
        console.warn('Ripple effect error:', error)
      }
    })

    onClick?.()
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-primary/25',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    ghost: 'bg-transparent hover:bg-white/10 text-white',
    gradient: 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white shadow-lg'
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-full font-semibold transition-all duration-300
        transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative flex items-center justify-center space-x-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
            <span>{children}</span>
          </>
        )}
      </span>
    </button>
  )
}