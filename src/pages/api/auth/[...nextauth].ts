import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getSubscriber } from "../../../prisma/subscribers";
import { signIn } from "next-auth/react";
import { getToken } from "next-auth/jwt";

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
          typeOfUser: {label: 'typeOfUser', type: 'text'}
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

          const subscriberData = await getSubscriber(subscriberId)
          
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
          account.subscriberId = credentials?.typeOfUser
        }

        return true
      },
      async jwt({ token, account, profile }) {
        if (account) {
          token.typeOfUser = account.typeOfUser
        }

        return token
      },
      async session({session, token, user}) {
        console.log('session',{
          session,
          token,
          user
        }, 'end of session')

        const subscriberId = String(token?.sub)
        console.log('TOKENZAO', String(token?.sub))
        
        const subscriberData = await getSubscriber(subscriberId)

        session.user = {
          name: subscriberData?.name,
          email: subscriberData?.email,
        }

        // tem que arrumar a tipagem mas tá funcionando
        session.subscriberId = token
        
        return session
      }
    },
    secret: process.env.SECRET
})