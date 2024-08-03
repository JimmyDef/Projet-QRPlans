import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import LinkedIn from 'next-auth/providers/linkedin'

import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'
// import { saltAndHashPassword } from '@/services/helpers'
import { signInSchema } from '@/lib/zod'
// import bcrypt from 'bcrypt'
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Facebook,
    LinkedIn,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const { email } = credentials
          const user = await prisma.user.findUnique({
            where: { email: email as string },
          })

          if (!user) {
            return null
          }

          return user
        } catch (error) {
          console.error('error credentials authjs', error)
          // Return `null` to indicate that the credentials are invalid
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
    // async redirect({ url, baseUrl }) {
    //   // Redirige vers le tableau de bord après la connexion
    //   if (url.startsWith(baseUrl)) return Promise.resolve('/dashboard')
    //   // Redirige vers la page précédente après la déconnexion
    //   return Promise.resolve(baseUrl)
    // },
  },

  // pages: {
  //   signIn: '/signIn',
  //   error: '/auth/error',
  // },
})
