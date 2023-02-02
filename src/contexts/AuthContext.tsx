import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { Subscriber } from "../@types/SubscriberTypes";
import { ClubProvider } from "../@types/ClubProviderTypes";
import axios from "axios";
import { Router } from "next/router";

type AuthContextType = {
  isAuthenticated: boolean
  signIn: ({token, userId}: signInDataType) => Promise<void>
  typeOfPerson: string
  updateTypeOfPerson: (type: string) => void
}

type signInDataType = {
  token: string
  userId: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: any) {
  const [typeOfPerson, setTypeOfPerson] = useState('subscriber')
  const [userInformation, setUserInformation] = useState<Subscriber | ClubProvider | null>(null)
  
  let isAuthenticated = !!userInformation 

  Router.events.on('routeChangeStart', () => {
    isAuthenticated = !!userInformation 
    console.log('mudou')
  })

  function updateTypeOfPerson(type: string) {
    setTypeOfPerson(type)
  }

  async function signIn({token, userId}: signInDataType) {
    setCookie(undefined, 'AssinaClubLoginToken', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setCookie(undefined, 'AssinaClubUserId', userId, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    const { 'AssinaClubUserId': id } = parseCookies()

    console.log(id)

    if (id) {
      axios.get(`/api/subscribers/${id}`).then(response => {
        setUserInformation(response.data.data)
      })
    }
  }

  useEffect(() => {
    console.log('userInformation', userInformation)
  }, [userInformation])


  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
      typeOfPerson,
      updateTypeOfPerson
      }}>
      {children}
    </AuthContext.Provider>
  )
}