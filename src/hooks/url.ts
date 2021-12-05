import { subset } from './common'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { cleanObject } from 'common/util'
/**
 * 返回页面url中，指定键的参数值
 * @param keys
 * 两种情况:
 * 1.直接传数组['name', 'personId'], 即useUrlQueryParam(['name', 'personId'])
 * 传进去参数类型即为原始类型: ('name'|'personId')[] 类型数组，所以K的类型为'name'|'personId'
 * 2.经过useState传递，const [keys] = useState(['name', 'personId'])
 * 经useState初始化后，keys被推断出的类型为string[]，所以K的类型为string
 * 解决: 需指定useState泛型为('name'|'personId')[]类型
 * const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stateKeys] = useState(keys)
  return [
    // 这里不用useMemo，会导致死循环，原因: 每次返回新对象(虽然值一样，但指向不同)，导致重新render
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys),
      [stateKeys, searchParams]
    ),
    // 多封装一层，更好的限制传进的参数
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j
      // useSearchParams相当于使用原生的URLSearchParams
      // 检验是否是iterator
      // var u = new URLSearchParams({ name: 'Jack' })
      // u[Symbol.iterator] 看是否是一个方法
      // Object.fromEntries把iterator转化成键值对的对象
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}
