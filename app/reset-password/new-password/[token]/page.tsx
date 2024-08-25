'use server'
import { redirect } from 'next/navigation'
import NewPasswordForm from '@/components/form/NewPasswordForm'
import { getSession } from '@/lib/getSession'

import prisma from '@/lib/prisma'

const RequestResetPasswordEmail = async ({
  params,
}: {
  params: { token: string }
}) => {
  const session = await getSession()

  const resetPasswordToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: params.token,
    },
  })
  if (!resetPasswordToken) {
    redirect('/reset-password/request-result/invalid')
  }
  if (session) {
    redirect('/dashboard')
  }

  return <NewPasswordForm />
}
export default RequestResetPasswordEmail
