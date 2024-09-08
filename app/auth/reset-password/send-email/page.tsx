// import './activation-resend.scss'
import { redirect } from 'next/navigation'
import EmailRequestForm from '@/src/components/form/EmailRequestForm'
import { getSession } from '@/src/lib/getSession'
const RequestResetPasswordEmail = async () => {
  const session = await getSession()

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
