'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/src/lib/store'

const AuthSync = () => {
  useEffect(() => {
    const syncAuthState = (event: StorageEvent) => {
      if (event.key === 'isUserActive') {
        useAuthStore.setState({
          isUserActive: JSON.parse(event.newValue || 'false'),
        })
      }
    }

    window.addEventListener('storage', syncAuthState)

    return () => {
      window.removeEventListener('storage', syncAuthState)
    }
  }, [])

  return null
}

export default AuthSync
