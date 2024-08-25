import '@/styles/app/shared/token-result.scss'

// import Link from 'next/link'
import EmailRequestForm from '@/components/form/EmailRequestForm '
const RequestActivationMail = async () => {
  return (
    <EmailRequestForm
      title="Activate Your Account"
      api="/api/auth/resend-activation"
      redirectUrl="/registration/email-sent-successfully"
    />
  )
}
export default RequestActivationMail
