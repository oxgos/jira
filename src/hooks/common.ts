import { useEffect, useState, useRef } from 'react'

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
  // useRef初始化后，current的值在生命周期里就不会改变了，除非重新赋值给current
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}
