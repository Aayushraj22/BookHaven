import React, { useState } from 'react'
import Image from './Image'


function ToggleButton() {
    const themeMode = ['light.png', 'dark.png']
    const rootEle = document.getElementById('root')
    const [theme, setTheme] = useState(!rootEle.classList.contains('dark'))

    const toggleTheme = () => {
      setTheme(prev => !prev)
      document.getElementById('root').classList.toggle('dark')
    }
  return (
    <div 
        className='w-20 h-full flex justify-center items-center cursor-pointer gap-1 py-2'
        onClick={toggleTheme}
    >
        <Image src={themeMode[Number(theme)]} width='w-6' height='h-6'/>
        <span className='text-xs dark:text-white'>{theme ? "Dark" : "Light"}</span>
    </div>
  )
}

export default ToggleButton