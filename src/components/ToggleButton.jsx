import React, { useState } from 'react'
import Image from './Image'
import { useSlice } from '../redux/utility'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/slices/ThemeSlice'


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
        className='w-full h-full flex justify-center items-center cursor-pointer gap-1 py-2 select-none '
        onClick={changeTheme}
    >
        <Image src={themeMode[theme === 'light' ? 1 : 0]} width='w-6' height='h-6' cursor={'cursor-pointer'} />
        <span className='text-xs dark:text-white capitalize '>{theme ==='light' ? "dark" : "light"}</span>
    </div>
  )
}

export default ToggleButton