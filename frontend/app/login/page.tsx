'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppDispatch, RootState } from '../../lib/store'
import { login } from '../../lib/features/authSlice'
import AnimatedLogo from '../../components/AnimatedLogo'
import StyledText from '../../components/StyledText'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(login({ email, password })).unwrap()
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Add your forgot password API call here
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      })
      
      if (response.ok) {
        setResetSent(true)
      } else {
        console.error('Failed to send reset email')
      }
    } catch (error) {
      console.error('Forgot password failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
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
              <span className="mega-graphics-icon mega-graphics-premium text-4xl">🔐</span>
              <StyledText text="SIGN IN" className="text-4xl font-black" />
              <span className="mega-graphics-icon mega-graphics-premium text-4xl">✨</span>
            </div>
            <StyledText text="Welcome Back" className="text-2xl font-bold text-gray-300" />
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
            
            <div className="space-y-4">
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <StyledText text="Password" className="text-sm" />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Enhanced Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    <StyledText text="Signing In..." className="text-lg font-bold" />
                  </>
                ) : (
                  <>
                    <span className="text-xl">🚀</span>
                    <StyledText text="SIGN IN" className="text-lg font-bold" />
                  </>
                )}
              </div>
            </button>

            {/* Enhanced Links */}
            <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <StyledText text="New to Nexflare?" className="text-sm" />
                <Link href="/register" className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300 font-bold transition-all duration-300 text-sm">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </form>
        </div>
        
        {/* Additional Graphics */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 text-2xl opacity-60">
            <span className="mega-graphics-icon animate-pulse">🎬</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-1000">🎭</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-2000">🎪</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-3000">🎨</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-gray-600/30 shadow-2xl">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="mega-graphics-icon mega-graphics-premium text-3xl">🔑</span>
                <StyledText text="Forgot Password" className="text-2xl font-bold" />
              </div>
              <p className="text-gray-300 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {!resetSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <StyledText text="Email Address" className="text-sm" />
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setForgotEmail('')
                      setResetSent(false)
                    }}
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">📧</span>
                      <StyledText text="Send Reset Link" className="text-sm font-bold" />
                    </div>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-4xl mb-4">✅</div>
                <div className="space-y-2">
                  <StyledText text="Reset Link Sent!" className="text-xl font-bold text-green-400" />
                  <p className="text-gray-300 text-sm">
                    Check your email for instructions to reset your password.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForgotPassword(false)
                    setForgotEmail('')
                    setResetSent(false)
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105"
                >
                  <StyledText text="Close" className="text-sm font-bold" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}