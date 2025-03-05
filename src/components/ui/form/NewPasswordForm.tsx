'use client'
import PasswordCheckList from '@/src/components/auth/password-check-list/PasswordCheckList'
import {} from '@/src/lib/helpers'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import './../auth-forms.scss'

interface FormProps {
  token: string
  email: string
}

const NewPasswordForm = ({ email, token }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorSignUp, setChangePasswordError] = useState<string | null>(null)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const router = useRouter()

  const [form, setForm] = useState({
    password: '',
    passwordConfirmation: '',
    token: token,
    email: email,
  })

  if (!token) redirect('/auth/reset-password/send-email')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isPasswordValid) {
      return setChangePasswordError('Password is not strong enough.')
    }
    setChangePasswordError('')
    if (comparePasswords(form.password, form.passwordConfirmation))
      return setIsPasswordsEqual(false)
    if (
      Object.values(form).some((value) =>
        Array.isArray(value)
          ? value.join('').trim() === ''
          : value?.trim() === ''
      )
    )
      return setIsFormValid(false)

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        console.log('res', res)
        console.log('form', form.email, form.password)
        await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
        })
        router.push('/auth/reset-password/request-result/success')
      } else {
        const errorData = await res.json()
        setChangePasswordError(
          errorData.error || 'An unexpected error occurred.'
        )
      }
    } catch (error) {
      setChangePasswordError(
        'Failed to submit the form. Please try again later.'
      )
      console.error('Error fetch:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordMismatch = () => {
    if (comparePasswords(form.password, form.passwordConfirmation)) {
      setForm({ ...form, passwordConfirmation: '' })
      console.log(form)
      return setIsPasswordsEqual(false)
    }
    return setIsPasswordsEqual(true)
  }
  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPasswordConfirmation = e.target.value

    setForm({
      ...form,
      passwordConfirmation: updatedPasswordConfirmation,
    })
    if (form.password === updatedPasswordConfirmation) {
      console.log('form', updatedPasswordConfirmation)
      return setIsPasswordsEqual(true)
    }
  }
  // useEffect(() => {
  //   signOut({ redirect: false }).then(() => {
  //     console.log('User signed out automatically')
  //   })
  // }, [])
  return (
    <div className="sign-form-container sign-up-form-container">
      <div className="header-sign-up">
        <div className="logo-container"></div>
        <div className="title-container">
          <p className="title">Create new password</p>
          <span className="subtitle">
            Fill in the form to create a new password.
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
          <input type="text" name="username" autoComplete="username" hidden />
          <label className="input-label" htmlFor="password_field">
            New password
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/icons/password.svg"
            alt="email icon"
          />
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            New password confirmation
            {!isPasswordsEqual && (
              <span className="password-confirmation-error"></span>
            )}
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/icons/password.svg"
            alt="email icon"
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

        {!isFormValid && <p className="form-error">Please fill all fields.</p>}
        {errorSignUp && <p className="form-error">{errorSignUp}</p>}

        <button type="submit" className="sign-btn" disabled={isLoading}>
          <span>Change password</span>
        </button>
      </form>
    </div>
  )
}
export default NewPasswordForm
