import React from 'react'
import Input from '../components/Input'
import axios from 'axios'

function AddBookPage() {
    const handleAddBook = (e) => {
        e.preventDefault()

        const book = {
            ratings: {},
            publishedAt: new Date().toLocaleString()
        }

        const formdata = new FormData(e.target)

        for (let [key, value] of formdata.entries()) {  
            book[key] = value
        }

        book.authors = [book.authors]

        const endpoint = 'books'
        const url = `${import.meta.env.VITE_DOMAIN_NAME}/${endpoint}`

        axios.post(url, book).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log('error: ',err)
        })
       
    }

  return (
    <main className='h-dvh w-dvw flex justify-center items-center '>

        <form onSubmit={handleAddBook}>
            <Input name='name' />
            <Input name='authors' />
            <Input name='price' type={'number'} />
            <Input name='description' />
            <Input name='imgurl' />
            <button>Add</button>
        </form>
    </main>
  )
}

export default AddBookPage