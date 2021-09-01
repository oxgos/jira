import { ListProps } from './interface'

const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>项目名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{users.find((user) => user.id === item.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default List
