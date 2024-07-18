// 'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import './signOutButton.scss'

type SignOutButtonProps = {
  className?: string
}
const SignOutButton = ({ className }: SignOutButtonProps) => {
  return (
    <button className={className} onClick={() => signOut()}>
      Déconnexion
    </button>
  )
}

export default SignOutButton
