import React from 'react'
import Link from 'next/link'
import '@/styles/app/shared/email-sent-success.scss'
import { getSession } from '@/lib/getSession'

import { redirect } from 'next/navigation'
const EmailConfirmation = async () => {
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="email__container">
      <h1 className="email__title">Email de sécurité Envoyé</h1>
      <p className="email__text">
        Un email de sécurité a été envoyé à votre adresse. Veuillez vérifier
        votre boîte de réception et suivre les instructions pour réinitialiser
        votre mot de passe.
      </p>
      <p className="email__text">
        Si vous ne trouvez pas l&apos;email, veuillez vérifier votre dossier de
        spam ou de courrier indésirable.
      </p>
      <p className="email__text">
        Si vous n&apos;avez toujours pas reçu l&apos;email, vous pouvez{' '}
        <Link
          className="email__link  email__link--resend"
          href="/reset-password/send-email"
        >
          réenvoyer l&apos;email de sécurité
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
