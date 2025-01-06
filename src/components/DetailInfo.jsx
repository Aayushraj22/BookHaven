import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import Image from './Image'
import { useDispatch, useSelector } from 'react-redux'
import { addWish } from '../redux/slices/WishlistSlice'
import TextKV from '../utility/components/TextKV'

function DetailInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const obj = location.state
  const [book, setBook] = useState({})
  const {authors, name, ratings, price, publishedAt, imgurl, description, _id} = book;
  const {status} = useSelector(state => state.auth)

  function handleClickButton(usedFor){
    if(usedFor === 'wish') {
      
      // user must be signed-in to add into wish
      if(!status) {
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
    <div className='p-2 dark:bg-black dark:text-stone-300 h-full px-4'>
      <div className='bg-blue-200 dark:bg-blue-900 p-2 rounded text-xs flex gap-1 items-center'>
        <span className='flex-1'>Price: $ {price}</span>
        <Button height='h-6' width='w-6' bg='bg-stone-200 dark:bg-stone-950 hover:bg-yellow-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('wish')}>+</Button>
        <Button height='h-8' width='w-12' bg='bg-stone-200 dark:bg-stone-950 hover:bg-green-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('buy')}>Buy</Button>
        <Button height='h-8' width='w-12' bg='bg-stone-200 dark:bg-stone-950 hover:bg-pink-500' color='dark:text-stone-200' clickMethod={() => handleClickButton('rent')}>Rent</Button>
      </div>

      <h1 className='text-3xl capitalize font-semibold text-center my-5 text-stone-800 dark:text-stone-400'>{name}</h1>

      <div 
        className='flex flex-col md:flex-row gap-4 md:px-16 md:py-2'
      >
        <div 
          className='flex-1 w-full flex flex-col items-center p-2 gap-2 max-md:items-start max-sm:items-center border rounded-lg dark:border-slate-800'
        >
          <Image 
            src={imgurl} 
            alt={name} 
            width={'w-[280px]'} 
            height={'h-[280px]'} 
            round={'rounded-lg'} 
          />
        </div>
        <div 
          className='flex-1 p-2 w-full'
        >
          <TextKV name={'authors'} value={authors?.map(author => <Link key={author._id} to={`/author/${author?._id}`} className='text-blue-500  hover:text-blue-600'>{author?.name}</Link>)} />
          <TextKV name={'published At'} value={publishedAt} />
          <TextKV name={'ratings'} value={ratings && Object.keys(ratings).length ? Object.keys(ratings).length  : 'not rated'} />
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