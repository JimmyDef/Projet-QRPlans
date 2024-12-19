'use client'

import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])

  const errorMessage =
    error.message.includes('prisma') || error.message.includes('database')
      ? 'Failed to connect to database'
      : 'An error occurred'

  return (
    <div className="error-container">
      <h2 className="error-message">{errorMessage}</h2>

      <button className="retry-button" onClick={() => router.push('/')}>
        Try again later
      </button>
    </div>
  )
}
