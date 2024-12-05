import React from 'react'
import Bookcard from './Bookcard'



function Gallery({
  books,
  title,
  }) {


  return (
    <>
      <header className='py-4 '>
          <h1 className='pl-4 text-lg sm:text-2xl lg:text-3xl font-semibold font-serif'>{title ?? `Book Gallery`}</h1>
      </header>

      <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 sm:p-10 '>
          {books?.map(book => <Bookcard key={book._id || book.id} featuredBook={book} />)}
      </div>
    </>
  )
}

export default Gallery