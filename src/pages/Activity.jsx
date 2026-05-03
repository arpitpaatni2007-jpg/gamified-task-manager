// pages/Activity.jsx
// this page shows recent task completion history, streak, and badge info

import { useTask } from '../context/TaskContext'

function Activity() {
  const { activity, xp, level, tasks, streak, badge } = useTask()

  // calculate completed task count
  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        📊 Activity Log
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Track your recent completions, streak, and badges
      </p>

      {/* summary cards - 4 stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{xp}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total XP Earned</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{completedCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tasks Completed</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">🔥 {streak}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Day Streak</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Lv.{level}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current Level</p>
        </div>
      </div>

      {/* badge section */}
      <div className={`flex items-center gap-4 rounded-xl p-4 border mb-6 ${badge.color}`}>
        <span className="text-4xl">{badge.emoji}</span>
        <div>
          <p className="font-bold text-lg">{badge.label} Badge</p>
          <p className="text-sm opacity-80">
            {xp < 100 && `Earn ${100 - xp} more XP to reach Intermediate`}
            {xp >= 100 && xp < 300 && `Earn ${300 - xp} more XP to reach Pro`}
            {xp >= 300 && 'You have reached the highest badge!'}
          </p>
        </div>
      </div>

      {/* recent activity list */}
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Recent Activity
      </h2>

      {activity.length === 0 ? (
        // empty state when no activity yet
        <div className="text-center py-12">
          <p className="text-5xl mb-3">🏃</p>
          <p className="text-gray-400 text-sm">No activity yet. Complete a task to see it here!</p>
        </div>
      ) : (
        // show list of completed tasks
        <div className="space-y-3">
          {activity.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm"
            >
              {/* activity number */}
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xs flex-shrink-0">
                {index + 1}
              </div>

              {/* task info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {item.text}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>

              {/* XP earned badge */}
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg flex-shrink-0">
                +20 XP
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activity
