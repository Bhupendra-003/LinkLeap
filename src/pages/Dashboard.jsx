import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import Error from '../components/error';
import { UrlState } from '@/context/context'
import useFetch from '@/hooks/use-fetch'
import { getUrls } from '@/db/apiUrl'
import { getCLick } from '@/db/apiClick'
import LinkCard from '@/components/link-card'

function Dashboard() {

  const [searchQuery, setSearchQuery] = useState('')
  const { user } = UrlState()
  console.log("User in Dashboard: ", user)
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id)

  const { loading: loadingClick, data: clicks, fn: fnClicks } = useFetch(
    getCLick,
    urls?.map((url) => url.id)
  )
  // useEffect(()) 
  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrl = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase())
  })
  return (
    <div className='flex flex-col gap-4 px-16'>
      <div className='h-2'>
        {loading || loadingClick && <BarLoader width={'100%'} color='#5433FF' />}
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl'>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className='flex items-center mt-8 justify-between'>
        <h2 className='text-3xl font-extrabold'>My Links</h2>
        <Button>Create</Button>
      </div>
      <div className='relative'>
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={'h-10 border-1 border-gray-700'} placeholder="Search your links here"></Input>
        <div className='absolute top-2 right-2 p-1'><Filter size={18} /></div>
        {error && <Error message={error?.message} />}
      </div>
      <div className='mt-8 flex flex-col gap-4'>
        {(filteredUrl || []).map((url, id) => {
          return <LinkCard key={id} url={url} fetchUrls={fnUrls} />
        })}
      </div>
    </div>
  )
}

export default Dashboard
