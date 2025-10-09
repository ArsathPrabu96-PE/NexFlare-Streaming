'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoRow from '../components/VideoRow'
import { mockVideos, getTrendingVideos, getVideosByCategory, getPremiumVideos } from '../lib/mockData'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [animationVideos, setAnimationVideos] = useState([])
  const [premiumVideos, setPremiumVideos] = useState([])
  const [sciFiVideos, setSciFiVideos] = useState([])

  useEffect(() => {
    setTrending(getTrendingVideos())
    setAnimationVideos(getVideosByCategory('Animation'))
    setPremiumVideos(getPremiumVideos())
    setSciFiVideos(getVideosByCategory('Sci-Fi'))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero video={trending[0]} />
      <div className="px-6 md:px-12 lg:px-20 space-y-12 pb-20">
        <div className="space-y-16">
          <VideoRow title="Trending Now" videos={trending} />
          <VideoRow title="Animation" videos={animationVideos} />
          <VideoRow title="Premium Content" videos={premiumVideos} />
          <VideoRow title="Sci-Fi" videos={sciFiVideos} />
          <VideoRow title="All Videos" videos={mockVideos.slice(0, 8)} />
        </div>
      </div>
    </div>
  )
}