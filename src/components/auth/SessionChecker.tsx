'use client'

import { auth } from '@/src/lib/auth'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SessionChecker = () => {
  const { status, data } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log('🚀 ~ SessionCheker status:', status)
    const isUserCredentialsActive =
      data?.user.provider === 'credentials' && data?.user.active === false
    // Page SIGN-IN ------------
    // -------------------------------
    if (pathname === '/auth/sign-in') {
      if (status === 'authenticated') {
        if (isUserCredentialsActive)
          return router.push('/auth/registration/validateEmailOTP')
        return router.push('/dashboard')
      }
    }

    // Page validateEmailOTP ------------
    // --------------------------------
    if (pathname === '/auth/registration/validateEmailOTP') {
      if (status === 'unauthenticated' || data?.user.active)
        return router.push('/auth/sign-in')
    }
    // Page DASHBOARD ------------
    // ----------------------------
    if (pathname === '/dashboard') {
      if (status === 'unauthenticated') return router.push('/auth/sign-in')

      if (status === 'authenticated') {
        if (isUserCredentialsActive)
          return router.push('/auth/registration/validateEmailOTP')
      }
    }
    // Page REGISTRATION ------------
    // ----------------------------
    if (pathname === '/auth/registration') {
      if (status === 'authenticated') {
        if (isUserCredentialsActive)
          return router.push('/auth/registration/validateEmailOTP')
        return router.push('/dashboard')
      }
    }
  }, [status, router, pathname, data?.user.active, data?.user.provider])

  return null
}

export default SessionChecker
