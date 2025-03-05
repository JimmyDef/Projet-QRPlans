'use client'
import { resendRegistrationOtp } from '@/app/actions/otp/resendRegistrationOtp.action'
import { useSession } from 'next-auth/react'
import React, { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'
import './resend-Button.scss'
interface ResendVerificationEmailButtonProps {
  externalRef?: React.RefObject<HTMLInputElement | null>
}

export const ResendVerificationEmailButton = ({
  externalRef,
}: ResendVerificationEmailButtonProps) => {
  const { data: session } = useSession()

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
  const [response, action, isPending] = useActionState(resendRegistrationOtp, {
    message: '',
    success: false,
  })
  useEffect(() => {
    if (isPending) return
    if (!isPending && response.message && !response.success) {
      toast.error(response.message)
      return
    }

    if (!isPending && response.success) {
      toast.success(response.message)
      externalRef?.current?.focus()
      return
    }
  }, [response.message, response.success, isPending])
  return (
    <button
      className="validate-email-resend-button"
      onClick={handleResendEmail}
      disabled={isPending}
    >
      Renvoyer l&apos;e-mail
    </button>
  )
}
