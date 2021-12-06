import { http } from 'common/http'
import { User } from 'types/user'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return http(`login`, {
    method: 'POST',
    data
  })
    .then((data) => {
      return handleUserResponse(data)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const register = (data: { username: string; password: string }) => {
  return http(`register`, {
    method: 'POST',
    data
  })
    .then((data) => {
      return handleUserResponse(data)
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

export const logout = async () =>
  await window.localStorage.removeItem(localStorageKey)
