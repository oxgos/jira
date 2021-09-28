import { useEffect, useState /* useRef */ } from 'react'

// 初始化hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO: 依赖项里加上callback会造成无限循环, 这个和useCalllback以及useMemo有关系
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // const oldTitleRef = useRef(document.title)
  const oldTitle = document.title
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [])
}
