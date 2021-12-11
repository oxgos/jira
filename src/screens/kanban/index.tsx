import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'hooks/common'
import { useKanbans } from 'hooks/kanban'
import { useTasks } from 'hooks/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban.column'
import { SearchPanel } from './search-panel'
import {
  useKanbanSearchParams,
  useProjectInUrl,
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
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {/* NOTE: 记录在笔记: KanbanColumn遍历渲染了3次,useTask只请求了一次，因为react-query的请求缓存优化, 默认2秒以内重复请求归并为一次 */}
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={String(kanban.id)} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
    </ScreenContainer>
  )
}

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
