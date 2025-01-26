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

      <p className="note">Terms of use &amp; Conditions</p>
    </footer>
  )
}
