// components/LevelCard.jsx
// this shows the user's current level, XP, progress bar, streak, and badge

import { useTask } from '../context/TaskContext'

// level names for each level number
const LEVEL_NAMES = ['', 'Beginner', 'Explorer', 'Achiever', 'Champion', 'Legend']
const LEVEL_EMOJIS = ['', '🌱', '🔥', '⚡', '🏆', '👑']

function LevelCard() {
  const { xp, level, levelProgress, nextLevelXP, LEVEL_THRESHOLDS, streak, badge } = useTask()

  // calculate XP needed for next level
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0
  const xpForNext = nextLevelXP - currentLevelXP
  const xpDone = xp - currentLevelXP

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-5 shadow-lg mb-6">

      {/* top row - level info and XP */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-purple-200 text-sm">Current Level</p>
          <h2 className="text-2xl font-bold">
            {LEVEL_EMOJIS[level]} Level {level} - {LEVEL_NAMES[level]}
          </h2>
        </div>
        {/* total XP badge */}
        <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
          <p className="text-2xl font-bold">{xp}</p>
          <p className="text-xs text-purple-200">Total XP</p>
        </div>
      </div>

      {/* progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-purple-200">Progress to Level {Math.min(level + 1, 5)}</span>
          {level < 5 && (
            <span className="text-purple-200">{xpDone} / {xpForNext} XP</span>
          )}
          {level >= 5 && <span className="text-yellow-300">MAX LEVEL! 🎉</span>}
        </div>

        {/* the actual progress bar */}
        <div className="w-full bg-white/30 rounded-full h-4">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${level >= 5 ? 100 : levelProgress}%` }}
          />
        </div>
        {level < 5 && (
          <p className="text-purple-200 text-xs mt-1">{levelProgress}% complete</p>
        )}
      </div>

      {/* bottom row - streak and badge side by side */}
      <div className="flex gap-3">

        {/* streak display */}
        <div className="flex-1 bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-lg font-bold leading-none">{streak} Day{streak !== 1 ? 's' : ''}</p>
            <p className="text-xs text-purple-200">Daily Streak</p>
          </div>
        </div>

        {/* XP badge display */}
        <div className="flex-1 bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-2xl">{badge.emoji}</span>
          <div>
            <p className="text-lg font-bold leading-none">{badge.label}</p>
            <p className="text-xs text-purple-200">XP Badge</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelCard
