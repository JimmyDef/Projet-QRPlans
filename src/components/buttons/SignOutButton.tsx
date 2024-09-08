// 'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import './signOutButton.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type SignOutButtonProps = {
  className?: string
}
const SignOutButton = ({ className }: SignOutButtonProps) => {
  const t = useTranslations('header')

  return (
    <button className={className} onClick={() => signOut({ callbackUrl: '/' })}>
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
