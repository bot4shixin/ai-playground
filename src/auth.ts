import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getStringFromBuffer } from '@/lib/utils'
import { getUser } from '@/app/login/actions'
import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  type DefaultSession,
} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import OktaProvider from "next-auth/providers/okta";


import { prisma } from "@/lib/prisma";


import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  // adapter: PrismaAdapter(prisma),
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
      }

      return session
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // OktaProvider({
    //   clientId: process.env.OKTA_CLIENT_ID || "",
    //   clientSecret: process.env.OKTA_CLIENT_SECRET || "",
    //   issuer: process.env.OKTA_ISSUER
    // }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
          )
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

          if (hashedPassword === user.password) {
            return user
          } else {
            return null
          }
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      age?: string;
      race?: string;
      country?: string;
      gender?: string;
      language?: string;
      image?: string | null;
      name?: string | null;
      email: string;
      isAdmin?: boolean;
      permissions?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
    serviceToken?: string;
    refreshToken?: string;
    role?: string | null;
    error?: 'SearchPilotServiceTokenError';
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)