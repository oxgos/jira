import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useProject } from 'hooks/project'
// import { ButtonNoPadding } from './lib'

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { projectButton } = props
  const { data: projects, isLoading } = useProject()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {projectButton}
    </ContentContainer>
  )
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
