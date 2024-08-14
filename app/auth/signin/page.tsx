import { signIn } from 'next-auth/react'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import SignInForm from '@/components/form/SignInForm'

const SignInPage = async () => {
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }

  return <SignInForm />
}
export default SignInPage
