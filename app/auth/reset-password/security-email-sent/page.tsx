import './security-email-sent.scss'
import Link from 'next/link'
import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
const SecurityEmailSent = async () => {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="security-email__container">
      <h1 className="security-email__title">Email de sécurité envoyé</h1>
      <p className="security-email__text">
        Un email de sécurité a été envoyé à votre adresse. Veuillez vérifier
        votre boîte de réception et suivre les instructions pour réinitialiser
        votre mot de passe.
      </p>
      <p className="security-email__text">
        Si vous ne trouvez pas l&apos;email, veuillez vérifier votre dossier de
        spam ou de courrier indésirable.
      </p>
      <p className="security-email__text">
        Si vous n&apos;avez toujours pas reçu l&apos;email, vous pouvez{' '}
        <Link
          className="security-email__link  security-email__link--resend"
          href="/auth/reset-password"
        >
          renvoyer l&apos;email de sécurité
        </Link>
        .
      </p>
      <p className="security-email__text">
        Besoin d&apos;aide ?{' '}
        <Link
          href="/support"
          className="security-email__link  security-email__link--support"
        >
          Contactez le support
        </Link>
        .
      </p>
    </div>
  )
}
export default SecurityEmailSent
