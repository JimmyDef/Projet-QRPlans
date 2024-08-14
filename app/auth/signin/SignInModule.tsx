'use client'

import { useState, useEffect } from 'react'
import { getCsrfToken } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import SignInForm from '@/components/form/SignInForm'

const SignInModule = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken()
      setCsrfToken(token)
    }
    fetchCsrfToken()
  }, [])
  let errorMessage = ''

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
    default:
      errorMessage = ''
      break
  }

  return <SignInForm />
}
export default SignInModule
