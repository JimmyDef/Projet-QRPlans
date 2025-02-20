'use client'

import { resendRegistrationOtp } from '@/app/actions/otp/resendRegistrationOtp.action'
import { Otp } from '@/src/components/auth/otp/Otp'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const ValidateEmailOTP = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [response, action, isPending] = useActionState(resendRegistrationOtp, {
    message: '',
    success: false,
  })
  const handleResendEmail = async () => {
    const userId = session?.user.id
    const email = session?.user.email
    const fullName = session?.user.name
    if (!userId || !email || !fullName) throw new Error('Invalid user data')
    startTransition(() => {
      action({
        userId,
        email,
        fullName,
      })
    })
  }
  useEffect(() => {
    if (isPending) return

    if (!isPending && response.message && !response.success) {
      toast.error(response.message)
      return
    }

    if (!isPending && response.success) {
      toast.success(response.message)
      return
    }
  }, [response.message, response.success, isPending])
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
        <button onClick={handleResendEmail} disabled={isPending}>
          Renvoyer l&apos;e-mail
        </button>
      </p>
    </div>
  )
}
