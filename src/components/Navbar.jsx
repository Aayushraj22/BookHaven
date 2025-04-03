import React, { useEffect, useRef, useState } from 'react'
import Image from './Image'
import Searchbar from './Searchbar'
import ToggleButton from './ToggleButton'
import { Link, useNavigate } from 'react-router-dom'
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

  function handleNavigation(path) {
    navigate(`/${path}`)
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
    <nav className='w-full bg-slate-200 dark:bg-slate-800 flex p-2 px-3 '>
        <Link to='/' className=' h-16 w-32 grid place-items-center '>
            <Image src='logo.png' height='h-12' width='w-12' />
        </Link>
        <AnimatePresence>
          {showSearchBox && <Searchbar closeSearchBox={ toggleSearchVisibility } />}
        </AnimatePresence>
         
        <div className='h-full flex items-center flex-1 justify-end gap-1' >
          <div 
            className='w-10 h-10 hover:bg-slate-300 dark:hover:bg-slate-600 grid place-items-center cursor-pointer rounded-lg text-lg dark:text-white'
            onClick={ toggleSearchVisibility }
          >
            <BsSearch />
          </div>
          <ToggleButton />
          <Button 
            clickMethod={() => handleNavigation('gallery')}
            height='h-10'
            width='w-16'
            bg='bg-transparent'
            color='dark:text-slate-50'
            hover='hover:bg-slate-300 dark:hover:bg-slate-600'
            text='text-sm'
            display={'hidden md:inline-block'}
          >
            Gallery
          </Button>
          {status ? '' : (
            <div className='h-full hidden md:flex items-center'>
              <Button 
                clickMethod={() => handleNavigation('login')}
                height='h-10'
                width='w-16'
                bg='bg-blue-500 dark:bg-blue-700'
                color='text-slate-50'
                hover='hover:bg-blue-600 dark:hover:bg-blue-600'
                text='text-sm'
                margin='mr-2'
                >
                Sign In
              </Button>
            </div>
          )}
        
          <div className={`place-content-center ${status ? 'grid' : 'md:hidden'}`}>
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
                      className='float-end mt-10 p-1 bg-slate-200 dark:bg-slate-800 rounded w-36 ' 
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
                          clickMethod={() => handleNavigation('myBooks')}
                          height='h-8'
                          width='w-full'
                          bg='bg-transparent'
                          color='dark:text-slate-50'
                          hover='hover:bg-slate-400 hover:dark:bg-slate-950 hover:text-white'
                        >
                          my books
                        </Button>
                        <Button 
                          clickMethod={() => handleNavigation('myWish')}
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
                      </>) : (<Button 
                          clickMethod={() => handleNavigation('login')}
                          height='h-8'
                          width='w-full'
                          bg='bg-blue-400 dark:bg-blue-600'
                          color='text-slate-50'
                          hover='hover:bg-blue-500 dark:hover:bg-blue-400'
                          text='text-xs'
                          display={'md:hidden'}
                        >
                          Sign In
                        </Button>)
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