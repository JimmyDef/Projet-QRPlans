import { redirect } from 'next/navigation'
import NewPasswordForm from '@/components/form/NewPasswordForm'
import { getSession } from '@/lib/getSession'
const RequestResetPasswordEmail = async () => {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return <NewPasswordForm />
}
export default RequestResetPasswordEmail
