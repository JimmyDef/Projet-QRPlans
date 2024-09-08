import { getSession } from '@/src/lib/getSession'
import { redirect } from 'next/navigation'
import SignInForm from '@/src/components/form/SignInForm'

const SignInPage = async () => {
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }

  return <SignInForm />
}
export default SignInPage
