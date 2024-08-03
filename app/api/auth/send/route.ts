import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, firstName, verificationLink } = req.body

    const { data, error } = await resend.emails.send({
      from: 'YourApp <no-reply@yourapp.com>',
      to: [email],
      subject: 'Verify your email address',
      react: EmailTemplate({
        firstName,
        verificationLink,
      }) as React.ReactElement,
    })

    if (error) {
      return NextResponse.json({ error, status: 500 })
    }

    return NextResponse.json({ data, status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Internal server error', status: 500 })
  }
}
