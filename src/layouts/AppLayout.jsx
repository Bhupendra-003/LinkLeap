import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"

function AppLayout() {
    return (
        <div className='flex flex-col w-full' >
            <main className='min-h-screen w-full'>
                <Header />
                <Outlet />
                <Toaster />
            </main>
        </div>
    )
}

export default AppLayout
