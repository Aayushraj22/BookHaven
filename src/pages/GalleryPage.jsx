import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import Gallery from '../components/Gallery'
import { fetchData } from '../utility'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

function GalleryPage() {
    const [data, setData] = useState(undefined)
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        totalItems: undefined,
    })
    const [tab, setTab] = useState('books')
    const [filter, setFilter] = useState({
        gender: 'n',     // n -> none
        nationality: 'none'
    })
    const abortControllerRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const filterPannelRef = useRef(null)

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

        // scroll to top on change page
        document.getElementById('afterRoot').scrollTop = 0
    }

    const skeletonToDisplay = () => {
        if(pageInfo.totalItems) {
            const remainItems = pageInfo.totalItems  - (pageInfo.curPage - 1)*10
            const result = remainItems > 10 ? 10 : remainItems
            return result
        }

        return 10
        
    }

    const handleChangeTab = (e) => {
        const value = e.target.innerText.toLowerCase()

        // ignore click on same tab
        if(value === tab){
            return
        }

        // reset the filter and close the filter panel
        if(value === 'books') {
            setFilter({
                gender: 'n',
                nationality: 'none'
            })
            handleToggleFilterPannel()
        }


        // reset the page no for pagination
        setPageInfo({
            curPage: 1, totalItems: undefined
        })

        setData(undefined)

        // change tab value
        setTab(value)
    }

    const handleToggleFilterPannel = () => {
        const ele = filterPannelRef.current 

        // toggle its height
        ele.classList.toggle('h-0')
    }

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase()
        const name = e.target.name

        // set the state
        setFilter(prev => ({
            ...prev,
            [name]: value
        }))
    }


    useEffect(() => {
        if(abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const abortController = new AbortController()
        abortControllerRef.current = abortController

        setIsLoading(true)
        const endpoint = `${tab}?page=${pageInfo.curPage}`

        fetchData(endpoint, navigate)
        .then(data => {
            if(!abortController.signal.aborted) {
                setData(data?.data)
                setPageInfo({
                    ...pageInfo,
                    totalItems: data.total
                })
            }
        }).finally(() => {
            if(!abortController.signal.aborted){
                setIsLoading(false)
            }
        })    

        return () => {
            abortController.abort()
        }
        
    }, [pageInfo.curPage, tab])

  return (
    <section className='dark:bg-black dark:text-white h-full '>
        {/* creating tabs */}
        <header>
            <nav className='h-14 flex items-end px-3 md:px-5 lg:px-10 max-sm:justify-center text-slate-400 dark:text-slate-600 '>
                <p 
                    className={` w-28 h-10 text-sm capitalize py-2 text-center cursor-pointer transition-all rounded-sm ${tab === 'books' ? 'border-sky-400 text-sky-500 hover:text-sky-500 font-semibold border-b-2' : ' hover:text-slate-600 dark:hover:text-slate-400'}`}
                    onClick={handleChangeTab}
                >
                    books
                    </p>
                <p 
                    className={` w-28 h-10 text-sm capitalize py-2 text-center cursor-pointer transition-all rounded-sm ${tab === 'books' ? ' hover:text-slate-600 dark:hover:text-slate-400' : 'border-sky-400 text-sky-500 hover:text-sky-500 font-semibold border-b-2'}`}
                    onClick={handleChangeTab}
                >
                    author
                </p>
            </nav>
            {tab === 'author' && (<nav className='mt-1 px-3 md:px-5 lg:px-10'>
                <div className='flex gap-2 text-xs items-center text-blue-800 dark:text-blue-500 '>
                <p
                    onClick={handleToggleFilterPannel} 
                    className='flex gap-2 p-2 rounded-sm cursor-pointer capitalize text-xs w-fit'
                    title={filterPannelRef?.current?.classList?.contains('h-0') ? 'Open Panel': 'Close Panel'}
                > 
                    <FaFilter size={15} /> 
                    <span>filter</span>
                </p>
                <p 
                    className={`cursor-pointer flex gap-2 ${filter.gender === 'n' && filter.nationality === 'none' ? 'hidden' : 'block'}`}
                    onClick={() => setFilter({gender: 'n', nationality: 'none'})}
                    title='reset filter'
                >
                    <GrPowerReset size={15} />
                    reset
                </p>
                </div>
                <div ref={filterPannelRef} className='overflow-y-hidden transition-all h-0 flex gap-3 border-t items-center dark:border-t-gray-700 dark:text-slate-200'>
                    <div className='text-xs p-2'>
                        <p className='capitalize text-semibold'>gender</p>
                        <div className=' flex gap-2 py-1'>
                            <label className='flex items-center gap-1'>
                                <input 
                                    type="radio" 
                                    name='gender' 
                                    value={'m'} 
                                    checked={filter.gender === 'm'} 
                                    onChange={handleFilter}
                                /> male
                            </label>
                            <label className='flex items-center gap-1'>
                                <input 
                                    type="radio" 
                                    name='gender' 
                                    value={'f'} 
                                    checked={filter.gender === 'f'} 
                                    onChange={handleFilter}
                                /> female
                            </label>
                            <label className='flex items-center gap-1'>
                                <input 
                                    type="radio" 
                                    name='gender' 
                                    value={'n'} 
                                    checked={filter.gender === 'n'} 
                                    onChange={handleFilter}
                                /> none
                            </label>
                        </div>
                    </div>
                    <select 
                        name="nationality" 
                        className='capitalize dark:bg-black text-xs border outline-none rounded-md p-1 dark:border-gray-800' 
                        onChange={handleFilter}
                        value={filter.nationality}
                    >
                        <option value='none'>none</option>
                        <option value="india">india</option>
                        <option value="south africa">south africa</option>
                        <option value="british">british</option>
                    </select>
                </div>
            </nav>)}
            
        </header>
        <main>
            {tab === 'books' ? (
                <Gallery 
                    data={data} 
                    isLoading={isLoading} 
                    items={skeletonToDisplay()}
                    category='books'
                />) : (
                <Gallery 
                    data={filter.gender != 'n' ? (data.filter(item => item?.gender?.toLowerCase() === filter.gender).filter(item => filter.nationality === 'none' ? item : item?.nationality?.toLowerCase() === filter.nationality)) : (filter.nationality != 'none' ? data.filter(item => item?.nationality?.toLowerCase() === filter.nationality) : data)} 
                    isLoading={isLoading} 
                    items={skeletonToDisplay()} 
                    category='authors'
                />)
            }

        </main>

        {/* pagination footer */}
        {data && <Pagination total={Math.ceil(pageInfo?.totalItems / 10)} totalItems={pageInfo?.totalItems} clickMethod={handlePageNoButtonOnClick} curPage={pageInfo?.curPage} />}
        
    </section>
  )
}

export default GalleryPage