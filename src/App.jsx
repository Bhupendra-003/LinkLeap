import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import Auth from './pages/Auth'

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

  return <RouterProvider router={router} />
}

export default App
