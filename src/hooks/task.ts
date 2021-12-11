import { useHttp } from 'common/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { useAddConfig } from './use-optimistic-options'

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
