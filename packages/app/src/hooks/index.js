import { useState, useEffect } from 'react'

/**
 * A React hook that updates state with a delay (timeout).
 * It returns a tuple with the state before timeout, after timeout, and an update function.
 */
export const useThrottle = (value, timeout) => {
  const [s1, u1] = useState(value)
  const [s2, u2] = useState(value)
  useEffect(() => {
    const tid = setTimeout(() => u2(s1), timeout)
    return () => clearTimeout(tid)
  }, [s1, timeout])
  return [s1, s2, u1]
}
