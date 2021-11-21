import { useHttp } from 'common/http'
import { Project } from 'screens/project-list/interface'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectSearchParams } from 'screens/project-list/util'

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
  const [searchParams] = useProjectSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    {
      // 当第一参数成功后执行,把key为projects的缓存清除
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // targe为最终更新后的数据, previousItems是当前数据
      async onMutate(target) {
        // 当前数据
        const previousItems = queryClient.getQueryData(queryKey)
        // old: project[]报错project[] | undefined 不能assignable给project[], 解决: 可选并return返回空数组
        // 查找当前缓存数据并更新为target最终数据作为展现
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          )
        })
        // 作用将当前数据传给onError
        return { previousItems }
      },
      onError(error, newItem, context) {
        // 这里context的内容: 就是onMutate里return的内容
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        )
      }
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
