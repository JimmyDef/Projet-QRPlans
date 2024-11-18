'use server'
import NewPasswordForm from '@/src/components/ui/form/NewPasswordForm'
import { redirect } from 'next/navigation'
import prisma from '@/src/lib/prisma'
import { auth } from '@/src/lib/auth'

const RequestResetPasswordEmail = async ({
  params,
}: {
  params: { token: string }
}) => {
  const session = await auth()

  const resetPasswordToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: params.token,
    },
  })
  if (!resetPasswordToken) {
    redirect('/auth/reset-password/request-result/invalid')
  }
  if (session) {
    redirect('/dashboard')
  }

  return <NewPasswordForm />
}
export default RequestResetPasswordEmail
