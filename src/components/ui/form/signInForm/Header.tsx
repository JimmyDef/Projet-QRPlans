import { useSearchParams } from 'next/navigation'

export const Header = () => {
  const searchParams = useSearchParams()
  const providers = ['google', 'facebook', 'github', 'linkedin', 'email']
  const errorString = searchParams.get('error')
  const provider = providers.find((p) => errorString?.includes(p))

  const errorSubtitle = (
    <p className="subtitle subtitle--oauth-account-not-linked">
      To confirm your identity, sign in with the same account you used
      originally. <br />{' '}
      <span className="subtitle--provider">
        {'(' + provider?.toUpperCase() + ')'}
      </span>
    </p>
  )
  const defaultSubtitle = (
    <p className="subtitle">
      Get access to your dashboard by using credentials or providers.
    </p>
  )
  const subtitle = provider ? errorSubtitle : defaultSubtitle

  return (
    <section className="header-auth-form">
      <div className="logo-container"></div>
      <div className="title-container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">{subtitle} </span>
      </div>
    </section>
  )
}
