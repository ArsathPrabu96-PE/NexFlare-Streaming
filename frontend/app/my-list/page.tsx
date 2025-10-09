'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import VideoCard from '../../components/VideoCard'
import Header from '../../components/Header'
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Video {
  _id: string
  title: string
  description?: string
  thumbnail: string
  videoUrl?: string
  duration: number
  rating: string
  releaseYear: number
  isPremium: boolean
  views?: number
  likes?: number
  addedToList?: string // Date when added to list
}

// Mock data for user's list
const mockMyListVideos: Video[] = [
  {
    _id: '1',
    title: 'Epic Adventure Movie Trailer',
    description: 'An incredible journey awaits in this epic adventure...',
    thumbnail: 'https://picsum.photos/320/180?random=1',
    videoUrl: '',
    duration: 150,
    rating: 'PG-13',
    releaseYear: 2024,
    isPremium: false,
    views: 1200000,
    likes: 85000,
    addedToList: '2024-10-05'
  },
  {
    _id: '3',
    title: 'Comedy Special: Laugh Out Loud',
    description: 'The funniest moments that will make you laugh...',
    thumbnail: 'https://picsum.photos/320/180?random=3',
    videoUrl: '',
    duration: 115,
    rating: 'PG',
    releaseYear: 2024,
    isPremium: false,
    views: 2100000,
    likes: 155000,
    addedToList: '2024-10-07'
  },
  {
    _id: '5',
    title: 'Music Video: Electric Beats',
    description: 'Feel the rhythm with these electric beats...',
    thumbnail: 'https://picsum.photos/320/180?random=5',
    videoUrl: '',
    duration: 250,
    rating: 'PG-13',
    releaseYear: 2024,
    isPremium: true,
    views: 3200000,
    likes: 245000,
    addedToList: '2024-10-08'
  }
]

export default function MyListPage() {
  const [myListVideos, setMyListVideos] = useState<Video[]>(mockMyListVideos)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')
  const { user } = useSelector((state: RootState) => state.auth)

  const removeFromList = (videoId: string) => {
    setMyListVideos(prev => prev.filter(video => video._id !== videoId))
  }

  const sortedVideos = [...myListVideos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedToList || '').getTime() - new Date(a.addedToList || '').getTime()
      case 'oldest':
        return new Date(a.addedToList || '').getTime() - new Date(b.addedToList || '').getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      
      <main className="pt-20 px-4 md:px-8 lg:px-16">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <HeartSolidIcon className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My List
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            Your personally curated collection of favorite videos
          </p>
        </div>

        {myListVideos.length > 0 ? (
          <>
            {/* Controls */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary">
                  {myListVideos.length} video{myListVideos.length !== 1 ? 's' : ''} in your list
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="text-text-secondary text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                  className="bg-surface border border-gray-700 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="newest">Newest Added</option>
                  <option value="oldest">Oldest Added</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedVideos.map((video) => (
                <div key={video._id} className="relative group">
                  <VideoCard video={video} />
                  
                  {/* Remove from list button */}
                  <button
                    onClick={() => removeFromList(video._id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    title="Remove from My List"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  
                  {/* Added date */}
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Added {formatDate(video.addedToList || '')}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-6">
              <HeartIcon className="w-24 h-24 text-text-secondary mx-auto opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Your list is empty</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Start building your personal collection by adding videos you love. 
              Look for the heart icon on any video to add it to your list.
            </p>
            <div className="space-y-4">
              <a
                href="/browse"
                className="inline-block bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse Videos
              </a>
              <div className="text-text-secondary text-sm">
                or
              </div>
              <a
                href="/"
                className="inline-block bg-surface hover:bg-gray-700 text-text-primary border border-gray-600 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Go to Home
              </a>
            </div>
          </div>
        )}

        {/* Premium Notice */}
        {myListVideos.some(video => video.isPremium) && (
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <h4 className="text-lg font-semibold">Premium Content</h4>
            </div>
            <p className="text-text-secondary">
              Some videos in your list require a premium subscription to watch. 
              Upgrade to access all premium content without limitations.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}