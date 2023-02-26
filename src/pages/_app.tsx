import '../styles/globals.css'
import '../styles/theme.scss'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SSRProvider } from '@react-aria/ssr';

import { useState } from 'react'
import { Router } from 'next/router'

import { ClubDashboardGlobalContext } from '../contexts/ClubDashboard/ClubDashboardGlobalContext'
import { LoaderSpinner } from '../components/Loader'
import { Header } from '../components/Header'

import { ClubProvider } from '../@types/ClubProviderTypes'
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [isLoad, setIsLoad] = useState(true)
  const [clubProviderInfo, setClubProviderInfo] = useState<ClubProvider | null>(null)
  const [showOnlyAdminsInDashboard, setShowOnlyAdminsInDashboard] = useState<boolean>(false)

  Router.events.on("routeChangeStart", (url) => {
    setIsLoad(false)
  })

  Router.events.on("routeChangeComplete", (url) => {
    setIsLoad(true)
  })

  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <ClubDashboardGlobalContext.Provider value={{
          clubProviderInfo, setClubProviderInfo,
          showOnlyAdminsInDashboard, setShowOnlyAdminsInDashboard
        }}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Golos+Text&display=swap" rel="stylesheet" />
          </Head>
          <Header />
          {isLoad ?
            <Component {...pageProps} />
            :
            <LoaderSpinner />
          }
          <footer className='p-5 bg-dark mt-4 text-white'>footer</footer>
        </ClubDashboardGlobalContext.Provider>
      </SessionProvider>
    </SSRProvider>
  )
}
