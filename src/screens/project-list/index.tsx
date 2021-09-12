import { useState, useEffect } from 'react'
import { useMount, useDebounce } from 'hooks'
import { cleanObject } from 'common/util'

import List from './list'
import SearchPanel from './search-panel'
import { useHttp } from 'common/http'

const ProjectListScreen = () => {
  const client = useHttp()
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 500)
  // 获取负责人数据
  const [users, setUsers] = useState([])
  useMount(() => {
    client(`users`)
      .then(setUsers)
      .catch((e) => {
        alert('error happen')
      })
  })
  // 获取项目数据
  const [list, setList] = useState([])
  useEffect(() => {
    client('projects', {
      data: cleanObject(debounceParam)
    })
      .then(setList)
      .catch((e) => {})
  }, [debounceParam])
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}

export default ProjectListScreen
