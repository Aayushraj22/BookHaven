import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchData } from '../utility'
import Button from './Button'

function Searchbar({closeSearchBox}) {
  const [searchResult, setSearchResult] = useState([])
  const [searchText, setSearchText] = useState('')

  const handleInputChange = (e) => {
    const inputText = e.target.value;

    if(inputText === ''){
      setSearchResult([])
    }

    setSearchText(inputText)
  }


  const handleEnterPress = (e) => {
    if(e.keyCode === 13) {
      handleSearchResult()
    }
  }


  const handleSearchResult = async () => {
    const endpoint = `books/search?searchText=${searchText}`
    fetchData(endpoint)
    .then((data) => {
      if (data) {
        setSearchResult(data)
      } 

      setSearchText('')
    })
  }
  
  return (
    <div className='min-h-40 fixed max-md:left-0 max-md:right-0 md:w-1/2 md:translate-x-1/2 bg-slate-200 dark:bg-slate-800 dark:text-stone-300 z-10 flex flex-col items-end px-3 py-1 gap-1 rounded-md'>
      <Button
          width={'w-fit'}
          height={'h-fit'}
          bg={'bg-slate-300 dark:bg-slate-950'}
          color={'text-slate-900 dark:text-slate-100' }
          hover={'hover:bg-slate-400 hover:dark:bg-slate-900'}
          padding={'px-2 py-1'}
          clickMethod={closeSearchBox}
        >
          close
        </Button>
        <div className='bg-red-300 dark:bg-red-800 text-red-800 dark:text-red-300 p-2 w-full rounded-md'>
          <p className='m-auto font-serif text-sm border-b-2 border-b-red-600 w-fit px-2 rounded-sm'>Rules To Search</p>
          <ul className='text-xs font-semibold capitalize'>
              <li>default search by name</li>
              <li><span className='lowercase'>a:</span> search by author</li>
              <li><span className='lowercase'>y:</span> search by year</li>
              <li><span className='lowercase'>p:</span> search by price</li>
            </ul>
        </div>
      <input 
        className='block w-9/12 focus:w-11/12 h-10 my-1 mx-auto outline-none transition-all rounded px-1 bg-stone-200 dark:bg-stone-900' 
        placeholder='Search...' 
        type='search' 
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
        title='Search Here' 
      />

      {searchResult?.length > 0 && (
        <ul className='p-4 w-full bg-slate-200 dark:bg-slate-900 rounded-md flex flex-col gap-1'>
          {searchResult?.map((book, index) => 
          <Link 
            key={book?.id} 
            to='/bookDetails' 
            state={book} 
            className='flex flex-col text-xs rounded p-1 border relative border-slate-800 dark:border-slate-100'
            onClick={closeSearchBox}
          >
            <p className='capitalize'>{book?.name}</p>
            <p className='capitalize'>Author: {book?.author}</p>
            <p>Published Year: {book?.publishedAt}</p>
            <span className='absolute rounded w-5 h-5 right-0 bottom-0 bg-stone-400 dark:bg-stone-700 grid place-items-center text-xs'>{index+1}</span>
          </Link>)}
        </ul>)
      }
      
    </div>
  )
}

export default Searchbar