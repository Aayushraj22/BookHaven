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
      return <>
        Verifying User ...
      </>
    }
    
  return (
    <>
      
      {isAuthenticated ? <Suspense>{children}</Suspense> : <Navigate to='/login' />}
    </>
  )
}

export default ProtectedRoute