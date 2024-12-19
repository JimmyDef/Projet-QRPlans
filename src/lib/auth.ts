import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/src/lib/prisma'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import LinkedIn from 'next-auth/providers/linkedin'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { signInSchema } from './zod'

// import { credentialsSchema } from '@/src/lib/zod'
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
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required')
          }
          const { email, password } = credentials
          const { email: parsedEmail, password: parsedPassword } =
            await signInSchema.parseAsync({ email, password })
          const user = await prisma.user.findUnique({
            where: { email: parsedEmail },
          })

          if (!user) {
            throw new Error('No user found with this email')
          }
          const userProvider = await prisma.account.findUnique({
            where: { userId: user.id },
          })
          if (userProvider) {
            throw new Error(
              `Account were created with ${userProvider.provider} as provider, please use it.`
            )
          }
          if (user.active === false) {
            throw new Error('Email is not verified.')
          }
          const isPasswordValid =
            user.password &&
            (await bcrypt.compare(parsedPassword, user.password))
          if (!isPasswordValid) {
            throw new Error('Password is invalid')
          }
          return user
        } catch (error) {
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
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  debug: false,
})
