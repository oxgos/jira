import { Menu } from 'antd'
import styled from '@emotion/styled'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from 'screens/epic/epic'
import { KanbanScreen } from 'screens/kanban'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

const ProjectScreen = () => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            {/* to的地址加上'/'，就变成根路由了 */}
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />} />
          <Route path={'/epic'} element={<EpicScreen />} />
          {/* replace=true 解决返回不了问题，NOTE: 不再是push进栈，而是replace了原先跳转的路径 */}
          <Navigate to={window.location.pathname + '/kanban'} replace={true} />
        </Routes>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`

export default ProjectScreen
