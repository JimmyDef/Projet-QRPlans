'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

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
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Authentication Error</h1>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <a
        href="/auth/signin"
        style={{ display: 'inline-block', marginTop: '1rem' }}
      >
        Go back to Sign In
      </a>
    </div>
  )
}
