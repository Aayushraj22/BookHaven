import React, { useCallback } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Image from './Image'
import Button from './Button'
import { addWish, deleteWish } from '../redux/slices/WishlistSlice'
import { useSlice } from '../redux/utility'
import { postData, readLocalStorage, toastMsg } from '../utility'
import { FaRegStar, FaStar } from 'react-icons/fa'


function Bookcard({ bookInfo, usedFor='default' }) {
  const {imgurl, name, authors, price, _id, ratings, id } = bookInfo
  const [slice, dispatch] = useSlice('wish')
  const navigate = useNavigate()

  const uid = readLocalStorage('uid')
  const handleClickButton = (btnFor='add') => {
    if(!readLocalStorage('uid')) {
        navigate('/login')
        return;
    }

    if(btnFor === 'delete') {
        dispatch(deleteWish(_id))
    } else {
        dispatch(addWish(bookInfo))
    }
  }

  function verifyIsWished (){
    const value = slice?.wishlist?.find(item => item._id === _id)
    return !!value
  }

  const countRating = () => {
      const obj = {
        rateby: 0,      // no of people rated
        rate: 0,        // avg ratings on scale 5
      }

      const ratingList = Object.keys(ratings)   // list of keys
      obj.rateby = ratingList.length 
      
      if(ratingList.length)
        obj.rate = Math.ceil(ratingList.reduce((total,key) => (total + Number(ratings[key])), 0) / ratingList.length)

      return obj;
    }

  const handleRateBook = async (e) => {
    const value = e.target.value;

    if(e.key === 'Enter' && value) {
        const endpoint = `rates/${bookInfo.id}`
        const data = {
            rated: value
        }
        const response = await postData(endpoint, data, {withCredentials: true})
        toastMsg(response, 'success')
        
    }
  }
  
  const bookRating = countRating()?.rate;
  const isWished = verifyIsWished()

  return (
    <div className='border border-gray-300 dark:border-gray-800 rounded p-2 hover:shadow'>
        <Image 
            src={imgurl} 
            margin={'mx-auto'}
        />
        <div className='text-xs px-2 mt-2 capitalize'>
            <p className='text-base font-mono '>{name}</p>
            <p className='font-serif' title='Author'>{authors?.[0]?.name}</p>
            <Button 
                bg={'bg-slate-200 dark:bg-slate-800'}
                color={'text-slate-900 dark:text-slate-200'}
                margin={'my-2'}
                hover={'hover:bg-cyan-100 dark:hover:bg-cyan-900'}
            >
                <Link to='/bookDetails' className='h-full w-full grid place-items-center rounded' state={bookInfo}>Read More</Link>
            </Button> 
            <span title='price' className='ml-2 select-none'>$ {price}</span>
            <div className='float-right inline-block my-2 py-1 '>
                {usedFor === 'myBooks' ? (
                    <Button
                        display={'inline-block'}
                        width={'w-fit'}
                        height={'h-fit'}
                        padding={'px-2 py-1'}
                        bg={'bg-slate-200 dark:bg-slate-800'}
                        color={'dark:text-slate-200'}
                        clickMethod={() => navigate('/rate', {state: {bookId: id}}) }

                    >
                        {ratings && ratings[uid] ? (<span              className='flex items-center gap-1 w-fit'>{ratings[uid]}
                        <FaStar className='text-yellow-400' title='Can Rate Again'/>
                    </span>) : <FaRegStar title='Rate Me'/>}
                    </Button>
                ) : (<>
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
            </div>
        </div>
        
       
        

    </div>
  )
}

export default Bookcard