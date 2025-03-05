import { useSearchParams } from 'next/navigation'
import './header.scss'

interface HeaderProps {
  isRegistration?: boolean
}

export const Header = ({ isRegistration = false }: HeaderProps) => {
  const searchParams = useSearchParams()
  const providers = ['google', 'facebook', 'github', 'linkedin', 'email']
  const errorString = searchParams.get('error')
  const provider = providers.find((p) => errorString?.includes(p))

  const title = isRegistration ? 'Create Your Account' : 'Login to your Account'

  const getSubtitle = () => {
    if (isRegistration) {
      return 'Get started with our app, just create an account and enjoy the experience.'
    }

    if (provider) {
      return (
        <p className="auth-form__header-subtitle auth-form__header-subtitle--oauth-account-not-linked">
          To confirm your identity, sign in with the same account you used
          originally. <br />{' '}
          <span className="auth-form__header-subtitle--provider">
            {'(' + provider.toUpperCase() + ')'}
          </span>
        </p>
      )
    }

    return 'Get access to your dashboard by using credentials or providers.'
  }
  // throw new Error('test')
  return (
    <section className="auth-form__header">
      <div className="auth-form__header-logo-container"></div>
      <div className="auth-form__header-title-container">
        <h1 className="auth-form__header-title">{title}</h1>
        <span className="auth-form__header-subtitle">{getSubtitle()}</span>
      </div>
    </section>
  )
}
