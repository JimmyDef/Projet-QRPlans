'use client'

import { signIn } from 'next-auth/react'
import React, { PropsWithChildren, Dispatch, SetStateAction } from 'react'

type AuthButtonProps = PropsWithChildren<{
  provider: string
  title: string
  className?: string
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setErrorAuthBtn: Dispatch<SetStateAction<string | null>>
}>

export const AuthButton = ({
  children,
  title,
  className,
  provider,
  isLoading,
  setIsLoading,
  setErrorAuthBtn,
}: AuthButtonProps) => {
  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setErrorAuthBtn(null) // Reset error state before attempting sign in

      const result = await signIn(provider, { callbackUrl: '/dashboard' })

      if (result?.error) {
        setErrorAuthBtn(result.error)
        console.log('handleSignIn relust.error:', result.error)
      } else {
        // Handle successful sign-in
      }
    } catch (error) {
      console.log('handleSignIn:', error)
      setErrorAuthBtn('An unexpected error occurred. Please try again.')
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
