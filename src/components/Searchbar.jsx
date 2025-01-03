import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchData } from '../utility'
import Button from './Button'

function Searchbar({closeSearchBox}) {
  const [searchResult, setSearchResult] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [failedMsg, setFailedMsg] = useState('')

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

    if(searchResult.length){
      setSearchResult([])
    }

    if(failedMsg) {
      setFailedMsg('')
    }

    setIsloading(true)

    fetchData(endpoint)
    .then((data) => {
      if (data.length) {
        setSearchResult(data)
      } else {
        setFailedMsg('Result Not Found')
      }

      setSearchText('')
    })
    .finally(() => {
      setIsloading(false)
    })
  }
  
  return (
    <div className='fixed bg-transparent backdrop-blur-xl z-20 grid place-items-center left-0 right-0 top-0 bottom-0'>
      <div className='w-5/6 md:w-4/6 h-4/5 md:h-4/6 text-stone-800 dark:text-stone-300 flex flex-col items-end p-3 rounded-md bg-stone-200 dark:bg-stone-700'>
        <Button
        margin={'mb-3'}
          bg={'bg-stone-300 dark:bg-stone-800'}
          color={'text-stone-800 dark:text-stone-400' }
          hover={'hover:bg-stone-400 hover:text-stone-900 dark:hover:text-stone-200 dark:hover:bg-stone-900'}
          padding={'px-2 py-1'}
          clickMethod={closeSearchBox}
        >
          close
        </Button>

        <p className='border w-full rounded-full dark:border-stone-800 border-stone-400 '></p>

        <input 
          className='inline-block w-9/12 focus:w-11/12 h-10 my-3 mx-auto outline-none transition-all rounded px-2 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 focus:border-x-2 border-x-sky-600' 
          type='search'
          placeholder='Search Book ...' 
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
          title='Search Book' 
        />

        <section className={`p-4 w-11/12  rounded-md flex flex-col gap-1 overflow-y-auto h-full flex-1  mx-auto ${isloading ? 'animate-pulse': ''} ${searchResult.length ? 'bg-stone-400 dark:bg-stone-900 text-stone-900 dark:text-stone-400' : 'bg-transparent'}`}>
          {isloading && (
            <p className='w-full flex-1 grid place-items-center'>
              Searching ...
            </p>
          )}

          {searchResult?.map((book, index) => 
          <Link 
            key={book?.id} 
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
    </div>
  )
}

export default Searchbar