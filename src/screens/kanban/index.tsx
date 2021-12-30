import styled from '@emotion/styled'
import { Spin } from 'antd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'hooks/common'
import { useKanbans, useReorderKanban } from 'hooks/kanban'
import { useReorderTask, useTasks } from 'hooks/task'
import { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban.column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams
} from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  )
  const [tasksSearchParams] = useTasksSearchParams()
  const { isLoading: taskIsLoading } = useTasks(tasksSearchParams)
  const isLoading = taskIsLoading || kanbanIsLoading

  const onDragEnd = useDragEnd()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {/* NOTE: 记录在笔记: KanbanColumn遍历渲染了3次,useTask只请求了一次，因为react-query的请求缓存优化, 默认2秒以内重复请求归并为一次 */}
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <ColumnContainer>
            <Drop
              type={'COLUMN'}
              direction={'horizontal'}
              droppableId={'kanban'}
            >
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={String(kanban.id)}
                    draggableId={'kanban' + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={String(kanban.id)} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())

  const [tasksSearchParams] = useTasksSearchParams()
  const { data: allTasks = [] } = useTasks(tasksSearchParams)
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return

      // 看板排序
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) return

        const type = destination.index > source.index ? 'after' : 'before'

        reorderKanban({ fromId, referenceId: toId, type })
      }
      // 任务排序
      if (type === 'ROW') {
        debugger
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        // if (fromKanbanId === toKanbanId) return

        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index]
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ]

        if (fromTask?.id === toTask?.id) return

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? 'after'
              : 'before'
        })
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  )
}

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
