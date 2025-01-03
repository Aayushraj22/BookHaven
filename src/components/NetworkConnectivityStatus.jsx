import React, { useEffect } from 'react'
import { listenerToCheckInternetConnection } from '../utility'

function NetworkConnectivityStatus({children}) {
    
    useEffect(() => {
      listenerToCheckInternetConnection('add')
    
      return () => {
        listenerToCheckInternetConnection('remove')
      }
    }, [])
    
  return (
    <>
        {children}
    </>
  )
}

export default NetworkConnectivityStatus