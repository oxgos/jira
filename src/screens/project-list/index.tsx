import styled from '@emotion/styled'
import { Typography } from 'antd'
import { ButtonNoPadding, Row } from 'components/lib'
import { useDebounce, useDocumentTitle } from 'hooks/common'
import { useProject } from 'hooks/project'
import { useUsers } from 'hooks/user'
import { useDispatch } from 'react-redux'

import List from './list'
import { projectListActions } from './project-list.slice'
import SearchPanel from './search-panel'
import { useProjectSearchParam } from './util'

const ProjectListScreen = () => {
  const dispatch = useDispatch()

  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParam()
  // 获取项目数据
  const {
    isLoading,
    data: list,
    retry,
    error
  } = useProject(useDebounce(param, 500))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type={'link'}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        retry={retry}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`

export default ProjectListScreen
