import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { ValidateEmailOTP } from './ValidateEmailOTP'
import prisma from '@/src/lib/prisma'

const validateEmailOTPPage = async () => {
  const session = await auth()

  if (!session) return redirect('/auth/sign-in')
  const userDb = await prisma.user.findUnique({
    where: { id: session?.user.id },
  })
  const isUserActive = !!userDb?.active
  if (session.user.provider !== 'credentials') return redirect('/dashboard')
  if (session?.user.provider === 'credentials' && isUserActive)
    return redirect('/dashboard')

  return <ValidateEmailOTP />
}

export default validateEmailOTPPage
