import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
    return (
        <div>
            <main className='min-h-screen container'>
                <Header />
                <Outlet />
            </main>

            <div className='p-10 text-center bg-gray-400 mt-10'>

            </div>
        </div>
    )
}

export default AppLayout
