import '@/styles/app/shared/token-activation.scss'

// import Link from 'next/link'
import EmailRequestForm from '@/components/form/EmailRequestForm '
const RequestActivationMail = async () => {
  return (
    <EmailRequestForm
      title="Activate Your Account"
      api="/api/auth/resend-activation"
      callBackUrl="/registration/email-sent-successfully"
    />
  )
}
export default RequestActivationMail
