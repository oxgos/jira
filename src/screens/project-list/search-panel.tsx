import { SearchPanelProps } from './interface'
import { Form, Input, Select } from 'antd'

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form>
      <Input
        type='text'
        placeholder='项目名'
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <Select
        value={param.personId}
        onChange={(value) => setParam({ ...param, personId: value })}
      >
        <Select.Option value=''>{'负责人'}</Select.Option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
    </Form>
  )
}

export default SearchPanel
