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
// TODO: 把所有id改为number类型
export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  created: number
}
export interface ListProps extends TableProps<Project> {
  users: User[]
}
