'use client'

import Link from 'next/link'
import LocaleSwitcher from '@/src/components/layout/header/locale-switcher/LocaleSwitcher'
import './header.scss'
import { ConnexionLinks } from './navbar/ConnexionLinks'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Header = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession()
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
      <div
        className={`header__container ${session ? 'header__container--auth' : null}`}
      >
        <Link href="/" className="header__link--title" onClick={handleClick}>
          <p
            className={`header__brand ${session ? 'header__brand--dashboard' : null}`}
          >
            QR-Plans
          </p>
        </Link>
        <nav
          className={`header__nav ${session ? 'header__nav--dashboard' : null}`}
        >
          <LocaleSwitcher
            options={localeOptions}
            aria-label="changeLanguage"
            id="changeLanguage"
          />
          <ConnexionLinks />
        </nav>
      </div>
    </header>
  )
}

export default Header
