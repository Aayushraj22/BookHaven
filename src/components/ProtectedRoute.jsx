import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Fallback from '../utility/components/Fallback';

function ProtectedRoute({children}) {
    const {status} = useSelector(state => state.auth)
    const [isSyncWithReduxStore, setIsSyncWithReduxStore] = useState(0)
    // console.log('status: ',status)

    useEffect(() => {
      // artifically delaying for 1s so that, if redux store have data that will get sync
      if(!status) {
        setTimeout(() => {
          setIsSyncWithReduxStore(1)
        }, 500);
      }
    }, [])
    
    
    if(!status && isSyncWithReduxStore === 0){
      return <Fallback loader={'watch'} />
    }
    
    
  return (
    <>
      {status ? 
          <>{children}</> : 
        <Navigate to={'/login'} />
      }
    </>
  )
}

export default ProtectedRoute