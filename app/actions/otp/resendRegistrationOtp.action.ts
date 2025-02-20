'use server'
import { generateOTP } from '@/src/lib/helpers'
import prisma from '@/src/lib/prisma'
import { sendEmail } from '@/src/services/emailService'
import { EmailOTPTemplate } from '@/src/templates/EmailOTPTemplate'

interface resendRegistrationOtpPayload {
  userId: string
  email: string
  fullName: string
}
interface resendRegistrationOtpState {
  message: string
  success: boolean
}

export const resendRegistrationOtp = async (
  previousState: resendRegistrationOtpState,
  payload: resendRegistrationOtpPayload
) => {
  try {
    const otp = generateOTP()
    const FIVE_MINUTES = 5 * 60 * 1000
    const { userId, email, fullName } = payload
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      throw new Error('User not found')
    }
    if (user.active) {
      return {
        message: 'User already activated',
        success: false,
      }
    }
    const existing = await prisma.userOtp.findFirst({
      where: {
        userId: userId,
        purpose: 'REGISTRATION',
      },
    })
    if (existing) {
      const now = new Date().getTime()
      const createdAt = existing.createdAt.getTime()
      if (now - createdAt < FIVE_MINUTES) {
        return {
          message: 'Please wait before requesting another verification code.',
          success: false,
        }
      }
    }
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
      return {
        message: 'Error database,  verification code not created',
        success: false,
      }
    }

    const emailSender = () =>
      sendEmail({
        email,
        subject: 'Activate your account',
        fullName: fullName ?? 'new user',
        otp: otp,
        template: EmailOTPTemplate,
      })

    if (process.env.NODE_ENV === 'development') {
      await emailSender()
    } else {
      emailSender()
    }
    return {
      message: 'Verification code sent',
      success: true,
    }
  } catch (error) {
    console.log('🚀 ~ errorSENEMAIL:', error)

    return {
      message: 'Error database,  verification code not created',
      success: false,
    }
  }
}
