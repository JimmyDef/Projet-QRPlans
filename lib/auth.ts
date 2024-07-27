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
import bcrypt from 'bcrypt'
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
          let user = null
          const { email, password } = await signInSchema.parseAsync(credentials)

          user = await prisma.user.findUnique({ where: { email: email } })

          if (!user) {
            return null
          }

          const isPasswordValid = user.password
            ? await bcrypt.compare(password, user.password)
            : false

          if (isPasswordValid) {
            return user
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
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
