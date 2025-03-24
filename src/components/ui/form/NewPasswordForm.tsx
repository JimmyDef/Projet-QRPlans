'use client'
import PasswordCheckList from '@/src/components/auth/password-check-list/PasswordCheckList'
import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { SubmitButton } from '../buttons/submit-button/SubmitButton'
import './auth-forms.scss'
import { ErrorMessage } from './components/error-message/ErrorMessage'
import { Header } from './components/header/Header'
import { FormInputField } from './components/input-field/InputField'

import { useRouter } from 'next/navigation'

interface NewPasswordFormFields {
  token: string
  email: string
}
interface NewPasswordFormData {
  password: string
  passwordConfirmation: string
  token: string
  email: string
}
interface FormError {
  type: 'password' | 'confirmation'
  message: string
}
const defaultFormData: NewPasswordFormData = {
  password: '',
  passwordConfirmation: '',
  token: '',
  email: '',
}
const NewPasswordForm = ({ email, token }: NewPasswordFormFields) => {
  const router = useRouter()
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationInputRef = useRef<HTMLInputElement>(null)

  const [uiState, setUiState] = useState({
    isLoading: false,
    errorMessage: null as string | null,
    isFormValid: true,
    isPassWordStrong: true,
    isPasswordVisible: false,
  })
  const [formData, setFormData] = useState<NewPasswordFormData>({
    ...defaultFormData,
    token,
    email,
  })

  const validateForm = (
    password: string,
    confirmationPassword: string
  ): FormError | null => {
    if (!password.trim())
      return {
        type: 'password',
        message: 'Please fill the new password field.',
      }
    if (!uiState.isPassWordStrong)
      return {
        type: 'password',
        message: 'Password is not strong enough.',
      }
    if (!confirmationPassword.trim())
      return {
        type: 'confirmation',
        message: 'Please fill the password confirmation field.',
      }
    if (password !== confirmationPassword)
      return {
        type: 'confirmation',
        message: 'Passwords do not match.',
      }
    return null
  }
  const handleFieldFocus = (focus: 'password' | 'confirmation') => {
    if (focus === 'password') passwordInputRef.current?.focus()
    if (focus === 'confirmation') passwordConfirmationInputRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUiState((prev) => ({ ...prev, errorMessage: null }))

    const formError = validateForm(
      formData.password,
      formData.passwordConfirmation
    )
    if (formError) {
      setUiState((prev) => ({
        ...prev,
        errorMessage: formError.message,
        isFormValid: false,
      }))
      setFormData((prev) => ({ ...prev, passwordConfirmation: '' }))
      handleFieldFocus(formError.type)
      return
    }

    try {
      setUiState((prev) => ({ ...prev, isLoading: true }))
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const errorData = await res.json()
        setUiState((prev) => ({
          ...prev,
          errorMessage: errorData.error || 'An unexpected error occurred.',
          isLoading: false,
        }))
        return
      }

      await signIn('credentials', {
        callbackUrl: '/dashboard?toast=new-password-ok',
        email: formData.email,
        password: formData.password,
      })
    } catch (error) {
      setUiState((prev) => ({
        ...prev,
        errorMessage: 'Failed to submit the form. Please try again later.',
        isLoading: false,
      }))
    }
  }

  const handleInputChange =
    (field: 'password' | 'passwordConfirmation') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

  useEffect(() => {
    if (uiState.errorMessage) {
      toast.error(uiState.errorMessage)
    }
  }, [uiState.errorMessage])
  useEffect(() => {
    setTimeout(
      () => {
        router.push('/auth/reset-password?timer=expired')
      },
      1 * 60 * 1000
    )
  }, [])

  return (
    <div className="auth-form__container">
      <Header authContext="resetPassword" />
      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="form-input-wrapper">
          <FormInputField
            ref={passwordInputRef}
            label="Password"
            name="password"
            type={uiState.isPasswordVisible ? 'text' : 'password'}
            value={formData.password}
            icon="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleInputChange('password')}
            isValid={uiState.isFormValid}
            isPassword={true}
            togglePasswordVisibility={() =>
              setUiState((prev) => ({
                ...prev,
                isPasswordVisible: !prev.isPasswordVisible,
              }))
            }
            isPasswordVisible={uiState.isPasswordVisible}
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
          type={uiState.isPasswordVisible ? 'text' : 'password'}
          value={formData.passwordConfirmation}
          icon="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          onChange={handleInputChange('passwordConfirmation')}
          isValid={uiState.isFormValid}
          isPassword={true}
          togglePasswordVisibility={() =>
            setUiState((prev) => ({
              ...prev,
              isPasswordVisible: !prev.isPasswordVisible,
            }))
          }
          isPasswordVisible={uiState.isPasswordVisible}
        />

        <SubmitButton
          isLoading={uiState.isLoading}
          text="Change password"
          className="submit-btn submit-btn--auth-form"
        />
        <ErrorMessage message={uiState.errorMessage} />
      </form>
    </div>
  )
}
export default NewPasswordForm
