import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from 'screens/epic/epic'
import { KanbanScreen } from 'screens/kanban'

const ProjectScreen = () => {
  return (
    <div>
      <h1>{'ProjectScreen'}</h1>
      {/* to的地址加上'/'，就变成根路由了 */}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        {/* replace=true 解决返回不了问题，NOTE: 不再是push进栈，而是replace了原先跳转的路径 */}
        <Navigate to={window.location.pathname + '/kanban'} replace={true} />
      </Routes>
    </div>
  )
}

export default ProjectScreen
