'use client'
// import { User } from '@/src/lib/types'
import Link from 'next/link'
import LocaleSwitcher from '../localSwitcher/LocaleSwitcher'
import './header.scss'
import { ConnexionButtons } from './navbar/ConnexionButtons'
// type HeaderProps = {
//   user: User | null
// }

// const Header = ({ user }: HeaderProps) => {
const Header = () => {
  const localeOptions = [
    { value: 'en', label: 'English', image: '/icons/usa-flag.svg' },
    { value: 'fr', label: 'French', image: '/icons/fr-flag.svg ' },
  ]

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__link--title">
          <h1 className="header__title"> QR-Plans</h1>
        </Link>
        <nav className="header__nav">
          <LocaleSwitcher
            options={localeOptions}
            aria-label="changeLanguage"
            id="changeLanguage"
          />
          <ConnexionButtons />
          {/* <ConnexionButtons user={user} /> */}
        </nav>
      </div>
    </header>
  )
}

export default Header
