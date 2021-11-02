import { useState, useReducer, useCallback } from 'react'
import { useMountedRef } from './common'

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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => {
      return mountedRef.current ? dispatch(...args) : void 0
    },
    [dispatch, mountedRef]
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState
    }
  )
  // useState直接传入函数的含义是：惰性初始化：所以，要用useState保存函数，不能直接传入函数
  // useState: https://codesandbox.io/s/li-yong-usestatebao-cun-han-shu-ob72k
  // useRef: https://codesandbox.io/s/li-yong-userefbao-cun-han-shu-pktr3
  const [retry, setRetry] = useState(() => () => {})
  const safeDispatch = useSafeDispatch(dispatch)
  // 可以用useRef代替实现retry
  // const ref = useRef()
  // const retry = () => {
  //   if (ref.current) {
  //     run(ref.current())
  //   }
  // }
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        stat: 'error',
        error
      }),
    [safeDispatch]
  )

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { request: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据')
      }
      setRetry(() => () => {
        if (runConfig?.request) {
          run(runConfig.request(), runConfig)
        }
      })
      // ref.current = runConfig.request
      // 换成useCallback后，会触发无限循环
      // setState({
      //   ...state,
      //   stat: 'loading'
      // })
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          // catch会消化异常，如果不主动抛出，外面是接收不到异常的
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    // 这里依赖了state，也会触发无限循环，因为上面有setState,state一改变又重新调用run
    // 解决: 利用setState(prevState => {}),prevState代表当前state，所以就不需要再依赖state
    // [config.throwOnError, mountedRef, setData, setError, state]
    [config.throwOnError, setData, setError, safeDispatch]
  )
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
