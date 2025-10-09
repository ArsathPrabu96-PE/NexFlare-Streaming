'use client'

import { useState } from 'react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    rating: 'PG',
    releaseYear: new Date().getFullYear(),
    isPremium: false
  })
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      alert('Video uploaded successfully!')
    }, 3000)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Upload Video</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="horror">Horror</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              className="w-full px-4 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Release Year
            </label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.releaseYear}
              onChange={(e) => setFormData({...formData, releaseYear: parseInt(e.target.value)})}
              className="w-full px-4 py-2 bg-surface border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="premium"
              checked={formData.isPremium}
              onChange={(e) => setFormData({...formData, isPremium: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="premium" className="text-sm text-gray-300">
              Premium Content
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video File
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <span className="text-primary hover:text-primary-dark">Click to upload</span>
                <span className="text-gray-400"> or drag and drop</span>
              </label>
              {file && <p className="text-sm text-gray-300 mt-2">{file.name}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <span className="text-primary hover:text-primary-dark">Upload thumbnail</span>
              </label>
              {thumbnail && <p className="text-sm text-gray-300 mt-2">{thumbnail.name}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  )
}