import { useSearchParams } from 'next/navigation'
import './header.scss'

interface HeaderProps {
  authContext: 'registration' | 'signIn' | 'resetPassword' | 'newPassword'
}

export const Header = ({ authContext }: HeaderProps) => {
  const searchParams = useSearchParams()
  const providers = ['google', 'facebook', 'github', 'linkedin', 'email']
  const errorString = searchParams.get('error')
  const provider = providers.find((p) => errorString?.includes(p))

  const TITLES = {
    registration: 'Create Your Account',
    signIn: 'Login to your Account',
    resetPassword: 'Reset your password',
    newPassword: 'Create a new password',
  }
  const SUBTITLES = {
    registration:
      'Get started with our app, just create an account and enjoy the experience.',
    signIn: 'Get access to your dashboard by using credentials or providers.',
    resetPassword:
      'Enter your email address and we will send you a verifiaction code to reset your password.',
    newPassword: 'Fill in the form to create a new password.',
  }

  const OAuthAccountLinkedMessage = (
    <p className="auth-form__header-subtitle auth-form__header-subtitle--oauth-account-not-linked">
      To confirm your identity, sign in with the same account you used
      originally. <br />{' '}
      <span className="auth-form__header-subtitle--provider">
        {'(' + provider?.toUpperCase() + ')'}
      </span>
    </p>
  )

  const subTitle = provider ? OAuthAccountLinkedMessage : SUBTITLES[authContext]

  return (
    <section className="auth-form__header">
      <div className="auth-form__header-logo-container"></div>
      <div className="auth-form__header-title-container">
        <h1 className="auth-form__header-title">{TITLES[authContext]}</h1>
        <span className="auth-form__header-subtitle">{subTitle}</span>
      </div>
    </section>
  )
}
