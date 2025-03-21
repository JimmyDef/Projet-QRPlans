// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
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

export async function POST(request: Request) {
  try {
    const body: RegistrationInput = await request.json()
    const { email, password, firstName, lastName } =
      registrationSchema.parse(body)

    const pwHash = await bcrypt.hash(password, 10)
    const cleanedFirstname = capitalizeFirstLetter(firstName).trim()
    const cleanedLastname = capitalizeFirstLetter(lastName).trim()

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })

    // Gestion de l'OTP
    const otp = generateOTP()
    await prisma.userOtp.upsert({
      where: {
        userId_purpose: {
          userId: user.id,
          purpose: 'REGISTRATION',
        },
      },
      create: {
        userId: user.id,
        otp: otp,
        purpose: 'REGISTRATION',
      },
      update: {
        otp: otp,
        createdAt: new Date(),
      },
    })

    // Envoi d'email
    const sendEmailAction = async () => {
      await sendEmail({
        email,
        subject: 'Activate your account',
        fullName: user.name ?? 'new user',
        otp: otp,
        template: EmailOTPTemplate,
      })
    }

    if (process.env.NODE_ENV === 'development') {
      await sendEmailAction()
    } else {
      sendEmailAction()
    }

    return NextResponse.json(
      { message: 'User created successfully', success: true },
      { status: 201 }
    )
  } catch (error) {
    // console.log('Registration error:', error)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: 'User already exists', success: false },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { message: 'Database error', success: false },
        { status: 500 }
      )
    }

    if (error instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { message: 'Database connection error', success: false },
        { status: 503 }
      )
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message, success: false },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
