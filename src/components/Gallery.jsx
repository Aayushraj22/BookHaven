import React from 'react'
import Bookcard from './Bookcard'
import BookcardSkeleton from './BookcardSkeleton'
import AuthorCard from './AuthorCard'



function Gallery({
  data,
  title,
  isLoading,
  items,
  usedFor,
  category='books'
  }) {

  return (
    <>
      {title ? (
        <header className='py-4 border dark:border-slate-800 rounded-sm'>
          <p className='pl-2 md:pl-10 text-lg sm:text-2xl lg:text-3xl font-semibold font-serif capitalize '>{title}</p>
        </header>) : 
        ''
      }
      
      <div className='responsive-grid-layout grid gap-3 p-4 sm:p-10 lg:px-10 xl:px-32 '>
          {isLoading ? 
            (
              new Array(items).fill().map((_, i) => i+1).map(item => <BookcardSkeleton key={item} />)
            ) : 
            (
              data ? data?.map(item => (
                category === 'books' ? 
                  <Bookcard key={item._id} bookInfo={item} usedFor={usedFor} /> : 
                  <AuthorCard key={item._id} info={item} />
              )) : 
              <p>Nothing to Show</p>
            )
          }
      </div>
    </>
  )
}

export default Gallery