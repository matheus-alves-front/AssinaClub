import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { FormEvent } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getSubscriber } from "../../../prisma/subscribers";

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

type SubscriberLogin = {
  token: string
  typeOfUser: string
}

type TokenSubscriberType = {
  subscriberId: string
}

export default NextAuth({
    providers: [
      GithubProvider({
        clientId: String(githubId),
        clientSecret: String(githubSecret)
      }),
      CredentialsProvider({
        id: "SubscriberLogin",
        name: "SubscriberLogin",
        credentials: {},
        async authorize(credentials, req) {
          const {
            token,
            typeOfUser
          } = credentials as SubscriberLogin

          
          const { 
            subscriberId
          } = jwt.decode(token) as TokenSubscriberType

          const subscriberData = await getSubscriber(subscriberId)
          
          console.log('SUBSCRIBERDATA', subscriberData)

          return {
            id: subscriberId
          }

          return {
            id: 'subscriberId',
            user: 'subscriberData'
          }
        }
      })
    ],
    secret: process.env.SECRET
})