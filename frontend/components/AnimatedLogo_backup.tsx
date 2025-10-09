import React from 'react'

const AnimatedLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 logo-float">
      {/* Main Animated Graphics */}
      <div className="relative flex items-center">
        {/* Rotating Film Reel with Elegant Glow */}
        <div className="w-10 h-10 border-2 border-slate-300 rounded-full relative shadow-lg reel-spin">
          <div className="absolute inset-1 border border-slate-400/70 rounded-full"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-slate-600/20 to-slate-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-slate-300/30 shadow-md"></div>
          {/* Animated Spokes */}
          <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gradient-to-b from-slate-300 to-slate-400/50 transform -translate-x-1/2 spoke-glow"></div>
          <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-gradient-to-t from-slate-300 to-slate-400/50 transform -translate-x-1/2 spoke-glow"></div>
          <div className="absolute left-0 top-1/2 h-0.5 w-4 bg-gradient-to-r from-slate-300 to-slate-400/50 transform -translate-y-1/2 spoke-glow"></div>
          <div className="absolute right-0 top-1/2 h-0.5 w-4 bg-gradient-to-l from-slate-300 to-slate-400/50 transform -translate-y-1/2 spoke-glow"></div>
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute w-16 h-16 -translate-x-2 -translate-y-2 orbit-rotate">
          <div className="absolute w-2 h-2 bg-amber-400 rounded-full orbit-1 orbit-pulse"></div>
          <div className="absolute w-1.5 h-1.5 bg-slate-300/80 rounded-full orbit-2 orbit-pulse"></div>
          <div className="absolute w-1 h-1 bg-slate-400/60 rounded-full orbit-3 orbit-pulse"></div>
        </div>
        
        {/* Streaming Particles with Trail */}
        <div className="relative ml-4">
          <div className="particle-trail">
            <div className="absolute w-2 h-2 bg-gradient-to-r from-slate-300 to-amber-400 rounded-full particle-1 stream-flow"></div>
            <div className="absolute w-1.5 h-1.5 bg-gradient-to-r from-slate-400/80 to-amber-300/80 rounded-full particle-2 stream-flow"></div>
            <div className="absolute w-1 h-1 bg-gradient-to-r from-slate-400/60 to-amber-300/60 rounded-full particle-3 stream-flow"></div>
            <div className="absolute w-1 h-1 bg-gradient-to-r from-slate-500/40 to-amber-200/40 rounded-full particle-4 stream-flow"></div>
          </div>
        </div>
        
        {/* Elegant Play Icon with Rings */}
        <div className="relative ml-4">
          <div className="absolute w-8 h-8 rounded-full border border-slate-300/30 pulse-ring-1 pulse-wave"></div>
          <div className="absolute w-8 h-8 rounded-full border border-slate-400/20 pulse-ring-2 pulse-wave"></div>
          <div className="w-8 h-8 bg-gradient-to-br from-slate-400/30 to-slate-300/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-l-[8px] border-l-slate-200 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1 drop-shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Refined Text Effect */}
      <div className="relative text-shimmer">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-amber-400 to-slate-300 bg-clip-text text-transparent blur-sm opacity-40 layer-drift"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-slate-300 to-amber-300 bg-clip-text text-transparent blur-xs opacity-60 layer-drift-2"></div>
        <div className="relative bg-gradient-to-r from-slate-200 via-amber-400 to-slate-200 bg-clip-text text-transparent font-bold text-sm tracking-wider">
          STREAM
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70"></div>
      </div>
    </div>
  )
}

export default AnimatedLogo