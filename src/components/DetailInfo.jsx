import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import Image from './Image'
import { useDispatch } from 'react-redux'
import { addWish } from '../redux/slices/WishlistSlice'
import { readLocalStorage } from '../utility'

function DetailInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const obj = location.state
  const [book, setBook] = useState({})
  const {authors, name, ratings, price, publishedAt, imgurl, description, _id} = book;

  function handleClickButton(usedFor){
    if(usedFor === 'wish') {
      
      // user must be signed-in to add into wish
      if(!readLocalStorage('uid')) {
        navigate('/login')
        return;
      }

      dispatch(addWish(_id))
      
    } else {
      navigate('/purchase', {state: {
        book,
        pType: usedFor,
      }})
    }
  }


  useEffect(() => {
    setBook(obj)
  }, [obj])




  return (
    <>
    <div className='p-2 dark:bg-stone-950 dark:text-stone-300 min-h-dvh px-4'>
      <div className='bg-blue-400 dark:bg-blue-800 p-2 rounded text-xs flex gap-1 items-center'>
        <span className='flex-1'>Price: $ {price}</span>
        <Button height='h-6' width='w-6' bg='bg-stone-200 dark:bg-stone-950 hover:bg-yellow-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('wish')}>+</Button>
        <Button height='h-8' width='w-12' bg='bg-stone-200 dark:bg-stone-950 hover:bg-green-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('buy')}>Buy</Button>
        <Button height='h-8' width='w-12' bg='bg-stone-200 dark:bg-stone-950 hover:bg-pink-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('rent')}>Rent</Button>
      </div>
      <h1 className='text-3xl capitalize font-semibold text-center my-2 text-stone-800 dark:text-stone-400'>{name}</h1>

      <div className='flex p-2 px-4 '>
        <Image src={imgurl} alt={name} height='h-80' width='w-3/5' />
        <div className='flex flex-col  lg:text-sm w-2/5 justify-center gap-1  capitalize text-sm'>
          <p>Author: <span className=' font-semibold text-stone-900 dark:text-stone-400'>{authors?.map(author => <Link key={author._id} to={`/author/${author?._id}`} className='hover:text-blue-400'>{author?.name}</Link>)}</span></p>
          <p>Published at: <span className=' font-semibold text-stone-900 dark:text-stone-400'>{publishedAt}</span></p>
          <p>Ratings: <span className=' font-semibold text-stone-900 dark:text-stone-400'>{ratings && Object.keys(ratings).length ? Object.keys(ratings).length  : 'not rated'}</span></p>
        </div>
      </div>

      <div className='p-2'>
        <h1 className='text-semibold text-stone-800 dark:text-stone-500'>Description</h1>
        <p className='text-xs text-stone-700 dark:text-stone-300'>{description}</p>
      </div>
    </div>
    </>
  )
}

export default DetailInfo