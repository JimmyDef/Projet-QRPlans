import './activation-success.scss'
import Link from 'next/link'

const ActivationSuccess = async () => {
  return (
    <div className="activation-success">
      <h1 className="activation-success__title">Email verified!</h1>
      <p className="activation-success__text">
        Your email has been verified. You are now logged in.
      </p>
      <Link href="/dashboard" className="activation-success__link">
        Go to dashboard
      </Link>
    </div>
  )
}

export default ActivationSuccess
