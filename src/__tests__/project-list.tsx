// 请求测试
import { render, screen, waitFor } from '@testing-library/react'
import { AppProviders } from 'context'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { ReactNode } from 'react'
import ProjectListScreen from 'screens/project-list'
import fakeData from './db.json'

const apiUrl = process.env.REACT_APP_API_URL

// 模拟页面请求，mock数据
const server = setupServer(
  rest.get(`${apiUrl}/me `, (req, res, ctx) =>
    res(
      ctx.json({
        id: 1,
        name: 'jack',
        token: '123'
      })
    )
  ),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = '', personId = undefined } = Object.fromEntries(
      req.url.searchParams
    )
    const result = fakeData.projects.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      )
    })
    return res(ctx.json(result))
  })
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// 用来等待页面渲染完毕，未渲染完首先会出现loading，而不是列表
const waitTable = () =>
  waitFor(() => expect(screen.getByText('骑手管理')).toBeInTheDocument())

test('项目列表展示正常', async () => {
  renderScreen(<ProjectListScreen />, { route: '/projects' })
  await waitTable()
  expect(screen.getAllByRole('row').length).toBe(fakeData.projects.length + 1)
})

test('搜索项目', async () => {
  renderScreen(<ProjectListScreen />, { route: '/projects?name=骑手' })
  await waitTable()
  expect(screen.getAllByRole('row').length).toBe(2)
  expect(screen.getByText('骑手管理')).toBeInTheDocument()
})

// 因为页面有使用context，所以需要提示相应的provider
export const renderScreen = (ui: ReactNode, { route = '/projects' } = {}) => {
  // 模拟路由
  window.history.pushState({}, 'Test Page', route)
  return render(<AppProviders>{ui}</AppProviders>)
}
