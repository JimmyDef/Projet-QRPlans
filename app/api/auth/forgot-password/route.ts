import { NextRequest } from 'next/server'
import { sendEmail } from '@/src/services/emailService'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import prisma from '@/src/lib/prisma'
import PasswordResetTemplate from '@/src/templates/PasswordResetTemplate'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

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
    if (!user.active) {
      return NextResponse.json(
        { error: 'This email must be activated.' },
        { status: 403 }
      )
    }
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    })
    const token = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Exemple : le token expire dans 5min
      },
    })
    if (!token) {
      throw new Error('Token not created')
    }

    sendEmail({
      email,
      subject: 'Reset your password',
      fullName: user.name ?? '',
      link: `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/new-password/${token.token}/${email}`,
      template: PasswordResetTemplate,
    })
    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
