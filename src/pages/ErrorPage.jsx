import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function ErrorPage() {
    const {error} = useLocation().state
    const navigate = useNavigate()

    
    const navigateToHome = () => {
        navigate('/')
    }
  return (
    <main className='bg-gradient-to-b from-slate-200 from-20% via-slate-700 via-30% to-slate-950 w-dvw h-dvh flex items-center justify-center'>
        <div className='w-72 h-56 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex flex-col gap-4 items-center justify-center backdrop-opacity-10'>
          <h3 className='font-serif font-semibold text-slate-100 text-lg'>{error.message}</h3>
          
          <Button 
            bg={'bg-blue-800'}
            color={'text-white'}
            hover={'hover:bg-blue-900'}
            clickMethod={navigateToHome}
          >
            Go Home
          </Button>
        </div>
    </main>
  )
}

export default ErrorPage