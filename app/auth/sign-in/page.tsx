import SignInForm from '@/src/components/ui/form/SignInForm'

import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'
const SignIn = async () => {
  await HandleSessionRedirect('/dashboard')
  return <SignInForm />
}
export default SignIn
