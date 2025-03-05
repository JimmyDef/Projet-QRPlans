'use client'

import OTPValidationAction from '@/app/actions/otp/validateRegistrationOtp.action'
import { Otp } from '@/src/components/auth/otp/Otp'
import './validate-email-otp.scss'
import { useAuthStore } from '@/src/lib/store'
import { useRouter } from 'next/navigation'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { ResendVerificationEmailButton } from './_resend-button/ResendButton'

export const ValidateEmailOTP = () => {
  const router = useRouter()

  const setUserActive = useAuthStore((state) => state.setUserActive)
  const [error, onCompletionAction, isPending] = useActionState(
    OTPValidationAction,
    {
      message: '',
      success: false,
    }
  )
  const OTPInvalidMessage = error.message ? 'Code invalide ou expiré.' : ''

  const handleOtpOncomplete = (code: string) => {
    startTransition(async () => {
      onCompletionAction(code)
    })
  }
  const childInputRef = useRef<HTMLInputElement>(null)
  const handleSetInputRef = (ref: HTMLInputElement | null) => {
    childInputRef.current = ref
  }
  useEffect(() => {
    if (error.success) {
      setUserActive(true)
      router.push('/dashboard')
      return
    }
    if (!OTPInvalidMessage) return
    if (!isPending && OTPInvalidMessage) {
      toast.error('Code expiré ou invalide.')
      return
    }
  }, [OTPInvalidMessage, isPending])
  return (
    <div className="validate-email-container">
      <h1 className="validate-email-title">
        Vérification de votre adresse e-mail
      </h1>
      <p className="validate-email-subtitle">
        Pour finaliser votre inscription, veuillez entrer le code que vous avez
        reçu par e-mail.
      </p>

      <Otp
        isPending={isPending}
        onComplete={handleOtpOncomplete}
        setInputRef={handleSetInputRef}
      />

      <p className="validate-email-resend">
        Vous n&apos;avez pas reçu le code ?{''}
        <ResendVerificationEmailButton externalRef={childInputRef} />
      </p>
    </div>
  )
}
