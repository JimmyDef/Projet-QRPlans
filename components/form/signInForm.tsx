'use client'
import Image from 'next/image'
import { AuthButton } from '@/components/buttons/AuthButton'
import { useActionState, useState } from 'react'
import { credentialsSignIn } from '@/app/actions/action'
import './form.scss'
import Link from 'next/link'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setErrorAuthBtn] = useState<string | null>(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (formData: FormData) => {
    console.log('🚀 ~ form:', formData)

    // event.preventDefault()

    if (Object.values(form).some((value) => value.trim() === ''))
      return setIsFormValid(false)
    credentialsSignIn(formData)
  }
  // const [state, formAction] = useActionState(credentialsSignIn, null)
  return (
    <div className="sign_form_container">
      {/* <p className="form-error">{JSON.stringify(state)}</p> */}
      <form className="sign_form" action={handleSubmit}>
        <div className="logo_container"></div>
        <div className="title_container">
          <p className="title">Login to your Account</p>
          <span className="subtitle">
            Get acces to your account, just login with your credentials.
          </span>
        </div>
        <br />
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
              !isFormValid && !form.email ? 'input-error' : ''
            } `}
            id="email_field"
            autoComplete="email"
            required
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="password">
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            name="password"
            type="password"
            className={`input_field ${
              !isFormValid && !form.password ? 'input-error' : ''
            } `}
            id="password_field"
            autoComplete="current-password"
          />
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}

        <button title="Sign In" type="submit" className="sign_btn">
          <span>Sign In</span>
        </button>
      </form>
      {/* FIN DU FORM ----------------------------------------------- 
      ---------------------------------------*/}

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <div className="auth-btn-container">
        <AuthButton
          className="sign__brand sign__brand--google"
          provider="google"
          setIsLoading={setIsLoading}
          setErrorAuthBtn={setErrorAuthBtn}
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
          setErrorAuthBtn={setErrorAuthBtn}
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
          setErrorAuthBtn={setErrorAuthBtn}
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
          setErrorAuthBtn={setErrorAuthBtn}
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
      </div>
      <div className="footer">
        <p className="register">
          Create your account with providers above or{' '}
          <Link className="register-link" href="/registration">
            Register.
          </Link>
        </p>
        <p className="note">Terms of use &amp; Conditions</p>
      </div>
    </div>
  )
}
export default SignIn
