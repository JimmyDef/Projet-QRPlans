// import '@/src/styles/globals.scss'
import '@/src/styles/main.scss'
import Header from '@/src/components/header/Header'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { auth } from '@/src/lib/auth'
// import { redirect } from 'next/navigation'
// import { useRouter } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QR Plan',
  description: 'QR Plan app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()
  const session = await auth()

  return (
    <html lang={locale}>
      <head>
        <title>QR Plan</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header user={session?.user} />

          <main className="main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
