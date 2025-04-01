import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLoggedInStatus } from '../redux/slices/authSlice'
import { fetchAndSetWish } from '../redux/slices/WishlistSlice'
import { fetchData, readLocalStorage, } from '../utility'
import { TbNavigationTop } from "react-icons/tb";
import { setUserPurchasedBook } from '../redux/slices/purchasedSlice'


function Layout() {
  const backToTopRef = useRef(null)
  const scrollEleRef = useRef(null)
  const dispatch = useDispatch()

  const handleScrollToTop = () => {
    scrollEleRef.current.scrollTop = 0
  }
  
  useEffect(() => {

    // get the user authentication status by an api call
    const endpoint = `users/auth-status`
    const userId = readLocalStorage('uid')
    if( userId ) {
      fetchData(endpoint).then(data => {
        if(data.status === 200){
          dispatch(userLoggedInStatus({isLoggedIn: true}))
          dispatch(fetchAndSetWish())
          dispatch(setUserPurchasedBook( userId ))
        }
      })
    }

    // add scroll event listner
    const scrollHandler = () => {
      const targetHeight = window.innerHeight
      const targetElement = backToTopRef.current 

      if( ( scrollEleRef.current.scrollTop >= targetHeight && !targetElement.classList.contains('grid') ) || ( scrollEleRef.current.scrollTop < targetHeight && targetElement.classList.contains('grid') ) ) {
        targetElement.classList.toggle('grid')
        targetElement.classList.toggle('hidden')
      }
    }

    scrollEleRef.current.addEventListener('scroll', scrollHandler)
    const ele = scrollEleRef.current

    return () => {
      ele.removeEventListener('scroll', scrollHandler)
    }

  }, [])  

  
  return (
    <section 
      ref={scrollEleRef} 
      className='no-scrollbar flex flex-col h-dvh w-dvw overflow-y-auto scroll-smooth'
    >
      <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <div 
        ref={backToTopRef} 
        className='h-10 w-10 rounded-full bg-slate-300/60 hover:bg-slate-300/100 dark:bg-slate-900/60 dark:hover:bg-slate-900/100 dark:text-white cursor-pointer z-20 absolute place-items-center hidden text-lg bottom-[10px] right-[10px] select-none  '
        onClick={handleScrollToTop}
      >
        <TbNavigationTop />
      </div>
    </section>
  )
}

export default Layout