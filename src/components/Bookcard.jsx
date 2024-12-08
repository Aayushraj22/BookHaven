import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Image from './Image'
import Button from './Button'


function Bookcard({bookInfo}) {
  const {imgurl, name, author, price  } = bookInfo

  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded p-2 hover:shadow'>
        <Image 
            src={imgurl} 
            margin={'mx-auto'}
        />
        <div className='text-xs px-2 mt-2 capitalize'>
            <p className='text-base font-mono '>{name}</p>
            <p className='font-serif' title='Author'>{author}</p>
            <Button 
                bg={'bg-slate-200 dark:bg-slate-800'}
                color={'text-slate-900 dark:text-slate-200'}
                margin={'my-2'}
                hover={'hover:bg-cyan-100 dark:hover:bg-cyan-900'}
            >
                <Link to='/bookDetails' className='h-full w-full grid place-items-center rounded' state={bookInfo}>Read More</Link>
            </Button> 
            <span title='price' className='ml-2'>$ {price}</span>
        </div>
    </div>
  )
}

export default Bookcard