import SignInForm from '@/src/components/form/SignInForm'

import { getSession } from '@/src/lib/getSession'
import { redirect } from 'next/navigation'

const SignIn = async () => {
  // const session = await getSession()
  // if (session) {
  //   redirect('/dashboard')
  // }

  return <SignInForm />
}
export default SignIn
