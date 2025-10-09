'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  blur = 'md'
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }

  const variantClasses = {
    default: 'bg-white/5 border border-white/10',
    elevated: 'bg-white/10 border border-white/20 shadow-2xl shadow-black/50',
    bordered: 'bg-white/5 border-2 border-gradient-to-r from-primary/50 to-purple-500/50'
  }

  return (
    <div className={`
      ${blurClasses[blur]} 
      ${variantClasses[variant]}
      rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30
      ${className}
    `}>
      {children}
    </div>
  )
}