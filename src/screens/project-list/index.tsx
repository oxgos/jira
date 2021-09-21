import styled from '@emotion/styled'
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
  }, [debounceParam]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

export default ProjectListScreen
