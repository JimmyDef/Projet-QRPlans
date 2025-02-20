import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { ValidateEmailOTP } from './ValidateEmailOTP'

const validateEmailOTPPage = async () => {
  const session = await auth()

  if (!session) return redirect('/auth/sign-in')
  if (session.user.provider !== 'credentials') return redirect('/dashboard')
  if (session?.user.provider === 'credentials' && session?.user.active === true)
    return redirect('/dashboard')

  return <ValidateEmailOTP />
}

export default validateEmailOTPPage
