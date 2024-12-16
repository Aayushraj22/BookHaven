import React from 'react'
import Gallery from '../components/Gallery'
import { useSlice } from '../redux/utility'

function WishlistPage() {
  const [slice, dispatch] = useSlice('wish')
  const {wishlist, total} = slice
  
  return (
    <main className='dark:bg-black dark:text-white min-h-dvh'>
       <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-500 dark:text-yellow-900 float-right mt-4 mr-2">
        {total} Items in wishlist
      </span>
      <Gallery books={wishlist} title={'my wishlist'} usedFor='wish' />
    </main>
  )
}

export default WishlistPage