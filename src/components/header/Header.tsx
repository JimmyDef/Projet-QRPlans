'use client'
import Link from 'next/link'
import LocaleSwitcher from '../localSwitcher/LocaleSwitcher'
import './header.scss'
import { useTranslations } from 'next-intl'
import SignOutButton from '../buttons/SignOutButton'
import Image from 'next/image'
import { capitalizeFirstLetter } from '@/src/services/helpers'

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
  const fistName = user?.name?.split(' ')[0]
  const formattedFirstName = capitalizeFirstLetter(fistName ?? '')
  const t = useTranslations('header')
  const localeOptions = [
    { value: 'en', label: 'English', image: '/icons/usa-flag.svg' },
    { value: 'fr', label: 'French', image: '/icons/fr-flag.svg ' },
  ]

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
              <Link
                href="/dashboard"
                className="header__link  header__link--user-name"
              >
                {formattedFirstName}
              </Link>
              <Link
                href="/dashboard"
                className="header__link header__link--user-img"
              >
                <Image
                  width={50}
                  height={50}
                  className="user-image"
                  src={user.image || '/icons/defaultUser.svg'}
                  alt="user icon"
                />
              </Link>

              <SignOutButton className="header__link header__link--sign-out" />
            </>
          ) : (
            <ul className="header__list">
              <li className="header__item">
                <Link
                  href="/auth/sign-in"
                  className="header__link header__link--sign-in"
                >
                  {t('logIn')}
                </Link>
              </li>
              <li className="header__item  header__item--highlight">
                <Link
                  href="/auth/registration"
                  className="header__link header__link--sign-up"
                >
                  {t('signUp')}
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
