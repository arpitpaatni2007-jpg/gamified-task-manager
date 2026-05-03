// pages/SavedTips.jsx
// this page shows all saved tips from localStorage

import { useState, useEffect } from 'react'

function SavedTips() {
  // store saved tips
  const [tips, setTips] = useState([])

  // load tips from localStorage when page loads
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedTips')) || []
    setTips(saved)
  }, [])

  // delete a saved tip
  function handleDelete(id) {
    const updated = tips.filter(t => t.id !== id)
    setTips(updated)
    localStorage.setItem('savedTips', JSON.stringify(updated))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* heading */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        ⭐ Saved Tips
      </h1>

      {/* empty state */}
      {tips.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          <p className="text-4xl mb-2">📭</p>
          <p className="text-sm">No saved tips yet</p>
        </div>
      )}

      {/* list of tips */}
      <div className="space-y-4">
        {tips.map(t => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm"
          >

            {/* topic name */}
            <p className="text-sm font-semibold text-purple-600 mb-2">
              {t.topic}
            </p>

            {/* tip text */}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t.tip}
            </p>

            {/* delete button */}
            <button
              onClick={() => handleDelete(t.id)}
              className="mt-3 text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SavedTips