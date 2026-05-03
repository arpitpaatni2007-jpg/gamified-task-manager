// hooks/useDebounce.js
// debounce means: wait a bit before running the search
// so we don't search on every single keystroke

import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
  // this stores the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // set a timer - only update after user stops typing
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // clear timer if user types again before delay is done
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
