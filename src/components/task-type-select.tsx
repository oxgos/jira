import React from 'react'
import { IdSelect } from './id-select'
import { useTaskTypes } from 'hooks/task-type'

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props} />
}
