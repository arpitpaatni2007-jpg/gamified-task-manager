// components/AddTaskForm.jsx
// this form lets the user type and add a new task

import { useState } from 'react'
import { useTask } from '../context/TaskContext'

function AddTaskForm() {
  // this stores what the user is typing
  const [inputText, setInputText] = useState('')
  const [error, setError] = useState('')

  // get dispatch from context to send actions
  const { dispatch } = useTask()

  // this runs when user clicks "Add Task"
  function handleAdd() {
    // validation - don't add empty task
    if (!inputText.trim()) {
      setError('Please enter a task!')
      return
    }
    if (inputText.trim().length < 3) {
      setError('Task must be at least 3 characters.')
      return
    }

    // dispatch ADD_TASK action to context
    dispatch({ type: 'ADD_TASK', payload: inputText.trim() })

    // clear the input field and error
    setInputText('')
    setError('')
  }

  // allow pressing Enter key to add task
  function handleKeyPress(e) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-5">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Add New Task</h3>

      <div className="flex gap-2">
        {/* text input for task name */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
            setError('') // clear error when typing
          }}
          onKeyPress={handleKeyPress}
          placeholder="What do you want to accomplish? (+20 XP)"
          className="flex-1 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
        />

        {/* add button */}
        <button
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          + Add
        </button>
      </div>

      {/* show error if task is invalid */}
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}

export default AddTaskForm
