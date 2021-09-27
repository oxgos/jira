import React, { ReactElement } from 'react'

type FallbackRender = (props: { error: Error | null }) => ReactElement

// 可使用第三方库: https://github.com/bvaughn/react-error-boundary
// export class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender: FallbackRender}, any> {
// 省略children，更加通用的写法， PropsWithChildren是React Utility Types
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null
  }

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
