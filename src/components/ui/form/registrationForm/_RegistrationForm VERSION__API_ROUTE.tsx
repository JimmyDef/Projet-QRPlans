'use client'
import PasswordCheckList from '@/src/components/auth/passwordCheckList/PasswordCheckList'
import {
  comparePasswords,
  sanitizeEmailInput,
  sanitizeNameInput,
  sanitizePasswordInput,
} from '@/src/lib/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import './../auth-forms.scss'

import { Separator } from '@radix-ui/react-dropdown-menu'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AuthProviders } from '../components/AuthProviders'
import { Header } from './Header'

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
  })
  // const formSubmissionStatus = { message: null, succes: false }
  // const [error, registrationAction, isPending] = useActionState(
  //   RegistrationAction,
  //   formSubmissionStatus
  // )
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isPasswordValid) {
      return setFormError('Password is not strong enough.')
    }
    setFormError('')
    if (Object.values(form).some((value) => value.trim() === ''))
      return setIsFormValid(false)

    if (comparePasswords(form.password, form.passwordConfirmation))
      return setIsPasswordsEqual(false)

    const updatedForm = {
      ...form,
      email: form.email.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
    }

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify(updatedForm),
      })

      if (res.ok) {
        await signIn('credentials', {
          email: form.email,
          password: form.password,
        })
        router.push('/auth/registration/validateEmailOTP')
      } else {
        if (res.status === 409) {
          setIsPasswordForgotten(true)
        } else if (res.status === 400) {
          setFormError('Missing required fields. Please fill out all fields.')
        } else {
          setFormError('An unexpected error occurred. Please try again.')
        }
      }
    } catch (error) {
      setFormError('Failed to submit the form. Please try again later.')
      console.error('Error fetch:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordMismatch = () => {
    if (comparePasswords(form.password, form.passwordConfirmation)) {
      setForm({ ...form, passwordConfirmation: '' })

      return setIsPasswordsEqual(false)
    }
    return setIsPasswordsEqual(true)
  }

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordConfirmation = e.target.value
    setForm({
      ...form,
      passwordConfirmation: passwordConfirmation,
    })

    if (form.password === passwordConfirmation) {
      return setIsPasswordsEqual(true)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = sanitizeNameInput(value)
    setForm({ ...form, [name]: formattedValue })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: sanitizeEmailInput(e.target.value) })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: sanitizePasswordInput(e.target.value),
    })
  }

  return (
    <div className="sign-form-container sign-up-form-container">
      <Header />

      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />

      <Separator />

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
        <div className="input-container">
          <label className="input-label" htmlFor="password_field">
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
            onChange={handlePasswordChange}
            value={form.password}
            placeholder="Password"
            name="password"
            type="password"
            className={`input-field ${
              !isFormValid && form.password === '' ? 'input-error' : ''
            } `}
            id="password_field"
            autoComplete="new-password"
          />
          <PasswordCheckList
            password={form.password}
            setIsPasswordValid={setIsPasswordValid}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password_confirmation_field">
            Password confirmation
            {!isPasswordsEqual && (
              <span className="password-confirmation-error"></span>
            )}
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/icons/password.svg"
            alt="password icon"
          />
          <input
            value={form.passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            onBlur={handlePasswordMismatch}
            placeholder="Password"
            name="passwordConfirmation"
            type="password"
            className={`input-field ${
              (!isFormValid && form.passwordConfirmation === '') ||
              !isPasswordsEqual
                ? 'input-error'
                : ''
            } `}
            id="password_confirmation_field"
            autoComplete="none"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            First name
          </label>

          <input
            value={form.firstName}
            onChange={handleNameChange}
            placeholder="John"
            name="firstName"
            type="text"
            className={`input-field ${
              !isFormValid && form.firstName === '' ? 'input-error' : ''
            } `}
            id="firstName"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="lastName">
            Last name
          </label>

          <input
            value={form.lastName}
            onChange={handleNameChange}
            placeholder="Wick"
            name="lastName"
            type="text"
            className={`input-field ${
              !isFormValid && !form.lastName ? 'input-error' : ''
            } `}
            id="lastName"
          />
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}
        {formError && <p className="form-error">{formError}</p>}
        {isPasswordForgotten && (
          <p className="form-error">
            Email already exists{' '}
            <Link
              href="/auth/reset-password/send-email"
              className="form-password-error--registration"
            >
              Forgot password?
            </Link>
          </p>
        )}

        <button type="submit" className="sign-btn" disabled={isLoading}>
          <span>Sign Up</span>
        </button>
      </form>
      <p className="note">Terms of use &amp; Conditions</p>
    </div>
  )
}
export default RegistrationForm
