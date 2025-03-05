'use client'

import Link from 'next/link'
import LocaleSwitcher from '@/src/components/layout/header/locale-switcher/LocaleSwitcher'
import './header.scss'
import { ConnexionButtons } from './navbar/ConnexionButtons'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Header = () => {
  const pathname = usePathname()
  const { status } = useSession()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (status === 'authenticated' && pathname === '/dashboard') {
      e.preventDefault()
    }
  }

  const localeOptions = [
    { value: 'en', label: 'English', image: '/icons/usa-flag.svg' },
    { value: 'fr', label: 'French', image: '/icons/fr-flag.svg' },
  ]

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__link--title" onClick={handleClick}>
          <p className="header__brand"> QR-Plans</p>
        </Link>
        <nav className="header__nav">
          <LocaleSwitcher
            options={localeOptions}
            aria-label="changeLanguage"
            id="changeLanguage"
          />
          <ConnexionButtons />
        </nav>
      </div>
    </header>
  )
}

export default Header
