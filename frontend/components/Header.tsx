'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../lib/store'
import { logout } from '../lib/features/authSlice'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import AnimatedLogo from './AnimatedLogo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <AnimatedLogo />
            <Link href="/" className="text-rainbow text-display text-3xl font-black tracking-tight hover:scale-105 transition-transform duration-300 flex items-center">
              <span className="graphics-icon graphics-icon-fire">🔥</span>
              NEXFLARE
              <span className="graphics-icon graphics-icon-sparkle">✨</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-neon-green hover:text-metallic-gold font-bold text-lg transition-all duration-300 text-glow-hover flex items-center">
              <span className="graphics-icon graphics-icon-star">⭐</span>
              Home
            </Link>
            <Link href="/browse" className="text-neon-pink hover:text-ocean font-bold text-lg transition-all duration-300 text-glow-hover flex items-center">
              <span className="graphics-icon graphics-icon-diamond">💎</span>
              Browse
            </Link>
            <Link href="/my-list" className="text-fire hover:text-metallic-silver font-bold text-lg transition-all duration-300 text-glow-hover flex items-center">
              <span className="graphics-icon graphics-icon-fire">🎬</span>
              My List
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-surface rounded-full transition-all duration-300 group">
            <MagnifyingGlassIcon className="w-6 h-6 text-ocean group-hover:text-neon-green icon-glow group-hover:scale-110 transition-all duration-300" />
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-surface rounded-lg transition-all duration-300 group"
              >
                <UserCircleIcon className="w-6 h-6 text-metallic-gold group-hover:text-rainbow icon-glow transition-all duration-300" />
                <span className="hidden md:block text-neon-pink font-bold group-hover:text-metallic-silver flex items-center">
                  <span className="graphics-icon graphics-icon-diamond">👤</span>
                  {user.name}
                </span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface/90 backdrop-blur-sm rounded-lg shadow-xl py-2 border border-gray-700">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700/50 transition-all duration-200 text-ocean hover:text-neon-green font-bold flex items-center">
                    <span className="graphics-icon graphics-icon-star">⚙️</span>
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700/50 transition-all duration-200 text-fire hover:text-neon-pink font-bold flex items-center"
                  >
                    <span className="graphics-icon graphics-icon-fire">🚪</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary px-6 py-2 rounded-lg transition-all duration-300 font-black text-rainbow shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
            >
              <span className="graphics-icon graphics-icon-sparkle">🌟</span>
              Sign In
              <span className="graphics-icon graphics-icon-diamond">💫</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}