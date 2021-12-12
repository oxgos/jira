import { useProject } from 'hooks/project'
import { useState, useMemo, useCallback } from 'react'
import { useUrlQueryParam } from 'hooks/url'

// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  // 基本类型，可以放到依赖里: 组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
  const [param, setParam] = useUrlQueryParam(keys)
  // 因为在query取得的值都是string,所以这里要把personId转为Number类型
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined
      }),
      [param]
    ),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [searchParams] = useProjectSearchParams()
  return ['projects', searchParams]
}

export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setProjectModalOpen] =
    useUrlQueryParam(['projectCreate', 'editingProjectId'])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )

  const open = useCallback(
    () => setProjectModalOpen({ projectCreate: true }),
    [setProjectModalOpen]
  )

  const close = useCallback(
    () =>
      setProjectModalOpen({
        projectCreate: undefined,
        editingProjectId: undefined
      }),
    [setProjectModalOpen]
  )

  const startEdit = useCallback(
    (id: number) => setProjectModalOpen({ editingProjectId: id }),
    [setProjectModalOpen]
  )

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId), // query的值是字符串
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
