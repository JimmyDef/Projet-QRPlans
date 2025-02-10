import { generateOTP } from '@/src/lib/helpers'
import prisma from '@/src/lib/prisma'
import { sendEmail } from '@/src/services/emailService'
import { OtpPurpose } from '@prisma/client'

interface UpsertAction {
  userId: string
  email?: string
  type: OtpPurpose
}

const upsertAction = async ({ userId, email }: UpsertAction) => {
  const otp = generateOTP()

  const userOtp = await prisma.userOtp.upsert({
    where: {
      userId_purpose: {
        userId: userId,
        purpose: 'REGISTRATION',
      },
    },
    create: {
      userId: userId,
      otp: otp,
      purpose: 'REGISTRATION',
    },
    update: {
      otp: otp,
      createdAt: new Date(),
    },
  })
  if (!userOtp) {
    throw new Error('OTP not created or updated')
  }

  sendEmail({
    email,
    subject: 'Activate your account',
    fullName: user.name ?? 'new user',
    otp: otp,
    template: EmailOTPTemplate,
  })
}
export default upsertAction
