import { useEffect, useState } from 'react'

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}
