import SignInForm from '@/components/form/signInForm'
// import { auth } from '@/lib/auth'
import { getSession } from '@/lib/getSession'

import { redirect } from 'next/navigation'

const SignIn = async () => {
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }
  return <SignInForm />
}
export default SignIn
