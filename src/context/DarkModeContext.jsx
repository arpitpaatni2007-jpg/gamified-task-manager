// context/DarkModeContext.jsx
// this manages dark mode toggle across the whole app

import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  // check if user had dark mode saved before
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // when darkMode changes, update the html class and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // toggle between dark and light
  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// custom hook for using dark mode in any component
export function useDarkMode() {
  return useContext(DarkModeContext)
}
