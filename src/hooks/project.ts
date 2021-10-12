import { useEffect } from 'react'
import { useHttp } from 'common/http'
import { useAsync } from 'hooks/use-async'
import { cleanObject } from 'common/util'
import { Project } from 'screens/project-list/interface'

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const projectRequest = () =>
    run(
      client('projects', {
        data: cleanObject(param || {})
      })
    )
  useEffect(() => {
    run(projectRequest(), {
      request: projectRequest
    })
  }, [param]) // eslint-disable-line react-hooks/exhaustive-deps

  return result
}

export const useProjectEdit = () => {
  const client = useHttp()
  const { run, ...result } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }
  return {
    mutate,
    result
  }
}

export const useProjectAdd = () => {
  const client = useHttp()
  const { run, ...result } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    )
  }
  return {
    mutate,
    result
  }
}
