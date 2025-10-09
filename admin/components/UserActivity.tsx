'use client'

import { useState, useEffect } from 'react'

interface Activity {
  id: string
  user: string
  action: string
  time: string
  type: 'login' | 'upload' | 'subscription' | 'view'
}

export default function UserActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    setActivities([
      { id: '1', user: 'John Doe', action: 'Subscribed to Premium', time: '5 min ago', type: 'subscription' },
      { id: '2', user: 'Jane Smith', action: 'Uploaded new video', time: '12 min ago', type: 'upload' },
      { id: '3', user: 'Mike Johnson', action: 'Logged in', time: '18 min ago', type: 'login' },
      { id: '4', user: 'Sarah Wilson', action: 'Watched "Inception"', time: '25 min ago', type: 'view' },
      { id: '5', user: 'Tom Brown', action: 'Subscribed to Basic', time: '32 min ago', type: 'subscription' }
    ])
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'subscription': return '💳'
      case 'upload': return '📹'
      case 'login': return '🔐'
      case 'view': return '👁️'
      default: return '📝'
    }
  }

  return (
    <div className="bg-surface p-6 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4">User Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 bg-surface-light rounded-lg">
            <div className="text-lg">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-white text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-gray-400 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}