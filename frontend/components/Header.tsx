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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex items-center space-x-2 md:space-x-3">
            <AnimatedLogo />
            <Link href="/" className="text-rainbow text-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight hover:scale-105 transition-transform duration-300 flex items-center">
              <span className="graphics-icon graphics-icon-fire">🔥</span>
              <span className="hidden sm:inline">NEXFLARE</span>
              <span className="sm:hidden">NF</span>
              <span className="graphics-icon graphics-icon-sparkle">✨</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6" id="desktop-nav">
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

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Button */}
          <button className="p-2 hover:bg-surface rounded-full transition-all duration-300 group">
            <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6 text-ocean group-hover:text-neon-green icon-glow group-hover:scale-110 transition-all duration-300" />
          </button>
          
          {/* Desktop User Menu */}
          {user ? (
            <div className="relative hidden md:block" id="desktop-user-menu">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-surface rounded-lg transition-all duration-300 group"
              >
                <UserCircleIcon className="w-6 h-6 text-metallic-gold group-hover:text-rainbow icon-glow transition-all duration-300" />
                <span className="text-neon-pink font-bold group-hover:text-metallic-silver flex items-center">
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
              className="hidden md:flex bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary px-4 md:px-6 py-2 rounded-lg transition-all duration-300 font-black text-rainbow shadow-lg hover:shadow-xl hover:scale-105 items-center text-sm md:text-base"
              id="desktop-signin"
            >
              <span className="graphics-icon graphics-icon-sparkle">🌟</span>
              <span className="hidden lg:inline">Sign In</span>
              <span className="lg:hidden">Sign</span>
              <span className="graphics-icon graphics-icon-diamond">💫</span>
            </Link>
          )}

          {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block md:hidden p-2 hover:bg-surface rounded-lg transition-all duration-300 z-50"
            id="mobile-menu-button"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - SHOW ON MOBILE ONLY */}
      {isMobileMenuOpen && (
        <div className="md:hidden mobile-menu-container bg-background/95 backdrop-blur-sm border-t border-gray-700 transition-all duration-300" id="mobile-menu">
          <nav className="px-4 py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-neon-green hover:text-metallic-gold font-bold text-lg transition-all duration-300 hover:bg-surface/50 rounded-lg flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="graphics-icon graphics-icon-star mr-2">⭐</span>
              Home
            </Link>
            <Link 
              href="/browse" 
              className="block px-4 py-3 text-neon-pink hover:text-ocean font-bold text-lg transition-all duration-300 hover:bg-surface/50 rounded-lg flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="graphics-icon graphics-icon-diamond mr-2">💎</span>
              Browse
            </Link>
            <Link 
              href="/my-list" 
              className="block px-4 py-3 text-fire hover:text-metallic-silver font-bold text-lg transition-all duration-300 hover:bg-surface/50 rounded-lg flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="graphics-icon graphics-icon-fire mr-2">🎬</span>
              My List
            </Link>
            
            {/* Mobile User Section */}
            <div className="border-t border-gray-700 pt-4 mt-4">
              {user ? (
                <>
                  <div className="px-4 py-2 text-center text-metallic-gold font-bold flex items-center justify-center mb-2">
                    <span className="graphics-icon graphics-icon-diamond mr-2">👤</span>
                    Welcome, {user.name}!
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-3 text-ocean hover:text-neon-green font-bold text-lg transition-all duration-300 hover:bg-surface/50 rounded-lg flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="graphics-icon graphics-icon-star mr-2">⚙️</span>
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-fire hover:text-neon-pink font-bold text-lg transition-all duration-300 hover:bg-surface/50 rounded-lg flex items-center"
                  >
                    <span className="graphics-icon graphics-icon-fire mr-2">🚪</span>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block mx-4 mb-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary px-6 py-3 rounded-lg transition-all duration-300 font-black text-rainbow shadow-lg text-center flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="graphics-icon graphics-icon-sparkle mr-2">🌟</span>
                    Sign In
                    <span className="graphics-icon graphics-icon-diamond ml-2">💫</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="block mx-4 mb-2 bg-gradient-to-r from-secondary to-accent px-6 py-3 rounded-lg transition-all duration-300 font-bold text-white shadow-lg text-center flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="graphics-icon graphics-icon-star mr-2">⭐</span>
                    Register
                    <span className="graphics-icon graphics-icon-fire ml-2">🔥</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}