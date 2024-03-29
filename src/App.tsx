import { useAuth } from 'context/auth-context'
import './App.css'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import React from 'react'

const AuthenticatedApp = React.lazy(() => import('authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'))

function App() {
  const { user } = useAuth()
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
