import { Button, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectListActions,
  selectProjectModalOpen
} from 'screens/project-list/project-list.slice'

export const ProjectModal = () => {
  // 调用project-list.slice.ts
  const dispatch = useDispatch()
  // project-list.slice.ts里的state
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  )
}
