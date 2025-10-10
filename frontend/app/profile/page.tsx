'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../lib/store'
import Header from '../../components/Header'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-cyan-400">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-6">Please log in to view your profile.</p>
            <Link 
              href="/login"
              className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-cyan-400">User Profile</h1>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            {/* Profile Picture Section */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {profileData.name.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">{profileData.name || 'User'}</h2>
                <p className="text-gray-400 capitalize">{profileData.subscription} Plan</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subscription Plan
                </label>
                <div className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white capitalize">
                  {profileData.subscription} Plan
                  {profileData.subscription === 'free' && (
                    <span className="ml-2 text-cyan-400 text-sm">
                      - Upgrade for more features!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      // Here you would typically save the profile data
                      setIsEditing(false)
                    }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      // Reset to original data
                      if (user) {
                        setProfileData({
                          name: user.name || '',
                          email: user.email || '',
                          subscription: user.subscription?.plan || 'free'
                        })
                      }
                    }}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              
              {profileData.subscription === 'free' && (
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              )}
            </div>

            {/* Account Actions */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/reset-password"
                  className="block w-full text-left px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Change Password
                </Link>
                <Link 
                  href="/my-list"
                  className="block w-full text-left px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  My Watch List
                </Link>
                <button className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}