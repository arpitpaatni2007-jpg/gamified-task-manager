// pages/Tips.jsx
// this page shows productivity tips fetched from Wikipedia API

import { useState } from 'react'
import { getProductivityTip, PRODUCTIVITY_TOPICS } from '../services/wikiService'

function Tips() {
  // stores tip text
  const [tip, setTip] = useState('')
  // stores topic name
  const [topicName, setTopicName] = useState('')
  // loading state
  const [loading, setLoading] = useState(false)
  // error state
  const [error, setError] = useState('')

  // fetch tip from API
  async function handleFetchTip(topic) {
    setLoading(true)
    setError('')
    setTip('')
    setTopicName(topic.replace(/_/g, ' '))

    const result = await getProductivityTip(topic)

    if (result === 'Could not load tip. Try again later.') {
      setError(result)
    } else {
      setTip(result)
    }

    setLoading(false)
  }

  // random tip generator
  function handleRandomTip() {
    const randomTopic =
      PRODUCTIVITY_TOPICS[Math.floor(Math.random() * PRODUCTIVITY_TOPICS.length)]

    handleFetchTip(randomTopic)
  }

  // save tip to localStorage
  function handleSaveTip() {
    if (!tip) return

    const saved = JSON.parse(localStorage.getItem('savedTips')) || []

    saved.push({
      id: Date.now(),
      topic: topicName,
      tip: tip
    })

    localStorage.setItem('savedTips', JSON.stringify(saved))
    alert('Tip saved ⭐')
  }

  // copy tip text
  function handleCopyTip() {
    if (!tip) return
    navigator.clipboard.writeText(tip)
    alert('Tip copied 📋')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* heading */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        💡 Productivity Tips
      </h1>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Click a topic or use random button to get a productivity tip
      </p>

      {/* topic buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        {PRODUCTIVITY_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => handleFetchTip(topic)}
            className="bg-purple-100 dark:bg-purple-900/40 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            🔹 {topic.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* random button */}
      <div className="mb-6">
        <button
          onClick={handleRandomTip}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🎲 Random Tip
        </button>
      </div>

      {/* loading */}
      {loading && (
        <div className="text-center py-10">
          <div className="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm mt-3">Loading tip...</p>
        </div>
      )}

      {/* error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* tip card */}
      {tip && !loading && (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm space-y-3">

          {/* topic badge */}
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {topicName}
            </span>
            <span className="text-xs text-gray-400">via Wikipedia</span>
          </div>

          {/* tip text */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {tip}
          </p>

          {/* word count */}
          <p className="text-xs text-gray-400">
            {tip.split(' ').length} words
          </p>

          {/* buttons */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveTip}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-sm"
            >
              ⭐ Save
            </button>

            <button
              onClick={handleCopyTip}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
            >
              📋 Copy
            </button>
          </div>
        </div>
      )}

      {/* empty state */}
      {!tip && !loading && !error && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-600">
          <p className="text-5xl mb-3">📚</p>
          <p className="text-sm">Select a topic above to see a tip</p>
        </div>
      )}
    </div>
  )
}

export default Tips