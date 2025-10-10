'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppDispatch, RootState } from '../../lib/store'
import { register, clearError } from '../../lib/features/authSlice'
import AnimatedLogo from '../../components/AnimatedLogo'
import StyledText from '../../components/StyledText'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear any previous errors
    dispatch(clearError())
    setPasswordError('')
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    
    // Validate password strength
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      return
    }
    
    try {
      console.log('Attempting registration with:', { email, name, password: '***' })
      const result = await dispatch(register({ email, password, name })).unwrap()
      console.log('Registration successful:', result)
      router.push('/')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/6 left-1/6 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/6 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 right-2/3 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-2/3 w-80 h-80 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <AnimatedLogo />
            <Link href="/" className="text-primary text-3xl font-bold">
              <StyledText text="NEXFLARE" className="text-3xl font-black" />
            </Link>
          </div>
          
          {/* Enhanced Title with Graphics */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="mega-graphics-icon mega-graphics-trending text-4xl">🚀</span>
              <StyledText text="SIGN UP" className="text-4xl font-black" />
              <span className="mega-graphics-icon mega-graphics-trending text-4xl">✨</span>
            </div>
            <StyledText text="Join the Revolution" className="text-2xl font-bold text-gray-300" />
            <StyledText text="Start Streaming Today" className="text-lg text-gray-400" />
          </div>
        </div>
        
        {/* Enhanced Form Container */}
        <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-600/50 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {passwordError && (
              <div className="bg-red-600/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔒</span>
                  <span>{passwordError}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <StyledText text="Full Name" className="text-sm" />
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <StyledText text="Email Address" className="text-sm" />
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <StyledText text="Password" className="text-sm" />
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Create a password"
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <StyledText text="Confirm Password" className="text-sm" />
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Confirm your password"
                  minLength={6}
                />
              </div>
            </div>

            {/* Enhanced Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    <StyledText text="Creating Account..." className="text-lg font-bold" />
                  </>
                ) : (
                  <>
                    <span className="text-xl">🌟</span>
                    <StyledText text="CREATE ACCOUNT" className="text-lg font-bold" />
                  </>
                )}
              </div>
            </button>

            {/* Enhanced Links */}
            <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2 text-gray-300 mb-4">
                <StyledText text="Already have an account?" className="text-sm" />
                <Link href="/login" className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text hover:from-cyan-300 hover:to-purple-300 font-bold transition-all duration-300 text-sm">
                  Sign In
                </Link>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-400 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Additional Graphics */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 text-2xl opacity-60 mb-4">
            <span className="mega-graphics-icon animate-pulse">🎭</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-1000">🎨</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-2000">🎪</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-3000">🎯</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-4000">🎲</span>
          </div>
          
          <div className="text-center">
            <StyledText text="Join thousands of streamers worldwide" className="text-sm text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}