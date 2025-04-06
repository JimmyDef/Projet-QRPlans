'use server'
import { isPrismaError } from '@/src/lib/customErrors'
import { capitalizeFirstLetter, generateOTP } from '@/src/lib/helpers'
import prisma from '@/src/lib/prisma'
import { registrationSchema } from '@/src/lib/zod'
import { sendEmail } from '@/src/services/emailService'
import { EmailOTPTemplate } from '@/src/templates/EmailOTPTemplate'
import bcrypt from 'bcrypt'
import { z } from 'zod'

type RegistrationInput = z.infer<typeof registrationSchema>
const createUserAction = async (data: RegistrationInput) => {
  // throw new Error('Not implemented')
  try {
    const { email, password, firstName, lastName } =
      registrationSchema.parse(data)

    const pwHash = await bcrypt.hash(password, 10)
    const cleanedFirstname = capitalizeFirstLetter(firstName)
      .replace(/\s+/g, ' ')
      .trim()
    const cleanedLastname = capitalizeFirstLetter(lastName)
      .replace(/\s+/g, ' ')
      .trim()

    const checkExistingUser = await prisma.user.findUnique({
      where: { email },
      include: { Accounts: true },
    })

    if (checkExistingUser) {
      const provider = checkExistingUser.Accounts?.[0]?.provider
      return {
        message:
          provider && provider !== 'credentials'
            ? `Email already registered with ${provider} as provider. Please use it.`
            : `Email already registered with credentials. Please use it.`,
        success: false,
      }
    }

    const createNewUser = await prisma.user.create({
      data: {
        email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })

    const otp = generateOTP()
    await prisma.userOtp.create({
      data: {
        userId: createNewUser.id,
        otp: otp,
        purpose: 'REGISTRATION',
      },
    })

    sendEmail({
      email,
      subject: 'Activate your account',
      fullName: createNewUser.name ?? 'new user',
      otp: otp,
      template: EmailOTPTemplate,
    }).catch((err) => {
      console.error('Failed to send email', err)
    })

    return {
      message: 'User created',
      success: true,
    }
  } catch (error) {
    console.log('🚀 ~ error createUserAction:', error)
    if (isPrismaError(error)) {
      return {
        message: 'Database unreachable. Please try again later.',
        success: false,
      }
    }
    if (error instanceof z.ZodError) {
      return {
        message: error.errors[0].message,
        success: false,
      }
    }
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    }
  }
}
export default createUserAction
