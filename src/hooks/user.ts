import { useEffect } from 'react'
import { useHttp } from 'common/http'
import { useAsync } from 'hooks/use-async'
import { User } from 'types/user'
import { cleanObject } from 'common/util'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client(`users`, { data: cleanObject(param || {}) }))
  }, [param]) // eslint-disable-line react-hooks/exhaustive-deps

  return result
}
