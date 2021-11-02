import { Button, Drawer } from 'antd'

export const ProjectModal = (props: {
  projectModalOpen: boolean
  onClose: () => void
}) => {
  const { projectModalOpen, onClose } = props
  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={'100%'}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  )
}
