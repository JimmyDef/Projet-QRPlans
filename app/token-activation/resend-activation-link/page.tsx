import './activation-resend.scss'
// import Link from 'next/link'
import EmailRequestForm from '@/components/form/EmailRequestForm '
const RequestActivationMail = async () => {
  return (
    <EmailRequestForm
      title="Activate Your Account"
      api="/api/auth/resend-activation"
      callBackUrl="/registration/emailSentSuccess"
    />
  )
}
export default RequestActivationMail
