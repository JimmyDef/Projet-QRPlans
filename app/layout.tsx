import '@/styles/globals.scss'
import '@/styles/main.scss'
import Header from '../components/header/Header'
// import LanguageSwitcher from '../components/LanguageSwitcher'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
// import { auth } from '@/lib/auth'
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

  return (
    <html lang={locale}>
      <head>
        <title>QR Plan</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />

          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
