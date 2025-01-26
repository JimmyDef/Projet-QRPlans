'use server'

import { redirect } from 'next/navigation'

interface ITestAction {
  message: string
  succes?: boolean
}
const testaction = async (previouState: ITestAction, otp: string) => {
  if (otp === '123456') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    redirect('/dashboard')
  } else {
    return { message: 'Code expiré ou invalide.' }
  }
}
export default testaction
