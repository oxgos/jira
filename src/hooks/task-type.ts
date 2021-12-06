import { TaskType } from './../types/task-type'
import { useHttp } from 'common/http'
import { useQuery } from 'react-query'

// 获取列表
export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}
