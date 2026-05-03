// components/StatsBar.jsx
// shows quick stats: total, pending, completed tasks

import { useTask } from '../context/TaskContext'

function StatsBar() {
  const { tasks } = useTask()

  // calculate stats from tasks array
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  // stats to display
  const stats = [
    { label: 'Total', value: total, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Pending', value: pending, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Done', value: completed, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bg} rounded-xl p-3 text-center`}>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
