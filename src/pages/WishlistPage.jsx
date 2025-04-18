import React from 'react'
import Gallery from '../components/Gallery'
import { useSlice } from '../redux/utility'

function WishlistPage() {
  const [slice, dispatch] = useSlice('wish')
  const {wishlist, total} = slice
  
  return (
    <main className='dark:bg-black dark:text-white min-h-dvh bg-slate-100 rounded-md'>
      { !!total && (<span className="inline-flex items-center rounded-md bg-gradient-to-tr from-cyan-100 to-green-1-00 p-2 text-xs font-medium text-cyan-800 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-400 dark:bg-gradient-to-tr dark:from-cyan-400 dark:to-green-400 dark:text-cyan-950 float-right mt-4 mr-2 select-none capitalize">
       {total} Items in wishlist
      </span>) }
       
      <Gallery data={wishlist} title={'my wishlist'} usedFor='wish' />
    </main>
  )
}

export default WishlistPage