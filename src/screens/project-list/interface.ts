import { TableProps } from 'antd'
import { Project } from '../../types/project'
import { User } from '../../types/user'

export interface SearchPanelProps {
  users: User[]
  // 因为接收的param，personId有可能是undefined，所以添加Partial可选
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export interface ListProps extends TableProps<Project> {
  users: User[]
}
