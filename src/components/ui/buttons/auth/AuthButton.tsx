'use client'

import { signIn } from 'next-auth/react'
import React, { PropsWithChildren, Dispatch, SetStateAction } from 'react'

type AuthButtonProps = PropsWithChildren<{
  provider: string
  title: string
  className?: string
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}>

export const AuthButton = ({
  children,
  title,
  className,
  provider,
  isLoading,
  setIsLoading,
}: AuthButtonProps) => {
  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn(provider, {
        callbackUrl: '/dashboard',
      })
    } catch (error) {
      console.log('handleSignIn:', error)

      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSignIn}
      className={className}
      disabled={isLoading}
      title={title}
    >
      {children}
    </button>
  )
}
