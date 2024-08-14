import './activation-fail.scss'
import Link from 'next/link'
const ActivationFail = () => {
  return (
    <div className="activation-fail">
      <h1 className="activation-fail__title">
        Activation link invalid or expired.
      </h1>
      <p className="activation-fail__text">Please request a new one.</p>
      <Link
        href="/token-activation/resend-activation-link"
        className="activation-fail__link"
      >
        Send me a new link
      </Link>
    </div>
  )
}
export default ActivationFail
