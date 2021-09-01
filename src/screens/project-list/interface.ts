export interface User {
  id: number
  name: string
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
  personId: number
  organization: string
  created: number
}
export interface ListProps {
  users: User[]
  list: Project[]
}
