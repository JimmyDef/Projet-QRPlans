import AuthRedirectHandler from '@/src/components/auth/AuthRedirectHandler'
import Header from '@/src/components/layout/header/Header'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import '@/src/styles/globals.scss'
import '@/src/styles/main.scss'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ReactNode } from 'react'
import ThemeToggle from './ThemeToggle'
import ClientSideToastContainer from './ToastContainer'
import AuthSync from '@/src/components/auth/AuthSync'

export const metadata: Metadata = {
  title: 'QR Plans',
  description: 'QR Plans app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()
  const session = await auth()
  let isUserActive = false
  try {
    if (session) {
      const userDb = await prisma.user.findUnique({
        where: { id: session.user.id },
      })

      if (!userDb) {
        console.log('User not found in database')
      }

      isUserActive = !!userDb?.active
    }
  } catch (error) {
    console.error('Database error:', error)
    isUserActive = false
  }

  const ClientProviders = ({ children }: { children: ReactNode }) => (
    <SessionProvider>{children}</SessionProvider>
  )

  return (
    <html lang={locale}>
      <head>
        <title>QR Plans</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            <AuthSync />
            <Header />
            <main className="main">{children}</main>
            <AuthRedirectHandler isActiveInitial={isUserActive} />
          </ClientProviders>
          <ThemeToggle />
          <ClientSideToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
