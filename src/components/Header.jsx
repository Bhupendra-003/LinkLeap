import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
   return (
      <nav>
         <Link>
            <svg>
               <image className='w-16 h-16' href="/logo.svg" alt="Logo" />
            </svg>
            <Button variant="destructive">Login</Button>
         </Link>
      </nav>
   )
}

export default Header
