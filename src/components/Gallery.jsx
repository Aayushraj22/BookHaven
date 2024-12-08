import React from 'react'
import Bookcard from './Bookcard'
import BookcardSkeleton from './BookcardSkeleton'



function Gallery({
  books,
  title,
  isLoading,
  }) {


  return (
    <>
      <header className='py-4 '>
          <h1 className='pl-4 text-lg sm:text-2xl lg:text-3xl font-semibold font-serif'>{title ?? `Book Gallery`}</h1>
      </header>

      <div className='responsive-grid-layout grid gap-3 p-4 sm:p-10 lg:px-20 xl:px-32 '>
          {isLoading ? (
            [1,2,3,4,5,6,7,8,9,10].map(item => <BookcardSkeleton key={item} />)) : (
              books?.map(book => <Bookcard key={book.id} bookInfo={book} />))
          }
      </div>
    </>
  )
}

export default Gallery