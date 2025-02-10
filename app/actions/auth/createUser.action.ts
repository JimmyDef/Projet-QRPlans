'use server'
import prisma from '@/src/lib/prisma'
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { capitalizeFirstLetter, generateOTP } from '@/src/lib/helpers'
import { sendEmail } from '@/src/services/emailService'
import { EmailOTPTemplate } from '@/src/templates/EmailOTPTemplate'
import { registrationSchema } from '@/src/lib/zod'
import { z } from 'zod'

type RegistrationInput = z.infer<typeof registrationSchema>
const createUserAction = async (data: RegistrationInput) => {
  // throw new Error('Not implemented')
  try {
    const { email, password, firstName, lastName } =
      registrationSchema.parse(data)

    const pwHash = await bcrypt.hash(password, 10)
    const cleanedFirstname = capitalizeFirstLetter(firstName).trim()
    const cleanedLastname = capitalizeFirstLetter(lastName).trim()

    const user = await prisma.user.create({
      data: {
        email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })

    const otp = generateOTP()
    await prisma.userOtp.create({
      data: {
        userId: user.id,
        otp: otp,
        purpose: 'REGISTRATION',
      },
    })

    const emailSender = () =>
      sendEmail({
        email,
        subject: 'Activate your account',
        fullName: user.name ?? 'new user',
        otp: otp,
        template: EmailOTPTemplate,
      })

    if (process.env.NODE_ENV === 'development') {
      await emailSender()
    } else {
      emailSender()
    }

    return { message: 'User created', success: true, isNewUser: true }
  } catch (error) {
    // console.error('Error createUserAction:', error)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Code P2002 indique une violation de la contrainte unique
        return {
          message: 'User already exist.',
          success: false,
          isNewUser: false,
        }
      } else {
        return {
          message: 'An unexpected error occurred. Please try again.',
          success: false,
          isNewUser: true,
        }
      }
    }

    if (error instanceof PrismaClientInitializationError) {
      return {
        message: 'Database unreachable. Please try again later.',
        success: false,
        isNewUser: true,
      }
    }
    if (error instanceof z.ZodError) {
      return {
        message: error.errors[0].message,
        success: false,
        isNewUser: true,
      }
    }
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
      isNewUser: true,
    }
  }
}
export default createUserAction
