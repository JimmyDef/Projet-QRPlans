'use client'
import SignOutButton from '@/src/components/ui/buttons/auth/SignOutButton'
import { capitalizeFirstLetter } from '@/src/lib/helpers'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import './connexion-links.scss'
export const ConnexionLinks = () => {
  const t = useTranslations('header')
  const { data: session, status } = useSession()
  const fistName = session?.user?.name?.split(' ')[0]
  const formattedFirstName = capitalizeFirstLetter(fistName ?? '')

  if (status === 'loading') return <p>Loading...</p>

  return (
    <>
      {session ? (
        <div className="connexion-links__user-info">
          <Link
            href="/dashboard"
            className="connexion-links__user-name"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            {formattedFirstName}
          </Link>
          <Link href="/dashboard" className="connexion-links__user-img">
            <Image
              width={50}
              height={50}
              className="user-image"
              src={session?.user?.image || '/icons/defaultUser.svg'}
              alt="user icon"
            />
          </Link>

          <SignOutButton className="connexion-link connexion-links__sign-out" />
        </div>
      ) : (
        <div className="connexion-links__user-info">
          <Link
            href="/auth/sign-in"
            className="connexion-link connexion-links__sign-in"
          >
            {t('logIn')}
          </Link>

          <Link
            href="/auth/registration"
            className="connexion-link connexion-links__sign-up"
          >
            {t('signUp')}
          </Link>
        </div>
      )}
    </>
  )
}
