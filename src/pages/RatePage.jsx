import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegStar, FaStar } from "react-icons/fa";
import Button from '../components/Button';
import { fetchData, postData, readLocalStorage, toastMsg } from '../utility';
import Fallback from '../utility/components/Fallback';

function RatePage() {
    const { status } = useSelector(state => state.auth)
    const { bookId } = useLocation()?.state
    const navigate = useNavigate()
    const [stars, setStars] = useState({
        prevInd : -1,
        curInd : -1,
    }) 
    const [isRating, setIsRating] = useState(false)

    const { purchaseList } = useSelector(state => state.purchase)

    const isAlreadyBought = status ? purchaseList.find((item) => item.bookId === bookId )  : false

    const rateBook = () => {
        const endpoint = `rates/${bookId}`
        const rating = {
            'rated' : stars.curInd + 1 
        } 

        setIsRating(true)
        postData(endpoint, rating, {withCredentials: true}).then(data => {
            if(data) {
                setStars({
                    prevInd: stars.curInd,
                    curInd: -1,
                })
            } else {
                toastMsg('failed rating', 'error')
            }
        }).finally(() => {
            setIsRating(false)
        })
    }

    useEffect(() => {
        const uid = readLocalStorage('uid')

        if(isAlreadyBought) {
            const endpoint = `books/${bookId}`
            fetchData(endpoint)
            .then(({ ratings }) => {
                setStars({
                    ...stars,
                    prevInd : ratings[uid] ? Number(ratings[uid]) - 1 : -1 ,
                })
            })
        }
        
    }, [isAlreadyBought])
    

  return (
    <main className='dark:bg-black h-full dark:text-white flex justify-center items-center flex-col gap-1 text-sm capitalize'>

        {!status ? (<>
            <p>you need To login first</p>
            <Button
                bg={'dark:bg-slate-600 bg-slate-200'}
                color={'dark:text-slate-100'}
                clickMethod={() => navigate('/login') }
            >
                Login
            </Button>
        </>) : (<>
            {isAlreadyBought ? (
                <>
                {stars.prevInd !== -1 && (<>
                    <p>already rated</p>
                    <div className='flex p-2 gap-1 text-lg mb-2'>
                        {new Array(stars.prevInd + 1).fill(1).map((item, index) => <FaStar key={index} className='text-yellow-500' />)}

                        {new Array(5 - stars.prevInd - 1).fill(1).map((item, index) => <FaRegStar key={index} />)}
                    </div>
                </>)}
                
                <p>It hardly takes 20 sec to rate the book.</p>
                <div className='flex p-2 gap-1 text-lg'>
                    {stars.curInd >= 0 && (new Array(stars.curInd + 1).fill(1).map((item, index) => <FaStar key={index} onClick={() => setStars({
                        ...stars,
                        curInd: index,
                    })} className='cursor-pointer text-yellow-500' />)) }

                    {stars.curInd >= 0 ? (new Array(5 - stars.curInd - 1).fill(1).map((item, index) => <FaRegStar 
                        key={index} 
                        onClick={() => setStars({
                            ...stars,
                            curInd: index + stars.curInd + 1,
                        })} 
                        className='cursor-pointer' 
                        />)) : (new Array(5).fill(1).map((item, index) => <FaRegStar 
                            key={index} 
                            onClick={() =>
                                setStars({
                                    ...stars,
                                    curInd: index
                            })} 
                            className='cursor-pointer' 
                        />))
                    }
                </div>

                <div className='flex gap-2 p-2'>
                    {stars.curInd >= 0 && (<Button 
                        bg={'dark:bg-yellow-600 bg-yellow-400'}
                        color={'dark:text-white text-slate-800'}
                        text={'text-semibold text-xs'}
                        clickMethod={rateBook}
                        height={'h-10'}
                    >
                        {isRating ? (<Fallback loader={'threeDots'} />) : (<>rate</>)} 
                    </Button>)}
                    
                    <Button 
                        bg={'dark:bg-slate-600 bg-slate-300'}
                        color={'text-slate-800 dark:text-slate-200'}
                        height={'h-10'}
                        clickMethod={() => {navigate(-1)}}

                    >
                        go back
                    </Button>
                </div>
            </>
        ) : (<>
            <h3 className='text-sm capitalize'>first purchase this book</h3>
            <Button
                bg={'dark:bg-slate-600 bg-slate-200'}
                color={'dark:text-slate-100'}
                clickMethod={() => navigate('/signin') }
            >
                Purchase book
            </Button>
        </>) 
        }</>)}
    </main>
  )
}

export default RatePage