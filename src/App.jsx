// App.jsx
// this is the root component - sets up routing and context providers

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// context providers
import { TaskProvider } from './context/TaskContext'
import { DarkModeProvider } from './context/DarkModeContext'

// components always loaded
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// lazy loading pages
const Home = lazy(() => import('./pages/Home'))
const Tips = lazy(() => import('./pages/Tips'))
const Activity = lazy(() => import('./pages/Activity'))
const SavedTips = lazy(() => import('./pages/SavedTips')) // NEW PAGE
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <DarkModeProvider>
      <TaskProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

            {/* navbar */}
            <Navbar />

            {/* page loader */}
            <Suspense fallback={
              <div className="text-center py-20 text-gray-400">
                <div className="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm">Loading page...</p>
              </div>
            }>

              {/* routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tips" element={<Tips />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/saved" element={<SavedTips />} /> {/* NEW ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>

            </Suspense>

            {/* footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </TaskProvider>
    </DarkModeProvider>
  )
}

export default App