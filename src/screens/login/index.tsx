import { FormEvent } from 'react'

// 环境变量配置Api的base_url
const API_BASE_URL = process.env.REACT_APP_API_URL

const Login = () => {
  const login = (params: { username: string; password: string }) => {
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(async (response: Response) => {
        if (response.ok) {
        }
      })
      .catch((e) => {})
  }
  // 默认表单提交方式
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
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
      <button type='submit'>登陆</button>
    </form>
  )
}

export default Login
