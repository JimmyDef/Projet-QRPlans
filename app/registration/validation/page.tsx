import React from 'react'
import Link from 'next/link'
import './confirm-email.scss'
import { getSession } from '@/lib/getSession'

import { redirect } from 'next/navigation'
const EmailConfirmation = async () => {
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="confirm-email__container">
      <h1 className="confirm-email__title">Email de Confirmation Envoyé</h1>
      <p className="confirm-email__text">
        Merci de vous être inscrit ! Un email de validation a été envoyé à votre
        adresse email. Veuillez vérifier votre boîte de réception et suivre les
        instructions pour valider votre compte.
      </p>
      <p className="confirm-email__text">
        Si vous ne trouvez pas l&apos;email, veuillez vérifier votre dossier de
        spam ou de courrier indésirable.
      </p>
      <p className="confirm-email__text">
        Si vous n&apos;avez toujours pas reçu l&apos;email, vous pouvez{' '}
        <Link
          className="confirm-email__link  confirm-email__link--resend"
          href="/resend-email"
        >
          réenvoyer l&apos;email de validation
        </Link>
        .
      </p>
      <p className="confirm-email__text">
        Besoin d&apos;aide ?{' '}
        <Link
          href="/support"
          className="confirm-email__link  confirm-email__link--support"
        >
          Contactez le support
        </Link>
        .
      </p>
    </div>
  )
}
export default EmailConfirmation
