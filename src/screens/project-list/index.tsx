import { useState, useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useMount, useDebounce } from '../../hooks'
import { cleanObject } from '../../common/util'

import List from './list'
import SearchPanel from './search-panel'

// 环境变量配置Api的base_url
const API_BASE_URL = process.env.REACT_APP_API_URL

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 500)
  // 获取负责人数据
  const [users, setUsers] = useState([])
  useMount(() => {
    axios
      .get(`${API_BASE_URL}/users`)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((e) => {})
  })
  // 获取项目数据
  const [list, setList] = useState([])
  useEffect(() => {
    axios
      .get(
        `${API_BASE_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`
      )
      .then((res) => {
        setList(res.data)
      })
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