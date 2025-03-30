import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Copy, Delete, Download, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { deleteUrl } from '@/db/apiUrl';
import { BeatLoader } from 'react-spinners';
import useFetch from '@/hooks/use-fetch';

function LinkCard({ url, fetchUrls }) {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title || 'downloaded-image';
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const anchor = document.createElement("a");

                anchor.href = blobUrl;
                anchor.download = fileName;

                document.body.appendChild(anchor);

                anchor.click();

                document.body.removeChild(anchor);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };

    const link = url?.custom_url ? url?.custom_url : url?.short_url
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
                        <a href={link}>https://linkleap.netlify.app/{link}</a>
                    </p>
                    <p className='mt-2 text-nowrap'>
                        Original Url: <span className='cursor-pointer ml-2 text-blue-500 hover:underline'><a href={url?.original_url}>{url?.original_url}</a></span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col items-end gap-4 mr-4'>
                    <div className='flex items-center'>
                        <Button onClick={downloadImage} className='scale-90' variant='ghost'><Download /></Button>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(`${url?.short_url}`)
                            toast("Copied")
                        }} className='scale-90' variant='ghost'><Copy /></Button>
                        <Button onClick={() => (delFn().then(() => fetchUrls()))} className='scale-90' variant='ghost'>
                            {delLoad ? <BeatLoader size={5} color='white' /> : <Trash />}
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

