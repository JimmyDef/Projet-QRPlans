import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="register">
        Connect your account with providers above or{' '}
        <Link className="register-link" href="/auth/registration">
          register.
        </Link>
      </p>
      <p className="request-activation-link">
        Request a new{' '}
        <Link
          className="activation-link"
          href="/auth/registration/token-activation/resend-activation-link"
        >
          activation link.
        </Link>
      </p>
      <p className="note">Terms of use &amp; Conditions</p>
    </footer>
  )
}
