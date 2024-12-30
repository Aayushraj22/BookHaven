import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Gallery from '../components/Gallery'
import { fetchData, readLocalStorage } from '../utility'

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
        const userId = readLocalStorage('uid')
        const endpoint = `users/myBooks?userId=${userId}`
        fetchData(endpoint)
        .then(data => {
            if(data) {
                Promise.all(data.map(obj => fetchData(`books/${obj.bookId}`)))
                .then(list => {
                    const userAllInfoList = []
                    for(let ind=0; ind<data.length; ind++) {
                        userAllInfoList.push({
                            ...data[ind],
                            ...list[ind],
                        })
                    }
                    
                    setBooks(userAllInfoList)
                    setFilter({
                        text: 'all',
                        books: userAllInfoList,
                    })
                })
            }
        })
    }, [])
    
  return (
    <>
        <main className='dark:bg-black dark:text-white h-full'>
            <header className='bg-orange-300 dark:bg-orange-800 flex items-center h-14 px-10 gap-1'>
                <p className='flex-1 capitalize text-lg font-serif text-orange-800 dark:text-orange-300'>filter Books: </p>
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
        
            {filter?.books ? <Gallery books={filter?.books} title='My Collection' usedFor={'myBooks'}/> : <div className='text-center mt-10 '>Getting Data...</div>} 
        </main>
    </>
  )
}

export default PurchasedBookPage