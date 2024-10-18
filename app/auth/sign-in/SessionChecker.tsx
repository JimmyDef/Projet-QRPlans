'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SessionChecker = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log('🚀 ~ sessionStatus:', status)
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  return null
}

export default SessionChecker
