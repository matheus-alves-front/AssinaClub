import '../styles/globals.css'
import '../styles/theme.scss'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { useState } from 'react'
import { Router } from 'next/router'

import { SSRProvider } from '@react-aria/ssr';

import { Header } from '../components/Header'
import { LoaderSpinner } from '../components/Loader'
import { ClubProvider } from '../@types/ClubProviderTypes'
import { ClubDashboardGlobalContext } from '../contexts/ClubDashboard/ClubDashboardGlobalContext'

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
