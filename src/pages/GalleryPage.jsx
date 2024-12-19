import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Gallery from '../components/Gallery'
import { fetchData } from '../utility'
import { useNavigate } from 'react-router-dom'

function GalleryPage() {
    const [books, setBooks] = useState(undefined)
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        totalItems: undefined,
    })

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handlePageNoButtonOnClick = (e) => {
        let pageNo = e.target.textContent 
        if(pageNo === '>') {    // demand of next page
            pageNo = pageInfo.curPage + 1;
        } else if (pageNo === '<') {    // demand of prev page
            pageNo = pageInfo.curPage - 1;
        } else {
            pageNo = Number(pageNo)
        }

        setPageInfo(prev => ({
            ...prev,
            curPage: pageNo,
        }))
    }

    const skeletonToDisplay = () => {
        if(pageInfo.totalItems) {
            const remainItems = pageInfo.totalItems  - (pageInfo.curPage - 1)*10
            const result = remainItems > 10 ? 10 : remainItems
            return result
        }

        return 10
        
    }


    useEffect(() => {

        setIsLoading(true)
        const endpoint = `books?page=${pageInfo.curPage}`

        fetchData(endpoint, navigate)
        .then(data => {
            setBooks(data?.data)
            setPageInfo({
                ...pageInfo,
                totalItems: data.total
            })
        }).finally(() => {
            setIsLoading(false)
        })    
        
    }, [pageInfo.curPage])

  return (
    <section className='dark:bg-black dark:text-white'>
        <main>
            <Gallery books={books} isLoading={isLoading} items={skeletonToDisplay()}/>
        </main>

        {/* pagination footer */}
        {books && <Pagination total={Math.ceil(pageInfo?.totalItems / 10)} clickMethod={handlePageNoButtonOnClick} curPage={pageInfo?.curPage} />}
        
    </section>
  )
}

export default GalleryPage