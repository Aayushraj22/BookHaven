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
    <div className='p-2 dark:bg-black dark:text-stone-300 h-full px-4 select-none'>
      <div 
        className='flex flex-col md:flex-row max-sm:gap-2 gap-4 md:px-16 py-2 md:py-6'
      >
        <div 
          className='flex-1 w-full flex flex-col items-center p-2 gap-2 max-md:items-start max-sm:items-center border rounded-lg dark:border-slate-800 relative'
        >
          <Image 
            src={imgurl} 
            alt={name} 
            width={'w-[280px]'} 
            height={'h-[280px]'} 
            round={'rounded-lg'} 
          />
          <p 
            className='absolute rounded-lg w-8 h-8 right-0 bottom-0 grid place-items-center bg-stone-200 dark:bg-stone-950 hover:bg-yellow-500 dark:text-stone-200 hover:text-white cursor-pointer'
            onClick={() => handleClickButton('wish')}
            title='add in wishlist'
          >
            +
          </p>
        </div>
        <div 
          className='flex-1 p-2 w-full'
        >
          <p className='text-xl md:text-3xl capitalize max-sm:text-center font-semibold my-5 text-stone-800 dark:text-stone-400'>{name}</p>
          <TextKV name={'authors'} value={authors?.map(author => <Link key={author._id} to={`/author/${author?._id}`} className='text-blue-500  hover:text-blue-600 px-2 py-1 text-xs'>{author?.name}</Link>)} />
          <TextKV name={'published At'} value={publishedAt} />
          <TextKV name={'ratings'} value={ratings && Object.keys(ratings).length ? Object.keys(ratings).length  : 'not rated'} />
          <span className='text-xs capitalize md:text-sm'>price : <span className='text-xs'>$ {price}</span></span>
          <div className=' mt-4 rounded text-xs gap-2 flex items-center w-fit '>
            <Button 
              height='h-8' 
              width='w-16' 
              bg='bg-emerald-400 dark:bg-emerald-700' 
              color='text-emerald-800 dark:text-emerald-400'
              text={'font-semibold'}
              clickMethod={() => handleClickButton('buy')}
            >
              Buy
            </Button>
            <Button 
              height='h-8' 
              width='w-16' 
              bg='bg-stone-200 dark:bg-slate-950' 
              color='dark:text-stone-200 '
              hover={'hover:bg-slate-500 hover:text-slate-200'} 
              clickMethod={() => handleClickButton('rent')}
            >
              Rent
            </Button>
        </div>
        </div>
      </div>

      <div className='p-2 md:py-6'>
        <h1 className='text-semibold text-stone-800 dark:text-stone-500'>Description</h1>
        <p className='text-xs text-stone-700 dark:text-stone-300'>{description}</p>
      </div>
    </div>
    </>
  )
}

export default DetailInfo