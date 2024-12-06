import React, { useEffect, useRef, useState } from 'react'
import Image from './Image'
import Searchbar from './Searchbar'
import ToggleButton from './ToggleButton'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { logoutUser } from '../utility'
import axios from 'axios'

function Navbar() {
  const navigate = useNavigate()
  const settingRef = useRef(null)
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleGalleryView = () => {
    navigate('/gallery')
  }

  const handleSigninButton = () => {
    navigate('/login')
  }

  const handleToggleSettingBlock = () => {
    const parent = settingRef.current.classList 
    parent.toggle('hidden')
  }

  useEffect(() => {
    
    const url = `${import.meta.env.VITE_DOMAIN_NAME}/users/auth-status`
      axios.get(url, {withCredentials: true}).then(response => {
        const data = response.data
        if(data.status === 'authorized'){
          setIsAuthenticated(true)
        }
      })

    return () => {
      console.log('navbar unmounting...')
    }
  }, [])
  


  return (
    <nav className='h-20 bg-stone-300 dark:bg-stone-800 flex px-3'>
        <Link to='/' className=' h-full w-32 flex items-center justify-center'>
            <Image src='logo.png' height='h-16' width='w-16' />
        </Link>
        <div className='flex-1  h-full flex items-center justify-center '>
            <Searchbar />
        </div>
        <div className='h-full flex items-center'>
          <Button 
            clickMethod={handleGalleryView}
            height='h-12'
            width='w-16'
            bg='bg-transparent'
            color='dark:text-slate-50'
            hover='hover:bg-stone-400 hover:dark:bg-stone-950'
            text='text-sm'
          >
            Gallery
          </Button>
        </div>
        {isAuthenticated ? '' : (
          <div className='h-full flex items-center'>
          <Button 
              clickMethod={handleSigninButton}
              height='h-12'
              width='w-16'
              bg='bg-blue-400 dark:bg-blue-600'
              color='dark:text-slate-50'
              hover='hover:bg-blue-500 dark:hover:bg-blue-400'
              text='text-sm'
              margin='mr-2'
            >
              Sign In
            </Button>
        </div>
        )}
        

        <div className='grid place-content-center relative'>
          <Image 
            src='setting.png' 
            height='h-10' 
            width='w-10'
            cursor={'cursor-pointer'}
            clickMethod = {handleToggleSettingBlock}
          />

          <div 
            className='absolute hidden top-full right-0 p-1 bg-stone-300 dark:bg-stone-800 rounded' 
            ref={settingRef}
          >
            <ToggleButton />
            <Link 
              to={'/myBooks'}
              className='h-8 w-full text-xs grid place-content-center capitalize dark:text-slate-50 hover:bg-sky-400 hover:dark:bg-sky-900 rounded'
            >
              my books
            </Link>
            {
              isAuthenticated ? (<Button 
                clickMethod={isAuthenticated && logoutUser}
                height='h-8'
                width='w-full'
                bg={isAuthenticated ? 'bg-transparent' : 'bg-sky-400 dark:bg-sky-500'}
                color='dark:text-slate-50'
                hover={isAuthenticated ? 'hover:bg-red-500 hover:dark:bg-red-800' : 'hover:bg-sky-500 dark:hover:bg-sky-600'}
                text='text-xs'
              >
                logout
              </Button>) : ''
            }
            
          </div>
        </div>
    </nav>
  )
}

export default Navbar