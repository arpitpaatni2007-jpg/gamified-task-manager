// components/Footer.jsx
// simple footer shown at the bottom of every page

function Footer() {
  return (
    <footer className="mt-10 py-5 border-t border-gray-200 dark:border-gray-700 text-center">
      <p className="text-sm text-gray-400 dark:text-gray-500">
        ⚡ Level Up - Gamified Task Manager
      </p>
      {/* student credit - required by project */}
      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
        Made by <span className="font-semibold text-purple-500">Arpit Patni</span>
      </p>
    </footer>
  )
}

export default Footer
