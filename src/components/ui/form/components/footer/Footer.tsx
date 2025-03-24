import Link from 'next/link'
import './footer.scss'

interface FooterProps {
  isRegistration?: boolean
}

export const Footer = ({ isRegistration = false }: FooterProps) => {
  return (
    <footer className="auth-form__footer">
      {!isRegistration ? (
        <p className="auth-form__register">
          Connect your account with providers above or{' '}
          <Link className="auth-form__register-link" href="/auth/registration">
            register
          </Link>
          .
        </p>
      ) : null}

      <p className="auth-form__use-and-conditions">
        Terms of use &amp; Conditions
      </p>
    </footer>
  )
}
