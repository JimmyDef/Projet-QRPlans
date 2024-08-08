// import { EmailVerification } from '@/templates/email-template'

import { NextRequest } from 'next/server'
import { sendActivationEmail } from '@/services/emailService'
// const resend = new Resend(process.env.RESEND_API_KEY)
import { NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    const verificationLink = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/activate/${email}`
    await sendActivationEmail({
      email,
      subject: 'Activate your account',
      fullName: 'User',
      verificationLink,
    })

    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
