import { ListProps } from './interface'
import { Dropdown, Table, Menu } from 'antd'
import dayjs from 'dayjs'
// react-router和react-router-dom的关系，类似于react和react-dom/react-native/react-vr的关系
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'hooks/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from './util'

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const { startEdit } = useProjectModal()
  // 柯里化: point free风格
  const pinProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin })
  }
  const editProject = (id: number) => () => startEdit(id)

  return (
    <Table
      {...props}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          dataIndex: 'collect',
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          }
        },
        {
          title: '项目名称',
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare可以将中文字符排序
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            )
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          }
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>
                      <ButtonNoPadding
                        onClick={editProject(project.id)}
                        type={'link'}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      rowKey={(record) => record.id} // 解决: Warning: Each child in a list should have a unique "key" prop
    />
  )
}

export default List
