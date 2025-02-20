'use server'

import { auth } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import { Router } from 'next/router'

interface OTPValidationResult {
  message: string
  success: boolean
}
export const OTPValidationAction = async (
  previouState: OTPValidationResult,
  otp: string
) => {
  const session = await auth()
  if (!session) {
    return { message: 'Code expiré ou invalide.', success: false }
    // throw new Error('OTP, User not authenticated')
  }

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
    return { message: 'OTP_INVALID', success: false }
    // throw new Error('OTP, User not authenticated')
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

  return { message: 'Code accepted.', success: true }
}
export default OTPValidationAction
