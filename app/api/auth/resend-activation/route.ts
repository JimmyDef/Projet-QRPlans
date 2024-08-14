import { NextRequest } from 'next/server'
import { sendActivationEmail } from '@/services/emailService'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import prisma from '@/lib/prisma'

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
    const isTokenActive = await prisma.activateToken.findFirst({
      where: {
        userId: user.id,
        activatedAt: null,
      },
    })

    if (!isTokenActive) {
      return NextResponse.json(
        { error: 'This email is already activated.' },
        { status: 409 }
      )
    }

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000)
    if (isTokenActive.createdAt > fifteenMinutesAgo) {
      return NextResponse.json(
        {
          error: 'You can only request a new activation link once every hour.',
        },
        { status: 429 }
      )
    }
    const token = await prisma.activateToken.create({
      data: {
        userId: user.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    })
    if (!token) {
      throw new Error('Token not created')
    }

    sendActivationEmail({
      email,
      subject: 'Activate your account',
      fullName: user.name ?? '',
      verificationLink: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/activate/${token.token}`,
    })
    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
