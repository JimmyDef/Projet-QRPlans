import React, { JSX } from 'react'
import { NextResponse } from 'next/server'
import { transporter } from '@/src/lib/mailTransporter'
import { render } from '@react-email/components'

type TemplateProps = {
  fullName: string
  otp: string
}
type EmailTemplate = (props: TemplateProps) => JSX.Element
type Email = {
  email: string
  subject: string
  fullName: string
  otp: string
  template: EmailTemplate
}
export const sendEmail = async ({
  email,
  subject,
  fullName,
  otp,
  template,
}: Email) => {
  const emailHtml = await render(
    React.createElement(template, {
      fullName,
      otp,
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
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' }, { status: 500 })
  }
}
