'use client'

import React, { useState } from 'react'
import { RadioIcon, TvIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/solid'
import LiveVideoCard from '../../components/LiveVideoCard'
import LiveTVChannelCard from '../../components/LiveTVChannelCard'
import LiveVideoPlayer from '../../components/LiveVideoPlayer'
import { getLiveVideos, getLiveTVChannels, getTrendingLiveVideos, getCurrentlyAiring, getUpcomingShows } from '../../lib/mockData'

export default function LivePage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [selectedChannel, setSelectedChannel] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'videos' | 'tv'>('videos')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const liveVideos = getLiveVideos()
  const liveTVChannels = getLiveTVChannels()
  const trendingLive = getTrendingLiveVideos()
  const currentlyAiring = getCurrentlyAiring()
  const upcomingShows = getUpcomingShows()

  const categories = {
    videos: ['All', 'Sports', 'News', 'Music', 'Gaming', 'Lifestyle', 'Documentary'],
    tv: ['All', 'Sports', 'News', 'Entertainment', 'Music', 'Kids', 'Documentary']
  }

  const filteredLiveVideos = selectedCategory === 'All' 
    ? liveVideos 
    : liveVideos.filter(video => video.category === selectedCategory)

  const filteredTVChannels = selectedCategory === 'All' 
    ? liveTVChannels 
    : liveTVChannels.filter(channel => channel.category === selectedCategory)

  const handlePlayVideo = (video: any) => {
    setSelectedVideo(video)
  }

  const handleWatchChannel = (channel: any) => {
    setSelectedChannel(channel)
  }

  const handleClosePlayer = () => {
    setSelectedVideo(null)
    setSelectedChannel(null)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-purple-600/20 to-pink-600/20 border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <RadioIcon className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-rainbow">Live Streaming</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Experience live events, breaking news, and exclusive content in real-time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 bg-gray-900/50 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => {
              setActiveTab('videos')
              setSelectedCategory('All')
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'videos'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <RadioIcon className="w-4 h-4" />
            <span>Live Videos</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('tv')
              setSelectedCategory('All')
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'tv'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <TvIcon className="w-4 h-4" />
            <span>Live TV</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories[activeTab].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {activeTab === 'videos' ? (
          <div>
            {/* Trending Live Videos */}
            {selectedCategory === 'All' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <span>🔥 Trending Live</span>
                  <UserGroupIcon className="w-6 h-6 text-primary" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingLive.map((video) => (
                    <LiveVideoCard
                      key={video._id}
                      video={video}
                      onPlay={handlePlayVideo}
                      className="transform hover:scale-105"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Live Videos */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === 'All' ? 'All Live Videos' : `Live ${selectedCategory}`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLiveVideos.map((video) => (
                  <LiveVideoCard
                    key={video._id}
                    video={video}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div>
            {/* Currently Airing */}
            {selectedCategory === 'All' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <span>📺 Now Playing</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentlyAiring.map((channel) => (
                    <LiveTVChannelCard
                      key={channel._id}
                      channel={channel}
                      onWatch={handleWatchChannel}
                      className="transform hover:scale-105"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Shows */}
            {selectedCategory === 'All' && upcomingShows.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <ClockIcon className="w-6 h-6 text-primary" />
                  <span>Coming Up Next</span>
                </h2>
                <div className="bg-gray-900/50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingShows.slice(0, 6).map((show, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-300">
                        <div className="text-primary font-bold text-sm">
                          {formatTime(show.startTime)}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-white">{show.title}</div>
                          <div className="text-xs text-gray-400">
                            Channel {show.channelNumber} • {show.channelName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* All TV Channels */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === 'All' ? 'All Live Channels' : `${selectedCategory} Channels`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTVChannels.map((channel) => (
                  <LiveTVChannelCard
                    key={channel._id}
                    channel={channel}
                    onWatch={handleWatchChannel}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <LiveVideoPlayer
          src={selectedVideo.videoUrl}
          poster={selectedVideo.thumbnail}
          title={selectedVideo.title}
          onClose={handleClosePlayer}
          isLive={selectedVideo.isLive}
          liveViewers={selectedVideo.liveViewers}
          streamQuality={selectedVideo.streamQuality}
          streamLanguage={selectedVideo.streamLanguage}
        />
      )}

      {/* TV Channel Player Modal */}
      {selectedChannel && (
        <LiveVideoPlayer
          src={selectedChannel.streamUrl}
          poster={selectedChannel.thumbnail}
          title={`${selectedChannel.name} - ${selectedChannel.currentProgram?.title || 'Live TV'}`}
          onClose={handleClosePlayer}
          isLive={selectedChannel.isLive}
          liveViewers={selectedChannel.liveViewers}
          streamQuality={['1080p', '720p', '480p']}
          streamLanguage="English"
        />
      )}
    </div>
  )
}