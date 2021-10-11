import { useRef, useState } from 'react'

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
  // const [refresh, setRefresh] = useState<Function | undefined>(undefined)
  const ref = useRef<Function | undefined>()

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

  const retry = () => {
    // if (refresh) {
    //   run(refresh())
    // }
    if (ref.current) {
      run(ref.current())
    }
  }

  const run = (
    promise: Promise<D>,
    params?: { request?: () => Promise<D>; isKeepALive: boolean }
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    if (params?.isKeepALive) {
      // setRefresh(() => params?.request)
      ref.current = params?.request
    }
    setState({
      ...state,
      stat: 'loading'
    })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        // catch会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error)
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
