import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { UrlState } from '@/context/context';

function Auth() {

  const [searchParams] = useSearchParams();
  const longlink = searchParams.get('createNew')
  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState()
  useEffect(() => {
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longlink?`createNew=${longlink}` : ""}`);
    }
  }, [isAuthenticated, loading])

  return (
    <div className='mt-24 flex flex-col items-center'>
      <div className='text-4xl font-bold'>
        <h2>{longlink ? 'Hold up, Lets Know each other' : 'Login/Signup'}</h2>
      </div>
      <Tabs defaultValue="account" className={'w-100 h-100 mt-12'}>
        <TabsList className={'grid grid-cols-2 w-full'}>
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Login /></TabsContent>
        <TabsContent value="password"><Signup /></TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth
