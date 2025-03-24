'use client'

import { useEffect, useRef, useState } from 'react'
import './auth-forms.scss'
import { useSearchParams, useRouter } from 'next/navigation'
import { sanitizeEmailInput } from '@/src/lib/helpers'
import { Header } from './components/header/Header'
import { FormInputField } from './components/input-field/InputField'
import { Footer } from './components/footer/Footer'
import { toast } from 'react-toastify'
import { ErrorMessage } from './components/error-message/ErrorMessage'
import { SubmitButton } from '../buttons/submit-button/SubmitButton'
import { emailSchema } from '@/src/lib/zod'

const EmailRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const authEndpoints = {
    forgotPassword: '/api/auth/send-password-reset-email',
  }
  const setError = (message: string) => {
    setErrorMessage(message)
    toast.error(message)
    emailInputRef.current?.focus()
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeEmailInput(e.target.value)
    setEmail(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!email.trim()) return setError('Please fill Email field.')

      setErrorMessage(null)
      const validation = emailSchema.safeParse({ email })

      if (validation.error) {
        setError(validation.error.errors[0].message)
        return
      }

      setIsLoading(true)
      const res = await fetch(authEndpoints.forgotPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        console.log('Error response:', error)
        setError(error)
        setIsLoading(false)
        return
      }

      router.push('/auth/reset-password/security-email-sent')
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Error fetch:', error)
    }
  }
  useEffect(() => {
    const emailParams = searchParams.get('email')
    const decodedEmail = emailParams ? decodeURIComponent(emailParams) : ''
    const timer = searchParams.get('timer')

    if (
      emailParams &&
      emailSchema.safeParse({
        email: decodedEmail,
      }).success
    ) {
      setEmail(decodedEmail)
    }
    if (timer === 'expired')
      setError('Time to reset password has expired, request a new link.')
  }, [searchParams])
  return (
    <div className="auth-form__container">
      <Header authContext="resetPassword" />
      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <FormInputField
          ref={emailInputRef}
          label="Email"
          name="email"
          type="email"
          value={email}
          icon="email"
          placeholder="name@mail.com"
          autoComplete="email"
          onChange={handleOnChange}
          isValid={true}
        />

        <SubmitButton
          isLoading={isLoading}
          text="Send me the link"
          className="submit-btn submit-btn--auth-form"
        />
        <ErrorMessage message={errorMessage} />
      </form>
      <Footer isRegistration={true} />
    </div>
  )
}
export default EmailRequestForm
