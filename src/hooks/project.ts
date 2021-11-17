import { useHttp } from 'common/http'
import { Project } from 'screens/project-list/interface'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    {
      // 当第一参数成功后执行,把key为projects的缓存清除
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

// 新增
export const useAddProject = () => {
  const client = useHttp()
  const QueryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => QueryClient.invalidateQueries('projects')
    }
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
