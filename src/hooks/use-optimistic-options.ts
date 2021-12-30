import { reorder } from 'common/reorder'
import { QueryKey } from 'react-query'
import { useQueryClient } from 'react-query'
import { Task } from 'types/task'

// 生成react-query的useMutation的config
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient()
  return {
    // 当第一参数成功后执行,把缓存清除
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // targe为最终更新后的数据, previousItems是当前数据
    async onMutate(target: any) {
      // 当前数据
      const previousItems = queryClient.getQueryData(queryKey)
      // 查找当前缓存数据并更新为target最终数据作为展现
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      // 作用将当前数据传给onError
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      // 这里context的内容: 就是onMutate里return的内容
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  )

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []))

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    // 乐观更新task序列中的位置
    const orderedList = reorder({ list: old, ...target }) as Task[]
    // 由于task排序还可能涉及到所属kanban的改变,所以不要忘记改变kanbanId
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    )
  })
