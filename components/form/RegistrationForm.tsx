'use client'
import Link from 'next/link'
import Image from 'next/image'
import { AuthButton } from '@/components/buttons/AuthButton'
import { useState } from 'react'
import PasswordCheckList from '@/components/passwordCheckList/PasswordCheckList'
import { sanitizeInput } from '@/services/helpers'
import '@/styles/app/shared/form.scss'

import { useRouter } from 'next/navigation'
const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [errorSignUp, setErrorSignUp] = useState<string | null>(null)
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true)
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
  })

  const comparePasswords = (password: string, passwordConfirmation: string) => {
    return password !== passwordConfirmation
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (comparePasswords(form.password, form.passwordConfirmation))
      return setIsPasswordsEqual(false)
    if (Object.values(form).some((value) => value.trim() === ''))
      return setIsFormValid(false)

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/registration/email-sent-successfully')
      } else {
        if (res.status === 409) {
          setIsPasswordForgotten(true)
        } else if (res.status === 400) {
          setErrorSignUp('Missing required fields. Please fill out all fields.')
        } else {
          setErrorSignUp('An unexpected error occurred. Please try again.')
        }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = sanitizeInput(value)
    setForm({ ...form, [name]: formattedValue })
  }

  return (
    <div className="sign_form_container sign-up_form_container">
      <div className="header-sign-up">
        <div className="logo_container"></div>
        <div className="title_container">
          <p className="title">Create your Account</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
      </div>
      <div className="auth-btn-container">
        {/* {errorAuthBtn && <p className="error">{errorAuthBtn}</p>} */}
        <AuthButton
          className="sign__brand sign__brand--google"
          provider="google"
          setIsLoading={setIsLoading}
          // setErrorAuthBtn={setErrorAuthBtn}
          isLoading={isLoading}
          title="Sign In with Google"
        >
          <Image
            className="icon-auth"
            width={30}
            height={30}
            src="/logos/google.svg"
            alt="google icon"
          />
          <span className="auth-label">Google</span>
        </AuthButton>
        <AuthButton
          className="sign__brand sign__brand--github"
          provider="github"
          setIsLoading={setIsLoading}
          // setErrorAuthBtn={setErrorAuthBtn}
          isLoading={isLoading}
          title="Sign In with GitHub"
        >
          <Image
            className="icon-auth"
            width={30}
            height={30}
            src="/logos/github.svg"
            alt="github icon"
          />
          <span className="auth-label">GitHub</span>
        </AuthButton>
        <AuthButton
          className="sign__brand sign__brand--facebook"
          provider="Facebook"
          setIsLoading={setIsLoading}
          // setErrorAuthBtn={setErrorAuthBtn}
          isLoading={isLoading}
          title="Sign In with Facebook"
        >
          <Image
            className="icon-auth"
            width={30}
            height={30}
            src="/logos/facebook.svg"
            alt="facebook icon"
          />
          <span className="auth-label">Facebook</span>
        </AuthButton>
        <AuthButton
          className="sign__brand sign__brand--LinkedIn"
          provider="linkedin"
          setIsLoading={setIsLoading}
          // setErrorAuthBtn={setErrorAuthBtn}
          isLoading={isLoading}
          title="Sign In with LinkedIn"
        >
          <Image
            className="icon-auth icon-auth--linkedin"
            width={32}
            height={32}
            src="/logos/linkedin.svg"
            alt="linkedin icon"
          />
          <span className="auth-label">Linked In</span>
        </AuthButton>
        {/* <p className="note">Terms of use &amp; Conditions</p> */}
      </div>

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>

      <form
        className="sign_form"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="input_container">
          <label className="input_label" htmlFor="email">
            Email
          </label>

          <Image
            className="icon-credential"
            width={30}
            height={30}
            src="/logos/email.svg"
            alt="email icon"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@mail.com"
            name="email"
            type="email"
            className={`input_field ${
              !isFormValid && form.email === '' ? 'input-error' : ''
            } `}
            id="email_field"
            autoComplete="email"
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password_field">
            Password
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
          <PasswordCheckList password={form.password} />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password_confirmation_field">
            Password confirmation
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
            onChange={(e) =>
              setForm({ ...form, passwordConfirmation: e.target.value })
            }
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
            autoComplete="new-password"
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="firstName">
            First name
          </label>

          <input
            value={form.firstName}
            onChange={handleInputChange}
            placeholder="John"
            name="firstName"
            type="text"
            className={`input_field ${
              !isFormValid && form.firstName === '' ? 'input-error' : ''
            } `}
            id="firstName"
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="lastName">
            Last name
          </label>

          <input
            value={form.lastName}
            onChange={handleInputChange}
            placeholder="Wick"
            name="lastName"
            type="text"
            className={`input_field   ${
              !isFormValid && !form.lastName ? 'input-error' : ''
            } `}
            id="lastName"
          />
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}
        {errorSignUp && <p className="form-error">{errorSignUp}</p>}
        {isPasswordForgotten && (
          <p className="form-error">
            Email already exists
            {` `}
            <Link
              href="/reset-password/send-email"
              className="form-password-error--registration"
            >
              Forgot password?
            </Link>
          </p>
        )}

        <button type="submit" className="sign_btn" disabled={isLoading}>
          <span>Sign Up</span>
        </button>
      </form>
      {/* FIN DU FORM ----------------------------------------------- 
      ---------------------------------------*/}
    </div>
  )
}
export default RegistrationForm
