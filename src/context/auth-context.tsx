import react, { ReactNode, useContext, useCallback } from 'react'
import * as auth from 'auth-provider'
import { User } from 'types/user'
import { http } from 'common/http'
import { useMount } from 'hooks/common'
import { useAsync } from 'hooks/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import { useQueryClient } from 'react-query'
interface AuthForm {
  username: string
  password: string
}

interface AuthCtx {
  user: User | null
  login: (from: AuthForm) => Promise<void>
  register: (from: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

// 初始化用户信息
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

// createContext的泛型类型: 根据Provider所提供的value
const AuthContext = react.createContext<AuthCtx | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

// 这是一个HOC组件，不是自定义的hook
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    error,
    run,
    isLoading,
    isIdle,
    isError
  } = useAsync<User | null>()
  const queryClient = useQueryClient()

  // const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  // 函数式编程概念: point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)

  const register = (form: AuthForm) => auth.register(form).then(setUser)

  const logout = () =>
    auth.logout().then(() => {
      queryClient.clear()
      setUser(null)
    })

  // 解决刷新不会重新跳转登陆页面问题，原因是刷新后user为null
  useMount(
    useCallback(() => {
      run(bootstrapUser())
    }, [run])
  )

  if (isLoading || isIdle) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
      children={children}
    />
  )
}

// auth hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

// auth consumer装饰器
export const authConsumer =
  (Target: React.ComponentClass) =>
  (props: { [key in string]: unknown } | undefined) =>
    (
      <AuthContext.Consumer>
        {(auth) => <Target {...auth} {...props} />}
      </AuthContext.Consumer>
    )
