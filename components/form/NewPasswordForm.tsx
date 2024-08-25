'use client'
import Image from 'next/image'
import { useState } from 'react'
import PasswordCheckList from '@/components/passwordCheckList/PasswordCheckList'
import { comparePasswords } from '@/services/helpers'
import '@/styles/app/shared/form.scss'
import { redirect, useParams, useRouter } from 'next/navigation'
const NewPasswordForm = () => {
  const { token } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState<string | null>(null)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const router = useRouter()

  const [form, setForm] = useState({
    password: '',
    passwordConfirmation: '',
    token: token,
  })

  if (!token) redirect('/reset-password/send-email')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isPasswordValid) {
      return setErrorSignUp('Password is not strong enough.')
    }
    setErrorSignUp('')
    if (comparePasswords(form.password, form.passwordConfirmation))
      return setIsPasswordsEqual(false)
    if (
      Object.values(form).some((value) =>
        Array.isArray(value)
          ? value.join('').trim() === ''
          : value.trim() === ''
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
        router.push('/reset-password/request-result/success')
      } else {
        const errorData = await res.json()
        setErrorSignUp(errorData.error || 'An unexpected error occurred.')
      }
    } catch (error) {
      setErrorSignUp('Failed to submit the form. Please try again later.')
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

  return (
    <div className="sign_form_container sign-up_form_container">
      <div className="header-sign-up">
        <div className="logo_container"></div>
        <div className="title_container">
          <p className="title">Create new password</p>
          <span className="subtitle">
            Fill in the form to create a new password.
          </span>
        </div>
      </div>

      <form
        className="sign_form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            New password
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/logos/password.svg"
            alt="email icon"
          />
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            placeholder="Password"
            name="password"
            type="password"
            className={`input_field ${
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
        <div className="input_container">
          <label className="input_label" htmlFor="password_confirmation_field">
            New password confirmation
            {!isPasswordsEqual && (
              <span className="password-confirmation-error"></span>
            )}
          </label>
          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/logos/password.svg"
            alt="email icon"
          />
          <input
            value={form.passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            onBlur={handlePasswordMismatch}
            placeholder="Password"
            name="passwordConfirmation"
            type="password"
            className={`input_field ${
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

        <button type="submit" className="sign_btn" disabled={isLoading}>
          <span>Sign Up</span>
        </button>
      </form>
      {/* FIN DU FORM ----------------------------------------------- 
      ---------------------------------------*/}
    </div>
  )
}
export default NewPasswordForm
