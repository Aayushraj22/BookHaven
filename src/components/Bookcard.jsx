import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Image from './Image'
import Button from './Button'


function Bookcard({featuredBook}) {
    // console.log('featuring book : ',featuredBook)
    const [book, setBook] = useState({})
    useEffect(() => {
      const url = `${import.meta.env.VITE_DOMAIN_NAME}/books/${featuredBook?.bookId || featuredBook.id}`

      fetch(url).then(response => response.json())
      .then(data => setBook(data))
    }, [])
    
  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded p-2 hover:shadow'>
        <Image 
            src={book?.imgurl} 
            width={'w-10/12'}  
            margin={'mx-auto'}
        />
        <div className='text-xs px-2 mt-2'>
            <p className='text-base'>{book.name}</p>
            <p className='text-xs' title='book author'>by :&ensp;{book.author}</p>
            <Button 
                borderRadius={'border border-blue-800'} 
                margin={'my-1'}

            >
                <Link to='/bookDetails' className='h-full w-full grid place-items-center rounded' state={book} >Read in detail</Link>
            </Button> &nbsp; | &nbsp;
            <span title='price'>{book.price}</span>
        </div>
    </div>
  )
}

export default Bookcard