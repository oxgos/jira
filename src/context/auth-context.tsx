import react, { ReactNode, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/interface'
interface AuthForm {
  username: string
  password: string
}
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  // const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  // 函数式编程概念: point free
  const login = (form: AuthForm) => auth.login(form).then(setUser) // 简写(消参)

  const register = (form: AuthForm) => auth.register(form).then(setUser)

  const logout = () => auth.logout().then(() => setUser(null))
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
