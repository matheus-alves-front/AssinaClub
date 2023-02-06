import NextAuth, { DefaultSession } from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { getSubscriber } from "../../../prisma/subscribers";
import { Subscriber } from "../../../@types/SubscriberTypes";

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

type SubscriberLogin = {
  token: string
  typeOfUser: string
  email: string
}

type TokenSubscriberType = {
  subscriberId: string
}

interface NewSession extends DefaultSession, TokenSubscriberType {
  userData: Subscriber | null
}

const secret = process.env.SECRET

export default NextAuth({
    providers: [
      GithubProvider({
        clientId: String(githubId),
        clientSecret: String(githubSecret)
      }),
      CredentialsProvider({
        id: "SubscriberLogin",
        name: "SubscriberLogin",
        credentials: {
          token: {label: 'subscriberToken', type: 'text'},
          typeOfUser: {label: 'typeOfUser', type: 'text'},
          email: {label: 'email', type: 'text'}
        },
        async authorize(credentials, req) {
          const {
            token,
            typeOfUser,
            email
          } = credentials as SubscriberLogin

          const { 
            subscriberId
          } = jwt.decode(token) as TokenSubscriberType
          
          return {
            id: subscriberId,
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
          account.subscriberId = user.id
        }

        return true
      },
      async jwt({ token, account, profile }) {
        if (account) {
          const { 
            subscriberId,
            typeOfUser
           } = account

          if (typeOfUser === 'subscriber') {
            const subscriberData = await getSubscriber(String(subscriberId))

            token.userData = subscriberData
          } else if (typeOfUser === 'clubProvider') {
            //...
          }
        }

        return token
      },
      async session({session, token, user}) {
        const { userData } = token

        const newSession = {
          ...session, userData
        } as NewSession
        
        return newSession
      }
    },
    secret: secret
})