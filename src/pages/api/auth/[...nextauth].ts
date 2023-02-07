import NextAuth, { DefaultSession } from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

import { getSubscriber } from "../../../prisma/subscribers";
import { getAdmin } from "../../../prisma/adminsClubProviders";
import { getClubProvider } from "../../../prisma/clubProviders";

import { ClubProvider } from "../../../@types/ClubProviderTypes";
import { Subscriber } from "../../../@types/SubscriberTypes";
import { Admin } from "../../../@types/AdminsClubProviderTypes";


const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

type GeneralLogin = {
  token: string
  typeOfUser: string
  email: string
}

type UserTypes = {
  subscriberId?: string
  clubProviderId?: string
  adminId?: string
}

type AccountType = {
  userId: string
  typeOfUser: string
}

interface NewSession extends DefaultSession, UserTypes {
  userData: Subscriber | ClubProvider | Admin | null
}

const secret = process.env.SECRET

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: String(githubId),
      clientSecret: String(githubSecret)
    }),
    CredentialsProvider({
      id: "GeneralLogin",
      name: "GeneralLogin",
      credentials: {
        token: { label: 'token', type: 'text' },
        typeOfUser: { label: 'typeOfUser', type: 'text' },
        email: { label: 'email', type: 'text' }
      },
      async authorize(credentials, req) {
        const {
          token,
          typeOfUser,
          email
        } = credentials as GeneralLogin

        let id = ""

        if (typeOfUser === "subscriber") {
          const { subscriberId } = jwt.decode(token) as UserTypes
          id = String(subscriberId)

        } else if (typeOfUser === "clubProvider") {
          const { clubProviderId } = jwt.decode(token) as UserTypes
          id = String(clubProviderId)

        } else if (typeOfUser === "admin") {
          const { adminId, clubProviderId } = jwt.decode(token) as UserTypes
          id = String(adminId) + "-" + String(clubProviderId)
        }

        return {
          id,
          email,
          typeOfUser
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        account.typeOfUser = credentials?.typeOfUser
        account.userId = user.id
      }

      return true
    },
    async jwt({ token, account, profile }) {
      if (account) token.account = account
      return token
    },
    async session({ session, token, user }) {
      const {typeOfUser, userId} = token.account as AccountType

      let userData
      
      if (typeOfUser === 'subscriber') {
        userData = await getSubscriber(String(userId))
        
      } else if ((typeOfUser === 'clubProvider')) { 
        userData = await getClubProvider(String(userId))
        
      } else if ((typeOfUser === 'admin')) { 
        const adminId = userId.split('-')[0]
        const clubProviderId = userId.split('-')[1]
        userData = await getAdmin(String(adminId))      
        if(userData) {
          userData.clubProviderId = clubProviderId
        }
      }    
      
      const newSession = {
        ...session, userData, typeOfUser
      } as NewSession

      console.log(newSession)
      
      return newSession
    }
  },
  secret: secret
}

export default NextAuth(authOptions)