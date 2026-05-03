// components/TaskCard.jsx
// this shows one task as a card with complete/delete/edit buttons

import { useState } from 'react'
import { useTask } from '../context/TaskContext'

function TaskCard({ task }) {
  const { dispatch } = useTask()
  // isEditing tracks whether user is currently editing this task
  const [isEditing, setIsEditing] = useState(false)
  // editText stores the new text while editing
  const [editText, setEditText] = useState(task.text)

  // mark task as done or undone
  function handleToggle() {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id })
  }

  // delete this task
  function handleDelete() {
    dispatch({ type: 'DELETE_TASK', payload: task.id })
  }

  // save edited task text
  function handleSaveEdit() {
    if (!editText.trim()) return
    dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: editText.trim() } })
    setIsEditing(false)
  }

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 mb-3 ${
        task.completed
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 opacity-80'
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* checkbox to complete/uncomplete */}
        <button
          onClick={handleToggle}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-500 hover:border-purple-400'
          }`}
        >
          {task.completed && <span className="text-xs">✓</span>}
        </button>

        {/* task text or edit input */}
        <div className="flex-1">
          {isEditing ? (
            // show input when editing
            <div className="flex gap-2">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                className="flex-1 border border-purple-300 rounded-lg px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
                autoFocus
              />
              <button onClick={handleSaveEdit} className="text-xs bg-purple-500 text-white px-3 py-1 rounded-lg">Save</button>
              <button onClick={() => setIsEditing(false)} className="text-xs text-gray-400 hover:text-gray-600 px-2">Cancel</button>
            </div>
          ) : (
            // show task text normally
            <>
              <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
                {task.text}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Added: {task.createdAt}</p>
              {task.completed && task.completedAt && (
                <p className="text-xs text-green-500 mt-0.5">✅ Done: {task.completedAt}</p>
              )}
            </>
          )}
        </div>

        {/* XP badge - shows reward for completing */}
        {!task.completed && (
          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
            +20 XP
          </span>
        )}
        {task.completed && (
          <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
            ✅ Done
          </span>
        )}

        {/* edit and delete buttons */}
        {!isEditing && (
          <div className="flex gap-1 flex-shrink-0">
            {!task.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 p-1 rounded transition text-sm"
                title="Edit"
              >✏️</button>
            )}
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 p-1 rounded transition text-sm"
              title="Delete"
            >🗑️</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
