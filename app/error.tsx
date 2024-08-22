'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <h2 className="error-message">Something went wrong!</h2>
      <button className="retry-button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
