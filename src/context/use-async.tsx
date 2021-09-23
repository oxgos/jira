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

export const useAsync = <D,>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

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

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
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
        setError(error)
        return error
      })
    // try {
    //   const data = await promise
    //   setData(data)
    // } catch (error) {
    //   setError(error)
    // } finally {
    //   setState({
    //     ...state,
    //     stat: 'idle'
    //   })
    // }
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}
// const statusMap = {
//   pending: 0,
//   success: 1,
//   fail: 2
// }
// export const useAsync = () => {
//   const [status, setStatus] = useState(statusMap['pending'])
//   return {
//     status
//   }
// }
