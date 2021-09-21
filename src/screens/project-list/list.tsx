import { ListProps } from './interface'
import { Table } from 'antd'
import dayjs from 'dayjs'

const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '项目名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name) // localeCompare可以将中文字符排序
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
        }
      ]}
      dataSource={list}
      rowKey={(record) => record.id} // 解决: Warning: Each child in a list should have a unique "key" prop
    />
  )
}

export default List
