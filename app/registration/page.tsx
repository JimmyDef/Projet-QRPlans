import RegistrationForm from '@/components/form/RegistrationForm'

// import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/getSession'
const Registration = async () => {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }
  return <RegistrationForm />
}
export default Registration
