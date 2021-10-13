import { useCallback } from 'react'
import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
// 环境变量配置Api的base_url
const API_BASE_URL = process.env.REACT_APP_API_URL

// RequestInit是window.fetch方法的第二参数类型，再添加上我们自身需要的data和token
interface Config extends RequestInit {
  data?: object
  token?: string
}

// PS: http的第二参数因为解构，不能用?可选, 可给一个默认值{}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    if (data && Object.keys(data).length > 0) {
      endpoint += `?${qs.stringify(data)}`
    }
  } else {
    config.body = JSON.stringify(data || {})
  }
  // window.fetch接口报错不会触发catch，需要在then里手动去Promise.reject(), axios能在catch捕获异常
  return window
    .fetch(`${API_BASE_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({ message: '请重新登陆' })
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

// 在http方法的基础上，编写自定义hook
export const useHttp = () => {
  const { user } = useAuth()
  // Parameters获取http的参数类型
  // 这里的rest操作符值的学习，tuple类型转为2个参数传递
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
