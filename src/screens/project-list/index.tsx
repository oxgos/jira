import styled from '@emotion/styled'
import { useProject, useUser } from 'hooks/project-hooks'

import List from './list'
import SearchPanel from './search-panel'

const ProjectListScreen = () => {
  const { users } = useUser()
  // 获取项目数据
  const { isLoading, param, setParam, list } = useProject()
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List isLoading={isLoading} list={list || []} users={users || []}></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

export default ProjectListScreen
