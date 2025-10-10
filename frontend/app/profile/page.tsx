'use client'

import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../lib/store'
import Header from '../../components/Header'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string>('')
  const [previewPhoto, setPreviewPhoto] = useState<string>('')
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [hasUnsavedPhoto, setHasUnsavedPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    subscription: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        subscription: user.subscription?.plan || 'free'
      })
    }
  }, [user])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadingPhoto(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewPhoto(e.target?.result as string)
        setHasUnsavedPhoto(true)
        setUploadingPhoto(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = () => {
    if (previewPhoto) {
      setProfilePhoto(previewPhoto)
      setHasUnsavedPhoto(false)
      // Here you would typically upload to your backend
      console.log('Photo saved successfully!')
    }
  }

  const handleCancelPhoto = () => {
    setPreviewPhoto('')
    setHasUnsavedPhoto(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Access Denied
              </h1>
            </div>
            <p className="text-gray-400 mb-6">Please log in to view your profile.</p>
            <Link 
              href="/login"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <Header />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClose}
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-full transition-all duration-300 group"
            title="Close Profile"
          >
            <svg 
              className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Page Title with Graphical Design */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              User Profile
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
              <div className="text-2xl">👤</div>
              <div className="h-1 w-16 bg-gradient-to-l from-purple-500 to-transparent rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            {/* Profile Picture Section with Upload */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-12 space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-purple-600 shadow-2xl">
                  {(previewPhoto || profilePhoto) ? (
                    <img 
                      src={previewPhoto || profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                      {profileData.name.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                
                {/* Preview indicator */}
                {hasUnsavedPhoto && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                    Preview
                  </div>
                )}
                
                {/* Upload Button Overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingPhoto}
                    className="text-white text-sm font-semibold"
                  >
                    {uploadingPhoto ? '📤' : '📷'}
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {profileData.name || 'User'}
                </h2>
                <p className="text-xl text-gray-300 capitalize mb-4">
                  <span className="inline-flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></span>
                    {profileData.subscription} Plan
                  </span>
                </p>
                
                {/* Photo Action Buttons */}
                {hasUnsavedPhoto ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSavePhoto}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                    >
                      <span className="mr-2">💾</span>
                      Save Photo
                    </button>
                    <button
                      onClick={handleCancelPhoto}
                      className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                    >
                      <span className="mr-2">❌</span>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingPhoto}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <span className="mr-2">{uploadingPhoto ? '📤' : '📷'}</span>
                    {uploadingPhoto ? 'Loading...' : 'Change Photo'}
                  </button>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-3 flex items-center">
                    <span className="mr-2">👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-3 flex items-center">
                    <span className="mr-2">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-3 flex items-center">
                    <span className="mr-2">💳</span>
                    Subscription Plan
                  </label>
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white capitalize">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{profileData.subscription} Plan</span>
                      {profileData.subscription === 'free' && (
                        <span className="text-sm bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold">
                          Upgrade Available!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-3 flex items-center">
                    <span className="mr-2">📊</span>
                    Account Status
                  </label>
                  <div className="px-6 py-4 bg-gradient-to-r from-green-800/30 to-green-700/30 border border-green-600/50 rounded-xl text-green-300">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                      Active Account
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    ✅ Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      if (user) {
                        setProfileData({
                          name: user.name || '',
                          email: user.email || '',
                          subscription: user.subscription?.plan || 'free'
                        })
                      }
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
              
              {profileData.subscription === 'free' && (
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl">
                  ⭐ Upgrade Plan
                </button>
              )}
            </div>

            {/* Account Actions */}
            <div className="pt-8 border-t border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                <span className="mr-3">⚙️</span>
                Account Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  href="/reset-password"
                  className="flex items-center px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-xl text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
                >
                  <span className="mr-3 group-hover:scale-110 transition-transform">🔑</span>
                  Change Password
                </Link>
                <Link 
                  href="/my-list"
                  className="flex items-center px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-xl text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
                >
                  <span className="mr-3 group-hover:scale-110 transition-transform">📋</span>
                  My Watch List
                </Link>
                <button className="flex items-center px-6 py-4 bg-gray-800/50 hover:bg-red-800/30 border border-gray-600 hover:border-red-600/50 rounded-xl text-gray-400 hover:text-red-400 transition-all duration-300 group">
                  <span className="mr-3 group-hover:scale-110 transition-transform">🗑️</span>
                  Delete Account
                </button>
                <button 
                  onClick={handleClose}
                  className="flex items-center px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-xl text-gray-400 hover:text-white transition-all duration-300 group"
                >
                  <span className="mr-3 group-hover:scale-110 transition-transform">🚪</span>
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}