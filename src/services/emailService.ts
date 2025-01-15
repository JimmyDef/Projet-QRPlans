import React from 'react'
import { NextResponse } from 'next/server'
import { transporter } from '@/src/lib/mailTransporter'
import { render } from '@react-email/components'

type TemplateProps = {
  fullName: string
  link: string
}
type EmailTemplate = (props: TemplateProps) => JSX.Element
type Email = {
  email: string
  subject: string
  fullName: string
  link: string
  template: EmailTemplate
}
export const sendEmail = async ({
  email,
  subject,
  fullName,
  link,
  template,
}: Email) => {
  const emailHtml = render(
    React.createElement(template, {
      fullName,
      link,
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
