import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { readLocalStorage } from '../utility'
import { fetchAndSetWish } from '../redux/slices/WishlistSlice'

function Layout() {
  const uid = readLocalStorage('uid')
  const dispatch = useDispatch()
  dispatch(fetchAndSetWish(uid))
  
  return (
    <section className='flex flex-col h-dvh w-dvw overflow-y-auto'>
        <Navbar />
        <div className='flex-1'>
          <Outlet />
        </div>
    </section>
  )
}

export default Layout