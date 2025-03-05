'use client'
import PasswordCheckList from '@/src/components/auth/password-check-list/PasswordCheckList'
import { FormInputField } from '@/src/components/ui/form/components/input-field/InputField'
import {
  arePasswordsEqual,
  sanitizeEmailInput,
  sanitizeNameInput,
  sanitizePasswordInput,
} from '@/src/lib/helpers'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthProviders } from '../components/auth-providers/AuthProviders'
import { Separator } from '../components/separator-line/Separator'
import { Header } from '../components/header/Header'
import { ErrorMessage } from '../components/error-message/ErrorMessage'
import Loader from '../../loader/Loader'
import { Footer } from '../components/footer/Footer'
import './../auth-forms.scss'
import Link from 'next/link'

export interface RegistrationFormFields {
  email: string
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
}

const initialFormState = {
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
}

const RegistrationForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const [formData, setFormData] =
    useState<RegistrationFormFields>(initialFormState)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorMessage(null)
    if (Object.values(formData).some((value) => value.trim() === '')) {
      setErrorMessage('Please fill all fields.')
      setIsFormValid(false)
      return
    }

    if (!isPasswordValid) {
      setErrorMessage('Password is not strong enough.')
      return
    }

    if (!arePasswordsEqual(formData.password, formData.passwordConfirmation)) {
      setIsPasswordsEqual(false)
      return
    }

    const { passwordConfirmation, ...updatedForm } = {
      ...formData,
      email: formData.email.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
    }

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify(updatedForm),
      })

      if (res.ok) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
        })
        router.push('/auth/registration/validate-email-otp')
      } else {
        if (res.status === 409) {
          setForgotPassword(true)
          setErrorMessage('Email already exists')
        } else if (res.status === 400) {
          setErrorMessage(
            'Missing required fields. Please fill out all fields.'
          )
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      }
    } catch (error) {
      setErrorMessage('Failed to submit the form. Please try again later.')
      console.error('Error fetch:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validatePasswords = () => {
    const passwordsMatch = arePasswordsEqual(
      formData.password,
      formData.passwordConfirmation
    )

    if (!passwordsMatch) {
      setFormData((prev) => ({ ...prev, passwordConfirmation: '' }))
      setIsPasswordsEqual(false)
      setErrorMessage('Passwords do not match.')
      return
    }

    setIsPasswordsEqual(true)
  }

  const handleInputChange =
    (field: keyof RegistrationFormFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === 'email'
            ? sanitizeEmailInput(value)
            : field.startsWith('password')
              ? sanitizePasswordInput(value)
              : sanitizeNameInput(value),
      }))
    }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <div className="auth-form__container">
      <Header isRegistration={true} />
      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />
      <Separator />

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormInputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          icon="email"
          placeholder="name@mail.com"
          autoComplete="email"
          onChange={handleInputChange('email')}
          isValid={isFormValid}
        />

        <div className="form-input-wrapper">
          <FormInputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            icon="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleInputChange('password')}
            isValid={isFormValid}
          />
          <PasswordCheckList
            password={formData.password}
            setIsPasswordValid={setIsPasswordValid}
          />
        </div>

        <FormInputField
          label="Password confirmation"
          name="passwordConfirmation"
          type="password"
          value={formData.passwordConfirmation}
          icon="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          onChange={handleInputChange('passwordConfirmation')}
          onBlur={validatePasswords}
          isValid={isFormValid && isPasswordsEqual}
        />

        <FormInputField
          label="First name"
          name="firstName"
          type="text"
          value={formData.firstName}
          placeholder="John"
          autoComplete="given-name"
          onChange={handleInputChange('firstName')}
          isValid={isFormValid}
        />

        <FormInputField
          label="Last name"
          name="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Wick"
          autoComplete="family-name"
          onChange={handleInputChange('lastName')}
          isValid={isFormValid}
        />

        <button type="submit" className="sign-btn" disabled={isLoading}>
          {isLoading ? (
            <Loader extraClass="loader-spinner-submit-btn" />
          ) : (
            <span>Sign up</span>
          )}
        </button>

        <ErrorMessage
          message={errorMessage}
          children={
            forgotPassword && (
              <Link href="/auth/reset-password/send-email">
                Forgot password?
              </Link>
            )
          }
        />
      </form>

      <Footer isRegistration={true} />
    </div>
  )
}

export default RegistrationForm
