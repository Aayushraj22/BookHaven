import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Gallery from '../components/Gallery'
import Cookies from 'js-cookie'

function PurchasedBookPage() {
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState({})

    const handleChangeFilter = (e) => {
        const text = e.target.textContent.toLowerCase();

        if(text === 'all'){
            setFilter({
                text,
                books: [...books],
            })
        } else {
            const purchaseType = text === 'purchased' ? 'buy' : 'rent'
            setFilter({
                text,
                books: books.filter(b => b.pType === purchaseType)})
        }

    }



    useEffect(() => {
        const userId = Cookies.get('uid');
        const url = `${import.meta.env.VITE_DOMAIN_NAME}/users/myBooks?userId=${userId}`
        fetch(url, {
            method: 'GET',
            credentials: 'include' // Ensures cookies are sent with the request
        })
        .then(response => response.json())
        .then((data) => {
            // console.log('data: ',data)
            setBooks(data)
            setFilter({
                text: 'all',
                books: data,
            })
        })
        .catch(err => console.log(err))
    }, [])
    
  return (
    <>
        <main className='dark:bg-black dark:text-white min-h-dvh'>
            <header className='bg-orange-300 dark:bg-orange-900 flex items-center h-14 px-10 gap-1'>
                <p className='flex-1 capitalize text-lg font-serif text-stone-800 dark:text-stone-400'>filter Books: </p>
                <Button 
                    type={'button'} 
                    bg={filter.text === 'all' ? 'bg-orange-600': 'bg-slate-300 dark:bg-slate-800'} 
                    color={filter.text === 'all' ? 'text-white' : 'text-slate-900 dark:text-slate-200'} 
                    clickMethod={handleChangeFilter}
                >
                    all
                </Button>
                <Button 
                    type={'button'} 
                    bg={filter.text === 'rented' ? 'bg-orange-600': 'bg-slate-300 dark:bg-slate-800'} 
                    color={filter.text === 'rented' ? 'text-white' : 'text-slate-900 dark:text-slate-200'} 
                    clickMethod={handleChangeFilter}
                >
                    rented
                </Button>
                <Button 
                    type={'button'} 
                    bg={filter.text === 'purchased' ? 'bg-orange-600': 'bg-slate-300 dark:bg-slate-800'} 
                    color={filter.text === 'purchased' ? 'text-white' : 'text-slate-900 dark:text-slate-200'} 
                    clickMethod={handleChangeFilter}
                >
                    purchased
                </Button>
            </header>
            
            <div className='dark:bg-black dark:text-white'>
                {filter?.books?.length ? <Gallery books={filter?.books} title='My Collection'/> : ''}
            </div>
        </main>
    </>
  )
}

export default PurchasedBookPage