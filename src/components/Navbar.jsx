import React, { useEffect, useRef, useState } from 'react'
import Image from './Image'
import Searchbar from './Searchbar'
import ToggleButton from './ToggleButton'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { fetchData, logout } from '../utility'
import { useSlice } from '../redux/utility'

function Navbar() {
  const navigate = useNavigate()
  const settingRef = useRef(null)
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [ slice, dispatch ] = useSlice('wish')
  const {total} = slice

  function handleNavigation(path) {
    navigate(`/${path}`)
  }

  const handleToggleSettingBlock = () => {
    const parent = settingRef.current.classList 
    parent.toggle('hidden')
  }

  const openSearchBox = () => {
    setShowSearchBox(true)
  }

  useEffect(() => {

    const endpoint = `users/auth-status`
    fetchData(endpoint)
      .then(data => {
        if(data.status === 'authorized'){
          setIsAuthenticated(true)
        }
      })

    return () => {
      console.log('navbar unmounting...')
    }
  }, [])
  


  return (
    <nav className='h-20 bg-slate-200 dark:bg-slate-800 flex px-3'>
        <Link to='/' className=' h-full w-32 flex items-center justify-center'>
            <Image src='logo.png' height='h-16' width='w-16' />
        </Link>
        {showSearchBox && <Searchbar closeSearchBox={() => setShowSearchBox(false)} />}
         
        <div className='h-full flex items-center flex-1 justify-end gap-1' >
          <div 
            className='w-10 h-10 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 hover:dark-slate-500 rounded-full grid place-items-center cursor-pointer'
            onClick={openSearchBox}
          >
            <Image
              src='/searchIcon.svg'
              width={'w-6'}
              height={'h-6'}
              cursor={'cursor-pointer'}
            />
          </div>
          <Button 
            clickMethod={() => handleNavigation('gallery')}
            height='h-12'
            width='w-16'
            bg='bg-transparent'
            color='dark:text-slate-50'
            hover='hover:bg-slate-400 hover:dark:bg-slate-950'
            text='text-sm'
            display={'hidden md:inline-block'}
          >
            Gallery
          </Button>

          {isAuthenticated ? '' : (
            <div className='h-full hidden md:flex items-center'>
              <Button 
                clickMethod={() => handleNavigation('login')}
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
      
          <div className='grid place-content-center'>
            <Image 
              src='setting.png' 
              height='h-10' 
              width='w-10 '
              cursor={'cursor-pointer'}
              clickMethod = {handleToggleSettingBlock}
            />

            <div 
              className='fixed hidden top-20 right-0 p-1 bg-slate-200 dark:bg-slate-800 rounded z-10 w-36 ' 
              ref={settingRef}
            >
              <ToggleButton />
              <Button 
                clickMethod={() => handleNavigation('gallery')}
                height='h-8'
                width='w-full'
                bg='bg-transparent'
                color='dark:text-slate-50'
                hover='hover:bg-slate-400 hover:dark:bg-slate-950'
                display={'md:hidden'}
              >
                gallery
              </Button>
              {
                isAuthenticated ? (<>
                <Button 
                  clickMethod={() => handleNavigation('myBooks')}
                  height='h-8'
                  width='w-full'
                  bg='bg-transparent'
                  color='dark:text-slate-50'
                  hover='hover:bg-slate-400 hover:dark:bg-slate-950'
                >
                  my books
                </Button>
                <Button 
                  clickMethod={() => handleNavigation('myWish')}
                  height='h-8'
                  width='w-full'
                  bg='bg-transparent'
                  color='dark:text-slate-50'
                  hover='hover:bg-slate-400 hover:dark:bg-slate-950'
                >
                  {total ? total : ''} wishlist
                </Button>
                <Button 
                  clickMethod={isAuthenticated && (() => logout(navigate))}
                  height='h-8'
                  width='w-full'
                  bg={'bg-red-500 dark:bg-red-700'}
                  color='text-slate-50'
                  hover={'hover:bg-red-600'}
                >
                  logout
                </Button>
              </>) : (<Button 
                  clickMethod={() => handleNavigation('login')}
                  height='h-8'
                  width='w-full'
                  bg='bg-blue-400 dark:bg-blue-600'
                  color='dark:text-slate-50'
                  hover='hover:bg-blue-500 dark:hover:bg-blue-400'
                  text='text-xs'
                  display={'md:hidden'}
                >
                  Sign In
                </Button>)
              }
              
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar