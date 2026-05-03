// components/TaskList.jsx
// this shows the list of tasks with search, filter, pagination, and clear completed

import { useState, useMemo } from 'react'
import { useTask } from '../context/TaskContext'
import TaskCard from './TaskCard'
import useDebounce from '../hooks/useDebounce'

// how many tasks to show per page
const TASKS_PER_PAGE = 5

function TaskList() {
  const { tasks, dispatch } = useTask()

  // search input text
  const [searchText, setSearchText] = useState('')
  // filter: 'all', 'pending', or 'completed'
  const [filter, setFilter] = useState('all')
  // current pagination page
  const [currentPage, setCurrentPage] = useState(1)

  // debounce search - wait 300ms after user stops typing
  const debouncedSearch = useDebounce(searchText, 300)

  // filter and search tasks - useMemo so it only recalculates when needed (performance optimization)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // check if task matches search text
      const matchesSearch = task.text.toLowerCase().includes(debouncedSearch.toLowerCase())

      // check if task matches selected filter
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed)

      return matchesSearch && matchesFilter
    })
  }, [tasks, debouncedSearch, filter])

  // calculate total pages
  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE)

  // get only tasks for current page
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * TASKS_PER_PAGE,
    currentPage * TASKS_PER_PAGE
  )

  // change filter and reset page
  function handleFilterChange(newFilter) {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  // change search and reset page
  function handleSearch(e) {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  // this clears all completed tasks at once
  function handleClearCompleted() {
    // count completed tasks before deleting
    const completedCount = tasks.filter((t) => t.completed).length
    if (completedCount === 0) return // nothing to clear

    // ask user to confirm before deleting
    const confirmed = window.confirm(`Delete ${completedCount} completed task(s)?`)
    if (confirmed) {
      dispatch({ type: 'CLEAR_COMPLETED' })
    }
  }

  // count how many tasks are completed
  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div>
      {/* search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* search input */}
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="🔍 Search tasks..."
          className="flex-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* filter buttons */}
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                filter === f
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* task count + clear completed button row */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-400">
          Showing {paginatedTasks.length} of {filteredTasks.length} tasks
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </p>

        {/* clear completed button - only shows when there are completed tasks */}
        {completedCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="text-xs bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-lg transition font-medium"
          >
            🗑️ Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* show tasks or empty message */}
      {paginatedTasks.length > 0 ? (
        paginatedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">
            {tasks.length === 0 ? 'No tasks yet. Add your first task!' : 'No tasks match your search.'}
          </p>
        </div>
      )}

      {/* pagination buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {/* previous page */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
          >
            ← Prev
          </button>

          {/* page number buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded-lg transition ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          {/* next page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskList
