'use client'
import Loader from '@/src/components/ui/loader/Loader'
import signInWithCredentials from '@/src/services/auth/signInWithCredentials'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { AuthProviders } from '../components/AuthProviders'
import { Footer } from './Footer'

import './../auth-forms.scss'
import { Header } from '../signInForm/Header'
import { Separator } from '../components/Separator'

interface Form {
  email: string
  password: string
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  })

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    form: Form
  ) => {
    event.preventDefault()
    setIsFormValid(true)
    setIsLoading(true)
    if (Object.values(form).some((value) => value.trim() === '')) {
      setIsFormValid(false)
      setIsLoading(false)
      return
    }

    try {
      const res = await signInWithCredentials(form)
      if (res.status === 'success') {
        await signIn('credentials', {
          email: form.email,
          password: form.password,
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        console.log('setError', err)
      } else {
        setError('An error occurred, please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-form-container">
      <form
        className="sign-form"
        onSubmit={(event) => handleSubmit(event, form)}
      >
        <Header />

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
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@mail.com"
            name="email"
            type="email"
            className={`input-field ${
              !isFormValid && !form.email ? 'input-error' : ''
            } `}
            id="email_field"
            autoComplete="email"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/icons/password.svg"
            alt="password icon"
          />
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            name="password"
            type="password"
            className={`input-field input-field--password-sign-in ${
              !isFormValid && !form.password ? 'input-error' : ''
            } `}
            id="password_field"
            autoComplete="current-password"
          />
          <Link
            href="/auth/reset-password/send-email"
            className="form-password-error--sign-in"
          >
            Forgot password?
          </Link>
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}
        {error && (
          <p className="form-error">
            {error}{' '}
            {error === 'Email is not verified.' ? (
              <Link
                className="unverified-email-link"
                href="/auth/registration/token-activation/resend-activation-link"
              >
                Request activation link?
              </Link>
            ) : null}
          </p>
        )}

        <button
          title="Sign In"
          type="submit"
          className="sign-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader extraClass="loader-spinner-var-form-button" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
      <Separator />
      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />

      <Footer />
    </div>
  )
}
export default SignIn
