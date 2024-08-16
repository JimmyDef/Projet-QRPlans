import '@/styles/app/shared/token-activation.scss'

import Link from 'next/link'

const ActivationSuccess = async () => {
  return (
    <div className="token-activation">
      <h1 className="token-activation__title">Email verified!</h1>
      <p className="token-activation__text">
        Your email has been verified. You are now logged in.
      </p>
      <Link href="/dashboard" className="token-activation__link">
        Go to dashboard
      </Link>
    </div>
  )
}

export default ActivationSuccess
