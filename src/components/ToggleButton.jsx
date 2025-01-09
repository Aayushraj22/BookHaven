import React, { useState } from 'react'
import Image from './Image'
import { useSlice } from '../redux/utility'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/slices/ThemeSlice'
import { CiLight, CiDark } from "react-icons/ci";


function ToggleButton() {
    const themeMode = ['light.png', 'dark.png']

    const [ slice, dispatch ] = useSlice('theme')
    const { theme } = slice

    // reference root element
    const root = document.querySelector('#root')
    if(theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    const changeTheme = () => {
      dispatch(toggleTheme())
    }

  return (
    <div 
        className='w-10 h-10 rounded-lg grid place-items-center cursor-pointer gap-1 py-2 select-none dark:text-white dark:hover:bg-slate-600 hover:bg-slate-300'
        onClick={changeTheme}
    >
      {theme === 'light' ? <CiDark size={24} /> : <CiLight size={24} />}
    </div>
  )
}

export default ToggleButton