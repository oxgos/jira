import styled from '@emotion/styled'
import { useDocumentTitle } from 'hooks/common'
import { useKanbans } from 'hooks/kanban'
import { KanbanColumn } from './kanban.column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {/* NOTE: 记录在笔记: KanbanColumn遍历渲染了3次,useTask只请求了一次，因为react-query的请求缓存优化, 默认2秒以内重复请求归并为一次 */}
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
