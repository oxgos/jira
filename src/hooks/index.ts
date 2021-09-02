import { useEffect, useState } from 'react'

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

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

// interface useArrayReturn<V> {
//   value: V[]
//   clear: () => void
//   removeIndex: (args: number) => void
//   add: (args: V) => void
// }
// 这种写法，不知道为什么V不能传给add方法
// const useArray: <V>(args: V[]) => useArrayReturn<V> = (args) => {}
export const useArray = <V>(args: V[]) => {
  const [value, setValue] = useState(args)
  const clear = () => {
    setValue([])
  }
  const removeIndex = (index: number) => {
    const copy = [...value]
    copy.splice(index, 1)
    setValue(copy)
  }
  const add = (args: V) => {
    setValue([...value, args])
  }

  return {
    value,
    clear,
    removeIndex,
    add
  }
}
