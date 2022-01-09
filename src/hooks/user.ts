import { useHttp } from 'common/http'
import { useQuery } from 'react-query'
import { User } from 'types/user'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  return useQuery<User[]>(['users', param], () =>
    client('users', {
      data: param
    })
  )
}
