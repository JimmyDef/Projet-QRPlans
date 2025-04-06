'use client'

import { useAuthStore } from '@/src/lib/store'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthRedirectHandlerProps {
  isActiveInitial: boolean | undefined
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
    // Empeche les flashs si utilisation du bouton "back" de la souris ou du clavier
    // (utile si plusieur onglet ouvert)
    window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    // Au montage, on synchronise la valeur "active"

    if (isActiveInitial === undefined) {
      return
    }

    setUserActive(isActiveInitial)
  }, [isActiveInitial, setUserActive])

  useEffect(() => {
    if (status === 'loading') return
    // Page SIGN-IN  / REGISTRATION
    if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
      if (status === 'authenticated') {
        if (!isUserCredentialsActive) {
          router.replace('/auth/registration/validate-email-otp')
          return
        }
        router.replace('/dashboard')
        return
      }
    }

    // Page validate-email-otp
    if (pathname === '/auth/registration/validate-email-otp') {
      if (status === 'unauthenticated' || isUserActive) {
        router.replace('/auth/sign-in')
        return
      }
    }

    // Page DASHBOARD
    if (pathname === '/dashboard') {
      if (status === 'unauthenticated') {
        router.replace('/auth/sign-in')
        return
      }

      if (
        status === 'authenticated' &&
        session.user.provider === 'credentials' &&
        isUserActive === false
      ) {
        router.replace('/auth/registration/validate-email-otp')
        console.log('isUserActive066', isUserActive)
        return
      }
    }
    // Page RESET-PASSWORD
    if (pathname === '/auth/reset-password') {
      if (status === 'authenticated' && isUserCredentialsActive) {
        router.replace('/dashboard')
        return
      }
      if (status === 'authenticated' && !isUserCredentialsActive) {
        router.replace('/auth/registration/validate-email-otp')
        return
      }
    }
    // Page RESET-PASSWORD-REQUEST-RESULT/INVALID
    // &&
    // RESET-PASSWORD/SECURITY-EMAIL-SENT
    if (
      pathname === '/auth/reset-password/request-result/invalid' ||
      pathname === '/auth/reset-password/security-email-sent'
    ) {
      if (
        status === 'authenticated' &&
        (isUserCredentialsActive || session?.user.provider !== 'credentials')
      ) {
        router.replace('/dashboard')
        return
      }

      if (status === 'authenticated' && !isUserCredentialsActive) {
        router.replace('/auth/registration/validate-email-otp')
        return
      }
    }
  }, [status, router, pathname, isUserActive, session?.user.provider])

  return null
}

export default AuthRedirectHandler
