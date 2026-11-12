import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import ScrollToTop from './ScrollToTop'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      {useRoutes(routes)}
    </Suspense>
  )
}

export default App
