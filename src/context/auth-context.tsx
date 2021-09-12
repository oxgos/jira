import react, { ReactNode, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/interface'
import { http } from 'common/http'
import { useMount } from 'hooks'
interface AuthForm {
  username: string
  password: string
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
const AuthContext = react.createContext<
  | {
      user: User | null
      login: (from: AuthForm) => Promise<void>
      register: (from: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 这是一个HOC组件，不是自定义的hook
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  // const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  // 函数式编程概念: point free
  const login = (form: AuthForm) =>
    auth
      .login(form)
      .then(setUser)
      .catch((e) => {
        console.log(e)
      }) // 简写(消参)

  const register = (form: AuthForm) =>
    auth
      .register(form)
      .then(setUser)
      .catch((e) => {
        console.log(e)
      })

  const logout = () =>
    auth
      .logout()
      .then(() => setUser(null))
      .catch((e) => {
        console.log(e)
      })

  // 解决刷新不会重新跳转登陆页面问题，原因是刷新后user为null
  useMount(() => {
    bootstrapUser().then(setUser)
  })

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

// TODO: auth consumer
// export const authConsumer =
//   <P extends {}>(Target: React.ComponentClass<P>) =>
//   (props: P): JSX.Element =>
//     (
//       <AuthContext.Consumer>
//         {(auth) => {
//           ;<Target {...auth} {...props} />
//         }}
//       </AuthContext.Consumer>
//     )
