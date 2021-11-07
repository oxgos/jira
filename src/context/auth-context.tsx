import { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/interface'
import { http } from 'common/http'
import { useMount } from 'hooks/common'
import { useAsync } from 'hooks/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export interface AuthForm {
  username: string
  password: string
}

// 初始化用户信息
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// 这是一个HOC组件，不是自定义的hook
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, run, isLoading, isIdle, isError } = useAsync<User | null>()

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  // 解决刷新不会重新跳转登陆页面问题，原因是刷新后user为null
  useMount(
    useCallback(() => {
      run(dispatch(authStore.bootstrap()))
    }, [run, dispatch])
  )

  if (isLoading || isIdle) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  // 组件不能返回null,所以用div包一下
  return <div>{children}</div>
}

// auth hook
export const useAuth = () => {
  /**
   * 如不给dispatch显示声明，then会报错
   * login({ username: '123', password: '123'}).then()
   */
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  )
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  )
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout
  }
}
