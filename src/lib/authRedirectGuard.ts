'use server'
import { auth } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import prisma from './prisma'

export const checkAuthAndRedirect = async () => {
  const session = await auth()

  if (session) {
    const userDb = await prisma.user.findUnique({
      where: { id: session?.user.id },
    })
    const isUserActive = !!userDb?.active
    if (session.user.provider === 'credentials' && !isUserActive) {
      redirect('/auth/registration/validate-email-otp')
    }
    redirect('/dashboard')
  }
}
