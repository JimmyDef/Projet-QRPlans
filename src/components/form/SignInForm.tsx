'use client'
import Loader from '@/src/components/loader/Loader'
import signInWithCredentials from '@/src/services/auth/signInWithCredentials'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthProviders } from './components/AuthProviders'
import './form.scss'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Form {
  email: string
  password: string
}

const SignIn = () => {
  const router = useRouter()
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  })
  const [subtitle, setSubtitle] = useState(
    'Get access to your dashboard by using credentials or providers.'
  )
  const [subtitleClassName, setSubtitleClassName] = useState('subtitle')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (
      pathname === '/auth/sign-in' &&
      searchParams.get('error') === 'OAuthAccountNotLinked'
    ) {
      setSubtitle(
        'To confirm your identity, sign in with the same account you used originally.'
      )
      setSubtitleClassName('subtitle subtitle--oauth-account-not-linked')
      return
    }
  }, [pathname, searchParams, session.status, router])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    form: Form
  ) => {
    event.preventDefault()
    setIsFormValid(true)
    setIsLoading(true)
    if (Object.values(form).some((value) => value.trim() === '')) {
      setIsFormValid(false)
      setIsLoading(false)
      return
    }

    try {
      const res = await signInWithCredentials(form)
      if (res.status === 'success') {
        await signIn('credentials', {
          email: form.email,
          password: form.password,
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        console.log('setError', err.message)
      } else {
        setError('An error occurred, please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-form-container">
      <form
        className="sign-form"
        onSubmit={(event) => handleSubmit(event, form)}
      >
        <div className="logo-container"></div>
        <div className="title-container">
          <p className="title">Login to your Account</p>
          <div className="subtitle-wrapper">
            <p className={subtitleClassName}>{subtitle}</p>
          </div>
        </div>
        <br />
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
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@mail.com"
            name="email"
            type="email"
            className={`input-field ${
              !isFormValid && !form.email ? 'input-error' : ''
            } `}
            id="email_field"
            autoComplete="email"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            name="password"
            type="password"
            className={`input-field input-field--password-sign-in ${
              !isFormValid && !form.password ? 'input-error' : ''
            } `}
            id="password_field"
            autoComplete="current-password"
          />
          <Link
            href="/auth/reset-password/send-email"
            className="form-password-error--sign-in"
          >
            Forgot password?
          </Link>
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}
        {error && (
          <p className="form-error">
            {error}{' '}
            {error === 'Email is not verified.' ? (
              <Link
                className="unverified-email-link"
                href="/auth/registration/token-activation/resend-activation-link"
              >
                Request activation link?
              </Link>
            ) : null}
          </p>
        )}

        <button
          title="Sign In"
          type="submit"
          className="sign-btn"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : <span>Sign In</span>}
        </button>
      </form>

      <div className="separator">
        <hr className="line" />
        <span>Or</span>
        <hr className="line" />
      </div>
      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />

      <div className="footer">
        <p className="register">
          Connect your account with providers above or{' '}
          <Link className="register-link" href="/auth/registration">
            register.
          </Link>
        </p>
        <p className="note">Terms of use &amp; Conditions</p>
      </div>
    </div>
  )
}
export default SignIn
