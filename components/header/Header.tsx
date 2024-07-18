'use client'
import Link from 'next/link'
import LocaleSwitcher from '../localSwitcher/LocaleSwitcher'
import './header.scss'
import { useTranslations } from 'next-intl'
import SignOutButton from '../buttons/SignOutButton'
import { PropsWithChildren } from 'react'
// import { Session } from '@/lib/auth'
type User = {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}

type HeaderProps = {
  user?: User
}

const Header = ({ user }: HeaderProps) => {
  const t = useTranslations('header')
  const localeOptions = [
    { value: 'en', label: 'English', image: '/logos/usa-flag.svg' },
    { value: 'fr', label: 'French', image: '/logos/fr-flag.svg ' },
  ]
  console.log('🚀 ~ session:', user)
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__link--title">
          <h1 className="header__title"> QR-Plan</h1>
        </Link>
        <nav className="header__nav">
          <LocaleSwitcher
            options={localeOptions}
            aria-label="changeLanguage"
            id="changeLanguage"
          />
          {user ? (
            <>
              <p>{user.name}</p>{' '}
              <SignOutButton className="header__link header__link--sign-in" />
            </>
          ) : (
            <ul className="header__list">
              <li className="header__item">
                <Link
                  href="signIn"
                  className="header__link header__link--sign-in"
                >
                  {t('connexion')}
                </Link>
              </li>
              <li className="header__item  header__item--highlight">
                <Link
                  href="/signUp"
                  className="header__link header__link--sign-up"
                >
                  {t('inscription')}
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
