import { Input } from '@/components/ui/input'
import ModernButton from '@/components/ui/ModernButton'
import React, { useState } from 'react'
import { Faq3Demo } from '@/components/FAQ'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const [longurl, setlongurl] = useState('')
  const navigate = useNavigate();

  const handleShorten = (e) => {
    if(longurl){
      navigate(`/auth?createNew=${longurl}`)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center my-10 sm:my-24 text-4xl sm:text-6xl lg:text-7xl text-white font-extrabold w-full'>
        <h1 className=''>Shrink, Share, Track</h1>
        <h1
          className="mt-4 inline-block font-black bg-clip-text text-transparent bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to top left,#5433FF,#20BDFF,#A5FECB)",
          }}
        >
          Simplify the web!
        </h1>

      </div>
      <form className='w-88 sm:w-148 flex items-center gap-4 sm:gap-8 flex-col sm:flex-row pb-24 sm:pb-48' action="">
        <Input
          value={longurl}
          onChange={(e) => setlongurl(e.target.value)}
          className='w-full p-4 h-12'
          placeholder='Enter your link here'
          type='url'
        />
        <div onClick={handleShorten}>
          <ModernButton value={'Shorten'} />
        </div>
      </form >
      <div className='w-full h-screen overflow-hidden bg-zinc-900'>
        <img className='w-full h-full object-cover' src="banner.png" alt="" />
      </div>
      <div>
        <Faq3Demo />
      </div>
    </div>
  )
}

export default LandingPage
