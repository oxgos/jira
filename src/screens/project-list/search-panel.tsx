import { SearchPanelProps } from './interface'

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form action=''>
      <input
        type='text'
        placeholder='项目名'
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <select
        value={param.personId}
        onChange={(e) => setParam({ ...param, personId: e.target.value })}
      >
        <option value=''>{'负责人'}</option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  )
}

export default SearchPanel
