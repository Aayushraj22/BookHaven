import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Searchbar() {
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
    const url = `${import.meta.env.VITE_DOMAIN_NAME}/books/search?searchText=${searchText}`

    try {
      const response = await fetch(url)

      const result = await response.json()
      console.log('result: ',result)

      setSearchResult(result)
    } catch (error) {
      console.log('error occurs')
    } finally {
      console.log('search api called')
      setSearchText('')
    }
  }
  
  return (
    <div className=' w-11/12 h-12 relative dark:text-stone-300'>
      <input 
        className='block w-9/12 focus:w-11/12 h-10 my-1 mx-auto outline-none transition-all rounded px-1 bg-stone-200 dark:bg-stone-900' 
        placeholder='add prefix a: for author, y: for year, p: for price, and no prefix for bookname' 
        type='search' 
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
        title='Search Here' 
      />
      <div className={`${searchResult?.length ? 'h-60 p-4' : 'h-0'} absolute w-full bg-stone-300 dark:bg-stone-800  my-1 rounded-lg`}>
        <ul className='overflow-y-auto h-full'>
          {searchResult?.map((book, index) => 
          <Link 
            key={book?.id} 
            to='/bookDetails' 
            state={book} 
            className='flex flex-col text-xs rounded p-1 border relative'
            onClick={() => {
              setSearchResult([])
            }}
          >
            <p className='capitalize'>{book?.name}</p>
            <p className='capitalize'>{book?.author}</p>
            <p>{book?.publishedAt}</p>
            <span className='absolute rounded w-5 h-5 right-0 bottom-0 bg-stone-400 dark:bg-stone-700 grid place-items-center text-xs'>{index+1}</span>
          </Link>)}
        </ul>
      </div>
    </div>
  )
}

export default Searchbar