import { TableProps } from 'antd'

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
export interface SearchPanelProps {
  users: User[]
  // 因为接收的param，personId有可能是undefined，所以添加Partial可选
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}
export interface ListProps extends TableProps<Project> {
  users: User[]
  retry: () => void
  setProjectModalOpen: (isOpen: boolean) => void
}
