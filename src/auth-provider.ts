import { User } from 'screens/project-list/interface'

const localStorageKey = '__auth_provider_token__'
// 环境变量配置Api的base_url
const API_BASE_URL = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      // 如果没有else, login返回类型是User|undefined,把添加Promise.reject(相当于throw new error)
      return Promise.reject(data)
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(data)
    }
  })
}

export const logout = async () =>
  await window.localStorage.removeItem(localStorageKey)
