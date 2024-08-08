import React from 'react'
import EmailVerification from '@/emails/verificationLink'
import { NextResponse } from 'next/server'
import { transporter } from '@/lib/mailTransporter'
import { render } from '@react-email/components'

type Email = {
  email: string
  subject: string
  fullName: string
  verificationLink: string
}

export const sendActivationEmail = async ({
  email,
  subject,
  fullName,
  verificationLink,
}: Email) => {
  const emailHtml = render(
    React.createElement(EmailVerification, {
      fullName: fullName,
      verificationLink: verificationLink,
    })
  ) // Use React.createElement to create the JSX element
  const options = {
    from: 'QR-Plans <qrplans@gmail.com>',
    to: [email],
    subject,
    html: emailHtml,
  }

  try {
    await transporter.sendMail(options)
    console.log('Email sent successfully')

    return NextResponse.json({ message: 'Success: email was sent' })
  } catch (error) {
    console.log(error)
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' }, { status: 500 })
  }
}
