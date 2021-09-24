// 作业hook
import { useState } from 'react'

/**
 * 这种写法，不知道为什么V不能传给add方法
 * 原因: 冒号，只是对前面变量类型的定义，后面函数跟前面是分开的，是两个部分
 */
// interface useArrayReturn<V> {
//   value: V[]
//   clear: () => void
//   removeIndex: (args: number) => void
//   add: (args: V) => void
// }
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
