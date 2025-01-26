'use server'

import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
const OTPValidation = async (otp: string) => {
  const session = await auth()
  if (!session || !session.user?.id) return redirect('/sign-in')

  const userOTP = await prisma.userOtp.findFirst({
    where: {
      userId: session.user.id,
      otp: otp,
      purpose: 'REGISTRATION',
      createdAt: {
        gte: new Date(Date.now() - 5 * 60_000),
      },
    },
  })

  if (!userOTP) {
    throw new Error('Invalid OTP')
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      active: true,
    },
  })

  await prisma.userOtp.delete({
    where: {
      id: userOTP.id,
      otp: otp,
      purpose: 'REGISTRATION',
    },
  })
  return { success: true }
}
export default OTPValidation
