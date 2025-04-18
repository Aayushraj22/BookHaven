import React, { useEffect, useRef, useState } from 'react'
import Image from './Image'
import Searchbar from './Searchbar'
import ThemeButton from './ThemeButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import { logout } from '../utility'
import { useSlice } from '../redux/utility'
import { BsSearch } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { motion, AnimatePresence } from 'motion/react'

function Navbar() {
  const navigate = useNavigate()
  const [ { status } ] = useSlice('auth')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [ { total }, dispatch ] = useSlice('wish')
  const { pathname } = useLocation()

  function handleNavigation(path) {
    path = path ? `/${path}` : '/'
    navigate(path)
  }

  const handleToggleSettingBlock = () => {
    setShowMenu(prev => !prev)
  }

  const toggleSearchVisibility  = () => {
    setShowSearchBox( prev => !prev )
  }

  const handleLogout = () => {
    logout(navigate, dispatch, handleToggleSettingBlock)
  }
  

  useEffect(() => {
    const windowResize = () => {
      const screenWidth = innerWidth 
      if(screenWidth >= 768 && showMenu){
        setShowMenu(false)
      }
    }
    
    window.addEventListener('resize', windowResize)
  
    return () => {
      window.removeEventListener('resize', windowResize)
    }
  }, [showMenu])
  

  return (
    <nav className='w-full  flex p-2 px-4 sm:px-10 lg:px-20 xl:px-32 '>
        <div className=' h-16 w-20 grid place-items-center '>
            <Image src='logo.png' height='h-12' width='w-12' />
        </div>
        <AnimatePresence>
          {showSearchBox && <Searchbar closeSearchBox={ toggleSearchVisibility } />}
        </AnimatePresence>
         
        <div className='h-full flex items-center flex-1 justify-end gap-1' >
          <div 
            className='w-10 h-10 hover:bg-slate-300 dark:hover:bg-slate-600 grid place-items-center cursor-pointer rounded-lg text-lg dark:text-white'
            onClick={ toggleSearchVisibility }
            title='search'
          >
            <BsSearch />
          </div>
          <ThemeButton />
          <Button 
            clickMethod={() => handleNavigation()}
            height='h-10'
            width='w-16'
            bg='bg-transparent'
            color='dark:text-slate-50'
            hover='hover:bg-slate-300 dark:hover:bg-slate-600'
            text='text-sm'
            active={pathname === '/'}
          >
            home
          </Button>
          <Button 
            clickMethod={() => handleNavigation('gallery')}
            height='h-10'
            width='w-16'
            bg='bg-transparent'
            color='dark:text-slate-50'
            hover='hover:bg-slate-300 dark:hover:bg-slate-600'
            text='text-sm'
            display={'hidden md:inline-block'}
            active={pathname === '/gallery'}
          >
            Gallery
          </Button>
          {status ? (<>
            <Button 
              clickMethod={() => handleNavigation('purchased-books')}
              height='h-10'
              width='w-20'
              bg='bg-transparent'
              color='dark:text-slate-50'
              hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
              text='text-sm'
              display={'hidden md:inline-block'}
              active={pathname === '/purchased-books'}
            >
              my books
            </Button>
            <Button 
              clickMethod={() => handleNavigation('wishlist')}
              height='h-10'
              width='w-20'
              bg='bg-transparent'
              color='dark:text-slate-50'
              hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
              text='text-sm'
              display={'hidden md:inline-block'}
              active={pathname === '/wishlist'}
            >
              {total ? total : ''} wishlist
            </Button>
            <Button 
              clickMethod={handleLogout}
              height='h-10'
              width='w-20'
              bg={'bg-transparent'}
              color='dark:text-slate-50'
              hover={'hover:bg-red-300 hover:text-red-700 dark:hover:bg-red-700 dark:hover:text-red-300'}
              text='text-sm'
              display={'hidden md:inline-block'}
            >
              logout
            </Button>
          </>) : (
            <div className='h-full hidden md:flex items-center'>
              <Button 
                clickMethod={() => handleNavigation('login')}
                height='h-10'
                width='w-16'
                bg='bg-transparent'
                color='dark:text-slate-50'
                hover='hover:bg-slate-300 dark:hover:bg-slate-600'
                text='text-sm'
                margin='mr-2'
                >
                Login
              </Button>
              <Button 
                clickMethod={() => handleNavigation('register')}
                height='h-10'
                width='w-20'
                bg='bg-blue-500 dark:bg-blue-700'
                color='text-slate-50'
                hover='hover:bg-blue-600 dark:hover:bg-blue-600'
                text='text-sm'
                margin='mr-2'
                >
                sign up
              </Button>
            </div>
          )}
        
          <div className={`place-content-center grid md:hidden`}>
            <FaGear 
              className='h-6 w-6 cursor-pointer text-slate-500 dark:text-slate-300' onClick={handleToggleSettingBlock}
            />

            <AnimatePresence>
              {showMenu && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 z-10 backdrop-blur-sm'
                    onClick={handleToggleSettingBlock}  
                  >
                    <div 
                      className='float-end mt-10 p-1 bg-slate-200 dark:bg-slate-800 rounded w-36  border-2' 
                    >
                      <Button 
                        clickMethod={() => handleNavigation('gallery')}
                        height='h-8'
                        width='w-full'
                        bg='bg-transparent'
                        color='dark:text-slate-50'
                        hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
                        display={'md:hidden'}
                      >
                        gallery
                      </Button>
                      {
                        status ? (<>
                        <Button 
                          clickMethod={() => handleNavigation('purchased-books')}
                          height='h-8'
                          width='w-full'
                          bg='bg-transparent'
                          color='dark:text-slate-50'
                          hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
                        >
                          my books
                        </Button>
                        <Button 
                          clickMethod={() => handleNavigation('wishlist')}
                          height='h-8'
                          width='w-full'
                          bg='bg-transparent'
                          color='dark:text-slate-50'
                          hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
                        >
                          {total ? total : ''} wishlist
                        </Button>
                        <Button 
                          clickMethod={handleLogout}
                          height='h-8'
                          width='w-full'
                          bg={'bg-red-500 dark:bg-red-700'}
                          color='text-slate-50'
                          hover={'hover:bg-red-600'}
                        >
                          logout
                        </Button>
                      </>) : (<>
                        <Button 
                          clickMethod={() => handleNavigation('login')}
                          height='h-8'
                          width='w-full'
                          bg='bg-transparent'
                          color='dark:text-slate-50'
                          hover='hover:bg-blue-500 dark:hover:bg-blue-400'
                          text='text-xs'
                          display={'md:hidden'}
                        >
                          Sign In
                        </Button>
                        <Button 
                        clickMethod={() => handleNavigation('login')}
                        height='h-8'
                        width='w-full'
                        bg='bg-blue-400 dark:bg-blue-600'
                        color='text-slate-50'
                        hover='hover:bg-blue-500 dark:hover:bg-blue-400'
                        text='text-xs'
                        display={'md:hidden'}
                      >
                        sign up
                      </Button>  
                      </>)
                      }
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </nav>
  )
}

export default Navbar