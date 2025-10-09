'use client'

import { useState, useEffect } from 'react'
import { EyeIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Video {
  id: string
  title: string
  thumbnail: string
  views: number
  uploadedAt: string
  status: 'processing' | 'ready' | 'failed'
}

export default function RecentVideos() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    // Simulate API call
    setVideos([
      {
        id: '1',
        title: 'The Dark Knight',
        thumbnail: '/api/placeholder/150/100',
        views: 15420,
        uploadedAt: '2 hours ago',
        status: 'ready'
      },
      {
        id: '2',
        title: 'Inception',
        thumbnail: '/api/placeholder/150/100',
        views: 8932,
        uploadedAt: '5 hours ago',
        status: 'ready'
      },
      {
        id: '3',
        title: 'Interstellar',
        thumbnail: '/api/placeholder/150/100',
        views: 0,
        uploadedAt: '1 day ago',
        status: 'processing'
      }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400'
      case 'processing': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="bg-surface p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Videos</h2>
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="flex items-center space-x-4 p-3 bg-surface-light rounded-lg">
            <div className="w-16 h-10 bg-gray-700 rounded overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{video.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{video.uploadedAt}</span>
                </div>
              </div>
            </div>
            <div className={`text-sm font-medium ${getStatusColor(video.status)}`}>
              {video.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}