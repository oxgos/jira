// hook测试
import { renderHook, act } from '@testing-library/react-hooks'
import { useAsync } from 'hooks/use-async'

const defaultState: ReturnType<typeof useAsync> = {
  stat: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  // 这里的测试的这几个方法不是很重要，随便给它们一个方法就可以了
  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function)
}

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'loading',
  isIdle: false,
  isLoading: true
}

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'success',
  isIdle: false,
  isSuccess: true
}

test('useAsync 可以异步处理', async () => {
  let resolve: any, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const { result } = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState)

  let p: Promise<any>
  act(() => {
    p = result.current.run(promise)
  })
  expect(result.current).toEqual(loadingState)
  const resolvedValue = { mockedValue: 'resolved' }
  await act(async () => {
    resolve(resolvedValue)
    await p
  })
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue
  })
})
