'use client'
import createUserAction from '@/app/actions/auth/createUser.action'
import PasswordCheckList from '@/src/components/auth/password-check-list/PasswordCheckList'
import { FormInputField } from '@/src/components/ui/form/components/input-field/InputField'
import {
  arePasswordsEqual,
  sanitizeEmailInput,
  sanitizeNameInput,
  sanitizePasswordInput,
} from '@/src/lib/helpers'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthProviders } from '../components/auth-providers/AuthProviders'
import { ErrorMessage } from '../components/error-message/ErrorMessage'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { Separator } from '../components/separator-line/Separator'
import { SubmitButton } from '../../buttons/submit-button/SubmitButton'
import '@/src/components/ui/form/auth-forms.scss'

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
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null)
  const firstNameInputRef = useRef<HTMLInputElement>(null)
  const lastNameInputRef = useRef<HTMLInputElement>(null)

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
      const emptyField = Object.entries(formData).find(
        ([_, value]) => !value.trim()
      )
      setErrorMessage('Please fill all fields.')
      setIsFormValid(false)

      if (emptyField) {
        const [fieldName] = emptyField
        const refMap = {
          email: emailInputRef,
          password: passwordInputRef,
          passwordConfirmation: passwordConfirmationInputRef,
          firstName: firstNameInputRef,
          lastName: lastNameInputRef,
        }
        refMap[fieldName as keyof typeof refMap]?.current?.focus()
      }
      return
    }

    if (!isPasswordValid) {
      setErrorMessage('Password is not strong enough.')
      passwordInputRef.current?.focus()
      return
    }

    if (!arePasswordsEqual(formData.password, formData.passwordConfirmation)) {
      setIsPasswordsEqual(false)
      passwordConfirmationInputRef.current?.focus()
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
      const { message, success, isNewUser } =
        await createUserAction(updatedForm)

      if (success) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
        })
        router.push('/auth/registration/validateEmailOTP')
      }

      if (!isNewUser) {
        setForgotPassword(true)
        setErrorMessage(message)
        setIsLoading(false)
        return
      }
      if (!success) {
        setErrorMessage(message)
        setIsLoading(false)
        throw new Error(message)
      }
    } catch (error) {
      console.error('Error fetch:', error)
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
          ref={emailInputRef}
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
            ref={passwordInputRef}
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
          ref={passwordConfirmationInputRef}
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
          ref={firstNameInputRef}
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
          ref={lastNameInputRef}
          label="Last name"
          name="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Wick"
          autoComplete="family-name"
          onChange={handleInputChange('lastName')}
          isValid={isFormValid}
        />

        <SubmitButton
          isLoading={isLoading}
          text="Sign up"
          className="submit-btn submit-btn--auth-form"
        />

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
