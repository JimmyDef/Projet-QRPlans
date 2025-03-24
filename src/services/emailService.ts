import React, { JSX } from 'react'
import { NextResponse } from 'next/server'
import { transporter } from '@/src/lib/mailTransporter'
import { render } from '@react-email/components'

type TemplateProps = {
  fullName: string
  verificationItem: string
}
type EmailTemplate = (props: TemplateProps) => JSX.Element
type EmailWithOtp = { otp: string; link?: never }
type EmailWithLink = { link: string; otp?: never }

type EmailBase = {
  email: string
  subject: string
  fullName: string
  template: EmailTemplate
}

type Email = EmailBase & (EmailWithOtp | EmailWithLink)

export const sendEmail = async ({
  email,
  subject,
  fullName,
  otp,
  link,
  template,
}: Email) => {
  // Utilisation de la logique pour déterminer verificationItem (soit otp soit link)
  const verificationItem = otp ? otp : link || 'no-link-provided'

  const emailHtml = await render(
    React.createElement(template, {
      fullName,
      verificationItem, // Ce sera soit otp soit link
    })
  )

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
    return NextResponse.json(
      { message: 'COULD NOT SEND MESSAGE' },
      { status: 500 }
    )
  }
}
