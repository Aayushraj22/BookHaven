import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Gallery from '../components/Gallery'


function GalleryPage() {
    const [books, setBooks] = useState([])
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        totalPage: undefined,
    })

    const handlePageNoButtonOnClick = (e) => {
        const pageNo = e.target.textContent
        setPageInfo({
            ...pageInfo,
            curPage: pageNo,
        })
    }


    useEffect(() => {

        async function fetchData(){
            const response = await fetch(`${import.meta.env.VITE_DOMAIN_NAME}/books?page=${pageInfo.curPage}`) 

            // console.log(typeof data, ' printing it: ',data)
            const result = await response.json()
            setBooks(result.data);
            setPageInfo({
                ...pageInfo,
                totalPage: Math.ceil(result.total / 10)
            })
        }

        // LATER BE DATA WILL BE USED
        fetchData()      
        
    }, [pageInfo.curPage])
  return (
    <section className='dark:bg-black dark:text-white'>
        <main>
            <Gallery books={books}/>
        </main>

        {/* pagination footer */}
        <Pagination total={pageInfo?.totalPage} clickMethod={handlePageNoButtonOnClick} curPage={pageInfo?.curPage} />
    </section>
  )
}

export default GalleryPage