import React, { useEffect, useState } from 'react'
import Bookcard from './Bookcard'

function TrendingSection({title, featuring}) {
    const [books, setBooks] = useState([])

    useEffect(() => {

        async function fetchData(){
            let data = await fetch(`${import.meta.env.VITE_DOMAIN_NAME}/books/top5/${featuring}`) 
            // console.log(typeof data, ' printing it: ',data)
            data = await data.json()
            setBooks(data);
        }

        // LATER BE DATA WILL BE USED
        fetchData()      
        
    }, [])
    
  return (
    <section>
        <header className='py-4 '>
            <h1 className='pl-4 text-lg sm:text-xl lg:text-2xl font-semibold text-stone-800 dark:text-stone-400 capitalize'>{title}</h1>
        </header>

        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 sm:p-10 '>
            {books?.map(book => <Bookcard key={book.bookId || book.id} featuredBook={book} />)}
        </div>
    </section>
  )
}

export default TrendingSection