import Header from '@/src/components/layout/header/Header'
import '@/src/styles/globals.scss'
import '@/src/styles/main.scss'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
// import ClientProviders from './ClientProviders'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import ClientSideToastContainer from './ToastContainer'
import type { Metadata } from 'next'
import SessionChecker from '@/src/components/auth/SessionChecker'

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
            <SessionChecker />
          </ClientProviders>

          <ClientSideToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
