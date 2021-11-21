import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig
} from './use-optimistic-options'
import { useHttp } from 'common/http'
import { Project } from 'screens/project-list/interface'
import { QueryKey, useMutation, useQuery } from 'react-query'

// 获取列表
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () =>
    client('projects', {
      data: param
    })
  )
}

// 编辑
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}

// 新增
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

// 删除
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

// 获取详情
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      // 如果id不存在，enabled为false,则不请求
      enabled: !!id
    }
  )
}
