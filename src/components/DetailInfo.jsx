import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import Image from './Image'
import { useDispatch, useSelector } from 'react-redux'
import { addWish, deleteWish } from '../redux/slices/WishlistSlice'
import TextKV from '../utility/components/TextKV'
import { isPresentInWishlist } from '../redux/utility'
import { fetchData, modifyData, postData, readLocalStorage, toastMsg } from '../utility'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Fallback from '../utility/components/Fallback'
import { FaStar } from "react-icons/fa";

function DetailInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const obj = location.state
  const [book, setBook] = useState({})
  const {authors, name, ratings, price, publishedAt, imgurl, description, _id, id} = book;
  const {status} = useSelector(state => state.auth)
  const [ comments, setComments ] = useState([])
  const [loading, setLoading] = useState(undefined)
  const { purchaseList } = useSelector(state => state.purchase)
  const [reviewText, setReviewText] = useState('')
  const [showEditBox, setShowEditBox] = useState(undefined)
  const [editReviewText, setEditReviewText] = useState('')


  // verify current book was in the wishlist or not
  const isWishedAlready = isPresentInWishlist(_id)

  function handleClickButton(usedFor){
    if(usedFor === 'wish') {
      
      // user must be signed-in to add into wish
      if(!status) {
        navigate('/login')
        return;
      }

      if(isWishedAlready){
        dispatch(deleteWish(_id))
      } else {
        dispatch(addWish(book))
      }
      
    } else {
      navigate('/purchase', {state: {
        book,
        pType: usedFor,
      }})
    }
  }

  // user should be logged-In and purchased This Book
  function handleSubmitReview(data, commentId, isEdit=false){
    if(data == '')
      return 

    if(isEdit) {
      const endpoint = `comments/${commentId}`
      const comment = {
        content: data.trim()
      }

      setLoading('editReviews')
      modifyData(endpoint, comment, {withCredentials: true}).then(data => {
        if(data) {
          setComments(comments.map(obj => {

            if(obj?._id === data?._id){
              return data
            } 

            return obj
          }))

          setEditReviewText('')
        } else {
          toastMsg('review not modified', 'error')
        }
      }).finally(() => {
        setLoading(undefined)
      })
    } else {
      const endpoint = `comments/add?bookId=${_id}`
      const comment = {
        content: data.trim(),
      }

      setLoading('postReviews')
      postData(endpoint, comment, {withCredentials: true}).then(data => {
        if(data) {
          setComments([
            data, ...comments
          ])
          
          setReviewText('') 
        } else {
          toastMsg('review not sent', 'error')
        }
      }).finally(() => {
        setLoading(undefined)
      })
    }
    

    

  }



  useEffect(() => {
    setBook(obj)

    setLoading('getReviews')
    const endpoint = `comments?bookId=${obj._id}`
    fetchData(endpoint).then(data => {
      setComments(data)
    }).finally(() => {
      setLoading(undefined)
    })
  }, [obj])




  return (
    <>
    <div className='p-2 dark:bg-black bg-slate-100 dark:text-stone-300 h-full px-4 select-none'>
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
            className={`absolute rounded-lg w-8 h-8 right-0 bottom-0 grid place-items-center  cursor-pointer ${isWishedAlready ? 'bg-yellow-500 text-stone-200 dark:bg-yellow-700' : 'bg-stone-200 dark:bg-stone-950 hover:bg-yellow-500 dark:text-stone-200 hover:text-white'}`}
            onClick={() => handleClickButton('wish')}
            title={isWishedAlready ? 'Remove From Wishlist' : 'Add In Wishlist'}
          >
            {isWishedAlready ? '-' : '+'}
          </p>
        </div>
        <div 
          className='flex-1 p-2 w-full'
        >
          <p className='text-xl md:text-3xl capitalize max-sm:text-center font-semibold my-5 text-stone-800 dark:text-stone-400'>{name}</p>
          <TextKV name={'authors'} value={authors?.map(author => <Link key={author._id} to={`/author/${author?._id}`} className='text-blue-500  hover:text-blue-600 px-2 py-1 text-xs'>{author?.name}</Link>)} />
          <TextKV name={'published At'} value={publishedAt} />
          {ratings && Object.keys(ratings)?.length >= 1 && ( <TextKV name={'peoples rated'} value={ Object.keys(ratings).length } />) }
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

      <div className='flex flex-col max-sm:gap-2 gap-4 md:px-16 py-2 md:py-6 '>
        <div className='flex-1'>
          <h1 className='text-sm md:text-lg text-semibold text-stone-800 dark:text-stone-500 mb-1'>Description</h1>
          <p className='pl-2 text-xs text-stone-700 dark:text-stone-300'>{description}</p>
        </div>
        <div className='flex-1 '>
          <div className='flex justify-between items-center py-2'>
            <h1 className='text-sm md:text-lg text-semibold text-stone-800 dark:text-stone-500'>Ratings and Reviews</h1>
            {ratings && Object.values(ratings)?.length >= 1 && (
              <div className='flex flex-col text-xs justify-center rounded-md bg-slate-50 px-6 py-1 font-medium text-slate-600 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-800 dark:text-slate-400 float-right select-none items-center gap-1 capitalize'>
                <span>ratings</span>
                <span className=" flex items-center flex-1">
                  {Math.ceil(Object.values(ratings).reduce((total, val) => (total += Number(val)), 0) / Object.values(ratings)?.length)} 
                  <FaStar className='ml-1 text-yellow-600 dark:text-yellow-500' />
                </span>
            </div>
            )}
            
          </div>
          
          {/* add review here */}
          {status && purchaseList.find((item) => item?.bookId === id) && ( <div className='w-full capitalize p-2 pt-0 mb-2'>
            <label className=' flex flex-col dark:bg-transparent'>
              <p className='text-sm font-thin'>write Reviews here</p>
              <textarea 
                type='text' 
                className='w-full my-1 border outline-none p-2 text-xs dark:bg-transparent dark:border-stone-600' 
                rows={3}  
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </label>
            <Button
              height={'h-[50px]'}
              bg={'dark:bg-lime-600 bg-lime-300'}
              color={'dark:text-lime-200 text-lime-700'}
              clickMethod={() => handleSubmitReview(reviewText)}
              hover={loading === 'postReviews' || reviewText == '' ? 'cursor-not-allowed' : 'cursor-pointer'}
              disable={loading === 'postReviews' || reviewText == '' ? true : false}
            >{loading === 'postReviews' ? <Fallback loader={'threeDots'} /> : 'add'} </Button>
          </div>)}

          {loading === 'getReviews' ? (<Fallback loader={'threeDots'}  />) : (<>
            {comments.length > 0 ? (<ul className='border dark:border-stone-700'>
                {comments.map(item => <li key={item?._id} className='text-xs p-2 border-b dark:border-stone-700 flex min-h-10 '>
                  <div className='flex-1' onMouseEnter={item?.userId === readLocalStorage('uid') ? () => {
                    setShowEditBox(item?._id)
                    setEditReviewText(item?.content)
                  } : () => {}} 
                   onMouseLeave={() => {
                    setEditReviewText('')
                    setShowEditBox(undefined)
                   }}
                  >
                    {showEditBox === item?._id ? (<textarea rows={3} value={editReviewText} onChange={(e) => setEditReviewText(e.target.value)} className='w-full bg-transparent outline-none border dark:border-stone-700 p-1' >{item?.content}</textarea>) : (<p>{item.content}</p>)}
                    {showEditBox === item?._id && (<div className='p-2'>
                        <Button
                          height={'h-6'}
                          width={'w-14'}
                          clickMethod={() => handleSubmitReview(editReviewText, item?._id, true)}
                          bg={'dark:bg-slate-700 bg-slate-300'}
                          color={'dark:text-white text-slate-700'}
                        >
                          {loading === 'editReviews' ? <Fallback loader={'comment'} /> : 'save'}
                        </Button>
                      </div>)
                    }
                  </div>

                  {/* likes on comments */}
                  {/* <div className='flex gap-2 w-fit ml-auto px-2 items-start'>
                    <div className='flex gap-1 items-center'>
                      <span className='text-xs'>1</span>
                      <AiOutlineLike className='cursor-pointer hover:text-red-500 text-lg dark:hover:text-red-600'/>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <span className='text-xs'>1</span>
                      <AiOutlineDislike className='cursor-pointer hover:text-red-500 text-lg dark:hover:text-red-600'/>
                    </div>
                  </div> */}
                </li>)}
              </ul>) : (
                <h3 className=' p-4 text-center text-xs'>No Reviews</h3>
              )}
          </>)}
        </div>
      </div>
    </div>
    </>
  )
}

export default DetailInfo