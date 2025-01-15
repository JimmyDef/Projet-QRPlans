import RegistrationForm from '@/src/components/ui/form/RegistrationForm'

import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'

const Registration = async () => {
  await HandleSessionRedirect('/dashboard')

  return <RegistrationForm />
}
export default Registration
