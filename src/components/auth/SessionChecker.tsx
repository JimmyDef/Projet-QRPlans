'use client'

import { useAuthStore } from '@/src/lib/store'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface SessionCheckerProps {
  isActiveInitial: boolean
}
const SessionChecker = ({ isActiveInitial }: SessionCheckerProps) => {
  const { status, data: session } = useSession()
  const isUserActive = useAuthStore((state) => state.isUserActive)
  const setUserActive = useAuthStore((state) => state.setUserActive)
  const router = useRouter()
  const pathname = usePathname()
  const isUserCredentialsActive =
    session?.user.provider === 'credentials' && isUserActive
  useEffect(() => {
    // Au montage, on synchronise la valeur “active”
    setUserActive(isActiveInitial)
  }, [isActiveInitial, setUserActive])

  useEffect(() => {
    // Page SIGN-IN  / REGISTRATION------------
    // -------------------------------
    if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
      if (status === 'authenticated') {
        if (!isUserCredentialsActive)
          return router.push('/auth/registration/validateEmailOTP')
        return router.push('/dashboard')
      }
    }

    // Page validateEmailOTP ------------
    // --------------------------------
    if (pathname === '/auth/registration/validateEmailOTP') {
      if (status === 'unauthenticated' || isUserActive)
        return router.push('/auth/sign-in')
    }
    // Page DASHBOARD ------------
    // ----------------------------
    if (pathname === '/dashboard') {
      if (status === 'unauthenticated') return router.push('/auth/sign-in')

      if (status === 'authenticated') {
        if (!isUserCredentialsActive)
          return router.push('/auth/registration/validateEmailOTP')
      }
    }
    // Page REGISTRATION ------------
    // ----------------------------
    // if (pathname === '/auth/registration') {
    //   if (status === 'authenticated') {
    //     if (isUserCredentialsActive)
    //       return router.push('/auth/registration/validateEmailOTP')
    //     return router.push('/dashboard')
    //   }
    // }
  }, [status, router, pathname, isUserActive, session?.user.provider])

  return null
}

export default SessionChecker
