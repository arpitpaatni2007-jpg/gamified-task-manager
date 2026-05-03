// pages/NotFound.jsx
// this shows when user goes to a page that doesn't exist

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-7xl mb-4">😵</p>
      <h1 className="text-3xl font-bold text-gray-700 dark:text-white mb-2">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-6">Oops! This page doesn't exist.</p>
      {/* link back to home */}
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
