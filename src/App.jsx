import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import Auth from './pages/Auth'
import UrlProvider from './context/context'

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
          element: <Dashboard />,
        },
        {
          path: '/link/:id',
          element: <Link />
        },
        {
          path: '/auth',
          element: <Auth />
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
