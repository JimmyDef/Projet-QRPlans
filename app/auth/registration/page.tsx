import RegistrationForm from '@/src/components/form/RegistrationForm'

// import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { getSession } from '@/src/lib/getSession'
const Registration = async () => {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }
  return <RegistrationForm />
}
export default Registration
