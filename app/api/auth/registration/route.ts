import prisma from '@/src/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import { capitalizeFirstLetter, generateOTP } from '@/src/lib/helpers'
import { NextResponse } from 'next/server'

import { sendEmail } from '@/src/services/emailService'
import { EmailOTPTemplate } from '@/src/templates/EmailOTPTemplate'

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json()
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      )
    }
    const pwHash = bcrypt.hashSync(password, 10)
    const cleanedFirstname = capitalizeFirstLetter(firstName).trim()
    const cleanedLastname = capitalizeFirstLetter(lastName).trim()

    const user = await prisma.user.create({
      data: {
        email,
        password: pwHash,
        name: `${cleanedFirstname} ${cleanedLastname}`,
      },
    })
    if (!user) {
      throw new Error('User not created')
    }

    const otp = generateOTP()
    const userOtp = await prisma.userOtp.create({
      data: {
        userId: user.id,
        otp: otp,
        purpose: 'REGISTRATION',
      },
    })
    if (!userOtp) {
      throw new Error('OTP not created')
    }

    sendEmail({
      email,
      subject: 'Activate your account',
      fullName: user.name ?? 'new user',
      otp: otp,
      template: EmailOTPTemplate,
    })

    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Code P2002 indique une violation de la contrainte unique
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error }, { status: 500 })
    }
  }
}
