import '../styles/globals.css'
import '../styles/theme.scss'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { useState } from 'react'
import { Router } from 'next/router'

import { Spinner } from 'react-bootstrap'

import { Header } from '../components/Header'
import { LoaderSpinner } from '../components/Loader'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isLoad, setIsLoad] = useState(true)

  Router.events.on("routeChangeStart", (url) => {
    setIsLoad(false)
  })

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoad(true)
  })

  return (
    <SessionProvider session={session}>
        <Header />
        {isLoad ?
          <Component {...pageProps} />
          :
          <LoaderSpinner />
        }
        <footer className='p-5 bg-dark mt-5 text-white'>footer</footer>
    </SessionProvider>
  )
}
