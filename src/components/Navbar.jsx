// components/Navbar.jsx
// this is the top navigation bar shown on all pages

import { Link, useLocation } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
import { useTask } from '../context/TaskContext'

function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { xp, level } = useTask()
  const location = useLocation()

  // check active route
  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-purple-600 dark:text-purple-400">
          <span>⚡</span>
          <span>Level Up</span>
        </Link>

        {/* navigation links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-1 rounded-full transition ${
              isActive('/') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
            }`}
          >
            Tasks
          </Link>

          <Link
            to="/tips"
            className={`px-3 py-1 rounded-full transition ${
              isActive('/tips') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
            }`}
          >
            Tips
          </Link>

          <Link
            to="/activity"
            className={`px-3 py-1 rounded-full transition ${
              isActive('/activity') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
            }`}
          >
            Activity
          </Link>

          {/* NEW SAVED PAGE */}
          <Link
            to="/saved"
            className={`px-3 py-1 rounded-full transition ${
              isActive('/saved') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
            }`}
          >
            Saved
          </Link>
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">

          {/* XP display */}
          <div className="hidden sm:flex items-center gap-2 bg-purple-50 dark:bg-purple-900/40 px-3 py-1 rounded-full text-sm">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-purple-700 dark:text-purple-300">{xp} XP</span>
            <span className="text-gray-400">|</span>
            <span className="text-purple-600 dark:text-purple-400">Lv.{level}</span>
          </div>

          {/* dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-lg"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar