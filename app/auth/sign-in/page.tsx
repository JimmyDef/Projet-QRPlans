import SignInForm from '@/src/components/ui/form/sign-in-form/SignInForm'

import { checkAuthAndRedirect } from '@/src/lib/authRedirectGuard'

const SignIn = async () => {
  await checkAuthAndRedirect()
  return <SignInForm />
}
export default SignIn
