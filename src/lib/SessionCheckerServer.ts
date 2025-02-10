import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export const HandleSessionRedirect = async () => {
  const session = await auth()
  if (session) {
    if (
      session.user.provider === 'credentials' &&
      session.user.active === false
    )
      return redirect('/auth/registration/validateEmailOTP')
    redirect('/dashboard')
  }
}
