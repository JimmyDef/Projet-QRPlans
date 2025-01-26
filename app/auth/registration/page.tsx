import RegistrationForm from '@/src/components/ui/form/registrationForm/RegistrationForm'

import { HandleSessionRedirect } from '@/src/lib/SessionCheckerServer'

const Registration = async () => {
  await HandleSessionRedirect()

  return <RegistrationForm />
}
export default Registration
