'use server'
import RegistrationForm from '@/src/components/ui/form/registration-form/RegistrationForm'

import { checkAuthAndRedirect } from '@/src/lib/authRedirectGuard'

const Registration = async () => {
  await checkAuthAndRedirect()

  return <RegistrationForm />
}
export default Registration
