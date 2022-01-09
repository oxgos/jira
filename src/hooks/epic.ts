import { useHttp } from 'common/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Epic } from 'types/epic'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

// 获取列表
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp()
  return useQuery<Epic[]>(['epics', param], () =>
    client('epics', {
      data: param
    })
  )
}

// 新增
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

// 删除
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
