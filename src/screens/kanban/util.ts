import { useDebounce } from './../../hooks/common'
import { useTask } from './../../hooks/task'
import { useProject } from './../../hooks/project'
import { useLocation } from 'react-router'
import { useUrlQueryParam } from 'hooks/url'
import { useCallback, useMemo } from 'react'

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
  const debounceName = useDebounce(param.name, 200)
  return [
    useMemo(
      () => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: debounceName
      }),
      [projectId, param, debounceName]
    ),
    setParam
  ] as const
}

export const useTasksQueryKey = () => {
  const [tasksSearchParams] = useTasksSearchParams()
  return ['tasks', tasksSearchParams]
}

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId'
  ])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
