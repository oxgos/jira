import { TableProps } from 'antd'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}
export interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}
export interface Project {
  id: number
  name: string
  personId: string
  organization: string
  created: number
}
export interface ListProps extends TableProps<Project> {
  users: User[]
}
