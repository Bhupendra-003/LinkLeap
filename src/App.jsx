import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import Auth from './pages/Auth'
import UrlProvider from './context/context'
import RedirectLink from './pages/RedirectLink'
import RequireAuth from './components/require-auth'

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/dashboard',
          element: <RequireAuth><Dashboard /></RequireAuth>,
        },
        {
          path: '/link/:id',
          element: <RequireAuth><Link /></RequireAuth>
        },
        {
          path: '/auth',
          element: <Auth />
        },
        {
          path: '/:id',
          element: <RedirectLink />
        }
      ]
    }
  ])

  return  (
  <UrlProvider>
    <RouterProvider router={router} />
  </UrlProvider>
  )
}

export default App
