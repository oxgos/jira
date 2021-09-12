import { useState } from 'react'
import Login from './login'
import Register from './register'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '登陆' : '注册'}
      </button>
    </div>
  )
}
