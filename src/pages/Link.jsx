import React from 'react'
import { UrlState } from '@/context/context'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners'
import { useEffect } from 'react'
import useFetch from '@/hooks/use-fetch'
import { getUrl, deleteUrl } from '@/db/apiUrl'
import { getClicksForUrl } from '@/db/apiClick'
import { LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Copy, Download, Trash } from 'lucide-react'
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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
    return <div className="text-red-500">{error.message}</div>;
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
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex mx-24 flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
          <a href={`https://shortly/${link}`} className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer" target="_blank">https://shortly/{link}</a>
          <a href={`${url?.original_url}`} className="flex items-center gap-1 hover:underline cursor-pointer" target="_blank">
            <LinkIcon className="p-1" />
            {url?.original_url}</a>
          <span className="flex items-end font-light text-sm">{new Date(url?.created_at).toLocaleString()}</span>
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
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-96 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className='font-bold text-3xl'>Stats</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent>
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-xl'>{stats?.length || 0}</p>
              </CardContent>
            </Card>

            <CardTitle>
              Location Data
            </CardTitle>
            <CardTitle>
              Device Info
            </CardTitle>

            {/* If no Clicks */}
          </CardContent>
          ) : (
            <CardContent>
              {!loading ? "No Stats Yet" : "Loading"}
            </CardContent>
          )}
          
        </Card>
      </div>
    </>
  )
}

export default Link
