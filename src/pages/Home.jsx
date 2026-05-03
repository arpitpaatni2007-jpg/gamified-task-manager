// pages/Home.jsx
// this is the main page where user sees tasks, level, and stats

import LevelCard from '../components/LevelCard'
import StatsBar from '../components/StatsBar'
import AddTaskForm from '../components/AddTaskForm'
import TaskList from '../components/TaskList'

function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* page title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
        🎮 Your Tasks
      </h1>

      {/* level and XP card - gamification feature */}
      <LevelCard />

      {/* quick stats - total, pending, done */}
      <StatsBar />

      {/* form to add new task */}
      <AddTaskForm />

      {/* list of all tasks with search and filter */}
      <TaskList />
    </div>
  )
}

export default Home
