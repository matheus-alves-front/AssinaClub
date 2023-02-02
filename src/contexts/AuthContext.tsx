import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { Subscriber } from "../@types/SubscriberTypes";
import { ClubProvider } from "../@types/ClubProviderTypes";
import axios from "axios";
import { Router, useRouter } from "next/router";

type AuthContextType = {
  isAuthenticated: boolean
  signIn: ({token, userId}: signInDataType) => Promise<void>
  signOut: () => void
  typeOfPerson: string
  updateTypeOfPerson: (type: string) => void
  userInformation: Subscriber | ClubProvider | null
}

type signInDataType = {
  token: string
  userId: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any) {
  const router = useRouter()

  const [typeOfPerson, setTypeOfPerson] = useState('subscriber')
  const [userInformation, setUserInformation] = useState<Subscriber | ClubProvider | null>(null)
  
  let isAuthenticated = !!userInformation 

  useEffect(() => {
    const { 'AssinaClubUserId': id } = parseCookies()

    if (id && !userInformation) {
      axios.get(`/api/subscribers/${id}`).then(response => {
        setUserInformation(response.data.data)
        isAuthenticated = true
      })
    }
  }, [])

  Router.events.on('routeChangeStart', () => {
    isAuthenticated = !!userInformation
  })

  async function signIn({token, userId}: signInDataType) {
    setCookie(undefined, 'AssinaClubLoginToken', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'AssinaClubUserId', userId, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    const { 'AssinaClubUserId': id } = parseCookies()

    if (id) {
      axios.get(`/api/subscribers/${id}`).then(response => {
        setUserInformation(response.data.data)
      })
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'AssinaClubLoginToken')
    destroyCookie(undefined, 'AssinaClubUserId')
    setUserInformation(null)

    router.push(`/login/${typeOfPerson}`)
  }


  function updateTypeOfPerson(type: string) {
    setTypeOfPerson(type)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
      signOut,
      typeOfPerson,
      updateTypeOfPerson,
      userInformation
      }}>
      {children}
    </AuthContext.Provider>
  )
}