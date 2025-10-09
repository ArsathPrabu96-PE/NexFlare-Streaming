'use client'

import { useState, useEffect } from 'react'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Video {
  _id: string
  title: string
  category: string
  views: number
  status: 'processing' | 'ready' | 'failed'
  createdAt: string
  isPremium: boolean
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Simulate API call
    setVideos([
      {
        _id: '1',
        title: 'The Dark Knight',
        category: 'Action',
        views: 15420,
        status: 'ready',
        createdAt: '2024-01-15',
        isPremium: true
      },
      {
        _id: '2',
        title: 'Inception',
        category: 'Sci-Fi',
        views: 8932,
        status: 'ready',
        createdAt: '2024-01-14',
        isPremium: false
      },
      {
        _id: '3',
        title: 'Interstellar',
        category: 'Sci-Fi',
        views: 0,
        status: 'processing',
        createdAt: '2024-01-13',
        isPremium: true
      }
    ])
  }, [])

  const filteredVideos = videos.filter(video => 
    filter === 'all' || video.status === filter
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Video Management</h1>
        <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition">
          Upload Video
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          {['all', 'ready', 'processing', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-gray-300 hover:bg-surface-light'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-light">
            <tr>
              <th className="text-left p-4 text-gray-300">Title</th>
              <th className="text-left p-4 text-gray-300">Category</th>
              <th className="text-left p-4 text-gray-300">Views</th>
              <th className="text-left p-4 text-gray-300">Status</th>
              <th className="text-left p-4 text-gray-300">Type</th>
              <th className="text-left p-4 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr key={video._id} className="border-t border-gray-800">
                <td className="p-4 text-white font-medium">{video.title}</td>
                <td className="p-4 text-gray-300">{video.category}</td>
                <td className="p-4 text-gray-300">{video.views.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    video.status === 'ready' ? 'bg-green-600 text-green-100' :
                    video.status === 'processing' ? 'bg-yellow-600 text-yellow-100' :
                    'bg-red-600 text-red-100'
                  }`}>
                    {video.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    video.isPremium ? 'bg-primary text-white' : 'bg-gray-600 text-gray-200'
                  }`}>
                    {video.isPremium ? 'PREMIUM' : 'FREE'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-surface-light rounded transition">
                      <EyeIcon className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-surface-light rounded transition">
                      <PencilIcon className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-surface-light rounded transition">
                      <TrashIcon className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}