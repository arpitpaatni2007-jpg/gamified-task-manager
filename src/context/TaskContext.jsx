// context/TaskContext.jsx
// This file manages global state using Context API (like a global store)
// All components can access tasks, points, level, streak, badge from here

import { createContext, useContext, useReducer, useEffect } from 'react'

// create the context - this is like a box that holds all our data
const TaskContext = createContext()

// points needed to reach each level
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000]

// this function calculates the level based on total XP points
function getLevel(xp) {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
    }
  }
  // max level is 5
  return Math.min(level, 5)
}

// this function calculates progress percentage within current level
function getLevelProgress(xp) {
  const level = getLevel(xp)
  if (level >= 5) return 100

  const currentLevelXP = LEVEL_THRESHOLDS[level - 1]
  const nextLevelXP = LEVEL_THRESHOLDS[level]
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  return Math.round(progress)
}

// this function returns badge info based on total XP
// badge changes as user earns more XP
export function getBadge(xp) {
  if (xp >= 300) return { label: 'Pro', emoji: '🏆', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' }
  if (xp >= 100) return { label: 'Intermediate', emoji: '⚡', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' }
  return { label: 'Beginner', emoji: '🌱', color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' }
}

// this function checks and updates the streak
// streak = how many consecutive days user completed at least 1 task
function updateStreak(currentStreak, lastCompletedDate) {
  // get today's date as a simple string like "Wed May 01 2024"
  const today = new Date().toDateString()

  // if user already completed a task today, streak stays the same
  if (lastCompletedDate === today) {
    return { streak: currentStreak, lastCompletedDate }
  }

  // get yesterday's date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toDateString()

  // if last completed was yesterday, continue the streak (add 1)
  if (lastCompletedDate === yesterdayStr) {
    return { streak: currentStreak + 1, lastCompletedDate: today }
  }

  // otherwise, streak resets to 1 (new streak starting today)
  return { streak: 1, lastCompletedDate: today }
}

// reducer handles all state changes (add, delete, complete tasks)
function taskReducer(state, action) {
  switch (action.type) {

    case 'ADD_TASK': {
      // add a new task to the list
      const newTask = {
        id: Date.now(), // unique id using timestamp
        text: action.payload,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
      }
      return { ...state, tasks: [newTask, ...state.tasks] }
    }

    case 'DELETE_TASK': {
      // remove a task by id
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      }
    }

    case 'TOGGLE_TASK': {
      // mark task as complete or incomplete
      const task = state.tasks.find((t) => t.id === action.payload)
      const wasCompleted = task?.completed

      // add 20 XP when completing, remove 20 XP when uncompleting
      const xpChange = wasCompleted ? -20 : 20
      const newXP = Math.max(0, state.xp + xpChange)

      // update activity log
      let newActivity = [...state.activity]

      // update streak only when completing a task (not uncompleting)
      let newStreak = state.streak
      let newLastCompletedDate = state.lastCompletedDate

      if (!wasCompleted) {
        // only log and update streak when completing
        newActivity = [
          { id: Date.now(), text: task.text, time: new Date().toLocaleString() },
          ...newActivity,
        ].slice(0, 10) // keep only last 10 activities

        // update streak using helper function
        const streakResult = updateStreak(state.streak, state.lastCompletedDate)
        newStreak = streakResult.streak
        newLastCompletedDate = streakResult.lastCompletedDate
      }

      return {
        ...state,
        xp: newXP,
        streak: newStreak,
        lastCompletedDate: newLastCompletedDate,
        tasks: state.tasks.map((t) =>
          t.id === action.payload
            ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleString() : null }
            : t
        ),
        activity: newActivity,
      }
    }

    case 'EDIT_TASK': {
      // update task text
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        ),
      }
    }

    case 'CLEAR_COMPLETED': {
      // remove all completed tasks from the list at once
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      }
    }

    case 'LOAD_STATE': {
      // load saved state from localStorage
      return action.payload
    }

    default:
      return state
  }
}

// initial state when app first loads
const initialState = {
  tasks: [],
  xp: 0,
  activity: [],
  streak: 0,               // how many consecutive days
  lastCompletedDate: null, // date of last completion
}

// TaskProvider wraps the whole app so all pages can use context
export function TaskProvider({ children }) {
  // useReducer is like useState but for complex state
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // load data from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem('taskAppState')
    if (saved) {
      const parsed = JSON.parse(saved)
      // handle old saved data that doesn't have streak fields yet
      if (parsed.streak === undefined) parsed.streak = 0
      if (parsed.lastCompletedDate === undefined) parsed.lastCompletedDate = null
      dispatch({ type: 'LOAD_STATE', payload: parsed })
    }
  }, [])

  // save to localStorage every time state changes
  useEffect(() => {
    localStorage.setItem('taskAppState', JSON.stringify(state))
  }, [state])

  // calculate level and progress from current XP
  const level = getLevel(state.xp)
  const levelProgress = getLevelProgress(state.xp)
  const nextLevelXP = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]

  // calculate badge info from XP
  const badge = getBadge(state.xp)

  return (
    // share state and dispatch with all child components
    <TaskContext.Provider value={{ ...state, dispatch, level, levelProgress, nextLevelXP, LEVEL_THRESHOLDS, badge }}>
      {children}
    </TaskContext.Provider>
  )
}

// custom hook so components can easily use the context
export function useTask() {
  return useContext(TaskContext)
}
