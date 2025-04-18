import React from 'react'
import Button from './Button'
import Image from './Image'
import { Link } from 'react-router-dom'

function AuthorCard({info}) {
    const {imgurl, age, name, gender, nationality, _id} = info

  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded p-2 hover:shadow'>
        <Image 
            src={imgurl} 
            margin={'mx-auto'}
        />
        <div className='text-xs px-2 mt-2 capitalize'>
            <p className='text-base font-mono '>{name}</p>
            {/* <p className='font-serif' title='Author'>{authors?.[0]?.name}</p> */}
            <Button 
                bg={'bg-slate-200 dark:bg-slate-800'}
                color={'text-slate-900 dark:text-slate-200'}
                margin={'my-2'}
                hover={'hover:bg-cyan-100 dark:hover:bg-cyan-900'}
            >
                <Link to={`/author/${_id}`} className='h-full w-full grid place-items-center rounded' state={info}>Read More</Link>
            </Button> 
            {/* <span title='price' className='ml-2 select-none'>$ {price}</span> */}
            {/* <div className='float-right inline-block my-2 py-1'>
                {usedFor === 'purchased-books' ? (
                    <label 
                        className='bg-stone-100 dark:bg-stone-900 text-slate-900 dark:text-slate-100 rounded-sm p-1'
                    >
                        <input 
                            type='number' 
                            title='rate me' 
                            min={0} 
                            max={5}
                            placeholder={bookRating || 5}
                            className='bg-transparent w-8 h-8 border-none outline-none'

                            onKeyDown={handleRateBook}
                        />
                        ⭐
                    </label>) : (<>
                    {bookRating ? (
                        <Button 
                            width={'w-12'} 
                            height={'h-6'} 
                            bg={'bg-stone-50 dark:bg-stone-950'} 
                            color={'dark:text-stone-200'}
                            hover={'cursor-default'}
                        >
                            {bookRating} ⭐
                        </Button>) : ''
                    }
                    <Button 
                        height='h-6' 
                        width='w-6' 
                        bg={`${isWished ? 'bg-yellow-300 dark:bg-yellow-700' : 'bg-stone-200 dark:bg-stone-950 hover:bg-yellow-500'}  `} 
                        color='dark:text-stone-200' 
                        margin={'ml-2'}
                        clickMethod={isWished ? undefined : handleClickButton}
                    >
                        +
                    </Button>
                    {usedFor === 'wish' ? 
                        (<Button 
                            height='h-6' 
                            width='w-6' 
                            bg='bg-red-200 dark:bg-red-700 hover:bg-red-500' 
                            color='dark:text-stone-200' 
                            margin={'ml-1'} 
                            clickMethod={() => handleClickButton('delete')}
                            >
                            -
                        </Button>) : ''
                    }</>)
                }
            </div> */}
        </div>
        
       
        

    </div>
  )
}

export default AuthorCard