// 组件测试
import { render, screen } from '@testing-library/react'
import { Mark } from 'components/mark'

test('Mark 组件正确高亮关键词', () => {
  const name = '物料管理'
  const keyword = '管理'

  render(<Mark name={name} keyword={keyword} />)

  // getByText:找到关键词的dom元素，toBeInTheDocument判断是否被渲染了
  expect(screen.getByText(keyword)).toBeInTheDocument()
  // 证明关键词的颜色是 #257AFD
  expect(screen.getByText(keyword)).toHaveStyle('color: #257AFD')
  expect(screen.getByText('物料')).not.toHaveStyle('color: #257AFD')
})
