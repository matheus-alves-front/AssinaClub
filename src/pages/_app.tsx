import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/theme.scss'
import { Router } from 'next/router'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoad, setIsLoad] = useState(true)
  
  Router.events.on("routeChangeStart", (url) => {
    setIsLoad(false)
  })

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoad(true)
  })
  
  return (
    <main>
      {isLoad ? 
        <Component {...pageProps} />
        : 
        <Spinner className='position-fixed top-50 start-50' animation="border" />
      }
    </main>
  )
}
