// import './activation-resend.scss'
import { redirect } from 'next/navigation'
import EmailRequestForm from '@/components/form/EmailRequestForm '
import { getSession } from '@/lib/getSession'
const RequestResetPasswordEmail = async () => {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <EmailRequestForm
      title="Reset your password"
      api="/api/auth/forgot-password"
      redirectUrl="/reset-password/email-sent-success"
    />
  )
}
export default RequestResetPasswordEmail
