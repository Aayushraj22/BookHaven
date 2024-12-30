import React, { Suspense, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { fetchData } from '../utility';

function ProtectedRoute({children}) {
    // const isAuthenticated = isUserAuthentic()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
      const endpoint = `users/auth-status`

      fetchData(endpoint)
      .then(data => {
        if(data.status === 'authorized'){
          setIsAuthenticated(true)
        }

        setIsLoading(false)
      })

      
    }, [])

    if(isLoading) {
      return <main className='dark:bg-black bg-slate-100 grid place-items-center h-full w-full text-slate-800 dark:text-slate-200'>
        <p className='capitalize'>processing user ...</p>
      </main>
    }
    
  return (
    <>
      {isAuthenticated ? 
        <Suspense>
          {children}
        </Suspense> : 
        <Navigate to='/login' />
      }
    </>
  )
}

export default ProtectedRoute