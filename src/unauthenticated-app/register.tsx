import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'

const Register = () => {
  const { register } = useAuth()
  // 默认表单提交方式
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    register({ username, password })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='account'>账号</label>
        <input type='text' id='account' />
      </div>
      <div>
        <label htmlFor='password'>密码</label>
        <input type='text' id='password' />
      </div>
      <button type='submit'>注册</button>
    </form>
  )
}

export default Register
