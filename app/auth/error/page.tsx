'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const router = useRouter()
  let errorMessage = 'An unknown error occurred. Please try again.'

  switch (error) {
    case 'OAuthAccountNotLinked':
      errorMessage =
        'It seems like you signed up using a different method. Please sign in using your email and password.'
      break
    case 'CredentialsSignin':
      errorMessage = 'The email or password is incorrect. Please try again.'
      break
    case 'Configuration':
      errorMessage =
        'There was a problem with the server configuration. Please try again later.'
      break
    case 'AccessDenied':
      errorMessage =
        'You do not have permission to sign in. Please contact support.'
      break
    case 'Verification':
      errorMessage =
        'The verification link is invalid or has expired. Please try again.'
      break
    default:
      errorMessage = `An error occurred: ${error}. Please try again.`
      break
  }

  return (
    <div className="error-container">
      <h2 className="error-title">Authentication Error</h2>
      <p className="error-text">{errorMessage}</p>
      <button
        className="retry-button"
        onClick={() => router.push('/auth/sign-in')}
      >
        Go back to Sign-In
      </button>
    </div>
  )
}
