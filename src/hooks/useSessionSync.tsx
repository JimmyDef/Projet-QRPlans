// src/hooks/useSessionSync.tsx

import { useEffect } from 'react'
import { useUserStore } from '@/src/lib/store'
import verifySession from '@/src/services/verifySession'
import { useRouter, usePathname } from 'next/navigation'

export const useSessionSync = () => {
  const { setUser, clearUser } = useUserStore()
  const currentUser = useUserStore((state) => state.user)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleStorage = async (event: StorageEvent) => {
      if (event.key === 'auth-session') {
        const fetchedSessionUser = await verifySession()

        if (fetchedSessionUser && currentUser === null) {
          setUser(fetchedSessionUser)
          return
        }
        if (currentUser && fetchedSessionUser === null) {
          clearUser()

          if (pathname === '/dashboard') {
            router.push('/auth/sign-in')
            return
          }
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [currentUser, setUser, clearUser, pathname, router])
}
