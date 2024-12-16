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
    <section>
        <Navbar />
        <Outlet />
    </section>
  )
}

export default Layout