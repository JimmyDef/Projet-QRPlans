'use client'
import { useRouter } from 'next/navigation'
import './app-error.scss'

export const AppError = ({ error }: { error?: string }) => {
  const router = useRouter()
  const isDatabaseError =
    error?.includes('prisma') || error?.includes('database')
  const errorMessage = isDatabaseError
    ? 'Database Connection Issue.'
    : 'Unexpected Error Occurred.'

  return (
    <div className="app-error-container">
      <h1 className="app-error-title">{errorMessage}</h1>
      <p className="app-error-message">
        {isDatabaseError
          ? "We're having trouble connecting to our database. Please check back soon."
          : "Something unexpected happened. Don't worry, we're on it!"}
      </p>
      <button
        className="app-error-retry-button"
        onClick={() => router.push('/')}
      >
        Try Again
      </button>
    </div>
  )
}
