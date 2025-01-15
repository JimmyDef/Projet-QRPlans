import { useSearchParams } from 'next/navigation'
import React from 'react'

interface HeaderProps {
  title?: string
}
export const Header = ({ title = 'Create Your account' }: HeaderProps) => {
  const searchParams = useSearchParams()
  const providers = ['google', 'facebook', 'github', 'linkedin']
  const errorString = searchParams.get('error')
  const provider = providers.find((p) => errorString?.includes(p))

  const errorSignInSub = (
    <p className="subtitle subtitle--oauth-account-not-linked">
      To confirm your identity, sign in with the same account you used
      originally. <br />{' '}
      <span className="subtitle--provider">
        {'(' + provider?.toUpperCase() + ')'}
      </span>
    </p>
  )
  const defaultSignInSub = (
    <p className="subtitle">
      Get access to your dashboard by using credentials or providers.
    </p>
  )
  const SignInSub = errorString ? errorSignInSub : defaultSignInSub
  const subtitleRegistration = (
    <span className="subtitle">
      Get started with our app, just create an account and enjoy the experience.
    </span>
  )

  const subtitle =
    title === 'Create your Account' ? subtitleRegistration : SignInSub
  return (
    <section className="header-auth-form">
      <div className="logo-container"></div>
      <div className="title-container">
        <p className="title">{title}</p>
        <span className="subtitle">{subtitle} </span>
      </div>
    </section>
  )
}
