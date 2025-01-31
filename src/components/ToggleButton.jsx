import React, { useEffect, useState } from 'react'
import { CiLight, CiDark } from "react-icons/ci";
import { readLocalStorage, setLocalStorage } from '../utility';


function ToggleButton() {
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
      setLocalStorage('theme', theme?.toLowerCase() === 'dark' ? 'light' : 'dark')
      setTheme(theme?.toLowerCase() === 'dark' ? 'light' : 'dark')

      setAppTheme(theme === 'dark' ? 'light' : 'dark')
      
    }

    useEffect(() => {
      setAppTheme(theme)
    }, [])
    

  return (
    <div 
        className='w-10 h-10 rounded-lg grid place-items-center cursor-pointer gap-1 py-2 select-none dark:text-white dark:hover:bg-slate-600 hover:bg-slate-300'
        onClick={changeTheme}
    >
      {theme === 'dark' ? <CiDark size={24} /> : <CiLight size={24} />}
    </div>
  )
}

export default ToggleButton