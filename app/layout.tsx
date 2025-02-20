import SessionChecker from '@/src/components/auth/SessionChecker'
import Header from '@/src/components/layout/header/Header'
import '@/src/styles/globals.scss'
import '@/src/styles/main.scss'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ReactNode } from 'react'
import ClientSideToastContainer from './ToastContainer'
import ThemeToggle from './ThemeToggle'
import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import path from 'path'
import { headers } from 'next/headers'

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
  const headersList = await headers()

  const session = await auth()
  let isUserActive = false
  if (session) {
    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id },
    })
    isUserActive = !!userDb?.active

    if (!userDb) {
      console.log('userDb', userDb)
    }
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
            <Header />
            <main className="main">{children}</main>
            <SessionChecker isActiveInitial={isUserActive} />
          </ClientProviders>
          <ThemeToggle />
          <ClientSideToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
