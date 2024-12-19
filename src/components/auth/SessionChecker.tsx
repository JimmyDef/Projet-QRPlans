'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SessionChecker = () => {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log('🚀 ~ sessionStatus:', status)
    if (pathname === '/auth/sign-in') {
      status === 'authenticated' ? router.push('/dashboard') : null
    }
    if (pathname === '/dashboard') {
      status === 'unauthenticated' ? router.push('/auth/sign-in') : null
    }
  }, [status, router, pathname])

  return null
}

export default SessionChecker
