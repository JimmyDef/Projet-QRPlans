'use client'
import createUserAction from '@/app/actions/auth/createUser.action'
import PasswordCheckList from '@/src/components/auth/password-check-list/PasswordCheckList'
import '@/src/components/ui/form/auth-forms.scss'
import { FormInputField } from '@/src/components/ui/form/components/input-field/InputField'
import {
  sanitizeEmailInput,
  sanitizeNameInput,
  sanitizePasswordInput,
} from '@/src/lib/helpers'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { SubmitButton } from '../../buttons/submit-button/SubmitButton'
import { AuthProviders } from '../components/auth-providers/AuthProviders'
import { ErrorMessage } from '../components/error-message/ErrorMessage'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { Separator } from '../components/separator-line/Separator'
import { set } from 'zod'
// import { isPasswordStrong } from '@/src/lib/helpers'
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
  const [forgotPasswordLink, setForgotPasswordLink] = useState(false)

  const [uiState, setUiState] = useState({
    isLoading: false,
    errorMessage: null as string | null,
    isFormValid: true,
    isPassWordStrong: true,
    isPasswordVisible: false,
  })
  const [formData, setFormData] =
    useState<RegistrationFormFields>(initialFormState)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUiState((prev) => ({ ...prev, errorMessage: null }))
    console.log('forgotPasswordLink', forgotPasswordLink)
    // Vérification des champs vides
    if (Object.values(formData).some((value) => value.trim() === '')) {
      const emptyField = Object.entries(formData).find(
        ([_, value]) => !value.trim()
      )
      // Mise a jour du state pour le display de l'erreur
      setUiState((prev) => ({
        ...prev,
        errorMessage: 'Please fill all fields.',
        isFormValid: false,
      }))

      // Focus sur le premier champ vide
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

    if (!uiState.isPassWordStrong) {
      setUiState((prev) => ({
        ...prev,
        errorMessage: 'Password is not strong enough.',
      }))
      setFormData((prev) => ({ ...prev, passwordConfirmation: '' }))
      passwordInputRef.current?.focus()
      return
    }

    if (formData.password !== formData.passwordConfirmation) {
      setUiState((prev) => ({
        ...prev,
        errorMessage: 'Passwords do not match.',
      }))
      setFormData((prev) => ({ ...prev, passwordConfirmation: '' }))
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
      setUiState((prev) => ({ ...prev, isLoading: true }))
      const { message, success } = await createUserAction(updatedForm)

      if (success) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
        })
        router.push('/auth/registration/validateEmailOTP')
      }

      if (!success) {
        setUiState((prev) => ({
          ...prev,
          errorMessage: message,
          isLoading: false,
        }))
      }
    } catch (error) {
      setUiState((prev) => ({
        ...prev,
        errorMessage: 'Failed to submit the form. Please try again later.',
        isLoading: false,
      }))
    }
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
  const handleTogglePasswordVisibility = () => {
    setUiState((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }))
  }
  useEffect(() => {
    if (uiState.errorMessage) {
      toast.error(uiState.errorMessage)
    }
    if (uiState.errorMessage?.includes('credentials')) {
      setForgotPasswordLink(true)
    } else {
      setForgotPasswordLink(false)
    }
  }, [uiState.errorMessage])

  return (
    <div className="auth-form__container">
      <Header authContext="registration" />
      <AuthProviders
        isLoading={uiState.isLoading}
        setIsLoading={(isLoading) =>
          setUiState((prev) => ({ ...prev, isLoading }))
        }
      />
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
          isValid={uiState.isFormValid}
        />

        <div className="form-input-wrapper">
          <FormInputField
            ref={passwordInputRef}
            label="Password"
            name="password"
            value={formData.password}
            icon="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleInputChange('password')}
            isValid={uiState.isFormValid}
            type={uiState.isPasswordVisible ? 'text' : 'password'}
            isPassword={true}
            togglePasswordVisibility={handleTogglePasswordVisibility}
          />
          <PasswordCheckList
            password={formData.password}
            setIsPasswordStrong={(isStrong) =>
              setUiState((prev) => ({ ...prev, isPassWordStrong: isStrong }))
            }
          />
        </div>

        <FormInputField
          ref={passwordConfirmationInputRef}
          label="Password confirmation"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          icon="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          onChange={handleInputChange('passwordConfirmation')}
          isValid={uiState.isFormValid}
          type={uiState.isPasswordVisible ? 'text' : 'password'}
          isPassword={true}
          togglePasswordVisibility={handleTogglePasswordVisibility}
          isPasswordVisible={uiState.isPasswordVisible}
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
          isValid={uiState.isFormValid}
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
          isValid={uiState.isFormValid}
        />

        <SubmitButton
          isLoading={uiState.isLoading}
          text="Sign up"
          className="submit-btn submit-btn--auth-form"
        />

        <ErrorMessage
          message={uiState.errorMessage}
          children={
            forgotPasswordLink && (
              <Link
                href={`/auth/reset-password/${
                  formData.email
                    ? `?email=${encodeURIComponent(formData.email)}`
                    : ''
                }`}
              >
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
