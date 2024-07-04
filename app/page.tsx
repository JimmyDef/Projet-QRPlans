import '../sass/main.scss'
import Header from '../components/Header'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QR Plan',
  description: 'QR Plan app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <title>QR Plan</title>
      </head>
      <body className={inter.className}>
        <Header />
        <LanguageSwitcher />
        <main>{children}</main>
      </body>
    </html>
  )
}
