import { EmailOTPTemplate } from '@/src/templates/EmailOTPTemplate'
import React from 'react'

export const page = () => {
  return <EmailOTPTemplate fullName="jimjim" otp="123456" />
}
export default page
