import { redirect } from 'next/navigation'
import EmailRequestForm from '@/src/components/ui/form/EmailRequestForm'

import { auth } from '@/src/lib/auth'
const ResetPasswordPage = async () => {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }

  return <EmailRequestForm />
}
export default ResetPasswordPage
