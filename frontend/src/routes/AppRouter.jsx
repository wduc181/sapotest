import { createBrowserRouter, Navigate } from 'react-router-dom'
import FlashSalePage from '../pages/FlashSalePage'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <FlashSalePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default appRouter
