import React, { useEffect, useState } from 'react'
import { fetchData } from '../utility'
import { useParams } from 'react-router-dom'
import Image from '../components/Image'
import Gallery from '../components/Gallery'
import TextKV from '../utility/components/TextKV'
import Fallback from '../utility/components/Fallback'

function AuthorPage() {
  // get id from the route as a query parameter
  const { id } = useParams()
  const [authorInfo, setAuthorInfo] = useState({})
  const [isloading, setIsloading] = useState(false)
  
  const year = authorInfo?.age ? authorInfo?.age.split('-') : []

  useEffect(() => {
    setIsloading(true)

    const endpoint = `author/${id}`
    fetchData(endpoint).then(data => {
      if(data) {
        setAuthorInfo(data)
      }
    }).finally(() => {
      setIsloading(false)
    })
  }, [id])

  if(isloading){
    return <Fallback loader={'colorRing'} />
  }

    
  return (
    <main className='w-full h-full dark:bg-black dark:text-stone-300 p-2 py-3 '>
      <header className='flex flex-col md:flex-row gap-4 md:px-16 md:py-2'>
        <div className='flex-1 w-full flex flex-col items-center p-2 gap-2 max-md:items-start max-sm:items-center border rounded-lg dark:border-slate-800'>
          <Image src={authorInfo?.imgurl} alt={authorInfo?.name} width={'w-[280px]'} height={'h-[280px]'} round={'rounded-lg'} />
          <p className='capitalize md:text-lg'>{authorInfo?.name}</p>
        </div>
        <div className='flex-1 p-2 w-full'>
          <TextKV name={'nationality'} value={authorInfo?.nationality} />
          {authorInfo?.bio ? <TextKV name={'bio'} value={authorInfo?.bio} /> : ''}
          <TextKV name={'born at'} value={year[0]} />
          {year.length > 1 ? <TextKV name={'died at'} value={year[1]} /> : ''}
          <TextKV name={'age'} value={'will computed later'} />
          <TextKV name={'available books'} value={authorInfo?.booksWritten?.length} />
        </div>
      </header>
      <Gallery data={authorInfo?.booksWritten} title={`available books written by ${authorInfo?.name}`} />
    </main>
  )
}

export default AuthorPage