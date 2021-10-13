import { useEffect, useCallback } from 'react'
import { useHttp } from 'common/http'
import { useAsync } from 'hooks/use-async'
import { cleanObject } from 'common/util'
import { Project } from 'screens/project-list/interface'

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProject = useCallback(
    () =>
      run(
        client('projects', {
          data: cleanObject(param || {})
        })
      ),
    [client, param, run]
  )
  useEffect(() => {
    run(fetchProject(), {
      request: fetchProject
    })
  }, [param, run, fetchProject])

  return result
}

export const useProjectEdit = () => {
  const client = useHttp()
  const { run, ...result } = useAsync()
  const mutate = useCallback(
    (params: Partial<Project>) => {
      return run(
        client(`projects/${params.id}`, {
          data: params,
          method: 'PATCH'
        })
      )
    },
    [client, run]
  )
  return {
    mutate,
    result
  }
}

export const useProjectAdd = () => {
  const client = useHttp()
  const { run, ...result } = useAsync()
  const mutate = useCallback(
    (params: Partial<Project>) => {
      return run(
        client(`projects/${params.id}`, {
          data: params,
          method: 'POST'
        })
      )
    },
    [client, run]
  )
  return {
    mutate,
    result
  }
}
