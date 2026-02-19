import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from '../features/auth/AuthPage' 
//import { PublicLayout } from '../layouts/PublicLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { ClientPage } from '../features/client/ClientPage'
import { AgentPage } from '../features/agent/ClientPage'
import { ProcessPage } from '../features/process/processPage'

export const router = createBrowserRouter([
  {
    element: < AuthLayout />,
    children: [
      { path: '/login', element: <AuthPage /> }
    ]
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: '/', element: <div> holamundo</div> },
      { path: '/process',  element: <ProcessPage /> },
      { path: '/agent', element: <AgentPage /> },
      { path: '/clients', element: <ClientPage/> }
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