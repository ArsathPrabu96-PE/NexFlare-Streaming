'use client'

import { ReactNode } from 'react'

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  pulse?: boolean
  className?: string
}

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  glow = true,
  pulse = false,
  className = ''
}: NeonButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: {
      bg: 'bg-gradient-to-r from-primary via-pink-500 to-primary',
      border: 'border-primary',
      shadow: 'shadow-primary/50',
      glow: 'hover:shadow-[0_0_30px_rgba(229,9,20,0.8)]'
    },
    secondary: {
      bg: 'bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500',
      border: 'border-purple-500',
      shadow: 'shadow-purple-500/50',
      glow: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]'
    },
    accent: {
      bg: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400',
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-400/50',
      glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]'
    }
  }

  const variant_style = variantClasses[variant]

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-full font-bold text-white
        border-2 backdrop-blur-sm transition-all duration-500
        transform hover:scale-110 active:scale-95
        ${sizeClasses[size]}
        ${variant_style.bg}
        ${variant_style.border}
        ${glow ? variant_style.glow : ''}
        ${pulse ? 'animate-pulse-glow' : ''}
        shadow-2xl ${variant_style.shadow}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 drop-shadow-lg">
        {children}
      </span>
      
      {/* Outer glow ring */}
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-current via-transparent to-current rounded-full blur-md opacity-0 hover:opacity-75 transition-opacity duration-500 -z-10" />
      )}
    </button>
  )
}