import NextAuth, { DefaultSession } from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { getSubscriber } from "../../../prisma/subscribers";
import { Subscriber } from "../../../@types/SubscriberTypes";
import { ClubProvider } from "../../../@types/ClubProviderTypes";
import { getClubProvider } from "../../../prisma/clubProviders";
import { Admin } from "../../../@types/AdminsClubProviderTypes";
import { getAdmin } from "../../../prisma/adminsClubProviders";

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

type GeneralLogin = {
  token: string
  typeOfUser: string
  email: string
}

type TokenSubscriberType = {
  subscriberId: string
}

type TokenClubProviderType = {
  clubProviderId: string
}

type TokenAdminType = {
  adminId: string
}

interface SubscriberSession extends DefaultSession, TokenSubscriberType {
  userData: Subscriber | null
}

interface ClubProviderSession extends DefaultSession, TokenClubProviderType {
  userData: ClubProvider | null
}

interface AdminSession extends DefaultSession, TokenAdminType {
  userData: Admin | null
}

const secret = process.env.SECRET

export default NextAuth({
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
          const { subscriberId } = jwt.decode(token) as TokenSubscriberType
          id = subscriberId

        } else if (typeOfUser === "clubProvider") {
          const { clubProviderId } = jwt.decode(token) as TokenClubProviderType
          id = clubProviderId

        } else if (typeOfUser === "admin") {
          const { adminId } = jwt.decode(token) as TokenAdminType
          id = adminId
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
      if (account) {
        const {
          userId,
          typeOfUser
        } = account

        token.typeOfUser = typeOfUser

        if (typeOfUser === 'subscriber') {
          token.userData = await getSubscriber(String(userId))

        } else if ((typeOfUser === 'clubProvider')) { 
          token.userData = await getClubProvider(String(userId))
          
        } else if ((typeOfUser === 'admin')) { 
          token.userData = await getAdmin(String(userId))
        }
      }

      return token
    },
    async session({ session, token, user }) {
      const { userData, typeOfUser } = token

      let newSession

      if (typeOfUser === 'subscriber') {
        newSession = {
          ...session, userData
        } as SubscriberSession

      } else if (typeOfUser === 'clubProvider') { 
        newSession = {
          ...session, userData
        } as ClubProviderSession
        
      } else {
        newSession = {
          ...session, userData
        } as AdminSession
      }

      return newSession
    }
  },
  secret: secret
})