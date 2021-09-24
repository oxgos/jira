import { useState, useEffect } from 'react'
import { useMount, useDebounce } from 'hooks/common'
import { useHttp } from 'common/http'
import { useAsync } from 'hooks/use-async'
import { cleanObject } from 'common/util'
import { Project, User } from 'screens/project-list/interface'

export const useUser = () => {
  const client = useHttp()
  const { run, data: users } = useAsync<User[]>()

  useMount(() => {
    run(client(`users`))
  })

  return { users }
}

export const useProject = () => {
  const client = useHttp()
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 500)
  const { run, isLoading, data: list } = useAsync<Project[]>()
  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(debounceParam)
      })
    )
  }, [debounceParam]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    param,
    setParam,
    isLoading,
    list
  }
}
