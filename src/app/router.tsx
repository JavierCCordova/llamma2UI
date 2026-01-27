import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from '../features/auth/AuthPage' 
import { PublicLayout } from '../layouts/PublicLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/login', element: <AuthPage /> }
    ]
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: '/', element: <div>Dashboard</div> }
    ]
  }
  //,
  //{
  //  element: <PrivateLayout />,
  //  children: [
  //    { path: '/', element: <DashboardPage /> }
  //  ]
  //}
])