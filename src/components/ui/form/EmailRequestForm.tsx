'use client'

import Image from 'next/image'
import { useState } from 'react'
import './form.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sanitizeEmailInput } from '@/src/lib/helpers'

type EmailRequestForm = {
  title: string
  api: string
  redirectUrl: string
}

const EmailRequestForm = ({ title, api, redirectUrl }: EmailRequestForm) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState<string | null>(null)
  const [isFormValid, setIsFormValid] = useState(true)

  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (Object.values(form).some((value) => value.trim() === ''))
      return setIsFormValid(false)

    const updatedForm = { email: form.email.trim() }
    try {
      setIsLoading(true)
      const res = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(updatedForm),
      })
      if (res.ok) {
        router.push(redirectUrl)
      } else {
        if (!res.ok) {
          const errorMessage = await res.json()
          console.error('Error:', errorMessage.error)
          setErrorEmail(errorMessage.error)
        } else {
          setErrorEmail('An unexpected error occurred. Please try again.')
        }
      }
    } catch (error) {
      setErrorEmail('Failed to submit the form. Please try again later.')
      console.error('Error fetch:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: sanitizeEmailInput(e.target.value) })
  }
  return (
    <div className="sign-form-container sign-up-form-container">
      <div className="header-sign-up">
        <div className="logo-container"></div>
        <div className="title-container">
          <p className="title">{title}</p>
          <span className="subtitle">
            Please enter your email address to receive a link.
          </span>
        </div>
      </div>

      <form
        className="sign-form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="input-container">
          <label className="input-label" htmlFor="email">
            Email
          </label>

          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/icons/email.svg"
            alt="email icon"
          />
          <input
            value={form.email}
            onChange={handleEmailChange}
            placeholder="name@mail.com"
            name="email"
            type="email"
            className={`input-field ${
              !isFormValid && form.email === '' ? 'input-error' : ''
            } `}
            id="email_field"
            autoComplete="email"
          />
        </div>

        {!isFormValid && <p className="form-error">Please fill Email field.</p>}
        {errorEmail && (
          <p className="form-error">
            {errorEmail} <br />
            {errorEmail === 'This email must be activated.' && (
              <Link
                href="/auth/registration/token-activation/resend-activation-link"
                className="unverified-email-link"
              >
                Request activation link.
              </Link>
            )}
          </p>
        )}

        <button type="submit" className="sign-btn" disabled={isLoading}>
          <span>Send me the link</span>
        </button>
      </form>
    </div>
  )
}
export default EmailRequestForm
