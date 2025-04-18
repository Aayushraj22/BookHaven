import React, { useEffect, useState } from 'react'
import { CiLight, CiDark } from "react-icons/ci";
import { readLocalStorage, setLocalStorage } from '../utility';

function ThemeButton() {
  const [ theme, setTheme ] = useState(readLocalStorage('theme') || 'light')

    function setAppTheme(theme) {
      // reference root element
      const root = document.querySelector('#root')
      if(theme?.toLowerCase() === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    const changeTheme = () => {
      const newTheme = theme?.toLowerCase() === 'dark' ? 'light' : 'dark'
      setLocalStorage('theme', newTheme)
      setTheme(newTheme)

      setAppTheme(newTheme)
      
    }

    useEffect(() => {
      setAppTheme(theme)
    }, [])
    

  return (
    <div 
        className='w-10 h-10 rounded-lg grid place-items-center cursor-pointer gap-1 py-2 select-none dark:text-white dark:hover:bg-slate-600 hover:bg-slate-300'
        onClick={changeTheme}
        title={`${theme?.toLowerCase() === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'light' ? <CiDark size={24} /> : <CiLight size={24} />}
    </div>
  )
}
export default ThemeButton