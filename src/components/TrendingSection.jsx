import React, { useEffect, useState } from 'react'
import Bookcard from './Bookcard'
import { fetchData } from '../utility'
import BookcardSkeleton from './BookcardSkeleton'
import { useNavigate } from 'react-router-dom'

function TrendingSection({title, featuring}) {
    const [books, setBooks] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
  
        const endpoint = `books/top5/${featuring}`

        fetchData(endpoint, navigate)
        .then(list => {
            if(list) {
                Promise.all(list?.map(item => fetchData(`books/${item.bookId}`)))
                .then(data => setBooks(data))
            }

        })
       
    }, [])
    
  return (
    <section>
        <header className='py-4 bg-slate-100 dark:bg-slate-950'>
            <h1 className='pl-4 lg:pl-16 text-lg sm:text-xl lg:text-3xl font-semibold text-stone-700 dark:text-slate-400 capitalize'>{title}</h1>
        </header>

        <div className='responsive-grid-layout grid gap-3 p-4 sm:p-10 lg:px-20 xl:px-32'>
            {books ? (books?.map(book => <Bookcard key={ book?.id} bookInfo={book} />)) : (
                [1,2,3,4,5].map(item => <BookcardSkeleton key={item} />)
            )}
        </div>
    </section>
  )
}

export default TrendingSection