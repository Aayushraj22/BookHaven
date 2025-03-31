import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchData, postData } from '../utility'
import Button from './Button'
import Fallback from '../utility/components/Fallback'
import { BsSearch } from 'react-icons/bs'
import { motion } from 'motion/react'
import { MdOutlineClose } from "react-icons/md";

function Searchbar({ closeSearchBox }) {
  const [searchResult, setSearchResult] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [failedMsg, setFailedMsg] = useState('')
  const [mostSearched, setMostSearched] = useState([])
  const [isInputFocus, setIsInputFocus] = useState(false)


  const handleInputChange = (e) => {
    const inputText = e.target.value;

    if(inputText === ''){
      setSearchResult([])
    }

    if(searchResult.length) {
      setSearchResult([])
    }

    setSearchText(inputText)
  }


  const handleEnterPress = (e) => {
    if(e.keyCode === 13 && searchText.trim()){ 
      handleSearchResult()
    }
  }


  const handleSearchResult = async () => {
    const text = searchText.trim().toLowerCase()
    const endpoint = `books/search?searchText=${text}`

    if(text.length === 0)
      return;

    if(searchResult.length){
      setSearchResult([])
    }

    if(failedMsg) {
      setFailedMsg('')
    }

    setIsloading(true)

    fetchData(endpoint)
    .then((data) => {
      if (data?.length) {
        setSearchResult(data)
      } else {
        setFailedMsg('Result Not Found')
      }
      setSearchText('')
    })
    .finally(() => {
      setIsloading(false)
      setIsInputFocus(false)
    })

    postData(`rst?searchText=${searchText}`)
  }

  const handleRecommendSearchText = async() => {
    // remove the failed message
    setFailedMsg('')
    setSearchResult([])

    const endpoint = `rst`
    fetchData(endpoint)
    .then(data => {
      setMostSearched([...data])
      setIsInputFocus(true)
    })
  }

  const handleInputFocusOut = () => {
    setIsInputFocus(false)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
      exit={{  opacity: 0, scale: 0 }} 
      className='fixed bg-transparent backdrop-blur-xl z-20 grid place-items-center left-0 right-0 top-0 bottom-0'
      onClick={closeSearchBox}
    >
      <div 
        className='w-5/6 md:w-1/2 text-stone-800 dark:text-stone-300 flex flex-col items-end p-3 rounded-md bg-stone-200 dark:bg-stone-700'
        onClick={(e) => { e.stopPropagation()}}
      >
        <Button
          margin={'mb-3'}
          bg={'bg-stone-300 dark:bg-stone-800'}
          color={'text-stone-800 dark:text-stone-400' }
          hover={'hover:bg-stone-400 hover:text-stone-100 dark:hover:text-stone-200 dark:hover:bg-stone-900'}
          padding={'px-2 py-1'}
          width={'w-8'}
          height={'h-8'}
          display={'grid place-items-center'}
          clickMethod={closeSearchBox}
        >
          <MdOutlineClose />
        </Button>

        <p className='border w-full rounded-full dark:border-stone-800 border-stone-400 '></p>

        <div className='w-full flex items-center my-3 mx-auto justify-center'>
          <input 
            className='inline-block w-9/12 focus:w-10/12 h-10 outline-none rounded px-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 focus:border-x-2 border-x-sky-600 ' 
            type='search'
            placeholder='Search Book ...' 
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            onFocus={handleRecommendSearchText}
            onBlur={handleInputFocusOut}
            title='Search Book' 
            />
            <BsSearch className=' w-10 h-10 p-2 text-sky-500 transition-color font-semibold hover:text-sky-600 cursor-pointer' onMouseDown={handleSearchResult} />
        </div>

        <section className={`no-scrollbar w-11/12  rounded-md flex flex-col gap-1 overflow-y-auto h-full flex-1 mx-auto transition-all ${searchResult.length || isInputFocus || failedMsg ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-400 p-4 max-h-60' : 'bg-transparent'}`}>
          {isloading && (
            <Fallback loader={'magnifyingGlass'} />
          )}
          {mostSearched?.length && !searchResult?.length && !isloading && isInputFocus ? (<>
            <h3 className='text-sm font-sans capitalize italic'>Most frequent searches ... </h3>
            {mostSearched?.map(obj => (<p key={obj._id} className='text-xs border dark:hover:bg-stone-950 hover:bg-stone-600 hover:text-stone-200 border-stone-500 hover:border-stone-200  transition-all  p-2 capitalize rounded-md cursor-pointer' onMouseDown={() => {setSearchText(obj?.text)}}>{obj?.text}</p>))}
            </>) : ''}
          {searchResult?.map((book, index) => 
          <Link 
            key={book?._id} 
            to='/bookDetails' 
            state={book} 
            className='flex flex-col text-xs rounded p-2  relative shadow-sm shadow-stone-500 transition-all'
            onClick={closeSearchBox}
          >
            <p className='capitalize'>{book?.name}</p>
            <p className='capitalize'>written by : {book?.authors?.length >= 1 ? book?.authors[0]?.name :'author not defined'} </p>
            <p>Published Year: {book?.publishedAt}</p>
            <span className='absolute rounded w-5 h-5 right-0 bottom-0 bg-stone-300 dark:bg-stone-700 grid place-items-center text-xs'>{index+1}</span>
          </Link>)}

          {failedMsg && (
            <p className='w-full flex-1 grid place-items-center'>
              {failedMsg}
            </p>
          )}
        </section>

        
        
      </div>
    </motion.div>
  )
}

export default Searchbar