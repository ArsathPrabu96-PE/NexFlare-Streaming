'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import OptimizedHero from '../components/OptimizedHero'
import VideoRow from '../components/VideoRow'
import LiveVideoCard from '../components/LiveVideoCard'
import LiveVideoPlayer from '../components/LiveVideoPlayer'
import { mockVideos, getTrendingVideos, getVideosByCategory, getPremiumVideos, getLiveVideos, getTrendingLiveVideos } from '../lib/mockData'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [animationVideos, setAnimationVideos] = useState([])
  const [premiumVideos, setPremiumVideos] = useState([])
  const [sciFiVideos, setSciFiVideos] = useState([])
  const [liveVideos, setLiveVideos] = useState([])
  const [trendingLive, setTrendingLive] = useState([])
  const [selectedLiveVideo, setSelectedLiveVideo] = useState<any>(null)

  useEffect(() => {
    setTrending(getTrendingVideos())
    setAnimationVideos(getVideosByCategory('Animation'))
    setPremiumVideos(getPremiumVideos())
    setSciFiVideos(getVideosByCategory('Sci-Fi'))
    setLiveVideos(getLiveVideos())
    setTrendingLive(getTrendingLiveVideos())
  }, [])

  const handlePlayLiveVideo = (video: any) => {
    setSelectedLiveVideo(video)
  }

  const handleCloseLivePlayer = () => {
    setSelectedLiveVideo(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OptimizedHero video={trending[0]} />
      <div className="px-6 md:px-12 lg:px-20 space-y-12 pb-20">
        <div className="space-y-16">
          {/* Live Streaming Section */}
          {trendingLive.length > 0 && (
            <section className="live-section-header live-optimized">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 live-badge px-3 py-1 rounded-full text-white text-sm font-bold">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE NOW</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    🔴 Live Streaming
                  </h2>
                  <div className="live-viewers text-sm text-gray-400">
                    {trendingLive.reduce((total, video) => total + (video.liveViewers || 0), 0).toLocaleString()} watching
                  </div>
                </div>
                <a 
                  href="/live" 
                  className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>View All</span>
                  <span>→</span>
                </a>
              </div>
              <div className="live-grid">
                {trendingLive.map((video) => (
                  <LiveVideoCard
                    key={video._id}
                    video={video}
                    onPlay={handlePlayLiveVideo}
                    className="live-card transform hover:scale-105 transition-all duration-300"
                  />
                ))}
              </div>
            </section>
          )}
          
          <VideoRow title="Trending Now" videos={trending} />
          <VideoRow title="Animation" videos={animationVideos} />
          <VideoRow title="Premium Content" videos={premiumVideos} />
          <VideoRow title="Sci-Fi" videos={sciFiVideos} />
          <VideoRow title="All Videos" videos={mockVideos.slice(0, 8)} />
        </div>
      </div>

      {/* Live Video Player Modal */}
      {selectedLiveVideo && (
        <LiveVideoPlayer
          src={selectedLiveVideo.videoUrl}
          poster={selectedLiveVideo.thumbnail}
          title={selectedLiveVideo.title}
          onClose={handleCloseLivePlayer}
          isLive={selectedLiveVideo.isLive}
          liveViewers={selectedLiveVideo.liveViewers}
          streamQuality={selectedLiveVideo.streamQuality}
          streamLanguage={selectedLiveVideo.streamLanguage}
        />
      )}
    </div>
  )
}