import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import LinkedIn from 'next-auth/providers/linkedin'
import * as Sentry from '@sentry/browser'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'
import { saltAndHashPassword } from '@/services/helpers'
import { signInSchema } from '@/lib/zod'

export const { handlers, auth, signIn, signOut } = NextAuth({
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
          const { email, password } = await signInSchema.parseAsync(credentials)

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password)

          console.log('🚀 ~ pwHash:', pwHash)

          // logic to verify if user exists
          const user = await prisma.user.findUnique({ where: { email: email } })

          console.log('🚀 ~ user:', user)

          if (!user) {
            return null
          }

          return user
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
    session({ session, user }) {
      const scope = Sentry.getCurrentScope()

      scope.setUser({
        id: user.id,
        email: user.email,
      })

      return session
    },
  },

  pages: {
    signIn: '/signIn',
    error: '/auth/error',
  },
})
