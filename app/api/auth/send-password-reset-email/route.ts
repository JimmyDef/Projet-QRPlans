import { ErrorMessage } from '../../../../src/components/ui/form/components/error-message/ErrorMessage'
import { NextRequest } from 'next/server'
import { sendEmail } from '@/src/services/emailService'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import prisma from '@/src/lib/prisma'
import PasswordResetEmailTemplate from '@/src/templates/PasswordResetEmailTemplate'
import { emailSchema } from '@/src/lib/zod'
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const validation = emailSchema.safeParse({ email })
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }
  try {
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'This email does not exist in our database.' },
        { status: 404 }
      )
    }

    const userProvider = await prisma.account.findFirst({
      where: { userId: user.id, provider: { not: undefined } },
    })
    if (userProvider) {
      return NextResponse.json(
        {
          error: `This account doesn't need password. It was created with ${userProvider.provider} as provider, please use it to sign in.`,
        },
        { status: 403 }
      )
    }
    const userTokenExist = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        createdAt: { gt: new Date(Date.now() - 2 * 60 * 1000) },
      },
    })
    if (userTokenExist) {
      return NextResponse.json(
        {
          error:
            'Please wait 2 minutes before requesting a new password reset email.',
        },
        { status: 403 }
      )
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })

    const userToken = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Exemple : le token expire dans 5min
      },
    })
    if (!userToken) {
      throw new Error('Token not created')
    }

    const emailSender = () =>
      sendEmail({
        email,
        subject: 'Reset your password',
        fullName: user.name ?? 'user',
        link: `${
          process.env.NEXT_PUBLIC_API_URL
        }/auth/reset-password/new-password/${userToken.token}/${encodeURIComponent(
          email
        )}`,
        template: PasswordResetEmailTemplate,
      })

    if (process.env.NODE_ENV === 'development') {
      await emailSender()
    } else {
      emailSender().catch(console.error)
    }

    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    if (
      error instanceof PrismaClientInitializationError ||
      error instanceof PrismaClientKnownRequestError
    ) {
      console.error('Database offline:', error)
      return NextResponse.json(
        { error: 'Database offline, try again later.' },
        { status: 500 }
      )
    }
    console.error('Error sending email:', error)

    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
