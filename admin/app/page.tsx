'use client'

import { useEffect, useState } from 'react'
import { 
  UsersIcon, 
  FilmIcon, 
  EyeIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'
import StatsCard from '../components/StatsCard'
import RecentVideos from '../components/RecentVideos'
import UserActivity from '../components/UserActivity'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVideos: 0,
    totalViews: 0,
    revenue: 0
  })

  useEffect(() => {
    // Simulate API call
    setStats({
      totalUsers: 12543,
      totalVideos: 1247,
      totalViews: 2847392,
      revenue: 45678
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome to Nexflare Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={UsersIcon}
          change="+12%"
          changeType="positive"
        />
        <StatsCard
          title="Total Videos"
          value={stats.totalVideos.toLocaleString()}
          icon={FilmIcon}
          change="+8%"
          changeType="positive"
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={EyeIcon}
          change="+23%"
          changeType="positive"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          change="+15%"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentVideos />
        <UserActivity />
      </div>
    </div>
  )
}