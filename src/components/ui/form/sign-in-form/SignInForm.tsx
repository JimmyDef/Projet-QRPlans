'use client'
import signInWithCredentials from '@/src/services/auth/signInWithCredentials'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import '@/src/components/ui/form/auth-forms.scss'
import { Footer } from '@/src/components/ui/form/components/footer/Footer'
import { Header } from '@/src/components/ui/form/components/header/Header'
import { FormInputField } from '@/src/components/ui/form/components/input-field/InputField'
import { memo, useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { SubmitButton } from '../../buttons/submit-button/SubmitButton'
import { AuthProviders } from '../components/auth-providers/AuthProviders'
import { ErrorMessage } from '../components/error-message/ErrorMessage'
import { Separator } from '../components/separator-line/Separator'

export interface SignInFormFields {
  email: string
  password: string
}
const initialFormState = {
  email: '',
  password: '',
}
const MemoizedFormInputField = memo(FormInputField)

const SignIn = () => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<SignInFormFields>(initialFormState)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Réinitialiser les états
    setIsFormValid(true)
    setErrorMessage(null)
    setIsLoading(true)

    // Validation du formulaire
    const emptyFields = Object.entries(formData).find(
      ([_, value]) => !value.trim()
    )
    if (emptyFields) {
      const errorMessage = 'Please fill all fields.'
      setIsFormValid(false)
      setErrorMessage(errorMessage)
      toast.error(errorMessage)
      setIsLoading(false)

      // Focus sur le premier champ vide
      const [emptyFieldName] = emptyFields
      if (emptyFieldName === 'email' && emailInputRef.current) {
        emailInputRef.current.focus()
      } else if (emptyFieldName === 'password' && passwordInputRef.current) {
        passwordInputRef.current.focus()
      }

      return
    }

    try {
      // Tentative de connexion
      const res = await signInWithCredentials(formData)

      if (res?.status === 'success') {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/dashboard',
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred, please try again.'

      setErrorMessage(errorMessage)
      toast.error(errorMessage)
      setIsLoading(false)

      // Focus sur l'email en cas d'erreur d'authentification
      if (emailInputRef.current) {
        emailInputRef.current.focus()
      }
    }
  }

  const handleInputChange = useCallback(
    (field: keyof SignInFormFields, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange('email', e.target.value)
    },
    [handleInputChange]
  )
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange('password', e.target.value)
    },
    [handleInputChange]
  )
  return (
    <div className="auth-form__container">
      <Header authContext="signIn" />

      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />
      <Separator />

      <form className="auth-form" onSubmit={handleSubmit}>
        <MemoizedFormInputField
          ref={emailInputRef}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          icon="email"
          placeholder="name@mail.com"
          autoComplete="email"
          onChange={handleEmailChange}
          isValid={isFormValid}
        />

        <MemoizedFormInputField
          ref={passwordInputRef}
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          icon="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handlePasswordChange}
          isValid={isFormValid}
          containerClassName="auth-form__last-input-field"
        />
        <div className="auth-form__forgot-password-link-container">
          <Link
            className="auth-form__forgot-password-link"
            href={`/auth/reset-password/${
              formData.email
                ? `?email=${encodeURIComponent(formData.email)}`
                : ''
            }`}
          >
            Forgot password?
          </Link>
        </div>
        <SubmitButton
          isLoading={isLoading}
          text="Sign In"
          className="submit-btn submit-btn--auth-form"
        />

        <ErrorMessage message={errorMessage} />
      </form>

      <Footer />
    </div>
  )
}

export default SignIn
