import { useEffect } from 'react'
import { useHttp } from 'common/http'
import { useAsync } from 'hooks/use-async'
import { cleanObject } from 'common/util'
import { Project } from 'screens/project-list/interface'

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(param || {})
      })
    )
  }, [param]) // eslint-disable-line react-hooks/exhaustive-deps

  return result
}
