import SignInForm from '@/src/components/ui/form/signInForm/SignInForm'

import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'
const SignIn = async () => {
  await HandleSessionRedirect()
  return <SignInForm />
}
export default SignIn
