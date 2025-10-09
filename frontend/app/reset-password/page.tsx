'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AnimatedLogo from '../../components/AnimatedLogo'
import StyledText from '../../components/StyledText'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage('Password reset successful! You can now sign in with your new password.')
      } else {
        setMessage(data.message || 'Failed to reset password')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return null
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
              <span className="mega-graphics-icon mega-graphics-premium text-4xl">🔑</span>
              <StyledText text="Reset Password" className="text-3xl font-bold" />
            </div>
            <p className="text-gray-300 text-sm">
              Enter your new password below
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/30 shadow-2xl auth-page">
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              isSuccess ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              <StyledText text={message} className="text-sm" />
            </div>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <StyledText text="New Password" className="text-sm" />
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter new password"
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Confirm new password"
                    minLength={6}
                  />
                </div>
              </div>

              {/* Enhanced Reset Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      <StyledText text="Resetting..." className="text-lg font-bold" />
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🔒</span>
                      <StyledText text="RESET PASSWORD" className="text-lg font-bold" />
                    </>
                  )}
                </div>
              </button>

              {/* Enhanced Links */}
              <div className="text-center pt-4">
                <Link href="/login" className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300 font-bold transition-all duration-300 text-sm">
                  Back to Sign In
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">✅</div>
              <div className="space-y-4">
                <StyledText text="Password Reset Complete!" className="text-2xl font-bold text-green-400" />
                <p className="text-gray-300">
                  Your password has been successfully reset.
                </p>
                <Link href="/login">
                  <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">🚀</span>
                      <StyledText text="SIGN IN NOW" className="text-lg font-bold" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Graphics */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 text-2xl opacity-60">
            <span className="mega-graphics-icon animate-pulse">🔐</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-1000">🛡️</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-2000">🔒</span>
            <span className="mega-graphics-icon animate-pulse animation-delay-3000">🔑</span>
          </div>
        </div>
      </div>
    </div>
  )
}