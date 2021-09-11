import { useEffect, useState } from 'react'

// 初始化hook
export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
// 防抖hook
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}
