'use client'
import Loader from '@/src/components/ui/loader/Loader'
import signInWithCredentials from '@/src/services/auth/signInWithCredentials'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { AuthProviders } from '../components/AuthProviders'
import { Footer } from './Footer'

import { toast } from 'react-toastify'
import { Separator } from '../components/Separator'
import { Header } from '../signInForm/Header'
import './../auth-forms.scss'
import { InputField } from '@/src/components/ui/form/components/InputField'

export interface IForm {
  email: string
  password: string
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [form, setForm] = useState<IForm>({
    email: '',
    password: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Réinitialiser les états
    setIsFormValid(true)
    setError(undefined)
    setIsLoading(true)

    // Validation du formulaire
    const hasEmptyFields = Object.values(form).some((value) => !value.trim())
    if (hasEmptyFields) {
      setIsFormValid(false)
      setIsLoading(false)
      toast.error('Veuillez remplir tous les champs')
      return
    }

    try {
      // Tentative de connexion
      const res = await signInWithCredentials(form)

      if (res.status === 'success') {
        await signIn('credentials', {
          email: form.email,
          password: form.password,
          redirect: true,
          callbackUrl: '/dashboard',
        })
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue, veuillez réessayer.'

      setError(errorMessage)
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-form-container">
      <form className="sign-form" onSubmit={handleSubmit}>
        <Header />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          icon="email"
          placeholder="name@mail.com"
          autoComplete="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          isFormValid={isFormValid}
        />

        <div className="input-container">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            icon="password"
            placeholder="Password"
            autoComplete="current-password"
            extraClassName="input-field--password-sign-in"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Link
            href="/auth/reset-password/send-email"
            className="form-password-error--sign-in"
          >
            Forgot password?
          </Link>
        </div>
        {!isFormValid && <p className="form-error">Please fill all fields.</p>}

        <button
          title="Sign In"
          type="submit"
          className="sign-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader extraClass="loader-spinner-var-form-button" />
          ) : (
            <span>Sign In</span>
          )}
        </button>
        <p className="form-error">{error} </p>
      </form>
      <Separator />
      <AuthProviders isLoading={isLoading} setIsLoading={setIsLoading} />

      <Footer />
    </div>
  )
}
export default SignIn
