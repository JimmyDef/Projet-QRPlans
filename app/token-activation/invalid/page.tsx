import '@/styles/app/shared/token-activation.scss'

import Link from 'next/link'
const ActivationFail = () => {
  return (
    <div className="token-activation">
      <h1 className="token-activation__title">
        Activation link invalid or expired.
      </h1>
      <p className="token-activation__text">Please request a new one.</p>
      <Link
        href="/token-activation/resend-activation-link"
        className="token-activation__link"
      >
        Send me a new link
      </Link>
    </div>
  )
}
export default ActivationFail
