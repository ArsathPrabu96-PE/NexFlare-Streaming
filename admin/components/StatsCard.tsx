interface StatsCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  change: string
  changeType: 'positive' | 'negative'
}

export default function StatsCard({ title, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-surface p-6 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="bg-primary/20 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className="text-gray-400 text-sm ml-2">from last month</span>
      </div>
    </div>
  )
}