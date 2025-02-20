// import { EmailNotVerifiedError } from './customErrors'
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

          const isPasswordValid =
            user.password &&
            (await bcrypt.compare(parsedPassword, user.password))
          if (!isPasswordValid) {
            throw new Error('Password is invalid')
          }
          const userWithProvider = { ...user, provider: 'credentials' }
          return userWithProvider
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
        // token.active = user.active
        token.provider = user.provider
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      // session.user.active = token.active as boolean
      session.user.provider = token.provider as string

      return session
    },
    async signIn({ user, account }) {
      const email = user.email
      if (!email) {
        return '/auth/sign-in?error=' + encodeURIComponent('NoEmailFound')
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
        include: { Accounts: true },
      })

      if (existingUser) {
        // Vérifier si le provider d'origine est différent
        const existingAccount = existingUser.Accounts[0]

        if (
          existingAccount &&
          account &&
          existingAccount.provider !== account.provider
        ) {
          // Au lieu de retourner false, on redirige avec un message personnalisé
          return (
            '/auth/sign-in?error=' +
            encodeURIComponent(`AccountCreatedWith_${existingAccount.provider}`)
          )
        }

        if (account?.provider !== 'credentials' && !existingAccount) {
          return (
            '/auth/sign-in?error=' +
            encodeURIComponent('AccountCreatedWith_email')
          )
        }
      }

      // Si pas de problème, continuer normalement
      return true
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  debug: false,
})
