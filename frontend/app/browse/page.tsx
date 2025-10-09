'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import VideoCard from '../../components/VideoCard'
import Header from '../../components/Header'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
}

const mockVideos: Video[] = [
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
    likes: 85000
  },
  {
    _id: '2',
    title: 'Sci-Fi Thriller: Future World',
    description: 'Explore the future in this mind-bending thriller...',
    thumbnail: 'https://picsum.photos/320/180?random=2',
    videoUrl: '',
    duration: 225,
    rating: 'R',
    releaseYear: 2024,
    isPremium: true,
    views: 850000,
    likes: 62000
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
    likes: 155000
  },
  {
    _id: '4',
    title: 'Documentary: Nature\'s Wonders',
    description: 'Discover the amazing world of wildlife...',
    thumbnail: 'https://picsum.photos/320/180?random=4',
    videoUrl: '',
    duration: 320,
    rating: 'G',
    releaseYear: 2024,
    isPremium: false,
    views: 950000,
    likes: 78000
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
    likes: 245000
  },
  {
    _id: '6',
    title: 'Horror Movie: Dark Shadows',
    description: 'Enter the world of darkness and mystery...',
    thumbnail: 'https://picsum.photos/320/180?random=6',
    videoUrl: '',
    duration: 165,
    rating: 'R',
    releaseYear: 2024,
    isPremium: false,
    views: 1800000,
    likes: 125000
  }
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(mockVideos)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    let filtered = mockVideos

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredVideos(filtered)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      
      <main className="pt-20 px-4 md:px-8 lg:px-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Browse Videos
          </h1>
          <p className="text-text-secondary text-lg">
            Discover amazing content from creators around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-700 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 text-text-secondary mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-text-secondary">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </main>
    </div>
  )
}