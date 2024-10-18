// import '@/src/styles/globals.scss'
import Header from '@/src/components/layouts/header/Header'
import '@/src/styles/main.scss'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import ClientProviders from './ClientProviders'
import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = {
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
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
