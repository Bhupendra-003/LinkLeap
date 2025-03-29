import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Copy, Delete, Download, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { deleteUrl } from '@/db/apiUrl';
import { BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';

function LinkCard({ url, fetchUrls}) {
    const downloadImage = () => {

    };

    const { data: delData, loading: delLoad, error: delerror, fn: delFn } = useFetch(deleteUrl, url?.id)
    return (
        <div>
            <div className='w-full h-32 flex gap-8 rounded-lg bg-zinc-900 p-4'> 

                {/* QR Image */}
                <div className='overflow-hidden h-full w-24 p-0.1 bg-white'>
                    <img className='w-full h-full object-cover' src={url?.qr} alt="QR" />
                </div>

                {/* Links */}
                <div className='flex-1'>
                    <p className='text-2xl cursor-default font-bold'>{url.title}</p>
                    <p className='mt-2 text-blue-300 font-bold cursor-pointer text-xl hover:underline'>
                        <a href={url?.custom_url ? url?.custom_url : url?.short_url}>https://shortly.in/{url?.custom_url ? url?.custom_url : url?.short_url}</a>
                    </p>
                    <p className='mt-2 text-nowrap'>
                        Original Url: <span className='cursor-pointer ml-2 text-blue-500 hover:underline'><a href={url?.original_url}>{url?.original_url}</a></span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col items-end gap-4 mr-4'>
                    <div className='flex items-center'>
                        <Button className='scale-90' variant='ghost'><Download /></Button>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(`${url?.short_url}`)
                            toast("Copied")
                        }} className='scale-90' variant='ghost'><Copy /></Button>
                        <Button onClick={() => (delFn().then(()=>fetchUrls()))} className='scale-90' variant='ghost'>
                            {delLoad ? <BeatLoader size={5} color='white'/> : <Trash />}
                        </Button>
                    </div>
                    <div>
                        <Link to={`/link/${url?.id}`}><Button>View</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkCard

