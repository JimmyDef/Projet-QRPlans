import RegistrationForm from '@/src/components/form/RegistrationForm'

import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
const Registration = async () => {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  }
  return <RegistrationForm />
}
export default Registration
