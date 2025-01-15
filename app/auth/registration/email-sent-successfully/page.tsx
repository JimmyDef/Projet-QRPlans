import '@/src/styles/app/shared/email-sent-success.scss'
import Link from 'next/link'
import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

const EmailConfirmation = async () => {
  const session = await auth()
  if (session?.user.active) {
    redirect('/dashboard')
  }

  return (
    <div className="email__container">
      <h1 className="email__title">Email de validation envoyé</h1>4556
      <p className="email__text">
        Merci de vous être inscrit ! Un email contenant un code
        d&apos;activation a été envoyé à votre adresse email. Veuillez vérifier
        votre boîte de réception et suivre les instructions pour valider votre
        compte.
      </p>
      <p className="email__text">
        Si vous ne trouvez pas l&apos;email, veuillez vérifier votre dossier de
        spam ou de courrier indésirable.
      </p>
      <p className="email__text">
        Si vous n&apos;avez toujours pas reçu l&apos;email, vous pouvez{' '}
        <Link
          className="email__link  email__link--resend"
          href="/auth/registration/token-activation/resend-activation-link"
        >
          redemander code d&apos;activation
        </Link>
        .
      </p>
      <p className="email__text">
        Besoin d&apos;aide ?{' '}
        <Link href="/support" className="email__link  email__link--support">
          Contactez le support
        </Link>
        .
      </p>
    </div>
  )
}
export default EmailConfirmation
