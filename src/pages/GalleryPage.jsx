import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Gallery from '../components/Gallery'
import { fetchData } from '../utility'
import { useNavigate } from 'react-router-dom'

function GalleryPage() {
    const [books, setBooks] = useState(undefined)
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        totalPage: undefined,
    })

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handlePageNoButtonOnClick = (e) => {
        const pageNo = e.target.textContent
        setPageInfo({
            ...pageInfo,
            curPage: pageNo,
        })
    }


    useEffect(() => {

        setIsLoading(true)
        const endpoint = `books?page=${pageInfo.curPage}`

        fetchData(endpoint, navigate)
        .then(data => {
            setBooks(data?.data)
            setPageInfo({
                ...pageInfo,
                totalPage: Math.ceil(data.total / 10)
            })

            setIsLoading(false)
        })      
        
    }, [pageInfo.curPage])

  return (
    <section className='dark:bg-black dark:text-white'>
        <main>
            <Gallery books={books} isLoading={isLoading}/>
        </main>

        {/* pagination footer */}
        {books && <Pagination total={pageInfo?.totalPage} clickMethod={handlePageNoButtonOnClick} curPage={pageInfo?.curPage} />}
        
    </section>
  )
}

export default GalleryPage