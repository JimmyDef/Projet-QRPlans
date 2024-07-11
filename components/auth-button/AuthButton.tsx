'use client'
import React, { PropsWithChildren } from 'react'
// import { signIn } from '@/lib/auth'

type AuthButtonProps = PropsWithChildren<{
  provider?: string
  className?: string
}>
export const AuthButton = ({ children, className }: AuthButtonProps) => {
  return (
    <button onClick={() => console.log('button test')} className={className}>
      {children}
    </button>
  )
}
