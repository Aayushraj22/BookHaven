import React from 'react'
import Bookcard from './Bookcard'
import BookcardSkeleton from './BookcardSkeleton'



function Gallery({
  books,
  title,
  isLoading,
  items,
  usedFor
  }) {

  return (
    <>
      <header className='py-4 border dark:border-slate-800 rounded-sm'>
          <p className='pl-2 md:pl-10 text-lg sm:text-2xl lg:text-3xl font-semibold font-serif capitalize '>{title ?? `Book Gallery`}</p>
      </header>

      <div className='responsive-grid-layout grid gap-3 p-4 sm:p-10 lg:px-10 xl:px-32 '>
          {isLoading ? (
            new Array(items).fill().map((_, i) => i+1).map(item => <BookcardSkeleton key={item} />)) : (
              books?.length ? books?.map(book => <Bookcard key={book.id} bookInfo={book} usedFor={usedFor} />) : <div>No Book</div>)
          }
      </div>
    </>
  )
}

export default Gallery