import React, { useEffect, useState } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { isUserAuthentic } from '../utility';
import axios from 'axios';

function ProtectedRoute({children}) {
    // const isAuthenticated = isUserAuthentic()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
      const url = `${import.meta.env.VITE_DOMAIN_NAME}/users/auth-status`
      axios.get(url, {withCredentials: true})
      .then(response => {

        const data = response.data
        if(data.status === 'authorized'){
          setIsAuthenticated(true)
        }
      })
      .finally(() => {
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
      {isAuthenticated ? <>{children}</> : <Navigate to='/login' />}
    </>
  )
}

export default ProtectedRoute