import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
import Pagination from '../components/Pagination'
import Gallery from '../components/Gallery'
import { fetchData, genres } from '../utility'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { FaFilter } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import Button from '../components/Button'

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
    const [genre, setGenre] = useState(null)
    const [isGenreListOpen, setIsGenreListOpen] = useState(false)
    const navigate = useNavigate()
    const filterPannelRef = useRef(null)

    const tabs = ['books', 'author']

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

        // remove the selected genre
        setGenre(null)

        // close the genre list if open
        if(isGenreListOpen) {
            setIsGenreListOpen(false)
        }
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

    const handleSelectGenre = (e) => {
        const value = e.target.innerText.toLowerCase()
        setGenre(value)

        // reset the page no for pagination
        setPageInfo({
            curPage: 1, totalItems: undefined
        })

        setData(undefined)
    }

    const toggleGenreListDisplay = () => {
        setIsGenreListOpen(prev => !prev)
    }

    const resetGenre = () => {
        setGenre(null)
        toggleGenreListDisplay()
    }


    useEffect(() => {
        if(abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const abortController = new AbortController()
        abortControllerRef.current = abortController

        setIsLoading(true)
        const endpoint = `${tab}?page=${pageInfo.curPage}` + (genre ? `&genre=${genre}` : '')

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

        const handleResize = () => {
            setIsGenreListOpen(window.innerWidth <= 640 ? true : false)
        }

        window.addEventListener('resize', handleResize)
        if(window.innerWidth <= 640 && !isGenreListOpen) {
            setIsGenreListOpen(true)
        }

        return () => {
            abortController.abort()
            window.removeEventListener('resize', handleResize)
        }
        
    }, [pageInfo.curPage, tab, genre])

  return (
    <section className='dark:bg-black dark:text-white bg-slate-100 h-full rounded-md '>
        {/* creating tabs */}
        <header>
            <nav className='h-14 flex items-end px-3 md:px-5 lg:px-10 max-sm:justify-center  '>
                {tabs.map(item => (
                    <motion.div 
                        key={item} 
                        className={`relative w-28 h-10 text-sm capitalize py-2 text-center cursor-pointer transition-all rounded-sm`}
                        onClick={handleChangeTab}
                    >
                        {tab === item && (<motion.div 
                            className={`absolute bottom-0 left-0 w-full h-full rounded-sm bg-sky-500`}
                            layoutId="underline"
                            id="underline"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                        />)}
                        
                        
                        <div
                            className={`absolute bottom-0 left-0 w-full h-full grid place-items-center ${tab === item ? 'text-sky-100' : 'text-sky-500 dark:text-sky-300'}`}
                        >{item}</div>
                        
                    </motion.div>))
                }
            </nav>

            {tab === 'author' ? (<section className='mt-1 px-3 md:px-5 lg:px-10'>
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
            </section>) : (<section className='flex flex-col gap-2 px-5 py-4'>
                
                <div className='flex gap-1'>
                    <Button 
                        text={'capitalise text-xs font-semibold'}  
                        bg={'bg-slate-200 dark:bg-slate-800'}
                        color={'text-slate-500 dark:text-slate-300 '}
                        padding={'px-4 py-2'}
                        height={'fit-content'}
                        width={'w-fit'}
                        margin={'ml-2'}
                        hover={'hover:text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-200'}
                        display={'hidden sm:block'}
                        clickMethod={toggleGenreListDisplay}
                    >
                        {isGenreListOpen ? 'close genres' : 'open genres'}
                    </Button>

                    <Button 
                        text={'capitalise text-xs font-semibold'}  
                        bg={'bg-slate-200 dark:bg-slate-800'}
                        color={'text-slate-500 dark:text-slate-300 '}
                        padding={'px-4 py-2'}
                        height={'fit-content'}
                        width={'w-fit'}
                        margin={'ml-2'}
                        hover={`${genre ? 'cursor-pointer hover:text-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-200' : 'cursor-not-allowed'}`}
                        display={ genre ? 'block' : 'hidden' }
                        disable={ !genre } 
                        clickMethod={resetGenre}
                    >
                        reset
                    </Button>
                </div>

                <AnimatePresence>
                    {isGenreListOpen && (<motion.div 
                        className='hiddenScrollbar sm:flex gap-1 sm:flex-wrap max-sm:overflow-x-auto max-sm:whitespace-nowrap text-xs md:text-sm justify-center'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'fit-content' }}
                        exit={{ opacity: 0, height: 0  }}
                        transition={{ duration: 0.2 }}
                        
                    >
                        {genres.map((item,ind) => <li 
                            className={`inline-block max-sm:mr-1 p-2 px-3 rounded-md select-none cursor-pointer capitalize border transition-all duration-100  ${item === genre ? 'border-sky-500 bg-sky-100 text-sky-500 dark:bg-sky-950 ' : 'text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-900 dark:hover:text-slate-300'} transition-all duration-200`}
                            key={ind}
                            onClick={handleSelectGenre}
                        >
                            {item}
                        </li>)} 
                    </motion.div>)}
                </AnimatePresence>
            </section>)}
            
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