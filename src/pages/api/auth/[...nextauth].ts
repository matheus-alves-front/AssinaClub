import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

export default NextAuth({
    providers: [
      GithubProvider({
        clientId: String(githubId),
        clientSecret: String(githubSecret)
      })
    ],
    secret: process.env.SECRET
})