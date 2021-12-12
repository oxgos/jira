import { useHttp } from 'common/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { useAddConfig, useEditConfig } from './use-optimistic-options'

// 获取列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', {
      data: param
    })
  )
}

// 新增
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

// 编辑
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}

// 获取详情
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    // 如果id不存在，enabled为false,则不请求
    enabled: !!id
  })
}
