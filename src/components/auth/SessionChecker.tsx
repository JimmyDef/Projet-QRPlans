'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SessionChecker = () => {
  const { status, data } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/auth/sign-in') {
      if (status === 'authenticated')
        !data?.user.active
          ? router.push('/auth/registration/validateEmailCode')
          : router.push('/dashboard')
    }
    if (pathname === '/auth/registration/validateEmailCode') {
      if (data?.user.active || status === 'unauthenticated')
        router.push('/auth/sign-in')
    }

    if (pathname === '/dashboard') {
      status === 'unauthenticated' ? router.push('/auth/sign-in') : null
      status === 'authenticated' && data?.user.active === false
        ? router.push('/auth/registration/validateEmailCode')
        : null
    }
  }, [status, router, pathname, data?.user.active])

  return null
}

export default SessionChecker
