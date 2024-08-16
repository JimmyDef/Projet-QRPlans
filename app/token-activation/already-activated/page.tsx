import '@/styles/app/shared/token-activation.scss'

import Link from 'next/link'

const ActivationAlreadyDone = async () => {
  return (
    <div className="token-activation">
      <h1 className="token-activation__title">
        Email has been verified already!
      </h1>
      <p className="token-activation__text">
        Your email has been verified in the past. You can now log in.
      </p>
      <Link href="/signIn" className="token-activation__link">
        Go to sign-in
      </Link>
    </div>
  )
}

export default ActivationAlreadyDone
