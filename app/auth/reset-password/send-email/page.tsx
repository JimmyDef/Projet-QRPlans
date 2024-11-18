import { redirect } from 'next/navigation'
import EmailRequestForm from '@/src/components/ui/form/EmailRequestForm'

import { auth } from '@/src/lib/auth'
const RequestResetPasswordEmail = async () => {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <EmailRequestForm
      title="Reset your password"
      api="/api/auth/forgot-password"
      redirectUrl="/auth/reset-password/email-sent-success"
    />
  )
}
export default RequestResetPasswordEmail
