import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link2, LogOut } from 'lucide-react'
import { UrlState } from '@/context/context'
import { logout } from '@/db/apiAuth'
import useFetch from '@/hooks/use-fetch'
import { CircleLoader } from 'react-spinners'


const Header = () => {
   const navigate = useNavigate();
   const { user, fetchUser } = UrlState()
   console.log("user:", user);

   const { loading, error, fn: fnLogout } = useFetch(logout)


   return (
      <nav className='w-full flex gap-8 justify-between items-center px-12 pr-24 py-4'>
         <Link to='/'>
            <div className='flex gap-8 items-center'>
               <svg className='w-16 h-16'>
                  <image className='w-16 h-16' href="/logo.svg" alt="Logo" />
               </svg>
               <h1 className='text-2xl font-bold'>SHORTLY</h1>
            </div>
         </Link>
         <div>
            {!user ? <Button onClick={() => navigate('/auth')} className='rounded'>Login</Button>
               : <DropdownMenu>
                  <DropdownMenuTrigger>
                     <Avatar className='w-10 h-10'>
                        <AvatarImage src={""} />
                        <AvatarFallback>{user?.user_metadata?.name[0]}</AvatarFallback>
                     </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem><span><Link2 color='white' /></span>Links</DropdownMenuItem>
                     <DropdownMenuItem onClick={
                        () => {
                           fnLogout().then(() => {
                              fetchUser()
                              navigate('/')
                           })
                        }
                     } className='text-red-400'><span><LogOut color='white' /></span>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                  {loading ? <CircleLoader /> : null}
               </DropdownMenu>
               

            }
         </div>
      </nav>
   )
}

export default Header
