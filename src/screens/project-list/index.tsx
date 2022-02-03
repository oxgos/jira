import { Button } from 'antd'
import { ErrorBox, Row, ScreenContainer } from 'components/lib'
import { Profiler } from 'components/profiler'
import { useDebounce, useDocumentTitle } from 'hooks/common'
import { useProjects } from 'hooks/project'
import { useUsers } from 'hooks/user'

import List from './list'
import SearchPanel from './search-panel'
import { useProjectModal, useProjectSearchParams } from './util'

const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  const { open } = useProjectModal()
  const [param, setParam] = useProjectSearchParams()
  // 获取项目数据
  const { isLoading, data: list, error } = useProjects(useDebounce(param, 500))
  const { data: users } = useUsers()

  return (
    <Profiler id={'项目列表'}>
      <ScreenContainer>
        <Row between={true}>
          <h1>项目列表</h1>
          <Button onClick={open}>创建项目</Button>
        </Row>
        <SearchPanel
          users={users || []}
          param={param}
          setParam={setParam}
        ></SearchPanel>
        <ErrorBox error={error} />
        <List
          loading={isLoading}
          dataSource={list || []}
          users={users || []}
        ></List>
      </ScreenContainer>
    </Profiler>
  )
}

ProjectListScreen.whyDidYouRender = false

export default ProjectListScreen
