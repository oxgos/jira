import { useHttp } from 'common/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { useAddConfig } from './use-optimistic-options'

// 获取列表
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', {
      data: param
    })
  )
}

// 新增
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}
