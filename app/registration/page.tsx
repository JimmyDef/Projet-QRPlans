import RegistrationForm from '@/components/form/RegistrationForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Registration = async () => {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }
  return <RegistrationForm />
}
export default Registration
