'use client'
import SignOutButton from '@/src/components/ui/buttons/auth/SignOutButton'
import { capitalizeFirstLetter } from '@/src/services/helpers'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
export const ConnexionButtons = () => {
  // const router = useRouter()
  const t = useTranslations('header')
  const { data: session, status } = useSession()
  const fistName = session?.user?.name?.split(' ')[0]
  const formattedFirstName = capitalizeFirstLetter(fistName ?? '')

  // useEffect(() => {
  //   if (status === 'authenticated' && pathname === '/') {
  //     router.push('/dashboard')
  //   }
  // }, [status])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <>
      {session ? (
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
              src={session?.user?.image || '/icons/defaultUser.svg'}
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
    </>
  )
}
