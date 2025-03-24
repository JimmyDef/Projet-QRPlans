'use client'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type SignOutButtonProps = {
  className?: string
}
const SignOutButton = ({ className }: SignOutButtonProps) => {
  const t = useTranslations('header')

  return (
    <button
      className={className}
      onClick={() => {
        console.log('Signing out')
        localStorage.setItem('isUserActive', JSON.stringify(false))
        signOut({ callbackUrl: '/auth/sign-in' })
      }}
    >
      <Image
        className="exit-icon"
        width={20}
        height={20}
        src="/icons/exit.svg"
        alt="exit icon"
      />
      <span>{t('logOut')}</span>
    </button>
  )
}

export default SignOutButton
