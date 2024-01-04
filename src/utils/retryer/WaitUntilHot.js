import { useEffect, useState } from 'react'
import axios  from 'axios'
import { LoadingPage } from 'react-admin'
import { retryOnFailure }  from './retryer.js'
import { BASE_PATH } from '@haapi/typescript-client/dist/base.js'

export function WaitUntilHot({ children, url }){
  const [ isHost, setHot ] = useState(false)
  
  useEffect(()=>{
    const retryConfig = {
      id: "ResolveUnderFailAfter",
      maxAttempt: 5, 
      backoff: 5_000,
      enableLog: true,
    }
    
    retryOnFailure(
      ()=> axios.get(`${BASE_PATH}/ping`).then(()=> setHot(true)), retryConfig
    ) 
  },[]) 
  
  return (
    isHost ? children : 
      <LoadingPage 
        loadingPrimary='Chargement' 
        loadingSecondary='La page est en cours de chargment, merci  de bien vouloir patienter.' 
      />
  )
}
