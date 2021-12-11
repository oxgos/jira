import { useProject } from './../../hooks/project'
import { useLocation } from 'react-router'
import { useUrlQueryParam } from 'hooks/url'
import { useMemo } from 'react'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  return [
    useMemo(
      () => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
      }),
      [projectId, param]
    ),
    setParam
  ] as const
}

export const useTasksQueryKey = () => {
  const [tasksSearchParams] = useTasksSearchParams()
  return ['tasks', tasksSearchParams]
}
