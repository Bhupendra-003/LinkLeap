import React from 'react'
import { UrlState } from '@/context/context'
import { useParams, useNavigate } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners'
import { useEffect } from 'react'
import useFetch from '@/hooks/use-fetch'
import { getUrl, deleteUrl } from '@/db/apiUrl'
import { getClicksForUrl } from '@/db/apiClick'
import { LinkIcon, Copy, Download, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Location from '@/components/location-stats'
import Device from '@/components/device-stats'

function Link() {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);
  
  if (error) {
    return <div className="text-red-500 p-4">{error.message}</div>;
  }

  let link = url?.custom_url ? url?.custom_url : url?.short_url;

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - URL info */}
        <div className="flex flex-col items-start gap-4 w-full lg:w-2/5">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold hover:underline cursor-pointer break-words">
            {url?.title}
          </h1>
          
          <a 
            href={`https://shortly.netlify.app/${link}`} 
            className="text-xl sm:text-2xl md:text-3xl text-blue-400 font-bold hover:underline cursor-pointer break-all" 
            target="_blank"
          >
            https://shortly.netlify.app/{link}
          </a>
          
          <a 
            href={`${url?.original_url}`} 
            className="flex items-center gap-1 hover:underline cursor-pointer text-sm md:text-base break-all" 
            target="_blank"
          >
            <LinkIcon className="flex-shrink-0 p-1" />
            <span className="break-all">{url?.original_url}</span>
          </a>
          
          <span className="flex items-end font-light text-xs sm:text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`https://trimrr.in/${link}`);
                  toast("Copied to clipboard!");
                } catch (error) {
                  toast("Failed to copy", { variant: "destructive" });
                  console.error("Clipboard error:", error);
                }
              }}
            >
              <Copy />
            </Button>

            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          
          <div className="w-full flex justify-center lg:justify-start">
            <img
              src={url?.qr}
              className="w-full max-w-xs sm:max-w-sm ring ring-blue-500 p-1 object-contain"
              alt="QR code"
            />
          </div>
        </div>

        {/* Right side - Stats */}
        <Card className="w-full lg:w-3/5">
          <CardHeader>
            <CardTitle className="font-bold text-2xl md:text-3xl">Stats</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          
          {stats && stats.length ? (
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg md:text-xl">{stats?.length || 0}</p>
                </CardContent>
              </Card>

              <CardTitle className="my-4 font-bold text-2xl md:text-3xl">
                Location Data
              </CardTitle>
              <CardTitle>
                Location Info
              </CardTitle>
              <CardContent className="my-4">
                <Location stats={stats} /> {/* Displaying Location Graph */}
              </CardContent>
              
              <CardTitle className="my-4 font-bold text-2xl md:text-3xl">
                Device Data
              </CardTitle>
              <CardTitle>
                Device Info
              </CardTitle>
              <CardContent className="my-4">
                <Device stats={stats} /> {/* Displaying Device Graph */}
              </CardContent>
            </CardContent>
          ) : (
            <CardContent>
              {!loading ? "No Stats Yet" : "Loading"}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Link