import { Otp } from '@/src/components/auth/otp/Otp'
import Link from 'next/link'
import React from 'react'

const ValidateEmailCode = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Vérification de votre adresse e-mail</h1>
      <p>
        Pour finaliser votre inscription, veuillez entrer le code que vous avez
        reçu par e-mail.
      </p>

      <Otp />

      <p style={{ marginTop: '1rem' }}>
        Vous n&apos;avez pas reçu le code ?{' '}
        <Link href="#">Renvoyer l&apos;e-mail</Link>
      </p>
    </div>
  )
}

export default ValidateEmailCode
