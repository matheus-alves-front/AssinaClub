import '../styles/globals.css'
import '../styles/theme.scss'

import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Router } from 'next/router'

import { Spinner } from 'react-bootstrap'

import { Header } from '../components/Header'
import { AuthProvider} from '../contexts/AuthContext'


export default function App({ Component, pageProps }: AppProps) {
  const [isLoad, setIsLoad] = useState(true)

  Router.events.on("routeChangeStart", (url) => {
    setIsLoad(false)
  })

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoad(true)
  })
  
  return (
    <AuthProvider>
      <Header />
      {isLoad ? 
        <Component {...pageProps} />
        : 
        <Spinner className='position-fixed top-50 start-50' animation="border" />
      }
    </AuthProvider>
  )
}
