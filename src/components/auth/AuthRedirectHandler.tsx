'use client'

import { useAuthStore } from '@/src/lib/store'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthRedirectHandlerProps {
  isActiveInitial: boolean
}
const AuthRedirectHandler = ({ isActiveInitial }: AuthRedirectHandlerProps) => {
  const { status, data: session } = useSession()
  const isUserActive = useAuthStore((state) => state.isUserActive)

  const setUserActive = useAuthStore((state) => state.setUserActive)
  const router = useRouter()
  const pathname = usePathname()
  const isUserCredentialsActive =
    session?.user.provider === 'credentials' && isUserActive
  useEffect(() => {
    // Au montage, on synchronise la valeur "active"
    setUserActive(isActiveInitial)
  }, [isActiveInitial, setUserActive])

  useEffect(() => {
    console.log('🚀 ~ isUserActive:', isUserActive)
    // Page SIGN-IN  / REGISTRATION
    if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
      if (status === 'authenticated') {
        if (!isUserCredentialsActive) {
          router.push('/auth/registration/validate-email-otp')
          return
        }
        router.push('/dashboard')
        return
      }
    }

    // Page validate-email-otp
    if (pathname === '/auth/registration/validate-email-otp') {
      if (status === 'unauthenticated' || isUserActive) {
        router.push('/auth/sign-in')
        return
      }
    }

    // Page DASHBOARD
    if (pathname === '/dashboard') {
      if (status === 'unauthenticated') {
        router.push('/auth/sign-in')
        return
      }

      if (
        status === 'authenticated' &&
        session.user.provider === 'credentials' &&
        !isUserActive
      ) {
        router.push('/auth/registration/validate-email-otp')
        return
      }
    }
  }, [status, router, pathname, isUserActive, session?.user.provider])

  return null
}

export default AuthRedirectHandler
