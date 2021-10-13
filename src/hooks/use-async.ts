import { useMountedRef } from './common'
import { useState } from 'react'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  error: null,
  data: null
}

const defaultConfig = {
  throwOnError: false // 判断是否使用useAsync的error状态
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  // useState直接传入函数的含义是：惰性初始化：所以，要用useState保存函数，不能直接传入函数
  // useState: https://codesandbox.io/s/li-yong-usestatebao-cun-han-shu-ob72k
  // useRef: https://codesandbox.io/s/li-yong-userefbao-cun-han-shu-pktr3
  const [retry, setRetry] = useState(() => () => {})
  const mountedRef = useMountedRef()
  // 可以用useRef代替实现retry
  // const ref = useRef()
  // const retry = () => {
  //   if (ref.current) {
  //     run(ref.current())
  //   }
  // }
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null
    })

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: 'error',
      error
    })

  const run = (
    promise: Promise<D>,
    runConfig?: { request: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    if (runConfig?.request) {
      setRetry(() => () => run(runConfig.request(), runConfig))
      // ref.current = runConfig.request
    }
    setState({
      ...state,
      stat: 'loading'
    })
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data)
        }
        return data
      })
      .catch((error) => {
        // catch会消化异常，如果不主动抛出，外面是接收不到异常的
        if (mountedRef.current) {
          setError(error)
        }
        if (config?.throwOnError) {
          return Promise.reject(error)
        } else {
          return error
        }
      })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state
  }
}
