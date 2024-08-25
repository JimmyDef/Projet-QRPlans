'use client'
import TokenResult from '@/components/token-result/page'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const PasswordModified = () => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
    console.log('PasswordModified')
  })

  return (
    <TokenResult
      title="Password modified!"
      url="/dashboard"
      txt="Your password has been modified. You are now logged in."
      buttonText="Go to dashboard"
    />
  )
}

export default PasswordModified
