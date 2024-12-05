import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  
  return (
    <section>
        <Navbar />
        <Outlet />
    </section>
  )
}

export default Layout